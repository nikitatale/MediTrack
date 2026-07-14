import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMedicineInfo, parsePrescription } from "../controllers/llmController.js";

const router = express.Router();

router.use(protect);

router.post("/medicine-info", getMedicineInfo);

router.post("/parse-prescription", parsePrescription);

export default router;