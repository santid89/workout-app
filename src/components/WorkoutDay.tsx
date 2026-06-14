import type { WorkoutDay as WorkoutDayType } from '@/types';
import { ExerciseCard } from './ExerciseCard';
import { RideCard } from './RideCard';
import { LogCta } from './LogCta';
import { MoonIcon } from '@/lib/icons';

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

        {day.exercises?.map((ex) => (
          <ExerciseCard key={ex.name} exercise={ex} />
        ))}

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
