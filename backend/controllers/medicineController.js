

import Medicine from "../models/Medicine.js";


export const addMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      userId: req.user.id,
      active: true,
    });

    res.json(medicines);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    res.json(medicine);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      {
        active: false,
      },
      {
        new: true,
      }
    );

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    res.json({
      message: "Medicine removed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};