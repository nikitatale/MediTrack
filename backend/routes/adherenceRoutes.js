import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  markDose,
  getAdherenceStats,
} from "../controllers/adherenceController.js";

const router = express.Router();

router.use(protect);

router.post("/mark", markDose);
router.get("/stats", getAdherenceStats);

export default router;