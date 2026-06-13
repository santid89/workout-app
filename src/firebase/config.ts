/**
 * Firebase web config, sourced from Vite env vars (VITE_FIREBASE_*).
 * These values are PUBLIC and safe to commit — Firebase secures data with
 * security rules (firestore.rules), not by hiding this config. The real values
 * live in the committed `.env` so the build works with zero secret setup.
 */
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

/** True when every required config value is present (no placeholder / blank). */
export const CONFIGURED = Object.entries(firebaseConfig)
  .filter(([k]) => k !== 'measurementId') // measurementId is optional
  .every(([, v]) => typeof v === 'string' && v.length > 0 && !v.startsWith('PASTE_'));

export const PROJECT_ID = firebaseConfig.projectId;

/** Firestore REST URL for the read-only capability-link export. */
export const shareUrl = (token: string): string =>
  `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/shares/${token}`;
