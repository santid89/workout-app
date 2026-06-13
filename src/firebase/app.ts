import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  type Auth,
} from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { CONFIGURED, firebaseConfig } from './config';

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

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
