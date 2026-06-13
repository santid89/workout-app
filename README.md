# Training Program — Vite + React + TypeScript

A single-page weekly training routine (strength + cycling + nutrition) with
Google sign-in and a per-user workout log, deployed as a static site on
Firebase Hosting.

This app was originally a single self-contained `public/index.html`. It's now a
modern Vite + React + TypeScript app: the workout program lives as typed data,
the UI is componentized, and Firebase is wired through a typed module layer —
while keeping the same look, the same Firebase backend, and push-to-deploy.

```
.
├── index.html                  # Vite entry
├── src/
│   ├── main.tsx · App.tsx       # entry + app shell
│   ├── components/              # Header, DayPicker, WorkoutDay, LogModal, …
│   ├── data/                    # program.ts (the workouts), reference.tsx, theme.ts
│   ├── firebase/                # config, app init, auth, logs
│   ├── hooks/                   # useAuth, useLogSync
│   ├── store/                   # Zustand stores (app + toasts)
│   ├── lib/                     # date helpers, icons, actions
│   └── styles/                  # tokens.css + global.css (the design system)
├── .env                        # public Firebase web config (safe to commit)
├── firebase.json               # Hosting config (serves dist/)
├── firestore.rules             # Security rules
└── .github/workflows/
    └── firebase-hosting.yml     # Build + auto-deploy on push
```

## Developing

```bash
npm install      # one-time
npm run dev      # http://localhost:5173 with hot reload
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build locally
npm run lint     # eslint
npm run format   # prettier
```

**Editing the program:** the whole weekly routine is structured data in
[`src/data/program.ts`](src/data/program.ts) (exercises, sets/reps, rotations,
ride blocks). Nutrition and the About page live in
[`src/data/reference.tsx`](src/data/reference.tsx). Edit the data, not markup.

### Firebase config

The Firebase web config is read from `VITE_FIREBASE_*` env vars. The real values
for the `workouts-app-bd756` project are committed in [`.env`](.env) — these
values are **public and safe to commit** (Firebase secures data with
`firestore.rules`, not by hiding the config), so the build works with no extra
setup. To point a local build at a different project, copy
[`.env.example`](.env.example) to `.env.local` and fill it in.

If the config is missing, the app shows a friendly "connect Firebase" notice
instead of the login/log features.

## Deploying

Push to `main` — the **Deploy to Firebase Hosting** workflow runs `npm ci &&
npm run build` and publishes `dist/` to <https://workouts-app-bd756.web.app>.
You can also trigger it manually from the **Actions** tab, or deploy by hand:

```bash
npm run build
firebase deploy --only hosting
```

### One-time Firebase setup

Creating the project, registering the web app, enabling Google sign-in, and
creating Firestore are one-time steps done in the Firebase console with your own
Google account. The summary:

1. **Auth:** Build → Authentication → enable **Google**. Your `*.web.app` /
   `*.firebaseapp.com` domains and `localhost` are authorized automatically; add
   any custom domain (and Hosting **preview-channel** URLs) under Authentication
   → Settings → Authorized domains, or sign-in will fail there.
2. **Firestore:** Build → Firestore Database → Create database (production
   mode). Publish the rules in [`firestore.rules`](firestore.rules) (Console →
   Rules → paste → Publish, or `firebase deploy --only firestore:rules`).
3. **Deploy secret:** the GitHub Action authenticates with a
   `FIREBASE_SERVICE_ACCOUNT` repo secret (a Firebase Hosting Admin
   service-account JSON). The easiest setup is `firebase init hosting:github`
   once, then point the workflow at the secret it creates (or rename it to
   `FIREBASE_SERVICE_ACCOUNT`).

## Google login + workout logging

The app supports **Google sign-in** and a **workout log** (the "Log" tab) so you
can record which session you actually did each day — the Monday workout doesn't
have to be logged on a Monday. Logs are stored per-user in **Cloud Firestore**,
so your history syncs across every device you sign in on. The app is gated: the
program and log only appear once you're signed in.

## Reading your data via API (for Claude, scripts, etc.)

Each signed-in user gets a **private, read-only JSON feed** of their workout log
— shown in the **Log** tab under **API access**, with a Copy button.

- The URL is a [Firestore REST](https://firebase.google.com/docs/firestore/use-rest-api)
  document link of the form
  `https://firestore.googleapis.com/v1/projects/workouts-app-bd756/databases/(default)/documents/shares/<token>`.
- `<token>` is an unguessable secret generated for your account (a "capability
  URL"): anyone with the link can **read** the feed, but only you can write to
  it. Treat the link like a password.
- The app keeps it in sync automatically — every time you log or remove a
  workout, the feed updates.

Fetching it returns a Firestore document whose **`json` field is a stringified
object**. Parsed, it looks like:

```jsonc
{
  "athlete": "Santi",
  "generatedAt": "2026-06-12T21:40:00.000Z",
  "count": 3,
  "sessions": [
    {
      "date": "2026-06-12",
      "day": "1",
      "weekday": "Mon",
      "workout": "Lower Power",
      "type": "Strength",
      "focus": "Strength · Lower",
      "summary": "Heavy compound legs…",
      "tags": ["~45–50 min", "Optional Z2 spin · 20–30 min"],
      "exercises": [
        // rotation lifts resolve to the single variation done that session
        { "name": "Back Squat", "sets": "5 × 5", "note": "Heavy…", "week": "A" }
      ]
    }
  ],
  "program": { "1": { /* full 7-day plan, every exercise, for reference */ } }
}
```

So to consume it, fetch the URL and `JSON.parse` the `fields.json.stringValue`.
Each session carries its full exercise detail inline (ride days use
`rideOptions`, the recovery day uses `recovery`), and the whole `program` is
included once for context. Rotation main lifts (squat / bench / deadlift)
resolve to the single variation done that session (`name` + `week`), while the
top-level `program` map keeps all three variations for reference. The variation
is picked when logging (defaulting to the current 3-week-cycle week). You can paste the copied link into a Claude chat and
ask things like *"here's my workout log API — how many sessions did I do this
month, and am I keeping up with the program?"*

**Rotating / revoking the link:** ask me to "rotate my API link" (I'll
regenerate the token), or in the Firebase console delete your `shares/<token>`
document and the `shareToken` field on your `users/<uid>` doc — the app mints a
fresh one on next load.
