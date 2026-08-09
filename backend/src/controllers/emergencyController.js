const prisma = require("../config/prisma");
const emergencyService = require("../services/emergencyService");
const { success } = require("../utils/apiResponse");
const { serializeEmergency } = require("../utils/sanitize");

const simulate = async (req, res) => {
  const result = await emergencyService.simulateEmergency(req.user, req.body);
  return success(res, result, 201, "Potential emergency detected");
};

const listEvents = async (req, res) => {
  const events = await prisma.emergencyEvent.findMany({
    where: { userId: req.user.id },
    include: { alerts: true },
    orderBy: { detectedAt: "desc" }
  });
  return success(res, { events: events.map(serializeEmergency) });
};

const getEvent = async (req, res) => {
  const event = await emergencyService.assertEventForUser(req.user.id, req.params.id);
  return success(res, { event: serializeEmergency(event) });
};

const cancelEvent = async (req, res) => {
  const event = await emergencyService.updateEmergencyStatus(req.user.id, req.params.id, "CANCELLED");
  return success(res, { event }, 200, "Emergency event cancelled");
};

const resolveEvent = async (req, res) => {
  const event = await emergencyService.updateEmergencyStatus(req.user.id, req.params.id, "RESOLVED");
  return success(res, { event }, 200, "Emergency event resolved");
};

const escalateEvent = async (req, res) => {
  const event = await emergencyService.updateEmergencyStatus(req.user.id, req.params.id, "ESCALATED");
  return success(res, { event }, 200, "Emergency event escalated in prototype workflow");
};

module.exports = { simulate, listEvents, getEvent, cancelEvent, resolveEvent, escalateEvent };
