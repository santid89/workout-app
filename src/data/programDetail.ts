import { PROGRAM } from './program';
import { youtubeSearch } from '@/lib/date';

/**
 * A flattened, self-contained detail view of each workout day, keyed '1'..'7'.
 *
 * This mirrors the structure the read-only API export and the expandable
 * history entries consume. The original (single-file) app parsed this out of
 * the rendered DOM cards; here the typed PROGRAM is the single source of truth,
 * so we derive it directly.
 */
export interface DetailExercise {
  name: string;
  sets?: string;
  note?: string;
  rotation?: { week: string; variation: string }[];
  howTo?: string;
}

export interface DetailRideOption {
  option: string;
  title: string;
  detail: string;
}

export interface DetailRecovery {
  title: string;
  detail: string;
}

export interface DayDetail {
  day: string; // short weekday, e.g. "Mon"
  name: string;
  focus: string; // eyebrow
  type: string;
  summary: string;
  tags?: string[];
  exercises?: DetailExercise[];
  rideOptions?: DetailRideOption[];
  recovery?: DetailRecovery;
}

function buildDetail(): Record<string, DayDetail> {
  const out: Record<string, DayDetail> = {};
  for (const d of PROGRAM) {
    const detail: DayDetail = {
      day: d.short,
      name: d.title,
      focus: d.eyebrow,
      type: d.type,
      summary: d.sub,
    };
    if (d.tags && d.tags.length) detail.tags = d.tags;

    if (d.exercises) {
      detail.exercises = d.exercises.map((ex) => {
        const e: DetailExercise = { name: ex.name };
        if (ex.sets) e.sets = ex.sets;
        if (ex.note) e.note = ex.note;
        if (ex.rotation) {
          e.rotation = ex.rotation.rows.map((r) => ({
            week: r.tag,
            variation: `${r.name} ${r.desc}`,
          }));
        }
        if (ex.videoQuery) e.howTo = youtubeSearch(ex.videoQuery);
        return e;
      });
    }

    if (d.rides) {
      detail.rideOptions = d.rides.map((r) => ({
        option: r.pill,
        title: r.title,
        detail: r.body,
      }));
    }

    if (d.recovery) {
      detail.recovery = { title: d.recovery.title, detail: d.recovery.body };
    }

    out[d.key] = detail;
  }
  return out;
}

export const PROGRAM_DETAIL: Record<string, DayDetail> = buildDetail();
