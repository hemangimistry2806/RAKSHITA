import client from "./client";

export const locationApi = {
  latest: () => client.get("/location/latest"),
  history: (params) => client.get("/location/history", { params }),
  create: (payload) => client.post("/location", payload)
};
