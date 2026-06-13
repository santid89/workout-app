import { useEffect } from 'react';
import { watchAuth, consumeRedirectResult } from '@/firebase/auth';
import { CONFIGURED } from '@/firebase/config';
import { useAppStore } from '@/store/useAppStore';
import { toast } from '@/store/toastStore';

/**
 * Drives auth state into the store and toggles the body classes the CSS uses to
 * show/hide the login gate and app chrome.
 */
export function useAuth() {
  const user = useAppStore((s) => s.user);
  const authReady = useAppStore((s) => s.authReady);
  const setUser = useAppStore((s) => s.setUser);
  const setAuthReady = useAppStore((s) => s.setAuthReady);

  useEffect(() => {
    if (!CONFIGURED) {
      // No Firebase — don't trap the user behind a gate they can't pass.
      setUser(null);
      setAuthReady(true);
      console.warn(
        '[Workout app] Firebase config not set — fill in VITE_FIREBASE_* to enable login + logging.'
      );
      return;
    }
    // Surface errors from the redirect fallback flow (success lands via watchAuth).
    consumeRedirectResult().then((err) => {
      if (err) toast(err, 'error');
    });
    const unsub = watchAuth((u) => {
      setUser(u);
      setAuthReady(true);
    });
    return unsub;
  }, [setUser, setAuthReady]);

  // Mirror auth state onto <body> for the gate / chrome CSS.
  useEffect(() => {
    const cls = document.body.classList;
    cls.remove('auth-loading', 'signed-in', 'signed-out');
    if (!authReady) {
      cls.add('auth-loading');
    } else if (user || !CONFIGURED) {
      cls.add('signed-in');
    } else {
      cls.add('signed-out');
    }
  }, [user, authReady]);
}
