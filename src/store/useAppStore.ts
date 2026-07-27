import { create } from 'zustand';
import type { LogEntry, Placement, InjectionEntry } from '@/types';
import type { User } from '@/firebase/auth';
import { todayDayKey } from '@/data/theme';
import { DEFAULT_CADENCE_DAYS } from '@/data/placements';
import { todayStr } from '@/lib/date';

interface LogModalState {
  open: boolean;
  workoutKey: string;
  date: string;
}

interface InjectionModalState {
  open: boolean;
  date: string;
  /** Pre-selected site; empty means "let the modal pick the next in rotation". */
  placementId: string;
}

interface AppState {
  // Auth
  user: User | null;
  authReady: boolean;
  setUser: (user: User | null) => void;
  setAuthReady: (ready: boolean) => void;

  // Logs + share token
  logs: LogEntry[];
  shareToken: string | null;
  setLogs: (logs: LogEntry[]) => void;
  setShareToken: (token: string | null) => void;

  // Health: injection sites + the log of shots taken. Private to the user —
  // never mirrored into the public share export.
  placements: Placement[];
  injections: InjectionEntry[];
  cadenceDays: number;
  setPlacements: (placements: Placement[]) => void;
  setInjections: (injections: InjectionEntry[]) => void;
  setCadenceDays: (days: number) => void;

  // Navigation. selectedDay is the visible view: 'today' (home), '1'..'7'
  // (a workout day), or 'log' | 'health' | 'fuel' | 'about'. lastWorkoutDay
  // remembers which of the 7 days the Train tab returns to.
  selectedDay: string;
  lastWorkoutDay: string;
  selectDay: (key: string) => void;

  // Account menu
  accountMenuOpen: boolean;
  toggleAccountMenu: () => void;
  closeAccountMenu: () => void;

  // Log modal
  logModal: LogModalState;
  openLogModal: (workoutKey: string, date?: string) => void;
  closeLogModal: () => void;

  // Injection modal + placement manager
  injectionModal: InjectionModalState;
  openInjectionModal: (placementId?: string, date?: string) => void;
  closeInjectionModal: () => void;
  placementManagerOpen: boolean;
  openPlacementManager: () => void;
  closePlacementManager: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  authReady: false,
  setUser: (user) => set({ user }),
  setAuthReady: (authReady) => set({ authReady }),

  logs: [],
  shareToken: null,
  setLogs: (logs) => set({ logs }),
  setShareToken: (shareToken) => set({ shareToken }),

  placements: [],
  injections: [],
  cadenceDays: DEFAULT_CADENCE_DAYS,
  setPlacements: (placements) => set({ placements }),
  setInjections: (injections) => set({ injections }),
  setCadenceDays: (cadenceDays) => set({ cadenceDays }),

  selectedDay: 'today',
  lastWorkoutDay: todayDayKey(),
  selectDay: (key) => {
    set((s) => ({
      selectedDay: key,
      lastWorkoutDay: /^[1-7]$/.test(key) ? key : s.lastWorkoutDay,
    }));
    window.scrollTo({ top: 0, behavior: 'instant' });
  },

  accountMenuOpen: false,
  toggleAccountMenu: () =>
    set((s) => ({ accountMenuOpen: !s.accountMenuOpen })),
  closeAccountMenu: () => set({ accountMenuOpen: false }),

  logModal: { open: false, workoutKey: '1', date: todayStr() },
  openLogModal: (workoutKey, date) =>
    set({ logModal: { open: true, workoutKey, date: date || todayStr() } }),
  closeLogModal: () =>
    set((s) => ({ logModal: { ...s.logModal, open: false } })),

  injectionModal: { open: false, date: todayStr(), placementId: '' },
  openInjectionModal: (placementId, date) =>
    set({
      injectionModal: {
        open: true,
        date: date || todayStr(),
        placementId: placementId || '',
      },
    }),
  closeInjectionModal: () =>
    set((s) => ({ injectionModal: { ...s.injectionModal, open: false } })),

  placementManagerOpen: false,
  openPlacementManager: () => set({ placementManagerOpen: true }),
  closePlacementManager: () => set({ placementManagerOpen: false }),
}));
