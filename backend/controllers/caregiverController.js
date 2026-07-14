import CaregiverLink from "../models/CaregiverLink.js";
import User from "../models/User.js";
import Medicine from "../models/Medicine.js";
import AdherenceLog from "../models/AdherenceLog.js";

const inviteCaregiver = async (req, res) => {
  try {
    const { caregiverEmail } = req.body;

    if (!caregiverEmail) {
      return res.status(400).json({ message: "caregiverEmail is required" });
    }

    if (caregiverEmail.toLowerCase() === req.user.email?.toLowerCase()) {
      return res.status(400).json({ message: "You can't invite yourself" });
    }

    const existing = await CaregiverLink.findOne({
      patientId: req.user.id,
      caregiverEmail: caregiverEmail.toLowerCase(),
    });

    if (existing) {
      return res.status(400).json({ message: "This person is already invited" });
    }

    const caregiverUser = await User.findOne({
      email: caregiverEmail.toLowerCase(),
    });

    const link = await CaregiverLink.create({
      patientId: req.user.id,
      caregiverEmail: caregiverEmail.toLowerCase(),
      caregiverId: caregiverUser ? caregiverUser._id : null,
      status: caregiverUser ? "accepted" : "pending",
    });

    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyCaregivers = async (req, res) => {
  try {
    const links = await CaregiverLink.find({
      patientId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeCaregiver = async (req, res) => {
  try {
    const link = await CaregiverLink.findOneAndDelete({
      _id: req.params.linkId,
      patientId: req.user.id,
    });

    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.json({ message: "Caregiver removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyPatients = async (req, res) => {
  try {
    const links = await CaregiverLink.find({
      caregiverId: req.user.id,
      status: "accepted",
    }).populate("patientId", "name email");

    res.json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPatientOverview = async (req, res) => {
  try {
    const link = await CaregiverLink.findOne({
      patientId: req.params.patientId,
      caregiverId: req.user.id,
      status: "accepted",
    });

    if (!link) {
      return res
        .status(403)
        .json({ message: "You don't have access to this patient's data" });
    }

    const patient = await User.findById(req.params.patientId).select(
      "name email"
    );

    const medicines = await Medicine.find({
      userId: req.params.patientId,
      active: true,
    });

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const logs = await AdherenceLog.find({
      userId: req.params.patientId,
      date: { $gte: thirtyDaysAgo },
    }).sort({ date: -1 });

    const total = logs.length;
    const taken = logs.filter((log) => log.status === "taken").length;

    const adherencePercent =
      total === 0 ? 0 : Math.round((taken / total) * 100);

    res.json({
      patient,
      medicines,
      adherencePercent,
      totalLogs: total,
      takenCount: taken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  inviteCaregiver,
  getMyCaregivers,
  removeCaregiver,
  getMyPatients,
  getPatientOverview,
};