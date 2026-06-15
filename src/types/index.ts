export type WorkoutType = 'Strength' | 'Ride' | 'Power' | 'Rest';
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

/* ───────────── Food logging ─────────────
   A quick text and/or photo capture of something eaten. The client writes it
   with status 'pending'; a Cloud Function calls Gemini and fills in `nutrition`,
   flipping status to 'processed' (or 'error'). */

export type FoodLogStatus = 'pending' | 'processed' | 'error';

/** One identified item within a meal, with Gemini's macro estimate. */
export interface FoodNutritionItem {
  name: string;
  calories?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
}

/** Gemini's structured estimate for a whole food-log entry. */
export interface FoodNutrition {
  summary?: string;
  items?: FoodNutritionItem[];
  calories?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  confidence?: 'low' | 'medium' | 'high';
}

/** A logged meal — shape matches the Firestore document. */
export interface FoodLog {
  id: string;
  /** Free-text description the user typed, if any. */
  description?: string;
  /** Storage path of the uploaded photo, if any (e.g. users/{uid}/food/abc). */
  photoPath?: string;
  /** Download URL for the photo, for rendering a thumbnail. */
  photoUrl?: string;
  status: FoodLogStatus;
  /** Populated by the server once Gemini has analysed the entry. */
  nutrition?: FoodNutrition;
  /** Error message when status is 'error'. */
  error?: string;
  loggedAt?: unknown;
  processedAt?: unknown;
}
