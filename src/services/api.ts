import axios from "axios";

const API_URL = "https://api-dev.quicklyinc.com";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const fetchUser = async (token: string) => {
  const response = await api.get("/auth/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
