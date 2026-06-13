export type WorkoutType = 'Strength' | 'Ride' | 'Power' | 'Rest';
export type RefType = 'Log' | 'Reference';
export type DayColor =
  | 'blue'
  | 'cyan'
  | 'amber'
  | 'violet'
  | 'green'
  | 'dim';

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
  createdAt?: unknown;
}
