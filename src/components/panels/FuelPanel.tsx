import {
  FUEL_STATS,
  CARBS_BY_DAY,
  AROUND_TRAINING,
  CHECK_YOURSELF,
  type InfoCard,
} from '@/data/reference';

export function FuelPanel({ active }: { active: boolean }) {
  return (
    <div className={'panel day-green' + (active ? ' active' : '')} id="day-fuel">
      <div className="container">
        <div className="day-header">
          <div className="day-eyebrow">
            <span className="dot" />
            Nutrition
          </div>
          <h1 className="day-title">Fuel &amp; Macros</h1>
          <p className="day-sub">
            Hold 185–190 lbs, as lean as possible — target ~188 by 2026-12-31.
            Preserve lean mass. Pace ~0.4 lb/week. Updated 2026-08-07.
          </p>
        </div>

        {FUEL_STATS.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat-label">
              <b>{s.label}</b>
              {s.desc}
            </div>
            <div className={'stat-value' + (s.muted ? ' muted' : '')}>
              {s.value}
            </div>
          </div>
        ))}

        <div className="section-title">Carbs by Day</div>
        {CARBS_BY_DAY.map((c) => (
          <div className="week-row" key={c.day}>
            <span className="week-row-day">{c.day}</span>
            <span className="week-row-desc">
              <b>{c.amount}</b> {c.rest}
            </span>
          </div>
        ))}

        <div className="section-title">Around Training</div>
        {AROUND_TRAINING.map((card) => (
          <FuelCard card={card} key={card.name} />
        ))}

        <div className="section-title">Check Yourself</div>
        {CHECK_YOURSELF.map((card) => (
          <FuelCard card={card} key={card.name} />
        ))}
      </div>
    </div>
  );
}

function FuelCard({ card }: { card: InfoCard }) {
  return (
    <div className="card">
      <div className="card-top">
        <span className="card-name">{card.name}</span>
        {card.sets && <span className="card-sets">{card.sets}</span>}
      </div>
      <div className="card-note">{card.note}</div>
    </div>
  );
}
