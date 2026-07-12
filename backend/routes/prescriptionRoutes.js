import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import {
  uploadPrescription,
  getPrescriptions,
  reviewPrescription,
} from "../controllers/prescriptionController.js";

const router = express.Router();

router.use(protect);

router.post("/upload", upload.single("image"), uploadPrescription);
router.get("/", getPrescriptions);
router.put("/:id/review", reviewPrescription);

export default router;