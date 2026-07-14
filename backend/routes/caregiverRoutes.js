


import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  inviteCaregiver,
  getMyCaregivers,
  removeCaregiver,
  getMyPatients,
  getPatientOverview,
} from "../controllers/caregiverController.js";

const router = express.Router();

router.use(protect);

router.post("/invite", inviteCaregiver);
router.get("/my-caregivers", getMyCaregivers);
router.delete("/:linkId", removeCaregiver);
router.get("/my-patients", getMyPatients);
router.get("/patient/:patientId/overview", getPatientOverview);

export default router;