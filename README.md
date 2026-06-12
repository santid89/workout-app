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
