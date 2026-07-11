# MediTrack Frontend — Home Page

A single animated, responsive Home page for MediTrack, built with React + Vite + Tailwind CSS.

## Design
- **Palette**: deep indigo-violet background (`#150C2E`) with a two-tone capsule accent — coral (`#FF6F4F`) and mint (`#6EE7B7`). Chosen to echo an actual pill capsule's split color, not a generic medical blue.
- **Type**: Space Grotesk (display/headings), Inter (body), JetBrains Mono (timestamps, labels).
- **Signature element**: an animated heartbeat/pulse line in the hero that doubles as a dose-schedule timeline (8 AM / 2 PM / 8 PM / 10 PM) — fusing "vitals" with "adherence."
- Custom logo: a two-tone capsule mark with a pulse line running through it (`src/components/Logo.jsx`, pure SVG, no image file needed).

## Setup

```bash
cd meditrack-frontend
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Structure
```
meditrack-frontend/
├── index.html
├── tailwind.config.js       → custom colors, fonts, keyframe animations
├── postcss.config.js
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx               → renders Home
│   ├── index.css             → tailwind directives + reduced-motion support
│   ├── components/
│   │   └── Logo.jsx          → SVG capsule logo
│   └── pages/
│       └── Home.jsx          → the full home page
```

## Notes
- Only this Home page is built, as requested — other pages (login, dashboard, etc.) aren't included yet.
- Fully responsive: stacks to a single column below `lg`, nav collapses to just the CTA button below `md`.
- Respects `prefers-reduced-motion` — animations are disabled for users who need that.
- No extra icon library used — all icons are hand-drawn inline SVGs to keep the visual language consistent with the logo.
