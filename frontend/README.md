# MediTrack — Frontend

React + Tailwind frontend for MediTrack, a medicine adherence and delivery platform. Built with a custom design system (not a template) — animated hero, capsule-inspired branding, and a coral/mint/indigo palette designed around the product's core metaphor: a heartbeat that doubles as a dose-schedule timeline.

## Live Demo
[Add your deployed link here]

## Features

- Animated, fully responsive landing page with a custom SVG capsule logo and mark
- Login/signup connected to a real backend, with JWT persisted across sessions and browser tabs
- Dashboard with today's dose schedule, adherence stats, and one-click "mark taken/missed"
- Medicine management (add, edit, delete) with a live low-stock indicator
- Prescription upload flow: photo → OCR text → editable review → **AI auto-fill** that converts the text into ready-to-save medicine entries
- Adherence analytics with area and pie charts (daily trend, taken vs. missed)
- Orders page for manual refills and order history
- AI-powered "Know more" popup for plain-language medicine info
- **Caregiver mode** — invite a family member; they get a read-only dashboard of your schedule and adherence
- Custom 404 page

## Tech Stack

- React 18 + Vite
- React Router
- Tailwind CSS (custom theme — no default palette)
- Axios
- Recharts

## Getting Started

```bash
git clone <your-repo-url>
cd meditrack-frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`. Requires the [MediTrack backend](<link to backend repo>) running at `http://localhost:5000` (or set `VITE_API_URL` in a `.env` file to point elsewhere).

## Design Notes

- **Palette**: deep indigo-violet (`#150C2E`) background with a coral/mint two-tone accent, echoing the split colors of an actual pill capsule rather than a generic medical blue.
- **Signature element**: an animated pulse line in the hero that doubles as a dose-schedule timeline — tying the app's "vitals" branding directly to its core function.
- **Typography**: Space Grotesk (display), Inter (body), JetBrains Mono (timestamps/labels).
- All icons are hand-drawn inline SVGs — no icon library — to keep a consistent visual language with the logo.
- Respects `prefers-reduced-motion`.

## Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/auth` | Login / signup |
| `/dashboard` | Today's schedule, stats, dose logging |
| `/medicines` | Medicine CRUD |
| `/scan` | Prescription OCR upload + AI auto-fill |
| `/orders` | Place refill orders, view order history |
| `/analytics` | Adherence charts and trends |
| `/caregivers` | Invite/manage caregivers, view linked patients |
| `/caregivers/patient/:id` | Read-only patient view (caregiver side) |
| `*` | 404 |

## Folder Structure

```
meditrack-frontend/
├── src/
│   ├── api/            → axios instance + one file per API resource
│   ├── components/     → Logo, MedicineInfoModal
│   ├── context/         → AuthContext (JWT + cross-tab sync)
│   ├── pages/            → one file per route
│   ├── App.jsx
│   └── main.jsx
```
