import client from "./client";

export const emergencyApi = {
  simulate: (payload) => client.post("/emergency/simulate", payload),
  list: () => client.get("/emergency"),
  get: (id) => client.get(`/emergency/${id}`),
  cancel: (id) => client.post(`/emergency/${id}/cancel`),
  resolve: (id) => client.post(`/emergency/${id}/resolve`),
  escalate: (id) => client.post(`/emergency/${id}/escalate`)
};
