import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { toast } from '@/store/toastStore';
import { subscribeFoodLogs } from '@/firebase/food';

/**
 * Keeps the store's food logs in sync with Firestore for the signed-in user.
 * The onSnapshot listener is torn down on sign-out / unmount via the cleanup,
 * so server-side Gemini results stream into the UI as soon as they're written.
 */
export function useFoodLogSync() {
  const user = useAppStore((s) => s.user);
  const setFoodLogs = useAppStore((s) => s.setFoodLogs);

  useEffect(() => {
    if (!user) {
      setFoodLogs([]);
      return;
    }
    const unsub = subscribeFoodLogs(
      user.uid,
      (logs) => setFoodLogs(logs),
      (msg) => toast(msg, 'error')
    );
    return () => unsub();
  }, [user, setFoodLogs]);
}
