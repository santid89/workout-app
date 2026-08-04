import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  writeBatch,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { getDbOrNull, errCode } from './app';
import { DEFAULT_PLACEMENTS, DEFAULT_CADENCE_DAYS } from '@/data/placements';
import type { Placement, InjectionEntry, InjectionDetail } from '@/types';

/**
 * Health data: the injection-site rotation and the log of shots taken. Both live
 * under the user's private tree (users/{uid}/…), owner-only by security rule.
 *
 * Deliberately NOT mirrored into shares/{token} the way workout logs are — that
 * document is readable by anyone holding the link, and a leaked capability URL
 * can't be un-published. Medication data stays behind auth, full stop.
 */

export interface NewInjection extends InjectionDetail {
  date: string;
  placementId: string;
  placementLabel: string;
}

/* Client-side bounds, mirroring the checks in firestore.rules so a normal
   mistake surfaces as a friendly message instead of a permission error. */
export const MAX_LABEL_LEN = 80;
export const MAX_NOTE_LEN = 500;
export const MAX_DOSE_MG = 100;

/* ───────────────────────── Placements ───────────────────────── */

/**
 * Subscribes to the user's injection sites, in rotation order. `fromCache` tells
 * the caller whether the snapshot is local-only — an empty cached snapshot is
 * not evidence the collection is really empty, so seeding must wait for a
 * server read.
 */
export function subscribePlacements(
  uid: string,
  onData: (placements: Placement[], fromCache: boolean) => void,
  onError: (msg: string) => void
): () => void {
  const db = getDbOrNull();
  if (!db) return () => {};
  const q = query(collection(db, 'users', uid, 'placements'), orderBy('order'));
  return onSnapshot(
    q,
    (snap) => {
      onData(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Placement),
        snap.metadata.fromCache
      );
    },
    (err) => onError('Sync error: ' + errCode(err))
  );
}

/** Writes the starting rotation. Only call once, on a confirmed-empty server read. */
export async function seedDefaultPlacements(uid: string): Promise<void> {
  const db = getDbOrNull();
  if (!db) return;
  const batch = writeBatch(db);
  const col = collection(db, 'users', uid, 'placements');
  DEFAULT_PLACEMENTS.forEach((label, order) => {
    batch.set(doc(col), {
      label,
      order,
      active: true,
      createdAt: serverTimestamp(),
    });
  });
  await batch.commit();
}

export async function addPlacement(
  uid: string,
  label: string,
  order: number
): Promise<void> {
  const db = getDbOrNull();
  if (!db) throw new Error('Firebase not configured');
  await addDoc(collection(db, 'users', uid, 'placements'), {
    label: label.trim().slice(0, MAX_LABEL_LEN),
    order,
    active: true,
    createdAt: serverTimestamp(),
  });
}

export async function renamePlacement(
  uid: string,
  id: string,
  label: string
): Promise<void> {
  const db = getDbOrNull();
  if (!db) throw new Error('Firebase not configured');
  await updateDoc(doc(db, 'users', uid, 'placements', id), {
    label: label.trim().slice(0, MAX_LABEL_LEN),
  });
}

/**
 * Retires or restores a site. Retiring rather than deleting keeps every past
 * injection resolvable — the site simply drops out of the rotation.
 */
export async function setPlacementActive(
  uid: string,
  id: string,
  active: boolean
): Promise<void> {
  const db = getDbOrNull();
  if (!db) throw new Error('Firebase not configured');
  await updateDoc(doc(db, 'users', uid, 'placements', id), { active });
}

/** Renumbers `order` to match the given sequence, in one atomic batch. */
export async function reorderPlacements(
  uid: string,
  ordered: Placement[]
): Promise<void> {
  const db = getDbOrNull();
  if (!db) throw new Error('Firebase not configured');
  const batch = writeBatch(db);
  ordered.forEach((p, order) => {
    if (p.order !== order) {
      batch.update(doc(db, 'users', uid, 'placements', p.id), { order });
    }
  });
  await batch.commit();
}

/* ───────────────────────── Injections ───────────────────────── */

/** Subscribes to the user's injections (date desc). Returns an unsubscribe fn. */
export function subscribeInjections(
  uid: string,
  onData: (injections: InjectionEntry[]) => void,
  onError: (msg: string) => void
): () => void {
  const db = getDbOrNull();
  if (!db) return () => {};
  const q = query(
    collection(db, 'users', uid, 'injections'),
    orderBy('date', 'desc')
  );
  return onSnapshot(
    q,
    (snap) => {
      onData(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }) as InjectionEntry)
      );
    },
    (err) => onError('Sync error: ' + errCode(err))
  );
}

export async function addInjection(
  uid: string,
  entry: NewInjection
): Promise<void> {
  const db = getDbOrNull();
  if (!db) throw new Error('Firebase not configured');
  // Firestore rejects undefined fields, so only include what's actually set.
  const payload: Record<string, unknown> = {
    date: entry.date,
    placementId: entry.placementId,
    // Snapshot the label: a later rename must not rewrite this entry's history.
    placementLabel: entry.placementLabel.slice(0, MAX_LABEL_LEN),
    createdAt: serverTimestamp(),
  };
  if (entry.doseMg !== undefined) payload.doseMg = entry.doseMg;
  const note = entry.note?.trim();
  if (note) payload.note = note.slice(0, MAX_NOTE_LEN);
  await addDoc(collection(db, 'users', uid, 'injections'), payload);
}

export async function removeInjection(uid: string, id: string): Promise<void> {
  const db = getDbOrNull();
  if (!db) throw new Error('Firebase not configured');
  await deleteDoc(doc(db, 'users', uid, 'injections', id));
}

/* ───────────────────────── Prefs (cadence) ───────────────────────── */

/**
 * Subscribes to the user's profile doc for the injection cadence. The doc also
 * carries the share token (see logs.ts); we read only what we need and fall back
 * to the default when the field hasn't been set.
 */
export function subscribeCadence(
  uid: string,
  onData: (days: number) => void
): () => void {
  const db = getDbOrNull();
  if (!db) return () => {};
  return onSnapshot(
    doc(db, 'users', uid),
    (snap) => {
      const v = snap.data()?.cadenceDays;
      onData(typeof v === 'number' && v > 0 ? v : DEFAULT_CADENCE_DAYS);
    },
    (err) => console.warn('[Workout app] cadence sync:', errCode(err))
  );
}

export async function setCadenceDays(uid: string, days: number): Promise<void> {
  const db = getDbOrNull();
  if (!db) throw new Error('Firebase not configured');
  await setDoc(
    doc(db, 'users', uid),
    { cadenceDays: Math.round(days) },
    { merge: true }
  );
}
