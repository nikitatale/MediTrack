import AdherenceLog from "../models/AdherenceLog.js";

// @route POST /api/adherence/mark
// body: { medicineId, scheduledTime, status }
// status = "taken" | "missed"

export const markDose = async (req, res) => {
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
    res.status(500).json({
      message: error.message,
    });
  }
};

// @route GET /api/adherence/stats
// Returns adherence % for last 30 days + streak

export const getAdherenceStats = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const logs = await AdherenceLog.find({
      userId: req.user.id,
      date: {
        $gte: thirtyDaysAgo,
      },
    }).sort({
      date: -1,
    });

    const total = logs.length;
    const taken = logs.filter((log) => log.status === "taken").length;

    const adherencePercent =
      total === 0
        ? 0
        : Math.round((taken / total) * 100);

    let streak = 0;
    const groupedByDate = {};

    logs.forEach((log) => {
      const dateKey = log.date.toISOString().split("T")[0];

      if (!groupedByDate[dateKey]) {
        groupedByDate[dateKey] = [];
      }

      groupedByDate[dateKey].push(log.status);
    });

    const sortedDates = Object.keys(groupedByDate).sort(
      (a, b) => new Date(b) - new Date(a)
    );

    for (const date of sortedDates) {
      const allTaken = groupedByDate[date].every(
        (status) => status === "taken"
      );

      if (allTaken) {
        streak++;
      } else {
        break;
      }
    }

    res.json({
      adherencePercent,
      totalLogs: total,
      takenCount: taken,
      streak,
      logs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};