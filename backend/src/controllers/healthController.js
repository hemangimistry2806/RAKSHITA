const prisma = require("../config/prisma");
const { success } = require("../utils/apiResponse");

const createReading = async (req, res) => {
  const reading = await prisma.healthReading.create({
    data: {
      ...req.body,
      userId: req.user.id,
      recordedAt: req.body.recordedAt ? new Date(req.body.recordedAt) : undefined
    }
  });
  return success(res, { reading }, 201);
};

const listReadings = async (req, res) => {
  const readings = await prisma.healthReading.findMany({
    where: { userId: req.user.id },
    orderBy: { recordedAt: "desc" },
    take: 100
  });
  return success(res, { readings });
};

const latestReading = async (req, res) => {
  const reading = await prisma.healthReading.findFirst({ where: { userId: req.user.id }, orderBy: { recordedAt: "desc" } });
  return success(res, { reading });
};

module.exports = { createReading, listReadings, latestReading };
