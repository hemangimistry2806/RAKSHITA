import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const client = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" }
});

const TOKEN_KEY = "rakshita_token";

// Attach JWT when present
client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralized error extraction
client.interceptors.response.use(
  (res) => res.data,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    const wrapped = new Error(message);
    wrapped.status = status;
    wrapped.isNetwork = !error.response;
    return Promise.reject(wrapped);
  }
);

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY)
};

export default client;
export { API_URL };
