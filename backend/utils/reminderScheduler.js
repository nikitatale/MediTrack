const cron = require("node-cron");
const Medicine = require("../models/Medicine");
const AdherenceLog = require("../models/AdherenceLog");
const { checkAndAutoReorder } = require("../controllers/orderController");
const { sendReminderEmail } = require("./emailService");

// Runs every 5 minutes - checks which medicines are due right now
// (in production you'd match current HH:MM against medicine.timings)
const startReminderCron = () => {
  cron.schedule("*/5 * * * *", async () => {
    try {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"

      const medicines = await Medicine.find({ active: true, timings: currentTime }).populate(
        "userId",
        "email name"
      );

      for (const med of medicines) {
        // create a pending adherence log for this dose
        await AdherenceLog.create({
          userId: med.userId._id,
          medicineId: med._id,
          scheduledTime: currentTime,
          status: "pending",
        });

        // send reminder email (non-blocking, ignore failures in dev)
        sendReminderEmail(med.userId.email, med.name, currentTime).catch((err) =>
          console.error("Email send failed:", err.message)
        );
      }
    } catch (error) {
      console.error("Reminder cron failed:", error.message);
    }
  });

  // Runs once every day at midnight - checks stock levels and auto-reorders
  cron.schedule("0 0 * * *", async () => {
    console.log("Running daily auto-reorder check...");
    await checkAndAutoReorder();
  });

  console.log("Reminder & auto-reorder cron jobs started.");
};

module.exports = startReminderCron;
