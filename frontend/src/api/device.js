import client from "./client";

export const deviceApi = {
  list: () => client.get("/devices"),
  create: (payload) => client.post("/devices", payload),
  update: (id, payload) => client.patch(`/devices/${id}`, payload)
};
