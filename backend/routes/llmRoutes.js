const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getMedicineInfo } = require("../controllers/llmController");

router.use(protect);

router.post("/medicine-info", getMedicineInfo);

module.exports = router;
