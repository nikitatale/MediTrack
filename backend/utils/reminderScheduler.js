import cron from "node-cron";
import Medicine from "../models/Medicine.js";
import AdherenceLog from "../models/AdherenceLog.js";
import { checkAndAutoReorder } from "../controllers/orderController.js";
import { sendReminderEmail } from "./emailService.js";

const startReminderCron = () => {
  cron.schedule("*/5 * * * *", async () => {
    try {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);

      const medicines = await Medicine.find({
        active: true,
        timings: currentTime,
      }).populate("userId", "email name");

      for (const med of medicines) {
        await AdherenceLog.create({
          userId: med.userId._id,
          medicineId: med._id,
          scheduledTime: currentTime,
          status: "pending",
        });

        sendReminderEmail(
          med.userId.email,
          med.name,
          currentTime
        ).catch((err) =>
          console.error("Email failed:", err.message)
        );
      }
    } catch (error) {
      console.error("Reminder cron failed:", error.message);
    }
  });

  cron.schedule("0 0 * * *", async () => {
    console.log("Running daily auto-reorder check...");
    await checkAndAutoReorder();
  });

  console.log("Reminder & auto-reorder cron jobs started.");
};

export default startReminderCron;