import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { getDbOrNull } from './app';
import { PROGRAM_DETAIL } from '@/data/programDetail';
import type { LogEntry } from '@/types';

export interface NewLog {
  date: string;
  workoutKey: string;
  workoutName: string;
  type: string;
  color: string;
}

/**
 * Subscribes to the user's logs (ordered date desc). Calls onData on every
 * snapshot and onError on failure. Returns an unsubscribe fn.
 */
export function subscribeLogs(
  uid: string,
  onData: (logs: LogEntry[]) => void,
  onError: (msg: string) => void
): () => void {
  const db = getDbOrNull();
  if (!db) return () => {};
  const q = query(collection(db, 'users', uid, 'logs'), orderBy('date', 'desc'));
  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as LogEntry));
    },
    (err) => onError('Sync error: ' + errCode(err))
  );
}

export async function addLog(uid: string, log: NewLog): Promise<void> {
  const db = getDbOrNull();
  if (!db) throw new Error('Firebase not configured');
  await addDoc(collection(db, 'users', uid, 'logs'), {
    ...log,
    createdAt: serverTimestamp(),
  });
}

export async function removeLog(uid: string, id: string): Promise<void> {
  const db = getDbOrNull();
  if (!db) throw new Error('Firebase not configured');
  await deleteDoc(doc(db, 'users', uid, 'logs', id));
}

/* ───────── Read-only JSON export (capability link) ─────────
   Mirrors the user's logs to shares/{token}, a doc readable by anyone holding
   the unguessable token but writable only by its owner (see firestore.rules).
   The payload is a plain JSON string so any client — or Claude — can fetch it. */

function randomToken(): string {
  if (crypto.randomUUID) return crypto.randomUUID().replace(/-/g, '');
  const a = new Uint8Array(16);
  crypto.getRandomValues(a);
  return [...a].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Resolves the user's stable share token, minting one on first use. */
export async function ensureShareToken(uid: string): Promise<string | null> {
  const db = getDbOrNull();
  if (!db) return null;
  const userRef = doc(db, 'users', uid);
  try {
    const snap = await getDoc(userRef);
    let token: string | null = snap.exists() ? snap.data().shareToken : null;
    if (!token) {
      token = randomToken();
      await setDoc(userRef, { shareToken: token }, { merge: true });
    }
    return token;
  } catch (e) {
    console.warn('[Workout app] Could not set up API link:', errCode(e));
    return null;
  }
}

/**
 * Writes the current logs to the public read-only export doc. Each session
 * carries its full exercise detail inline (self-contained for any consumer),
 * and the whole program is included once for overall context.
 */
export async function syncShareExport(
  token: string,
  ownerUid: string,
  athlete: string | null,
  logs: LogEntry[]
): Promise<void> {
  const db = getDbOrNull();
  if (!db) return;

  const sessions = logs.map((l) => {
    const d = PROGRAM_DETAIL[l.workoutKey];
    const s: Record<string, unknown> = {
      date: l.date,
      day: l.workoutKey,
      weekday: d?.day ?? null,
      workout: l.workoutName,
      type: l.type,
      focus: d?.focus ?? null,
      summary: d?.summary ?? null,
    };
    if (d?.tags && d.tags.length) s.tags = d.tags;
    if (d?.exercises) s.exercises = d.exercises;
    if (d?.rideOptions) s.rideOptions = d.rideOptions;
    if (d?.recovery) s.recovery = d.recovery;
    return s;
  });

  const payload = {
    athlete,
    generatedAt: new Date().toISOString(),
    count: sessions.length,
    sessions,
    program: PROGRAM_DETAIL, // the full 7-day plan with every exercise, for reference
  };

  try {
    await setDoc(doc(db, 'shares', token), {
      ownerUid,
      count: sessions.length,
      updatedAt: serverTimestamp(),
      json: JSON.stringify(payload),
    });
  } catch (e) {
    console.warn('[Workout app] Could not update API export:', errCode(e));
  }
}

function errCode(e: unknown): string {
  const err = e as { code?: string; message?: string };
  return err.code || err.message || 'unknown error';
}
