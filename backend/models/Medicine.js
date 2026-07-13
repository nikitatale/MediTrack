import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      required: true, 
    },
    frequency: {
      type: String,
      required: true, 
    },
    timings: [
      {
        type: String, 
      },
    ],
    durationDays: {
      type: Number,
      default: 7,
    },
    stockCount: {
      type: Number,
      default: 0,
    },
    refillThreshold: {
      type: Number,
      default: 3, 
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Medicine", medicineSchema);