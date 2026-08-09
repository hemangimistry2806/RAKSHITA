const prisma = require("../config/prisma");
const { AppError } = require("../middleware/errorHandler");
const { success } = require("../utils/apiResponse");

const listDevices = async (req, res) => {
  const devices = await prisma.device.findMany({ where: { userId: req.user.id }, orderBy: { lastSeenAt: "desc" } });
  return success(res, { devices });
};

const createDevice = async (req, res) => {
  const device = await prisma.device.create({
    data: {
      ...req.body,
      userId: req.user.id,
      lastSeenAt: req.body.lastSeenAt ? new Date(req.body.lastSeenAt) : undefined
    }
  });
  return success(res, { device }, 201);
};

const updateDevice = async (req, res) => {
  const existing = await prisma.device.findFirst({ where: { id: req.params.id, userId: req.user.id } });
  if (!existing) throw new AppError("Device not found", 404);
  const device = await prisma.device.update({
    where: { id: req.params.id },
    data: {
      ...req.body,
      lastSeenAt: req.body.lastSeenAt ? new Date(req.body.lastSeenAt) : undefined
    }
  });
  return success(res, { device });
};

module.exports = { listDevices, createDevice, updateDevice };
