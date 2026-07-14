

import mongoose from "mongoose";

const caregiverLinkSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caregiverEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    caregiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "accepted"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const CaregiverLink = mongoose.model("CaregiverLink", caregiverLinkSchema);

export default CaregiverLink;