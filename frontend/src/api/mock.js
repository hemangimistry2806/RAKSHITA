// Demo/mock fallback data used only when the backend API is unavailable.
// Structure mirrors the real backend response shapes so real API data can
// replace these without any component changes.

export const mockLatestHealth = {
  reading: {
    id: "mock-hr-1",
    userId: "mock-user",
    heartRate: 72,
    spo2: 98,
    steps: 4821,
    recordedAt: new Date().toISOString()
  }
};

export const mockHealthReadings = {
  readings: Array.from({ length: 24 }, (_, i) => {
    const base = Date.now() - (23 - i) * 60 * 60 * 1000;
    return {
      id: `mock-hm-${i}`,
      heartRate: 68 + Math.round(Math.sin(i / 2) * 8 + Math.random() * 4),
      spo2: 96 + Math.round(Math.random() * 3),
      steps: i * 210 + Math.round(Math.random() * 120),
      recordedAt: new Date(base).toISOString()
    };
  })
};

export const mockLocation = {
  location: {
    id: "mock-loc-1",
    latitude: 23.0225,
    longitude: 72.5714,
    accuracy: 12.5,
    recordedAt: new Date().toISOString()
  }
};

export const mockDevice = {
  devices: [
    {
      id: "mock-dev-1",
      deviceName: "RAKSHITA Band",
      deviceIdentifier: "RAKSHITA-DEMO-001",
      batteryLevel: 87,
      connectionStatus: "CONNECTED",
      lastSeenAt: new Date().toISOString()
    }
  ]
};

export const mockEmergencyEvents = {
  events: [
    {
      id: "mock-ev-2",
      type: "ACCIDENT",
      severity: "HIGH",
      status: "RESOLVED",
      triggerReason: "impact signal detected",
      heartRate: 52,
      spo2: 89,
      latitude: 23.0225,
      longitude: 72.5714,
      detectedAt: new Date(Date.now() - 86400000).toISOString(),
      resolvedAt: new Date(Date.now() - 86000000).toISOString()
    },
    {
      id: "mock-ev-1",
      type: "ABNORMAL_HEART_RATE",
      severity: "MEDIUM",
      status: "CANCELLED",
      triggerReason: "prototype heart-rate threshold signal",
      heartRate: 138,
      spo2: 90,
      latitude: null,
      longitude: null,
      detectedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
      resolvedAt: new Date(Date.now() - 3 * 86400000).toISOString()
    }
  ]
};

export const mockContacts = {
  contacts: [
    {
      id: "mock-c-1",
      name: "Mom",
      phone: "+91 XXXXX XXXXX",
      relationship: "Parent",
      priority: 1
    },
    {
      id: "mock-c-2",
      name: "Raj",
      phone: "+91 XXXXX XXXXX",
      relationship: "Friend",
      priority: 2
    }
  ]
};

export const mockUser = {
  user: {
    id: "mock-user",
    name: "Hemangi",
    email: "demo@rakshita.local",
    phone: "+919999999999"
  }
};
