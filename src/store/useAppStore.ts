import { create } from 'zustand';
import type { LogEntry } from '@/types';
import type { User } from '@/firebase/auth';
import { todayDayKey } from '@/data/theme';
import { todayStr } from '@/lib/date';

interface LogModalState {
  open: boolean;
  workoutKey: string;
  date: string;
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

  // Navigation. selectedDay is the visible view: 'today' (home), '1'..'7'
  // (a workout day), or 'log' | 'fuel' | 'about'. lastWorkoutDay remembers
  // which of the 7 days the Train tab returns to.
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
}));
