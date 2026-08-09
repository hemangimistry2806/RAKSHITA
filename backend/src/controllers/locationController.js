const prisma = require("../config/prisma");
const { success } = require("../utils/apiResponse");
const { serializeLocation } = require("../utils/sanitize");

const createLocation = async (req, res) => {
  const location = await prisma.location.create({
    data: {
      ...req.body,
      userId: req.user.id,
      recordedAt: req.body.recordedAt ? new Date(req.body.recordedAt) : undefined
    }
  });
  return success(res, { location: serializeLocation(location) }, 201);
};

const latestLocation = async (req, res) => {
  const location = await prisma.location.findFirst({ where: { userId: req.user.id }, orderBy: { recordedAt: "desc" } });
  return success(res, { location: serializeLocation(location) });
};

const locationHistory = async (req, res) => {
  const locations = await prisma.location.findMany({
    where: { userId: req.user.id },
    orderBy: { recordedAt: "desc" },
    take: 100
  });
  return success(res, { locations: locations.map(serializeLocation) });
};

module.exports = { createLocation, latestLocation, locationHistory };
