


import api from "./axios.js";

export const inviteCaregiver = async (caregiverEmail) => {
  const { data } = await api.post("/caregivers/invite", { caregiverEmail });
  return data;
};

export const getMyCaregivers = async () => {
  const { data } = await api.get("/caregivers/my-caregivers");
  return data;
};

export const removeCaregiver = async (linkId) => {
  const { data } = await api.delete(`/caregivers/${linkId}`);
  return data;
};

export const getMyPatients = async () => {
  const { data } = await api.get("/caregivers/my-patients");
  return data;
};

export const getPatientOverview = async (patientId) => {
  const { data } = await api.get(`/caregivers/patient/${patientId}/overview`);
  return data;
};