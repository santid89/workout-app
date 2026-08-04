# Training Program — Vite + React + TypeScript

A single-page weekly training routine (strength + cycling + nutrition) with
Google sign-in, a per-user workout log and an injection tracker, deployed as a
static site on Firebase Hosting.

This app was originally a single self-contained `public/index.html`. It's now a
modern Vite + React + TypeScript app: the workout program lives as typed data,
the UI is componentized, and Firebase is wired through a typed module layer —
while keeping the same look, the same Firebase backend, and push-to-deploy.

```
.
├── index.html                  # Vite entry
├── public/                     # icons, PWA manifest, service worker
├── src/
│   ├── main.tsx · App.tsx       # entry + app shell
│   ├── components/              # Header, WorkoutDay, LogModal, InjectionModal, …
│   ├── data/                    # program.ts (the workouts), placements.ts, reference.tsx, theme.ts
│   ├── firebase/                # config, app init, auth, logs, injections
│   ├── hooks/                   # useAuth, useLogSync, useHealthSync
│   ├── store/                   # Zustand stores (app + toasts)
│   ├── lib/                     # date helpers, icons, actions, pwa
│   └── styles/                  # tokens.css + global.css (the design system)
├── .env                        # public Firebase web config (safe to commit)
├── firebase.json               # Hosting config (serves dist/) + rules target
├── firestore.rules             # Security rules
└── .github/workflows/
    └── firebase-hosting.yml     # Build + auto-deploy + publish rules on push
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

### Running against local emulators

To exercise sign-in, logging and the security rules without touching real data:

```bash
firebase emulators:start --only auth,firestore   # ports 9099 / 8080
VITE_USE_EMULATORS=1 npm run dev
```

The flag is honoured in dev builds only (see
[`src/firebase/app.ts`](src/firebase/app.ts)); production always talks to the
live project. The auth emulator's sign-in page lets you mint a throwaway Google
account with one click.

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
npm run build`, publishes `dist/` to <https://workouts-app-bd756.web.app>, and
then publishes [`firestore.rules`](firestore.rules). You can also trigger it
manually from the **Actions** tab, or deploy by hand:

```bash
npm run build
firebase deploy --only hosting,firestore:rules
```

The rules ship from the repo on purpose: they're the only thing keeping your
private data private, and a file that's only ever pasted into the console
silently drifts from what's actually enforced. The rules step runs *after*
hosting so a permissions gap can't block the site from going live.

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
4. **Rules-deploy permission:** that service account is created for Hosting, so
   it can't publish security rules until you grant it **Firebase Rules Admin**
   (`roles/firebaserules.admin`) — Google Cloud console → IAM & Admin → IAM →
   find the `github-action-*@…iam.gserviceaccount.com` principal → Edit → Add
   role. Without it the "Deploy Firestore rules" step fails (loudly, on purpose)
   while the hosting deploy still succeeds.
5. **Backups (recommended):** Firestore console → **Backups**. Turn on
   **point-in-time recovery** and add a scheduled backup. Nothing in this repo
   can do it for you — it's a project-level setting — and it's the difference
   between "I deleted a year of health records" being an inconvenience and being
   permanent. Check the console for what your billing plan allows. The in-app
   **Download my data** button (Health tab) is the free, always-available
   complement: a full JSON dump you keep yourself.

## Google login + workout logging

The app supports **Google sign-in** and a **workout log** (the "Log" tab) so you
can record which session you actually did each day — the Monday workout doesn't
have to be logged on a Monday. Logs are stored per-user in **Cloud Firestore**,
so your history syncs across every device you sign in on. The app is gated: the
program and log only appear once you're signed in.

## Injection tracker (the "Health" tab)

Logs a rotating-site injection schedule — what went where, when, and at what
dose. It replaces keeping the same list in a notes app, and adds the two things
a flat list can't give you: which site is up next, and whether you're due.

- **Rotation.** Sites cycle in order. "Next" is simply one past whatever you
  logged last, so a skipped or out-of-order dose self-corrects instead of
  throwing the cycle off. The logic lives in
  [`src/data/placements.ts`](src/data/placements.ts) and mirrors the lift
  rotation in [`src/data/rotation.ts`](src/data/rotation.ts).
- **Managing sites.** Add, rename, and reorder from **Manage placements &
  schedule**. Sites are **retired, never deleted** — a retired site drops out of
  the rotation but every dose logged against it stays readable.
- **History never rewrites itself.** Each injection stores the site's label *as
  it was at the time* (`placementLabel`), so renaming "Left thigh" to "Left quad"
  changes what's next, not what happened.
- **Cadence.** Defaults to every 7 days; change it in the same sheet. The banner
  reads "Due in N days" / "Due today" / "Overdue by N days".

### Data model

Everything is private to your account, under the same owner-only tree as your
workouts:

```
users/{uid}                      cadenceDays, shareToken
users/{uid}/logs/{id}            workout history
users/{uid}/placements/{id}      label, order, active
users/{uid}/injections/{id}      date, placementId, placementLabel, doseMg?, note?
```

Writes to `placements` and `injections` are **validated by security rule**, not
just by the UI: malformed dates, non-positive or absurd doses, and oversized
notes are rejected at the database. The user tree is deny-by-default — a new
subcollection needs its own block in [`firestore.rules`](firestore.rules) before
anything can be written to it.

### Injection data is not in the API link

The read-only JSON feed described below carries **training data only**. Health
records are never written to `shares/{token}` and no rule would allow it — that
document is readable by anyone who ever sees the link, and a leaked capability
URL can't be un-published. To get injection data out of the app, use **Download
my data** on the Health tab, which builds the file in your browser and uploads
nothing.

## Installing to your phone

The app ships a web manifest and a service worker, so iOS Safari's **Share → Add
to Home Screen** installs it as a standalone app (no browser chrome, own icon).
The worker in [`public/sw.js`](public/sw.js) deliberately caches **nothing** —
Hosting already serves `index.html` with `no-cache` and fingerprints assets, so a
caching worker would only serve stale HTML after a deploy. It exists to make the
app installable, and to give push notifications somewhere to land if they're
added later (a `push` handler in that file plus a scheduled sender — no app
restructuring).

The `icon-192.png` / `icon-512.png` in `public/` are rasterized from
`public/favicon.svg`; regenerate them with any SVG rasterizer if the mark
changes.

## Reading your data via API (for Claude, scripts, etc.)

Each signed-in user gets a **private, read-only JSON feed** of their workout log
— shown in the **Log** tab under **API access**, with a Copy button. Training
data only; injection records are excluded by design (see above).

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
