const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const env = require("../config/env");
const { AppError } = require("../middleware/errorHandler");
const { sanitizeUser } = require("../utils/sanitize");

const signToken = (userId) => jwt.sign({ sub: userId }, env.jwtSecret || "test-secret", { expiresIn: env.jwtExpiresIn });

const register = async ({ name, email, password, phone, dateOfBirth }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new AppError("Email is already registered", 409);

  const passwordHash = await bcrypt.hash(password, env.bcryptSaltRounds);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      phone,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined
    }
  });

  return { user: sanitizeUser(user), token: signToken(user.id) };
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AppError("Invalid email or password", 401);

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) throw new AppError("Invalid email or password", 401);

  return { user: sanitizeUser(user), token: signToken(user.id) };
};

module.exports = { register, login, signToken };
