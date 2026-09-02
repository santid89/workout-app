import { todayStr, addDays, daysBetween } from '@/lib/date';
import type { Placement, InjectionEntry, DueStatus } from '@/types';

/**
 * Injection-site rotation. Sites cycle in `order`, one per dose, wrapping at the
 * end. The position comes from the last thing logged, not from the calendar.
 */

/** The starting rotation, seeded on first use. Order is the cycle order. */
export const DEFAULT_PLACEMENTS = [
  'Left thigh',
  'Right of belly button',
  'Left of belly button',
  'Right thigh',
];

/** Default gap between injections, in days. Stored per-user; this is the seed. */
export const DEFAULT_CADENCE_DAYS = 7;

/** How many days ahead of the due date the banner starts nudging. */
const SOON_WINDOW = 2;

/** The sites still in the rotation, in cycle order. */
export function activePlacements(placements: Placement[]): Placement[] {
  return placements.filter((p) => p.active).sort((a, b) => a.order - b.order);
}

/** The most recently dated injection, or null. Tolerates unsorted input. */
export function latestInjection(
  injections: InjectionEntry[]
): InjectionEntry | null {
  let latest: InjectionEntry | null = null;
  for (const i of injections) if (!latest || i.date > latest.date) latest = i;
  return latest;
}

/**
 * The site the rotation calls for next: one past the last one used. Falls back
 * to the first active site when nothing is logged yet or the last site has
 * since been retired, so the suggestion never comes back empty.
 */
export function nextPlacement(
  placements: Placement[],
  injections: InjectionEntry[]
): Placement | null {
  const active = activePlacements(placements);
  if (!active.length) return null;
  const last = latestInjection(injections);
  if (!last) return active[0];
  const i = active.findIndex((p) => p.id === last.placementId);
  return i === -1 ? active[0] : active[(i + 1) % active.length];
}

/**
 * Where the next injection sits relative to the cadence. `days` counts down to
 * the due date and goes negative once it's passed.
 */
export function dueStatus(
  injections: InjectionEntry[],
  cadenceDays: number
): DueStatus {
  const last = latestInjection(injections);
  if (!last) return { state: 'none', nextDue: null, days: 0 };

  const nextDue = addDays(last.date, cadenceDays);
  const days = daysBetween(todayStr(), nextDue);

  if (days < 0) return { state: 'overdue', nextDue, days };
  if (days === 0) return { state: 'due', nextDue, days };
  if (days <= SOON_WINDOW) return { state: 'soon', nextDue, days };
  return { state: 'scheduled', nextDue, days };
}

/** One-line summary of a due status, for the banner. */
export function dueLabel(status: DueStatus): string {
  const { state, days } = status;
  const plural = (n: number) => (n === 1 ? 'day' : 'days');
  switch (state) {
    case 'none':
      return 'No injections logged yet';
    case 'overdue':
      return `Overdue by ${-days} ${plural(-days)}`;
    case 'due':
      return 'Due today';
    default:
      return `Due in ${days} ${plural(days)}`;
  }
}
