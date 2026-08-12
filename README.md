# PravasX MVP

A human-facing MVP for PravasX: **travel + local guide in one trip**.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL.

## What works now

- Responsive landing page and About page
- Destination, package and FAQ sections
- Trip request form
- Destination / pickup / date / time / duration / traveller selection
- Local browser storage of the latest trip requests
- Request reference generation
- One-click WhatsApp handoff to the supplied PravasX number
- Mobile navigation
- Accessible labels, focus states and reduced-motion support

## MVP boundary

This is deliberately not pretending to be a full booking engine. It does not take payment or promise live availability. The trip request is captured in the browser and handed to the PravasX team on WhatsApp.

For production, replace `src/lib/booking.ts` localStorage with a backend/database and connect availability/pricing.


## PravasX internship demo

This MVP now demonstrates the core product thesis: **travel + local guide, matched around the traveller**.

### Demo flow
1. Open `/` and use **Build my trip**.
2. Fill destination, interests, budget, language and pace.
3. Click **Find my local** to see a personalized guide match and itinerary preview.
4. Use **Confirm on WhatsApp** to send the complete trip brief.
5. Open `/admin` for the operations dashboard. You will be sent to the protected admin login first; after signing in, the dashboard includes seeded demo requests and status management.

### Important MVP note
The demo intentionally uses browser `localStorage` rather than a backend so it is fully runnable for an internship evaluation. The architecture keeps the booking logic isolated in `src/lib/booking.ts`, making a production database/API the next implementation step.


## Admin authentication

The `/admin` dashboard is protected by a server-issued HTTP-only session cookie. The admin username, password, and session signing secret are read on the server from environment variables.

For local development, the project has demo-only defaults:

- Username: `admin`
- Password: `PravasX@2026!`

For deployment, create a `.env` file from `.env.example` and set your own values. Never commit the real `.env` file.

The browser-only trip request storage is intentionally retained for this internship MVP, so the dashboard remains easy to evaluate without a database. The authentication layer protects access to the admin route; moving trip data to a server/database is the next production hardening step.
