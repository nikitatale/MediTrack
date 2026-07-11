


import api from "./axios.js";

export const signupRequest = async ({ name, email, password, address, phone }) => {
  const { data } = await api.post("/auth/signup", { name, email, password, address, phone });
  return data;
};

export const loginRequest = async ({ email, password }) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};
