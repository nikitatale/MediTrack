const Tesseract = require("tesseract.js");
const Prescription = require("../models/Prescription");

// @route POST /api/prescriptions/upload
// multipart/form-data with field name "image"
const uploadPrescription = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No image uploaded" });

    const imagePath = req.file.path;

    // Run OCR on uploaded image
    const result = await Tesseract.recognize(imagePath, "eng");
    const extractedText = result.data.text;

    const prescription = await Prescription.create({
      userId: req.user.id,
      imageUrl: imagePath,
      extractedText,
      status: "processing",
    });

    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/prescriptions
const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route PUT /api/prescriptions/:id/review
// User edits/confirms OCR extracted text before it's used to create Medicine entries
const reviewPrescription = async (req, res) => {
  try {
    const { extractedText } = req.body;
    const prescription = await Prescription.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { extractedText, status: "reviewed" },
      { new: true }
    );
    if (!prescription) return res.status(404).json({ message: "Prescription not found" });
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadPrescription, getPrescriptions, reviewPrescription };
