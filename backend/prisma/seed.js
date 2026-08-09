const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("DemoPass123!", 10);

  const user = await prisma.user.upsert({
    where: { email: "demo@rakshita.local" },
    update: {},
    create: {
      name: "RAKSHITA Demo User",
      email: "demo@rakshita.local",
      passwordHash,
      phone: "+919999999999",
      dateOfBirth: new Date("2001-01-01")
    }
  });

  await prisma.emergencyContact.createMany({
    data: [
      { userId: user.id, name: "Demo Parent", phone: "+919888888888", relationship: "Parent", priority: 1 },
      { userId: user.id, name: "Demo Friend", phone: "+919777777777", relationship: "Friend", priority: 2 }
    ],
    skipDuplicates: true
  });

  await prisma.healthReading.create({
    data: { userId: user.id, heartRate: 138, spo2: 90, steps: 1240 }
  });

  await prisma.location.create({
    data: { userId: user.id, latitude: 23.0225, longitude: 72.5714, accuracy: 12.5 }
  });

  await prisma.device.upsert({
    where: { deviceIdentifier: "RAKSHITA-DEMO-001" },
    update: { userId: user.id, batteryLevel: 86, connectionStatus: "CONNECTED", lastSeenAt: new Date() },
    create: {
      userId: user.id,
      deviceName: "RAKSHITA Demo Bracelet",
      deviceIdentifier: "RAKSHITA-DEMO-001",
      batteryLevel: 86,
      connectionStatus: "CONNECTED"
    }
  });

  console.log("Seeded demo user: demo@rakshita.local / DemoPass123!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
