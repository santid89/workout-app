# Training Program — Firebase Hosting

A single-page weekly training routine (strength + cycling + nutrition),
served as a static site on Firebase Hosting.

```
.
├── public/
│   └── index.html              # The site (everything is self-contained here)
├── firebase.json               # Hosting config
├── .firebaserc                 # Firebase project alias  ← set your project ID
└── .github/workflows/
    └── firebase-hosting.yml     # Auto-deploy on push
```

## Going live — one-time setup

Creating the Firebase project and granting deploy access both require your
own Google account, so these steps are yours to do once. After that, every
push deploys automatically.

### 1. Create the Firebase project (≈2 min, free)

1. Go to <https://console.firebase.google.com> and click **Add project**.
2. Name it (e.g. `workout-app`), finish the wizard. Note the **Project ID**
   it generates (e.g. `workout-app-1a2b3`).
3. In the left nav, open **Build → Hosting** and click **Get started**
   (you can ignore the CLI instructions it shows — CI handles deploys).

### 2. Project ID — already wired

The project ID `workouts-app-bd756` is already set in
[`.firebaserc`](.firebaserc) and in the deploy
[workflow](.github/workflows/firebase-hosting.yml), so there's nothing to
change here. (If you ever rename the project, update it in both files.)

### 3. Add the deploy secret

The GitHub Action authenticates with a Firebase service account.

- **Easiest:** install the CLI locally once and let it set up CI for you:
  ```bash
  npm install -g firebase-tools
  firebase login
  firebase init hosting:github     # creates the secret + a workflow
  ```
  This stores a `FIREBASE_SERVICE_ACCOUNT_*` secret in the repo. Either
  point [`firebase-hosting.yml`](.github/workflows/firebase-hosting.yml)
  at that secret name, or rename the secret to `FIREBASE_SERVICE_ACCOUNT`
  to match the workflow as written.

- **Manual:** in the Google Cloud console, create a service account with the
  **Firebase Hosting Admin** role, download a JSON key, and paste its full
  contents into a repo secret named `FIREBASE_SERVICE_ACCOUNT`
  (Settings → Secrets and variables → Actions → *Secrets* tab).

### 4. Deploy

Push to `main` (or the `claude/loving-hypatia-yzfcee` branch) — the
**Deploy to Firebase Hosting** workflow runs and publishes the site to
<https://workouts-app-bd756.web.app>. You can also trigger it manually from
the **Actions** tab.

## Deploying manually instead

If you'd rather skip CI:

```bash
npm install -g firebase-tools
firebase login
firebase use workouts-app-bd756
firebase deploy --only hosting
```

## Editing the site

Everything lives in [`public/index.html`](public/index.html) — markup,
styles, and the day-picker logic are all inline. Edit it, commit, push, and
the deploy runs automatically.

## Google login + workout logging

The site now supports **Google sign-in** and a **workout log** (a "Log" tab in
the day picker) so you can record which session you actually did each day —
the Monday workout doesn't have to be logged on a Monday. Logs are stored
per-user in **Cloud Firestore**, so your history syncs across every device you
sign in on.

The code is already wired up. It just needs your Firebase project connected,
which is a one-time, ~5-minute setup you do in the Firebase console (these
steps need your own Google account, same as the hosting setup above).

### 1. Register a web app & paste the config

1. Firebase console → **⚙ Project settings** → scroll to **Your apps**.
2. If there's no web app yet, click the **`</>`** (web) icon and register one
   (any nickname; you don't need Hosting checked here).
3. Copy the `firebaseConfig` values it shows.
4. Open [`public/index.html`](public/index.html), find the block marked
   **`PASTE YOUR FIREBASE WEB CONFIG`** near the bottom, and fill in
   `apiKey`, `messagingSenderId`, and `appId`. (`projectId`, `authDomain`,
   and `storageBucket` are already filled in for `workouts-app-bd756`.)

   These values are **public and safe to commit** — Firebase protects your
   data with security rules (step 3), not by hiding this config. Until you
   paste them, the app shows a friendly "connect Firebase" notice instead of
   the login/log features.

### 2. Enable Google sign-in

Firebase console → **Build → Authentication → Get started** →
**Sign-in method** tab → enable **Google** → save.

(Your `*.web.app` / `*.firebaseapp.com` domains and `localhost` are authorized
automatically. If you serve the site from a custom domain, add it under
**Authentication → Settings → Authorized domains**.)

### 3. Create Firestore & publish the security rules

1. Firebase console → **Build → Firestore Database → Create database** →
   start in **production mode** → pick a location → enable.
2. Publish the security rules so each user can only read/write their own logs.
   The rules live in [`firestore.rules`](firestore.rules). Either:
   - **Console:** open the **Rules** tab in Firestore, paste the contents of
     `firestore.rules`, and **Publish**; or
   - **CLI:** `firebase deploy --only firestore:rules`

That's it — reload the site, sign in at the **login screen**, and start
logging. The app is gated: the program and log only appear once you're signed
in. Open any workout and tap **Log this workout** (defaults to today,
adjustable), or use the **Log** tab to log a past session and review your
history. Signing out returns you to the login screen.

> **Heads-up on the rules:** the updated [`firestore.rules`](firestore.rules)
> add a `shares/{token}` collection used by the read-only API below. If you
> set up Firestore before that change, re-publish the rules (Console → Rules →
> paste → Publish, or `firebase deploy --only firestore:rules`).

## Reading your data via API (for Claude, scripts, etc.)

Each signed-in user gets a **private, read-only JSON feed** of their workout
log — shown in the **Log** tab under **API access**, with a Copy button.

- The URL is a [Firestore REST](https://firebase.google.com/docs/firestore/use-rest-api)
  document link of the form
  `https://firestore.googleapis.com/v1/projects/workouts-app-bd756/databases/(default)/documents/shares/<token>`.
- `<token>` is an unguessable secret generated for your account (a "capability
  URL"): anyone with the link can **read** the feed, but only you can write to
  it. Treat the link like a password.
- The app keeps it in sync automatically — every time you log or remove a
  workout, the feed updates.

Fetching it returns a Firestore document whose **`json` field is a stringified
array** of your sessions, e.g.:

```json
{ "fields": {
    "count":     { "integerValue": "3" },
    "updatedAt": { "timestampValue": "2026-06-12T21:40:00Z" },
    "json":      { "stringValue": "[{\"date\":\"2026-06-12\",\"workout\":\"Lower Power\",\"key\":\"1\",\"type\":\"Strength\"}]" }
} }
```

So to consume it, fetch the URL and `JSON.parse` the `fields.json.stringValue`.
You can literally paste the copied link into a Claude chat and ask things like
*"here's my workout log API — how many sessions did I do this month, and am I
keeping up with the program?"*

**Rotating / revoking the link:** ask me to "rotate my API link" (I'll
regenerate the token), or in the Firebase console delete your
`shares/<token>` document and the `shareToken` field on your `users/<uid>`
doc — the app will mint a fresh one on next load.
