


import api from "./axios.js";

export const getMedicineInfo = async (medicineName) => {
    
  const { data } = await api.post("/llm/medicine-info", { medicineName });
  return data;
};


export const parsePrescription = async (extractedText) => {
  const { data } = await api.post("/llm/parse-prescription", { extractedText });
  return data;
};