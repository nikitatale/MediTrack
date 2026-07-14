


import api from "./axios.js";

export const placeOrder = async ({ medicines, deliveryAddress }) => {
  const { data } = await api.post("/orders", { medicines, deliveryAddress });
  return data;
};

export const getMyOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};