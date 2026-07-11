const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    dosage: { type: String, required: true }, // e.g. "500mg"
    frequency: { type: String, required: true }, // e.g. "twice a day"
    timings: [{ type: String }], // e.g. ["09:00", "21:00"]
    durationDays: { type: Number, default: 7 },
    stockCount: { type: Number, default: 0 },
    refillThreshold: { type: Number, default: 3 }, // trigger reorder when stock <= this
    startDate: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medicine", medicineSchema);
