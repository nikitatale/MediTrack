import mongoose from "mongoose";

const adherenceLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    scheduledTime: {
      type: String, // e.g. "09:00"
    },
    status: {
      type: String,
      enum: ["taken", "missed", "pending"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AdherenceLog", adherenceLogSchema);