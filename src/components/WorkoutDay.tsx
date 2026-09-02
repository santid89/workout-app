import type { Exercise, WorkoutDay as WorkoutDayType } from '@/types';
import { ExerciseCard } from './ExerciseCard';
import { RideCard } from './RideCard';
import { LogCta } from './LogCta';
import { MoonIcon } from '@/lib/icons';

type Block =
  | { kind: 'single'; exercise: Exercise }
  | { kind: 'superset'; tag: string; exercises: Exercise[] };

/** Folds consecutive exercises that share a superset letter into one block. */
function groupExercises(exercises: Exercise[]): Block[] {
  const blocks: Block[] = [];
  for (const ex of exercises) {
    const last = blocks[blocks.length - 1];
    if (ex.superset && last?.kind === 'superset' && last.tag === ex.superset) {
      last.exercises.push(ex);
    } else if (ex.superset) {
      blocks.push({ kind: 'superset', tag: ex.superset, exercises: [ex] });
    } else {
      blocks.push({ kind: 'single', exercise: ex });
    }
  }
  return blocks;
}

function SupersetBlock({
  tag,
  exercises,
}: {
  tag: string;
  exercises: Exercise[];
}) {
  const rest = exercises.find((e) => e.rest)?.rest;
  return (
    <div className="superset">
      <div className="superset-head">
        <span className="superset-tag">Superset {tag}</span>
        <span className="superset-rule">
          {exercises.length} moves back to back
          {rest ? ` · rest ${rest} after each round` : ''}
        </span>
      </div>
      {exercises.map((ex, i) => (
        <ExerciseCard key={ex.name} exercise={ex} label={`${tag}${i + 1}`} />
      ))}
    </div>
  );
}

export function WorkoutDay({
  day,
  active,
}: {
  day: WorkoutDayType;
  active: boolean;
}) {
  return (
    <div
      className={`panel day-${day.color}${active ? ' active' : ''}`}
      id={`day-${day.key}`}
    >
      <div className="container">
        <div className="day-header">
          <div className="day-eyebrow">
            <span className="dot" />
            {day.eyebrow}
          </div>
          <h1 className="day-title">{day.title}</h1>
          <p className="day-sub">{day.sub}</p>
          {day.tags && (
            <div className="day-tags">
              {day.tags.map((tag, i) => (
                <span className="day-tag" key={i}>
                  {i === 0 && <span className="tag-dot" />}
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <LogCta workoutKey={day.key} />

        {day.exercises &&
          groupExercises(day.exercises).map((block) =>
            block.kind === 'superset' ? (
              <SupersetBlock
                key={`superset-${block.tag}`}
                tag={block.tag}
                exercises={block.exercises}
              />
            ) : (
              <ExerciseCard
                key={block.exercise.name}
                exercise={block.exercise}
              />
            )
          )}

        {day.rides?.map((ride) => (
          <RideCard key={ride.pill} ride={ride} />
        ))}

        {day.recovery && (
          <div className="center-card">
            <span className="icon" aria-hidden="true">
              <MoonIcon />
            </span>
            <h3>{day.recovery.title}</h3>
            <p>{day.recovery.body}</p>
          </div>
        )}
      </div>
    </div>
  );
}
