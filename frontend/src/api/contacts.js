import client from "./client";

export const contactsApi = {
  list: () => client.get("/contacts"),
  create: (payload) => client.post("/contacts", payload),
  update: (id, payload) => client.patch(`/contacts/${id}`, payload),
  remove: (id) => client.delete(`/contacts/${id}`)
};
