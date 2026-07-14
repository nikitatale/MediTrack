

import api from "./axios.js";

export const getMedicines = async () => {
  const { data } = await api.get("/medicines");
  return data;
};

export const addMedicine = async (medicineData) => {
  const { data } = await api.post("/medicines", medicineData);
  return data;
};

export const updateMedicine = async (id, medicineData) => {
  const { data } = await api.put(`/medicines/${id}`, medicineData);
  return data;
};

export const deleteMedicine = async (id) => {
  const { data } = await api.delete(`/medicines/${id}`);
  return data;
};


export const addMultipleMedicines = async (medicinesArray) => {
  const results = await Promise.all(medicinesArray.map((med) => addMedicine(med)));
  return results;
};