# Lewis Lawn Care 🌿

Full-stack marketing + booking website for Lewis Lawn Care, built with **Next.js 15** (App Router).

## Features

- **Landing page** — animated hero, service cards, four-step process, testimonials, marquee, CTA bands
- **Instant quote calculator** — lawn size slider + service/frequency picker with live pricing, saved to the backend
- **Online booking** — date picker with live time-slot availability (double-bookings are rejected server-side)
- **Before/after slider** — draggable comparison on the gallery page
- **Contact form** — messages stored and surfaced in the admin dashboard
- **Admin dashboard** (`/admin`) — password-protected view of quotes, bookings, and messages with KPI cards, quoted-pipeline total, and per-lead status tracking
- Custom design system: Fraunces + Karla, grain texture, scroll-reveal animations, fully responsive

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Admin access

Visit `/admin`. Default password is `lewis2026`.
To change it, copy `.env.example` to `.env.local` and set `ADMIN_PASSWORD`.

## Data storage

Leads are stored as JSON under `data/` (git-ignored). No database setup needed.
Swap `lib/db.js` for Postgres/Supabase later without touching the routes' callers.

## Pushing to GitHub

```bash
git remote add origin https://github.com/<your-username>/lewis-lawn-care.git
git push -u origin main
```

## Deploying

Works out of the box on any Node host (`npm run build && npm start`).
On serverless hosts (Vercel), the JSON file store is ephemeral — connect a database for production.

## Replacing placeholder art

Gallery images are stylized SVG scenes (`components/LawnScene.js`). Drop real photos
into `public/` and swap the `<LawnScene />` components for `<Image />` when ready.
