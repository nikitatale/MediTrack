const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { markDose, getAdherenceStats } = require("../controllers/adherenceController");

router.use(protect);

router.post("/mark", markDose);
router.get("/stats", getAdherenceStats);

module.exports = router;
