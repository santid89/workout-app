import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  connectAuthEmulator,
  setPersistence,
  browserLocalPersistence,
  type Auth,
} from 'firebase/auth';
import {
  getFirestore,
  connectFirestoreEmulator,
  type Firestore,
} from 'firebase/firestore';
import { CONFIGURED, firebaseConfig } from './config';

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

/**
 * Point the dev server at local Firebase emulators instead of the live project:
 *
 *   firebase emulators:start --only auth,firestore
 *   VITE_USE_EMULATORS=1 npm run dev
 *
 * Lets you exercise sign-in, logging and the security rules without touching
 * real data. Never on in a production build.
 */
const USE_EMULATORS =
  import.meta.env.DEV && import.meta.env.VITE_USE_EMULATORS === '1';

/**
 * Lazily initializes Firebase the first time it's needed. Returns null when the
 * config is missing, so the app can degrade gracefully (the "connect Firebase"
 * notice) instead of crashing.
 */
function ensureApp(): FirebaseApp | null {
  if (!CONFIGURED) return null;
  if (!app) {
    app = initializeApp(firebaseConfig);
    authInstance = getAuth(app);
    dbInstance = getFirestore(app);
    if (USE_EMULATORS) {
      connectAuthEmulator(authInstance, 'http://127.0.0.1:9099', {
        disableWarnings: true,
      });
      connectFirestoreEmulator(dbInstance, '127.0.0.1', 8080);
      console.info('[Workout app] Using local Firebase emulators.');
    }
    setPersistence(authInstance, browserLocalPersistence).catch(() => {});
  }
  return app;
}

export function getAuthOrNull(): Auth | null {
  ensureApp();
  return authInstance;
}

export function getDbOrNull(): Firestore | null {
  ensureApp();
  return dbInstance;
}

/** Best-effort readable label for a Firebase error, for toasts and warnings. */
export function errCode(e: unknown): string {
  const err = e as { code?: string; message?: string };
  return err.code || err.message || 'unknown error';
}
