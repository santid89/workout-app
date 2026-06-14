import type { CSSProperties } from 'react';
import type { LogEntry } from '@/types';
import { COLORS } from '@/data/theme';
import { ymd, todayStr } from '@/lib/date';

/** Monday (00:00) of the week containing `d`. */
function mondayOf(d: Date): Date {
  const m = new Date(d);
  m.setHours(0, 0, 0, 0);
  m.setDate(m.getDate() - ((m.getDay() + 6) % 7));
  return m;
}

const HEATMAP_WEEKS = 12;
const BAR_WEEKS = 8;

/** Type → categorical color, so the modality split stays consistent. */
const TYPE_COLOR: Record<string, string> = {
  Strength: COLORS.blue,
  Ride: COLORS.cyan,
  Power: COLORS.amber,
  Rest: COLORS.violet,
};

export function ProgressCharts({ logs }: { logs: LogEntry[] }) {
  const today = todayStr();
  const counts = new Map<string, number>();
  for (const l of logs) counts.set(l.date, (counts.get(l.date) ?? 0) + 1);

  const thisMonday = mondayOf(new Date());

  // ── Heatmap: HEATMAP_WEEKS columns of 7 days, oldest → newest ──
  const heatStart = new Date(thisMonday);
  heatStart.setDate(heatStart.getDate() - (HEATMAP_WEEKS - 1) * 7);
  const weeks: { date: string; count: number; isToday: boolean }[][] = [];
  for (let w = 0; w < HEATMAP_WEEKS; w++) {
    const col = [];
    for (let dow = 0; dow < 7; dow++) {
      const d = new Date(heatStart);
      d.setDate(heatStart.getDate() + w * 7 + dow);
      const ds = ymd(d);
      col.push({ date: ds, count: counts.get(ds) ?? 0, isToday: ds === today });
    }
    weeks.push(col);
  }

  // ── Weekly bars: last BAR_WEEKS weeks ──
  const bars: { label: string; count: number }[] = [];
  for (let w = BAR_WEEKS - 1; w >= 0; w--) {
    const mon = new Date(thisMonday);
    mon.setDate(mon.getDate() - w * 7);
    let count = 0;
    for (let dow = 0; dow < 7; dow++) {
      const d = new Date(mon);
      d.setDate(mon.getDate() + dow);
      count += counts.get(ymd(d)) ?? 0;
    }
    bars.push({ label: `${mon.getMonth() + 1}/${mon.getDate()}`, count });
  }
  const barMax = Math.max(1, ...bars.map((b) => b.count));

  // ── Modality split: count by type, all-time ──
  const byType = new Map<string, number>();
  for (const l of logs) byType.set(l.type, (byType.get(l.type) ?? 0) + 1);
  const split = [...byType.entries()].sort((a, b) => b[1] - a[1]);
  const splitMax = Math.max(1, ...split.map(([, n]) => n));

  const last4 = bars.slice(-4).reduce((s, b) => s + b.count, 0);

  return (
    <section className="progress" aria-label="Progress">
      <div className="today-section-label">Progress</div>

      <div className="progress-card">
        <div className="progress-card-head">
          <span className="progress-card-title">Consistency</span>
          <span className="progress-card-meta">last 12 weeks</span>
        </div>
        <div
          className="heatmap"
          role="img"
          aria-label={`Consistency heatmap, ${logs.length} sessions over the last 12 weeks.`}
        >
          {weeks.map((col, i) => (
            <div className="heatmap-week" key={i}>
              {col.map((cell) => {
                const lv =
                  cell.count >= 2 ? 'lv2' : cell.count === 1 ? 'lv1' : '';
                return (
                  <span
                    key={cell.date}
                    className={
                      'heatmap-cell ' + lv + (cell.isToday ? ' today' : '')
                    }
                    title={`${cell.date}: ${cell.count} logged`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="heatmap-legend" aria-hidden="true">
          <span>Less</span>
          <span className="heatmap-cell" />
          <span className="heatmap-cell lv1" />
          <span className="heatmap-cell lv2" />
          <span>More</span>
        </div>
      </div>

      <div className="progress-card">
        <div className="progress-card-head">
          <span className="progress-card-title">Sessions / week</span>
          <span className="progress-card-meta">{last4} in last 4 wks</span>
        </div>
        <div
          className="weekbars"
          role="img"
          aria-label={`Weekly sessions for the last ${BAR_WEEKS} weeks.`}
        >
          {bars.map((b, i) => (
            <div
              className={'weekbar' + (b.count === 0 ? ' empty' : '')}
              key={i}
            >
              <span className="weekbar-count">{b.count}</span>
              <div className="weekbar-track">
                <div
                  className="weekbar-fill"
                  style={{ height: `${(b.count / barMax) * 100}%` }}
                />
              </div>
              <span className="weekbar-label">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {split.length > 0 && (
        <div className="progress-card">
          <div className="progress-card-head">
            <span className="progress-card-title">By type</span>
            <span className="progress-card-meta">all time</span>
          </div>
          {split.map(([type, n]) => (
            <div className="split-row" key={type}>
              <span className="split-label">{type}</span>
              <div className="split-track">
                <div
                  className="split-fill"
                  style={
                    {
                      width: `${(n / splitMax) * 100}%`,
                      '--split-color': TYPE_COLOR[type] ?? COLORS.dim,
                    } as CSSProperties
                  }
                />
              </div>
              <span className="split-value">{n}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
