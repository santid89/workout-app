import type { Exercise } from '@/types';
import { YouTubeIcon } from '@/lib/icons';
import { youtubeSearch } from '@/lib/date';

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const { name, sets, note, rotation, videoQuery } = exercise;
  return (
    <div className="card">
      <div className="card-top">
        <span className="card-name">{name}</span>
        {sets && <span className="card-sets">{sets}</span>}
      </div>
      <div className="card-note">{note}</div>
      {rotation && (
        <div className="rotation">
          <div className="rotation-title">{rotation.title}</div>
          {rotation.rows.map((row) => (
            <div className="rotation-row" key={row.tag}>
              <span className="rotation-tag">{row.tag}</span>
              <span className="rotation-text">
                <b>{row.name}</b> {row.desc}
              </span>
            </div>
          ))}
        </div>
      )}
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
