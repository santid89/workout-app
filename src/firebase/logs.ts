import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteField,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { getDbOrNull, errCode } from './app';
import { PROGRAM_DETAIL } from '@/data/programDetail';
import { resolveVariation } from '@/data/rotation';
import type { LogEntry, LogMetrics } from '@/types';

export interface NewLog extends LogMetrics {
  date: string;
  workoutKey: string;
  workoutName: string;
  type: string;
  color: string;
  variation?: string;
  variationTag?: string;
}

/** The optional metric fields, in the order they're written to Firestore. */
const METRIC_KEYS: (keyof LogMetrics)[] = [
  'weight',
  'reps',
  'rpe',
  'unit',
  'durationMin',
  'distanceMiles',
  'note',
];

const KM_TO_MI = 0.621371;

/**
 * One-time migration: rides used to store distance in km (distanceKm). Convert
 * any such logs to miles (distanceMiles) and drop the old field. Idempotent —
 * once a doc has no distanceKm it's skipped, so it converges after one pass.
 */
export async function migrateDistanceToMiles(
  uid: string,
  logs: LogEntry[]
): Promise<void> {
  const db = getDbOrNull();
  if (!db) return;
  const stale = logs.filter((l) => typeof l.distanceKm === 'number');
  await Promise.all(
    stale.map((l) =>
      updateDoc(doc(db, 'users', uid, 'logs', l.id), {
        distanceMiles: Math.round(l.distanceKm! * KM_TO_MI * 10) / 10,
        distanceKm: deleteField(),
      }).catch((e) =>
        console.warn('[Workout app] distance migration:', errCode(e))
      )
    )
  );
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
  const q = query(
    collection(db, 'users', uid, 'logs'),
    orderBy('date', 'desc')
  );
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
  // Firestore rejects undefined fields, so only include variation when set.
  const doc: Record<string, unknown> = {
    date: log.date,
    workoutKey: log.workoutKey,
    workoutName: log.workoutName,
    type: log.type,
    color: log.color,
    createdAt: serverTimestamp(),
  };
  if (log.variation) doc.variation = log.variation;
  if (log.variationTag) doc.variationTag = log.variationTag;
  // Include any optional metrics the user filled in (skip empty/undefined).
  for (const k of METRIC_KEYS) {
    const v = log[k];
    if (v !== undefined && v !== '') doc[k] = v;
  }
  await addDoc(collection(db, 'users', uid, 'logs'), doc);
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
    // A ride can be logged on any day; don't attach the day's strength
    // prescription to it — rides carry only their logged metrics + note.
    const isRide = l.type === 'Ride';
    const s: Record<string, unknown> = {
      date: l.date,
      day: l.workoutKey,
      weekday: d?.day ?? null,
      workout: l.workoutName,
      type: l.type,
      focus: isRide ? null : (d?.focus ?? null),
      summary: isRide ? null : (d?.summary ?? null),
    };
    if (!isRide && d?.tags && d.tags.length) s.tags = d.tags;
    if (!isRide && d?.exercises) {
      // Resolve the umbrella "(rotation)" lift to the single variation done.
      const v = resolveVariation(l.workoutKey, l.date, l.variationTag);
      s.exercises = d.exercises.map((ex) =>
        ex.rotation && v
          ? { name: v.name, sets: ex.sets, note: ex.note, week: v.tag }
          : ex
      );
    }
    if (isRide && d?.rideOptions) s.rideOptions = d.rideOptions;
    if (!isRide && d?.recovery) s.recovery = d.recovery;
    // Carry any logged metrics through to the export (e.g. for Claude).
    const logged: Record<string, unknown> = {};
    for (const k of METRIC_KEYS) {
      const v = l[k];
      if (v !== undefined && v !== '') logged[k] = v;
    }
    if (Object.keys(logged).length) s.logged = logged;
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
