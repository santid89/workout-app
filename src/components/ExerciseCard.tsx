import type { Exercise } from '@/types';
import { YouTubeIcon } from '@/lib/icons';
import { youtubeSearch } from '@/lib/date';

/**
 * One exercise. `label` is the position inside a superset ("A1", "A2") and is
 * only passed by the superset block; a stand-alone card shows its own rest.
 */
export function ExerciseCard({
  exercise,
  label,
}: {
  exercise: Exercise;
  label?: string;
}) {
  const { name, sets, note, rest, videoQuery } = exercise;
  return (
    <div className="card">
      <div className="card-top">
        <span className="card-name">
          {label && <span className="card-label">{label}</span>}
          {name}
        </span>
        {sets && (
          <span className="card-sets">
            {sets}
            {!label && rest && (
              <span className="card-rest"> · rest {rest}</span>
            )}
          </span>
        )}
      </div>
      <div className="card-note">{note}</div>
      {videoQuery && (
        <a
          className="card-video"
          href={youtubeSearch(videoQuery)}
          target="_blank"
          rel="noreferrer"
        >
          <YouTubeIcon />
          How to
        </a>
      )}
    </div>
  );
}
