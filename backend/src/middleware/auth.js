const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const env = require("../config/env");
const { AppError } = require("./errorHandler");
const { sanitizeUser } = require("../utils/sanitize");

const authenticate = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    const token = header && header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      throw new AppError("Authentication token required", 401);
    }

    const payload = jwt.verify(token, env.jwtSecret || "test-secret");
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });

    if (!user) {
      throw new AppError("User not found", 401);
    }

    req.user = sanitizeUser(user);
    next();
  } catch (error) {
    next(error.name === "JsonWebTokenError" ? new AppError("Invalid authentication token", 401) : error);
  }
};

module.exports = { authenticate };
