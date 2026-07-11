const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  placeOrder,
  getMyOrders,
  updateOrderStatus,
  getAllOrders,
} = require("../controllers/orderController");

router.use(protect);

router.post("/", placeOrder);
router.get("/", getMyOrders);
router.get("/all", adminOnly, getAllOrders);
router.put("/:id/status", adminOnly, updateOrderStatus);

module.exports = router;
