import { create } from 'zustand';

export type ToastKind = '' | 'success' | 'error';

export interface ToastData {
  id: number;
  msg: string;
  kind: ToastKind;
}

interface ToastState {
  toasts: ToastData[];
  push: (msg: string, kind?: ToastKind) => void;
  remove: (id: number) => void;
}

let nextId = 1;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (msg, kind = '') =>
    set((s) => ({ toasts: [...s.toasts, { id: nextId++, msg, kind }] })),
  remove: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

/** Imperative helper for non-component code. */
export const toast = (msg: string, kind: ToastKind = '') =>
  useToastStore.getState().push(msg, kind);
