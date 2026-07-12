import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMedicineInfo } from "../controllers/llmController.js";

const router = express.Router();

router.use(protect);

router.post("/medicine-info", getMedicineInfo);

export default router;