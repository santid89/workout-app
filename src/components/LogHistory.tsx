import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { CONFIGURED } from '@/firebase/config';
import { COLORS, todayDayKey } from '@/data/theme';
import { PROGRAM_DETAIL } from '@/data/programDetail';
import { resolveVariation } from '@/data/rotation';
import { removeLog } from '@/firebase/logs';
import { doSignIn } from '@/lib/actions';
import { toast } from '@/store/toastStore';
import { todayStr, prettyDate } from '@/lib/date';
import { PlusIcon, GoogleIcon, ChevronIcon, NotebookIcon } from '@/lib/icons';
import { ApiAccess } from './ApiAccess';
import { ProgressCharts } from './ProgressCharts';
import type { LogEntry } from '@/types';

/** The exercise rows shown when a history entry is expanded. */
function detailRows(log: LogEntry): { name: string; sets?: string }[] {
  const d = PROGRAM_DETAIL[log.workoutKey];
  if (!d) return [];
  if (d.exercises) {
    // Resolve the umbrella "(rotation)" lift to the variation actually done.
    const v = resolveVariation(log.workoutKey, log.date, log.variationTag);
    return d.exercises.map((e) => ({
      name: e.rotation && v ? v.name : e.name,
      sets: e.sets,
    }));
  }
  if (d.rideOptions)
    return d.rideOptions.map((o) => ({ name: o.title, sets: o.option }));
  if (d.recovery) return [{ name: d.recovery.title }];
  return [];
}

/** The logged-metric chips (top set, RPE, ride duration/distance) for an entry. */
function metricChips(log: LogEntry): { key: string; label: JSX.Element }[] {
  const chips: { key: string; label: JSX.Element }[] = [];
  if (log.weight && log.reps) {
    chips.push({
      key: 'set',
      label: (
        <>
          Top set:&nbsp;
          <b>
            {log.weight} × {log.reps}
          </b>
          &nbsp;{log.unit ?? ''}
        </>
      ),
    });
  } else if (log.weight) {
    chips.push({
      key: 'load',
      label: (
        <>
          <b>{log.weight}</b>&nbsp;{log.unit ?? ''}
        </>
      ),
    });
  }
  if (log.rpe)
    chips.push({
      key: 'rpe',
      label: (
        <>
          RPE&nbsp;<b>{log.rpe}</b>
        </>
      ),
    });
  if (log.durationMin)
    chips.push({
      key: 'dur',
      label: (
        <>
          <b>{log.durationMin}</b>&nbsp;min
        </>
      ),
    });
  if (log.distanceKm)
    chips.push({
      key: 'dist',
      label: (
        <>
          <b>{log.distanceKm}</b>&nbsp;km
        </>
      ),
    });
  return chips;
}

function LogEntryItem({
  log,
  onRemove,
}: {
  log: LogEntry;
  onRemove: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const color = COLORS[log.color] || COLORS.dim;
  const rows = detailRows(log);
  const chips = metricChips(log);
  const expandable = rows.length > 0 || chips.length > 0 || !!log.note;

  return (
    <div
      className={
        'log-entry' + (expandable ? ' expandable' : '') + (open ? ' open' : '')
      }
    >
      <div
        className="log-entry-row"
        onClick={expandable ? () => setOpen((o) => !o) : undefined}
      >
        <span className="log-entry-dot" style={{ background: color, color }} />
        <span className="log-entry-name">{log.workoutName}</span>
        <span className="log-entry-type">{log.type || ''}</span>
        {expandable && <ChevronIcon className="log-entry-chev" />}
        <button
          className="log-entry-del"
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(log.id);
          }}
        >
          ×
        </button>
      </div>
      {expandable && (
        <div className="log-entry-detail">
          {chips.length > 0 && (
            <div className="log-metrics">
              {chips.map((c) => (
                <span className="metric-chip" key={c.key}>
                  {c.label}
                </span>
              ))}
            </div>
          )}
          {rows.map((r, i) => (
            <div className="ex-row" key={i}>
              <span className="ex-name">{r.name}</span>
              {r.sets && <span className="ex-sets">{r.sets}</span>}
            </div>
          ))}
          {log.note && <div className="log-note">“{log.note}”</div>}
        </div>
      )}
    </div>
  );
}

export function LogHistory({ active }: { active: boolean }) {
  return (
    <div className={'panel' + (active ? ' active' : '')} id="day-log">
      <div className="container">
        <div className="day-header">
          <div className="day-eyebrow">
            <span className="dot" style={{ background: 'var(--green)' }} />
            Training Log
          </div>
          <h1 className="day-title">Workout History</h1>
          <p className="day-sub">
            Log the workout you actually did, on the day you actually did it —
            the calendar bends, the record stays honest.
          </p>
        </div>
        <LogBody />
      </div>
    </div>
  );
}

function LogBody() {
  const user = useAppStore((s) => s.user);
  const logs = useAppStore((s) => s.logs);
  const openLogModal = useAppStore((s) => s.openLogModal);

  if (!CONFIGURED) {
    return (
      <div className="notice">
        <h3>Connect Firebase to start logging</h3>
        <p>
          Your Google login and workout history need a Firebase web config. Set
          the <code>VITE_FIREBASE_*</code> values in <code>.env</code> (the
          project's public config is already there). Full steps are in the
          README.
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="notice">
        <h3>Sign in to track your workouts</h3>
        <p>
          Log the session you actually did each day. Your history syncs to your
          Google account, so it's there on every device.
        </p>
        <button className="auth-btn" onClick={doSignIn}>
          <GoogleIcon />
          <span className="auth-btn-text">Sign in with Google</span>
        </button>
      </div>
    );
  }

  // Stats
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - 6);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const inRange = (s: string, from: Date) => {
    const [y, m, d] = s.split('-').map(Number);
    return new Date(y, m - 1, d) >= from;
  };
  const weekCount = logs.filter((l) => inRange(l.date, weekStart)).length;
  const monthCount = logs.filter((l) => inRange(l.date, monthStart)).length;

  const onRemove = async (id: string) => {
    try {
      await removeLog(user.uid, id);
      toast('Removed');
    } catch (e) {
      const err = e as { code?: string; message?: string };
      toast("Couldn't remove: " + (err.code || err.message), 'error');
    }
  };

  // Group by date (logs already ordered date desc from Firestore)
  const groups: string[] = [];
  const byDate = new Map<string, LogEntry[]>();
  for (const l of logs) {
    if (!byDate.has(l.date)) {
      byDate.set(l.date, []);
      groups.push(l.date);
    }
    byDate.get(l.date)!.push(l);
  }
  const todayS = todayStr();

  return (
    <>
      <button
        className="log-cta"
        style={{
          background: 'var(--surface-2)',
          borderColor: 'var(--border-strong)',
          color: 'var(--text)',
        }}
        onClick={() => openLogModal(todayDayKey(), todayStr())}
      >
        <PlusIcon />
        <span>Log a workout</span>
      </button>

      <div className="log-summary">
        <div className="log-stat">
          <div className="log-stat-value">{weekCount}</div>
          <div className="log-stat-label">Last 7 days</div>
        </div>
        <div className="log-stat">
          <div className="log-stat-value">{monthCount}</div>
          <div className="log-stat-label">This month</div>
        </div>
        <div className="log-stat">
          <div className="log-stat-value">{logs.length}</div>
          <div className="log-stat-label">All time</div>
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="empty-state">
          <span className="icon" aria-hidden="true">
            <NotebookIcon />
          </span>
          <p>
            No workouts logged yet.
            <br />
            Open a workout and tap <b>Log this workout</b>, or use the button
            above.
          </p>
        </div>
      ) : (
        <ProgressCharts logs={logs} />
      )}

      {logs.length > 0 && <div className="today-section-label">History</div>}
      {logs.length > 0 &&
        groups.map((date) => (
          <div className="log-date-group" key={date}>
            <div className="log-date-head">
              {prettyDate(date)}
              {date === todayS && <span className="today-tag">Today</span>}
            </div>
            {byDate.get(date)!.map((l) => (
              <LogEntryItem key={l.id} log={l} onRemove={onRemove} />
            ))}
          </div>
        ))}

      <ApiAccess />
    </>
  );
}
