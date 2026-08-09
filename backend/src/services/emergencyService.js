const prisma = require("../config/prisma");
const { AppError } = require("../middleware/errorHandler");
const { evaluateEmergency } = require("./emergencyRuleService");
const { createMockAlerts } = require("./alertService");
const { serializeEmergency, serializeLocation } = require("../utils/sanitize");

const simulateEmergency = async (user, payload) => {
  const [latestHealth, latestLocation, contacts] = await Promise.all([
    prisma.healthReading.findFirst({ where: { userId: user.id }, orderBy: { recordedAt: "desc" } }),
    prisma.location.findFirst({ where: { userId: user.id }, orderBy: { recordedAt: "desc" } }),
    prisma.emergencyContact.findMany({ where: { userId: user.id }, orderBy: [{ priority: "asc" }, { createdAt: "asc" }] })
  ]);

  const evaluation = evaluateEmergency({ ...payload, latestHealth });
  const event = await prisma.emergencyEvent.create({
    data: {
      userId: user.id,
      type: payload.type,
      severity: evaluation.severity,
      status: evaluation.status,
      triggerReason: evaluation.triggerReason,
      heartRate: latestHealth?.heartRate,
      spo2: latestHealth?.spo2,
      latitude: latestLocation?.latitude,
      longitude: latestLocation?.longitude
    }
  });

  const alerts = await createMockAlerts({ user, event, contacts, location: latestLocation });

  return {
    emergency: serializeEmergency(event),
    location: serializeLocation(latestLocation),
    latestHealth,
    alertsCreated: alerts.length
  };
};

const assertEventForUser = async (userId, id) => {
  const event = await prisma.emergencyEvent.findFirst({
    where: { id, userId },
    include: { alerts: { include: { contact: true } } }
  });
  if (!event) throw new AppError("Emergency event not found", 404);
  return event;
};

const updateEmergencyStatus = async (userId, id, status) => {
  await assertEventForUser(userId, id);
  const now = new Date();
  const data = { status };
  if (status === "RESOLVED" || status === "CANCELLED") data.resolvedAt = now;
  if (status === "ESCALATED") data.escalatedAt = now;

  const event = await prisma.emergencyEvent.update({ where: { id }, data });
  return serializeEmergency(event);
};

module.exports = { simulateEmergency, assertEventForUser, updateEmergencyStatus };
