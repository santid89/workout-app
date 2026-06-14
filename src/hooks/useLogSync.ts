import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { toast } from '@/store/toastStore';
import {
  subscribeLogs,
  ensureShareToken,
  syncShareExport,
  migrateDistanceToMiles,
} from '@/firebase/logs';

/**
 * Keeps the store's logs in sync with Firestore for the signed-in user, and
 * mirrors them to the read-only share export. The onSnapshot listener is torn
 * down on sign-out / unmount via the effect cleanup.
 */
export function useLogSync() {
  const user = useAppStore((s) => s.user);
  const setLogs = useAppStore((s) => s.setLogs);
  const setShareToken = useAppStore((s) => s.setShareToken);

  useEffect(() => {
    if (!user) {
      setLogs([]);
      setShareToken(null);
      return;
    }

    let unsub = () => {};
    let cancelled = false;
    let token: string | null = null;

    (async () => {
      // Resolve the token before logs render the API card.
      token = await ensureShareToken(user.uid);
      if (cancelled) return;
      setShareToken(token);

      const athlete = user.displayName || user.email || null;
      unsub = subscribeLogs(
        user.uid,
        (logs) => {
          setLogs(logs);
          // One-time: convert any legacy km distances to miles.
          migrateDistanceToMiles(user.uid, logs);
          // Keep the read-only JSON export current.
          if (token) syncShareExport(token, user.uid, athlete, logs);
        },
        (msg) => toast(msg, 'error')
      );
    })();

    return () => {
      cancelled = true;
      unsub();
    };
  }, [user, setLogs, setShareToken]);
}
