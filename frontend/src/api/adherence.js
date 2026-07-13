

import api from "./axios.js";

export const markDose = async ({ medicineId, scheduledTime, status }) => {

  const { data } = await api.post("/adherence/mark", {
    medicineId,
    scheduledTime,
    status,
  });

  return data;
};

export const getAdherenceStats = async () => {
  const { data } = await api.get("/adherence/stats");
  return data;
};