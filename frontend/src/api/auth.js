import client from "./client";

export const authApi = {
  login: (credentials) => client.post("/auth/login", credentials),
  register: (payload) => client.post("/auth/register", payload),
  me: () => client.get("/auth/me")
};

export const userApi = {
  me: () => client.get("/users/me"),
  update: (payload) => client.patch("/users/me", payload)
};
