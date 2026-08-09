const prisma = require("../config/prisma");

const buildAlertMessage = ({ user, event, location }) => {
  const locationText = location ? `${Number(location.latitude)}, ${Number(location.longitude)}` : "Latest location unavailable";
  return [
    "RAKSHITA ALERT",
    "Potential emergency detected.",
    `User: ${user.name}`,
    `Severity: ${event.severity}`,
    `Type: ${event.type}`,
    `Location: ${locationText}`,
    "Prototype notification only. No real emergency service was contacted."
  ].join("\n");
};

const createMockAlerts = async ({ user, event, contacts, location }) => {
  const message = buildAlertMessage({ user, event, location });
  const alerts = [];

  for (const contact of contacts) {
    console.log(`\n${message}\nContact: ${contact.name} (${contact.phone})\n`);
    const alert = await prisma.alert.create({
      data: {
        emergencyEventId: event.id,
        contactId: contact.id,
        alertType: "MOCK_SMS",
        status: "SENT",
        deliveredAt: new Date()
      }
    });
    alerts.push(alert);
  }

  return alerts;
};

module.exports = { createMockAlerts };
