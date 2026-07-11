const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: { type: String, required: true },
    extractedText: { type: String },
    status: { type: String, enum: ["processing", "reviewed"], default: "processing" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);
