# MediTrack Backend

Smart Medicine Adherence & Delivery App — MERN stack backend.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your values:
   ```
   cp .env.example .env
   ```
   - `MONGO_URI` — local MongoDB or MongoDB Atlas connection string
   - `JWT_SECRET` — any random string
   - `EMAIL_USER` / `EMAIL_PASS` — Gmail + App Password (optional, reminders will just log to console if skipped)
   - `LLM_API_KEY` — OpenAI API key (optional, only needed for the "medicine info" feature)

3. Run in dev mode:
   ```
   npm run dev
   ```

Server starts on `http://localhost:5000`.

## API Endpoints

### Auth
| Method | Route | Body | Auth |
|---|---|---|---|
| POST | /api/auth/signup | name, email, password, address, phone | No |
| POST | /api/auth/login | email, password | No |

### Medicines
| Method | Route | Body | Auth |
|---|---|---|---|
| POST | /api/medicines | name, dosage, frequency, timings[], durationDays, stockCount, refillThreshold | Yes |
| GET | /api/medicines | - | Yes |
| PUT | /api/medicines/:id | any field to update | Yes |
| DELETE | /api/medicines/:id | - | Yes |

### Prescriptions (OCR)
| Method | Route | Body | Auth |
|---|---|---|---|
| POST | /api/prescriptions/upload | form-data: image (file) | Yes |
| GET | /api/prescriptions | - | Yes |
| PUT | /api/prescriptions/:id/review | extractedText (edited) | Yes |

### Adherence
| Method | Route | Body | Auth |
|---|---|---|---|
| POST | /api/adherence/mark | medicineId, scheduledTime, status | Yes |
| GET | /api/adherence/stats | - | Yes |

### Orders
| Method | Route | Body | Auth |
|---|---|---|---|
| POST | /api/orders | medicines[], deliveryAddress | Yes |
| GET | /api/orders | - | Yes |
| GET | /api/orders/all | - | Admin |
| PUT | /api/orders/:id/status | status | Admin |

### AI Medicine Info
| Method | Route | Body | Auth |
|---|---|---|---|
| POST | /api/llm/medicine-info | medicineName | Yes |

## How Auth Works
Every protected route needs this header:
```
Authorization: Bearer <token>
```
The token is returned from `/api/auth/signup` or `/api/auth/login`.

## Notes on the "AI" Features
- **OCR**: uses Tesseract.js, runs locally, no external API/key needed.
- **Auto-reorder**: pure backend logic (cron job checks `stockCount <= refillThreshold` daily at midnight).
- **Reminders**: node-cron checks every 5 minutes for medicines scheduled at the current time, logs an adherence entry, and sends an email (if configured).
- **Medicine info**: single fetch call to OpenAI's chat completions endpoint — no ML training involved.

## Folder Structure
```
meditrack-backend/
├── config/db.js
├── controllers/       → business logic
├── middleware/         → auth guard, file upload
├── models/              → Mongoose schemas
├── routes/               → Express routers
├── utils/                → cron scheduler, email service
├── uploads/            → prescription images (gitignored)
└── server.js
```

## Next Steps (Frontend - React)
Suggested pages to build:
1. Login/Signup
2. Dashboard (today's schedule)
3. Add/View Medicines
4. Upload Prescription (camera/file input → calls /api/prescriptions/upload)
5. Adherence Analytics (use Recharts to plot `adherencePercent` over time)
6. Cart/Orders page
7. Admin panel (order management)
