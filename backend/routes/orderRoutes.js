import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  placeOrder,
  getMyOrders,
  updateOrderStatus,
  getAllOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router.use(protect);

router.post("/", placeOrder);
router.get("/", getMyOrders);
router.get("/all", adminOnly, getAllOrders);
router.put("/:id/status", adminOnly, updateOrderStatus);

export default router;