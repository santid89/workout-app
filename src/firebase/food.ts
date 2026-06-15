import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { getDbOrNull, getStorageOrNull } from './app';
import { downscaleImage } from '@/lib/image';
import type { FoodLog } from '@/types';

export interface NewFoodLog {
  /** Free-text description. Optional if a photo is provided. */
  description?: string;
  /** Photo of the food. Optional if a description is provided. */
  file?: File | null;
}

function errCode(e: unknown): string {
  const err = e as { code?: string; message?: string };
  return err.code || err.message || 'unknown error';
}

function randomId(): string {
  if (crypto.randomUUID) return crypto.randomUUID().replace(/-/g, '');
  const a = new Uint8Array(16);
  crypto.getRandomValues(a);
  return [...a].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Subscribes to the user's food logs (newest first). Calls onData on every
 * snapshot and onError on failure. Returns an unsubscribe fn.
 */
export function subscribeFoodLogs(
  uid: string,
  onData: (logs: FoodLog[]) => void,
  onError: (msg: string) => void
): () => void {
  const db = getDbOrNull();
  if (!db) return () => {};
  const q = query(
    collection(db, 'users', uid, 'foodLogs'),
    orderBy('loggedAt', 'desc')
  );
  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as FoodLog));
    },
    (err) => onError('Food sync error: ' + errCode(err))
  );
}

/**
 * Logs a meal: uploads the photo (downscaled) to Storage when present, then
 * writes a `pending` doc to users/{uid}/foodLogs. A Cloud Function picks it up
 * and fills in the Gemini nutrition estimate. Requires a description, a photo,
 * or both.
 */
export async function addFoodLog(
  uid: string,
  input: NewFoodLog
): Promise<void> {
  const db = getDbOrNull();
  if (!db) throw new Error('Firebase not configured');

  const description = input.description?.trim();
  const file = input.file ?? null;
  if (!description && !file) {
    throw new Error('Add a description or a photo');
  }

  const docData: Record<string, unknown> = {
    status: 'pending',
    loggedAt: serverTimestamp(),
  };
  if (description) docData.description = description;

  if (file) {
    const storage = getStorageOrNull();
    if (!storage) throw new Error('Storage not configured');
    const upload = await downscaleImage(file);
    const path = `users/${uid}/food/${randomId()}.jpg`;
    const objectRef = ref(storage, path);
    await uploadBytes(objectRef, upload, {
      contentType: upload.type || 'image/jpeg',
    });
    docData.photoPath = path;
    docData.photoUrl = await getDownloadURL(objectRef);
  }

  await addDoc(collection(db, 'users', uid, 'foodLogs'), docData);
}

/** Deletes a food log and best-effort removes its photo from Storage. */
export async function removeFoodLog(
  uid: string,
  id: string,
  photoPath?: string
): Promise<void> {
  const db = getDbOrNull();
  if (!db) throw new Error('Firebase not configured');
  await deleteDoc(doc(db, 'users', uid, 'foodLogs', id));
  if (photoPath) {
    const storage = getStorageOrNull();
    if (storage) {
      await deleteObject(ref(storage, photoPath)).catch((e) =>
        console.warn('[Workout app] Could not delete food photo:', errCode(e))
      );
    }
  }
}
