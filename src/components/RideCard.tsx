import type { RideBlock } from '@/types';

const PILL_CLASS: Record<RideBlock['variant'], string> = {
  outdoor: 'pill-outdoor',
  indoor: 'pill-indoor',
  fallback: 'pill-fallback',
};

export function RideCard({ ride }: { ride: RideBlock }) {
  return (
    <div className="big-card">
      <span className={'big-card-pill ' + PILL_CLASS[ride.variant]}>
        {ride.pill}
      </span>
      <h3>{ride.title}</h3>
      <p>{ride.body}</p>
    </div>
  );
}
