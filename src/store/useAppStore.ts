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

  // Navigation
  selectedDay: string;
  selectDay: (key: string) => void;

  // Day-picker sheet
  sheetOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
  toggleSheet: () => void;

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

  selectedDay: todayDayKey(),
  selectDay: (key) => {
    set({ selectedDay: key });
    window.scrollTo({ top: 0, behavior: 'instant' });
  },

  sheetOpen: false,
  openSheet: () => set({ sheetOpen: true }),
  closeSheet: () => set({ sheetOpen: false }),
  toggleSheet: () => set((s) => ({ sheetOpen: !s.sheetOpen })),

  accountMenuOpen: false,
  toggleAccountMenu: () => set((s) => ({ accountMenuOpen: !s.accountMenuOpen })),
  closeAccountMenu: () => set({ accountMenuOpen: false }),

  logModal: { open: false, workoutKey: '1', date: todayStr() },
  openLogModal: (workoutKey, date) =>
    set({ logModal: { open: true, workoutKey, date: date || todayStr() } }),
  closeLogModal: () =>
    set((s) => ({ logModal: { ...s.logModal, open: false } })),
}));
