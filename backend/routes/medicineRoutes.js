import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
} from "../controllers/medicineController.js";

const router = express.Router();

router.use(protect);

router.post("/", addMedicine);
router.get("/", getMedicines);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);

export default router;