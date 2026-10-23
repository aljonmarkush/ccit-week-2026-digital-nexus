# CCIT WEEK 2026 — Digital Nexus

A modular Next.js + TypeScript website starter for CCIT Week 2026. Uses the official black, violet, lime, and white UI palette and includes editable image/logo slots.

## Run locally

Requirements: Node.js 18.17+ (Node 20 LTS recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

For a production build:

```bash
npm run typecheck
npm run build
npm start
```

## Replace the logo and image placeholders

- Main CCIT logo: `public/images/ccit-logo.png`
- Main organizer logo placeholder: `public/images/partners/aws-learning-club-elev8-logo.svg`
- The Visuals logo placeholder: `public/images/partners/the-visuals-logo.svg`
- Bytes Society logo placeholder: `public/images/partners/bytes-society-logo.svg`
- Homepage gallery placeholders: `public/images/gallery/`

Replace these files with official approved artwork/photos, preferably retaining filenames. Otherwise update the corresponding image paths in `src/app/page.tsx`. Do not distort logos; use approved image assets and descriptive alt text. See README files inside the partners and gallery folders.

## Live group points

Visit `/admin/scores` to add a daily score entry by group, date, activity, points, notes, and recorder. The public `/leaderboard` calculates totals from these entries and listens for score changes. The current starter uses browser localStorage, so updates sync between tabs in the same browser profile only. This is useful for preview/testing, but it is **not true multi-user live syncing** and the admin page is not authenticated.

Before public/official use, connect Supabase or another backend:

1. Create `group_score_updates` table with id, group_id, points, activity, note, event_date, updated_by, created_at.
2. Add Row Level Security policies: only authenticated authorized organizers may insert/update/delete; public may read only approved/published entries.
3. Protect admin routes and every server action/API endpoint with server-side role checks.
4. Subscribe the public leaderboard to Supabase Realtime changes and fetch totals from the database.
5. Record an audit log and require approval or verification for official score changes.
6. Never put service-role keys in client code. Store credentials in environment variables and use `.env.example` with placeholder names only.

The browser-local prototype is deliberately labeled so it is not mistaken for production-grade multi-device synchronization.

## Scoring policy

Daily points should be awarded using pre-approved, transparent, consistently applied criteria. Confirm whether daily activity points are separate from competition placement points, how participation is counted, and who can approve adjustments before the event. Do not publish unverified winners or scores.

## Project structure

- `src/app/` — public pages and admin pages
- `src/components/` — reusable UI and feature components
- `src/data/` — event, group, and schedule content
- `src/lib/` — scoring helpers and live-score prototype
- `public/images/` — logo, partner logo slots, and photo placeholders

## Status

The source includes frontend pages, reusable components, image/logo placeholders, animated UI, and a local-browser live score prototype. A production database, real-time multi-device sync, admin authentication, and production security policies still need to be configured and tested before launch.
