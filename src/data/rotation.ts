import { PROGRAM } from './program';
import type { RotationRow } from '@/types';

/**
 * 3-week movement rotation. Each rotation main-lift cycles A → B → C. Week A
 * begins the week of 2026-05-25 (see the About panel). Given a date we can
 * derive which week is active, and resolve the umbrella "(rotation)" exercise
 * to the single variation actually performed.
 */
const ANCHOR = new Date(2026, 4, 25); // 2026-05-25, start of a Week A
const CYCLE = 3;

/** The rotation rows for a workout day, or null if it isn't a rotation day. */
export function rotationRows(key: string): RotationRow[] | null {
  const day = PROGRAM.find((d) => d.key === key);
  const ex = day?.exercises?.find((e) => e.rotation);
  return ex?.rotation?.rows ?? null;
}

export const isRotationDay = (key: string): boolean => !!rotationRows(key);

/** Snaps a date to the Monday of its week (local time). */
function mondayOf(d: Date): Date {
  const x = new Date(d);
  const dow = (x.getDay() + 6) % 7; // Mon=0 … Sun=6
  x.setDate(x.getDate() - dow);
  x.setHours(0, 0, 0, 0);
  return x;
}

/** Returns the cycle week index (0=A, 1=B, 2=C) for a YYYY-MM-DD date. */
export function weekIndexForDate(dateStr: string): number {
  const [y, m, d] = dateStr.split('-').map(Number);
  const weeks = Math.round(
    (mondayOf(new Date(y, m - 1, d)).getTime() - mondayOf(ANCHOR).getTime()) /
      (7 * 86400000)
  );
  return ((weeks % CYCLE) + CYCLE) % CYCLE;
}

/** The variation tag (A/B/C) the cycle calls for on a given date, or null. */
export function defaultVariationTag(
  key: string,
  dateStr: string
): string | null {
  const rows = rotationRows(key);
  return rows ? rows[weekIndexForDate(dateStr)].tag : null;
}

/**
 * Resolves which rotation variation a logged session used: the explicitly
 * stored tag when present, otherwise the cycle's default for that date. Returns
 * null for non-rotation days.
 */
export function resolveVariation(
  key: string,
  dateStr: string,
  storedTag?: string
): { tag: string; name: string } | null {
  const rows = rotationRows(key);
  if (!rows) return null;
  const row =
    (storedTag && rows.find((r) => r.tag === storedTag)) ||
    rows[weekIndexForDate(dateStr)];
  return row ? { tag: row.tag, name: row.name } : null;
}
