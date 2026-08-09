process.env.NODE_ENV = "test";
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";

const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/config/prisma");

const uniqueEmail = () => `test-${Date.now()}-${Math.random().toString(16).slice(2)}@rakshita.local`;

describe("RAKSHITA API", () => {
  let token;
  let emergencyId;

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("registers a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: uniqueEmail(),
        password: "TestPass123!",
        phone: "+911234567890"
      })
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.data.user.passwordHash).toBeUndefined();
    expect(res.body.data.token).toBeTruthy();
    token = res.body.data.token;
  });

  test("logs in a user", async () => {
    const email = uniqueEmail();
    await request(app).post("/api/auth/register").send({
      name: "Login User",
      email,
      password: "TestPass123!",
      phone: "+911234567891"
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, password: "TestPass123!" })
      .expect(200);

    expect(res.body.data.token).toBeTruthy();
  });

  test("rejects protected route without token", async () => {
    const res = await request(app).get("/api/auth/me").expect(401);
    expect(res.body.success).toBe(false);
  });

  test("creates health reading", async () => {
    const res = await request(app)
      .post("/api/health/readings")
      .set("Authorization", `Bearer ${token}`)
      .send({ heartRate: 136, spo2: 90, steps: 50 })
      .expect(201);

    expect(res.body.data.reading.heartRate).toBe(136);
  });

  test("creates location", async () => {
    const res = await request(app)
      .post("/api/location")
      .set("Authorization", `Bearer ${token}`)
      .send({ latitude: 23.0225, longitude: 72.5714, accuracy: 10 })
      .expect(201);

    expect(res.body.data.location.latitude).toBe(23.0225);
  });

  test("simulates emergency", async () => {
    await request(app)
      .post("/api/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Contact One", phone: "+919000000001", relationship: "Friend", priority: 1 })
      .expect(201);

    const res = await request(app)
      .post("/api/emergency/simulate")
      .set("Authorization", `Bearer ${token}`)
      .send({ type: "COMBINED_EMERGENCY", impactDetected: true, userResponded: false })
      .expect(201);

    expect(res.body.data.emergency.status).toBe("PENDING_CONFIRMATION");
    expect(res.body.data.alertsCreated).toBe(1);
    emergencyId = res.body.data.emergency.id;
  });

  test("resolves and cancels emergency events", async () => {
    const resolved = await request(app)
      .post(`/api/emergency/${emergencyId}/resolve`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(resolved.body.data.event.status).toBe("RESOLVED");

    const simulate = await request(app)
      .post("/api/emergency/simulate")
      .set("Authorization", `Bearer ${token}`)
      .send({ type: "ACCIDENT", impactDetected: true, userResponded: false })
      .expect(201);

    const cancelled = await request(app)
      .post(`/api/emergency/${simulate.body.data.emergency.id}/cancel`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(cancelled.body.data.event.status).toBe("CANCELLED");
  });
});
