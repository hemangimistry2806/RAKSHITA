const { z } = require("zod");

const idParam = z.object({ id: z.string().min(1) });

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email().toLowerCase(),
    password: z.string().min(8),
    phone: z.string().min(7),
    dateOfBirth: z.string().datetime().optional()
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email().toLowerCase(),
    password: z.string().min(1)
  })
});

const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    phone: z.string().min(7).optional(),
    dateOfBirth: z.string().datetime().nullable().optional()
  })
});

const contactSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    phone: z.string().min(7),
    relationship: z.string().min(2),
    priority: z.number().int().min(1).max(10).default(1)
  })
});

const updateContactSchema = z.object({
  params: idParam,
  body: contactSchema.shape.body.partial()
});

const healthReadingSchema = z.object({
  body: z.object({
    heartRate: z.number().int().min(20).max(240).optional(),
    spo2: z.number().int().min(50).max(100).optional(),
    steps: z.number().int().min(0).optional(),
    recordedAt: z.string().datetime().optional()
  }).refine((value) => value.heartRate !== undefined || value.spo2 !== undefined || value.steps !== undefined, {
    message: "At least one health signal is required"
  })
});

const locationSchema = z.object({
  body: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    accuracy: z.number().min(0).optional(),
    recordedAt: z.string().datetime().optional()
  })
});

const deviceSchema = z.object({
  body: z.object({
    deviceName: z.string().min(2),
    deviceIdentifier: z.string().min(3),
    batteryLevel: z.number().int().min(0).max(100),
    connectionStatus: z.enum(["CONNECTED", "DISCONNECTED", "UNKNOWN"]).default("UNKNOWN"),
    lastSeenAt: z.string().datetime().optional()
  })
});

const updateDeviceSchema = z.object({
  params: idParam,
  body: deviceSchema.shape.body.partial()
});

const emergencySimulateSchema = z.object({
  body: z.object({
    type: z.enum(["ACCIDENT", "LOW_SPO2", "ABNORMAL_HEART_RATE", "COMBINED_EMERGENCY"]),
    impactDetected: z.boolean().optional(),
    userResponded: z.boolean().optional(),
    triggerReason: z.string().optional()
  })
});

const idParamSchema = z.object({ params: idParam });

module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema,
  contactSchema,
  updateContactSchema,
  healthReadingSchema,
  locationSchema,
  deviceSchema,
  updateDeviceSchema,
  emergencySimulateSchema,
  idParamSchema
};
