const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const startReminderCron = require("./utils/reminderScheduler");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/medicines", require("./routes/medicineRoutes"));
app.use("/api/adherence", require("./routes/adherenceRoutes"));
app.use("/api/prescriptions", require("./routes/prescriptionRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/llm", require("./routes/llmRoutes"));

app.get("/", (req, res) => {
  res.send("MediTrack API is running...");
});

// Start cron jobs (reminders + auto-reorder)
startReminderCron();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
