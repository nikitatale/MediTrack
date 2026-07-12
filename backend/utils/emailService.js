import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendReminderEmail = async (
  toEmail,
  medicineName,
  time
) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log(
      `[Email skipped] Reminder: ${medicineName} at ${time}`
    );
    return;
  }

  await transporter.sendMail({
    from: `"MediTrack" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Time to take your medicine: ${medicineName}`,
    text: `This is a reminder to take ${medicineName} scheduled for ${time}.`,
  });
};