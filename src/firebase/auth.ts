import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as fbSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { getAuthOrNull } from './app';

export type { User };

/**
 * Starts the Google sign-in flow. Ported verbatim from the original: mobile
 * browsers block/mishandle auth popups, so go full-page redirect there (also
 * the more app-like flow). Desktop keeps the popup, with a redirect fallback.
 *
 * @returns an optional error message to surface as a toast, or null on success
 *          / silent cancellation.
 */
export async function signIn(): Promise<string | null> {
  const auth = getAuthOrNull();
  if (!auth) return null;

  const provider = new GoogleAuthProvider();
  const isMobile =
    /Android|iPhone|iPad|iPod|Mobile|Silk/i.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 1 &&
      !window.matchMedia('(pointer:fine)').matches);

  if (isMobile) {
    try {
      await signInWithRedirect(auth, provider);
      return null;
    } catch (e) {
      return 'Sign-in failed: ' + errCode(e);
    }
  }

  try {
    await signInWithPopup(auth, provider);
    return null;
  } catch (e) {
    const code = (e as { code?: string }).code;
    if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
      return null;
    }
    // Popup blocked or unusable → full-page redirect flow.
    if (
      code === 'auth/popup-blocked' ||
      code === 'auth/operation-not-supported-in-this-environment' ||
      code === 'auth/internal-error'
    ) {
      try {
        await signInWithRedirect(auth, provider);
        return null;
      } catch (e2) {
        return 'Sign-in failed: ' + errCode(e2);
      }
    }
    return 'Sign-in failed: ' + errCode(e);
  }
}

export async function signOut(): Promise<string | null> {
  const auth = getAuthOrNull();
  if (!auth) return null;
  try {
    await fbSignOut(auth);
    return null;
  } catch {
    return 'Sign-out failed';
  }
}

/** Subscribes to auth-state changes. Returns an unsubscribe fn (or a no-op). */
export function watchAuth(cb: (user: User | null) => void): () => void {
  const auth = getAuthOrNull();
  if (!auth) {
    cb(null);
    return () => {};
  }
  return onAuthStateChanged(auth, cb);
}

/** Surfaces errors from the redirect fallback flow (success lands via watchAuth). */
export async function consumeRedirectResult(): Promise<string | null> {
  const auth = getAuthOrNull();
  if (!auth) return null;
  try {
    await getRedirectResult(auth);
    return null;
  } catch (e) {
    return 'Sign-in failed: ' + errCode(e);
  }
}

function errCode(e: unknown): string {
  const err = e as { code?: string; message?: string };
  return err.code || err.message || 'unknown error';
}
