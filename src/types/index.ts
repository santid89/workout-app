export type WorkoutType = 'Strength' | 'Ride' | 'Power' | 'Golf' | 'Rest';
export type RefType = 'Log' | 'Reference';
export type DayColor = 'blue' | 'cyan' | 'amber' | 'violet' | 'green' | 'dim';

/** A row in a main-lift's 3-week rotation box. */
export interface RotationRow {
  tag: string; // "A" | "B" | "C"
  name: string; // bolded lift name
  desc: string; // the rest of the line, starting with the em-dash
}

export interface Rotation {
  title: string;
  rows: RotationRow[];
}

export interface Exercise {
  name: string;
  /** Sets × reps notation, e.g. "5 × 5". Omitted on the rare card without it. */
  sets?: string;
  note: string;
  rotation?: Rotation;
  /** YouTube search query; the "How to" link is built from it. */
  videoQuery?: string;
}

export interface RideBlock {
  variant: 'outdoor' | 'indoor' | 'fallback';
  pill: string;
  title: string;
  body: string;
}

export interface RecoveryBlock {
  icon: string;
  title: string;
  body: string;
}

/** The registry entry shared by the picker, chips and log dropdown. */
export interface DayMeta {
  key: string; // '1'..'7' for workouts, 'log' | 'fuel' | 'about' for refs
  short: string;
  name: string;
  type: WorkoutType | RefType;
  chip: string; // chip-{color} class
  color: DayColor;
}

/** A full workout day, rendered from data into a panel. */
export interface WorkoutDay extends DayMeta {
  type: WorkoutType;
  eyebrow: string;
  title: string;
  sub: string;
  tags?: string[];
  exercises?: Exercise[];
  rides?: RideBlock[];
  recovery?: RecoveryBlock;
}

/** A logged session — shape matches the Firestore document. */
export interface LogEntry {
  id: string;
  date: string; // YYYY-MM-DD
  workoutKey: string;
  workoutName: string;
  type: string;
  color: DayColor;
  /** For rotation days: the specific variation done, e.g. "Back Squat". */
  variation?: string;
  /** The rotation tag (A/B/C) for the variation above. */
  variationTag?: string;
  /* Optional session metrics (Phase 3). All backward-compatible — older logs
     simply omit them. Strength/Power use the top-set fields; rides use
     duration/distance; note applies to any session. */
  weight?: number; // top-set load, in the unit below
  reps?: number; // top-set reps
  rpe?: number; // rate of perceived exertion, 1–10
  unit?: 'kg' | 'lb';
  durationMin?: number;
  distanceMiles?: number;
  /** @deprecated Legacy field — migrated to distanceMiles on load. */
  distanceKm?: number;
  note?: string;
  createdAt?: unknown;
}

/** The optional metric fields a session can carry, keyed for reuse. */
export type LogMetrics = Pick<
  LogEntry,
  'weight' | 'reps' | 'rpe' | 'unit' | 'durationMin' | 'distanceMiles' | 'note'
>;

/* ───────────────────────── Health: injection tracking ─────────────────────────
   A rotating set of injection sites plus the log of shots taken at them. Both
   live under the user's private Firestore tree — never in the share export. */

/** An injection site in the rotation. Shape matches the Firestore document. */
export interface Placement {
  id: string;
  /** What the user calls it, e.g. "Left thigh". */
  label: string;
  /** Position in the rotation cycle (0-based, ascending). */
  order: number;
  /** Retired sites stay for history but drop out of the rotation. */
  active: boolean;
  createdAt?: unknown;
}

/** A logged injection — shape matches the Firestore document. */
export interface InjectionEntry {
  id: string;
  date: string; // YYYY-MM-DD
  placementId: string;
  /** Snapshot of the site's label at log time, so renames never rewrite history. */
  placementLabel: string;
  /** Dose in milligrams. Optional — older entries may predate the field. */
  doseMg?: number;
  note?: string;
  createdAt?: unknown;
}

/** The optional detail fields an injection can carry, keyed for reuse. */
export type InjectionDetail = Pick<InjectionEntry, 'doseMg' | 'note'>;

/** How the next injection sits relative to the cadence. */
export type DueState = 'none' | 'scheduled' | 'soon' | 'due' | 'overdue';

export interface DueStatus {
  state: DueState;
  /** YYYY-MM-DD the next injection is due, or null when nothing is logged. */
  nextDue: string | null;
  /** Days until due — negative once overdue. 0 on the due date itself. */
  days: number;
}
