import client from "./client";

export const healthApi = {
  latest: () => client.get("/health/latest"),
  readings: (params) => client.get("/health/readings", { params }),
  create: (payload) => client.post("/health/readings", payload)
};
