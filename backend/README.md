# MediTrack — Backend

A smart medicine adherence and delivery platform built with the MERN stack. MediTrack helps patients stay consistent with their medication schedule by combining prescription OCR, automated reminders, adherence analytics, auto-reordering, and an AI-powered assistant — with an optional caregiver mode for family members to monitor adherence remotely.

## Why this project

Missing doses and running out of medication are common, preventable problems — especially for elderly or chronically ill patients. MediTrack tackles this end-to-end: scan a prescription, get reminded at the right time, track adherence trends, and never run out of stock, with a trusted family member able to check in remotely.

## Features

- **JWT Authentication** — secure signup/login with hashed passwords
- **Medicine Management** — full CRUD for tracking dosage, frequency, timings, and stock
- **Prescription OCR** — scan a prescription photo (Tesseract.js) and extract text automatically
- **AI-Powered Auto-fill** — LLM (Groq/Llama 3.1) converts messy OCR text into structured medicine entries
- **AI Medicine Info** — ask the LLM for a plain-language summary of any medicine's uses, side effects, and precautions
- **Adherence Tracking** — logs every dose as taken/missed, calculates adherence % and streaks
- **Smart Reminders** — cron jobs check schedules every few minutes and send email reminders
- **Auto-Reorder** — daily cron job detects low stock and automatically creates a refill order
- **Order Management** — place manual orders, track status (placed → packed → out for delivery → delivered)
- **Caregiver Mode** — invite a family member by email; once linked, they get a read-only view of your medicines and adherence stats

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcrypt |
| OCR | Tesseract.js |
| AI | Groq API (Llama 3.1) |
| Scheduling | node-cron |
| Email | Nodemailer |
| File Uploads | Multer |

## Getting Started

```bash
git clone <your-repo-url>
cd meditrack-backend
npm install
cp .env.example .env   # fill in your values
npm run dev
```

### Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string (local or Atlas) |
| `JWT_SECRET` | Any random secret string |
| `EMAIL_USER` / `EMAIL_PASS` | Gmail + App Password (optional — reminders log to console if not set) |
| `LLM_API_KEY` | Groq API key (free, no card required — [console.groq.com/keys](https://console.groq.com/keys)) |

Server runs on `http://localhost:5000`.

## API Overview

| Module | Base Route |
|---|---|
| Auth | `/api/auth` |
| Medicines | `/api/medicines` |
| Prescriptions (OCR) | `/api/prescriptions` |
| Adherence | `/api/adherence` |
| Orders | `/api/orders` |
| AI (medicine info + auto-fill) | `/api/llm` |
| Caregivers | `/api/caregivers` |

Full endpoint documentation is in the code comments above each route handler.

## Architecture Notes

- **OCR runs entirely server-side** via Tesseract.js — no external API dependency for text extraction.
- **Auto-reorder logic** is a pure backend rule (`stockCount <= refillThreshold`) checked daily via cron — no ML involved, just reliable scheduled logic.
- **AI features are isolated to two specific use cases** (medicine info lookup, prescription-to-structured-data parsing) rather than bolted on everywhere, keeping the LLM's role narrow and purposeful.
- **Caregiver access is relationship-based**, not role-based — any user can be a patient, a caregiver, or both, and access is checked per-link on every request.

## Folder Structure

```
meditrack-backend/
├── config/db.js
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/            → cron scheduler, email service
└── server.js
```