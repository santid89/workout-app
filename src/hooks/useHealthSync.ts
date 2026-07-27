import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { toast } from '@/store/toastStore';
import { DEFAULT_CADENCE_DAYS } from '@/data/placements';
import {
  subscribePlacements,
  subscribeInjections,
  subscribeCadence,
  seedDefaultPlacements,
} from '@/firebase/injections';

/**
 * Keeps the store's injection sites, injections and cadence in sync with
 * Firestore for the signed-in user. Mirrors useLogSync — listeners are torn down
 * on sign-out / unmount via the effect cleanup.
 *
 * Unlike the workout log, none of this is mirrored to the public share export.
 */
export function useHealthSync() {
  const user = useAppStore((s) => s.user);
  const setPlacements = useAppStore((s) => s.setPlacements);
  const setInjections = useAppStore((s) => s.setInjections);
  const setCadenceDays = useAppStore((s) => s.setCadenceDays);

  // Guards the one-time seed against a second snapshot arriving mid-write.
  const seeding = useRef(false);

  useEffect(() => {
    if (!user) {
      setPlacements([]);
      setInjections([]);
      setCadenceDays(DEFAULT_CADENCE_DAYS);
      seeding.current = false;
      return;
    }

    // A different account gets its own chance to seed.
    seeding.current = false;

    const unsubPlacements = subscribePlacements(
      user.uid,
      (placements, fromCache) => {
        setPlacements(placements);
        // Seed the starting rotation on first use. An empty snapshot that came
        // from the local cache proves nothing (we may just be offline), so only
        // a confirmed server read is allowed to trigger the write.
        if (!placements.length && !fromCache && !seeding.current) {
          seeding.current = true;
          seedDefaultPlacements(user.uid).catch((e) => {
            seeding.current = false;
            toast("Couldn't set up your placements: " + e.message, 'error');
          });
        }
      },
      (msg) => toast(msg, 'error')
    );

    const unsubInjections = subscribeInjections(
      user.uid,
      setInjections,
      (msg) => toast(msg, 'error')
    );

    const unsubCadence = subscribeCadence(user.uid, setCadenceDays);

    return () => {
      unsubPlacements();
      unsubInjections();
      unsubCadence();
    };
  }, [user, setPlacements, setInjections, setCadenceDays]);
}
