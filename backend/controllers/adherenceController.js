const AdherenceLog = require("../models/AdherenceLog");

// @route POST /api/adherence/mark
// body: { medicineId, scheduledTime, status } status = "taken" | "missed"
const markDose = async (req, res) => {
  try {
    const { medicineId, scheduledTime, status } = req.body;
    const log = await AdherenceLog.create({
      userId: req.user.id,
      medicineId,
      scheduledTime,
      status,
    });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/adherence/stats
// Returns adherence % for last 30 days + streak
const getAdherenceStats = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const logs = await AdherenceLog.find({
      userId: req.user.id,
      date: { $gte: thirtyDaysAgo },
    }).sort({ date: -1 });

    const total = logs.length;
    const taken = logs.filter((l) => l.status === "taken").length;
    const adherencePercent = total === 0 ? 0 : Math.round((taken / total) * 100);

    // simple streak calculation (consecutive days with all doses taken)
    let streak = 0;
    const groupedByDate = {};
    logs.forEach((log) => {
      const dateKey = log.date.toISOString().split("T")[0];
      if (!groupedByDate[dateKey]) groupedByDate[dateKey] = [];
      groupedByDate[dateKey].push(log.status);
    });

    const sortedDates = Object.keys(groupedByDate).sort((a, b) => new Date(b) - new Date(a));
    for (const date of sortedDates) {
      const allTaken = groupedByDate[date].every((s) => s === "taken");
      if (allTaken) streak++;
      else break;
    }

    res.json({ adherencePercent, totalLogs: total, takenCount: taken, streak, logs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { markDose, getAdherenceStats };
