

import api from "./axios.js";

export const uploadPrescription = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const { data } = await api.post("/prescriptions/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const getPrescriptions = async () => {
  const { data } = await api.get("/prescriptions");
  return data;
};

export const reviewPrescription = async (id, extractedText) => {
  const { data } = await api.put(`/prescriptions/${id}/review`, { extractedText });
  return data;
};