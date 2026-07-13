

import Tesseract from "tesseract.js";


import Prescription from "../models/Prescription.js";


export const uploadPrescription = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const imagePath = req.file.path;

   
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
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const reviewPrescription = async (req, res) => {
  try {
    const { extractedText } = req.body;

    const prescription = await Prescription.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      {
        extractedText,
        status: "reviewed",
      },
      {
        new: true,
      }
    );

    if (!prescription) {
      return res.status(404).json({
        message: "Prescription not found",
      });
    }

    res.json(prescription);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};