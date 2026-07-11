const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const {
  uploadPrescription,
  getPrescriptions,
  reviewPrescription,
} = require("../controllers/prescriptionController");

router.use(protect);

router.post("/upload", upload.single("image"), uploadPrescription);
router.get("/", getPrescriptions);
router.put("/:id/review", reviewPrescription);

module.exports = router;
