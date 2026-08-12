# PravasX MVP — What changed

## Product direction
The website now consistently presents PravasX as a **travel + local guide** service, based on the supplied client clarification:
- customer chooses a place
- customer chooses a time limit
- guide can pick the customer up
- guide can also act as the driver
- guide follows a personalised itinerary

## Working MVP
- Real trip-request form with name, phone, destination, pickup, date, time, duration, travellers and notes.
- Browser-side request storage using localStorage.
- Unique request reference such as `PX-ABC123`.
- One-click WhatsApp handoff containing the complete trip brief.
- Confirmation state with edit flow.
- Date validation prevents selecting a past date.

## Content quality
- Removed invented company-history, employee, rating and operational claims from the customer-facing experience.
- Example packages are explicitly labelled as examples until real pricing/inclusions are supplied.
- Copy is intentionally more specific, restrained and conversational rather than generic marketing language.

## Next production step
Replace localStorage with a real backend/database and add a small admin inbox for trip requests. The current UI and WhatsApp flow can remain unchanged.


## Internship submission upgrade
- Repositioned PravasX around **Travel + Local Guide** rather than generic trip requests.
- Added **PravasX Match™** preference-driven guide matching.
- Added traveller interests, budget, travel style, pace and guide-language inputs.
- Added guide discovery cards with ratings, trips, languages and specialities.
- Added personalized match result and itinerary preview after form submission.
- Added transparent budget-range messaging.
- Added `/admin` operations dashboard with request filters, guide matches, status updates and request detail view.
- Added demo seed data for evaluation.
- Extended localStorage records so the full demo flow works without a backend.


## Admin security patch — August 2026

- Added `/admin/login` with server-side credential verification.
- Added signed, expiring HTTP-only admin session cookie.
- Protected `/admin` with a server-backed route guard.
- Added admin sign-out.
- Removed the public Operations demo link from the footer.
- Added `.env.example` for production credentials and session secret.
- Kept demo booking data in localStorage for evaluation; this is not a substitute for a production database.
