const { ZodError } = require("zod");
const { Prisma } = require("@prisma/client");
const { failure } = require("../utils/apiResponse");

class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

const notFound = (req, res) => failure(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);

const errorHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return failure(res, "Validation failed", 400, err.errors);
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
    return failure(res, "A record with this value already exists", 409);
  }

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Something went wrong" : err.message;

  if (statusCode === 500) {
    console.error(err);
  }

  return failure(res, message, statusCode);
};

module.exports = { AppError, notFound, errorHandler };
