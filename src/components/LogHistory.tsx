import { useAppStore } from '@/store/useAppStore';
import { CONFIGURED } from '@/firebase/config';
import { COLORS, todayDayKey } from '@/data/theme';
import { removeLog } from '@/firebase/logs';
import { doSignIn } from '@/lib/actions';
import { toast } from '@/store/toastStore';
import { todayStr, prettyDate } from '@/lib/date';
import { PlusIcon, GoogleIcon } from '@/lib/icons';
import { ApiAccess } from './ApiAccess';
import type { LogEntry } from '@/types';

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
          <span className="icon">📓</span>
          <p>
            No workouts logged yet.
            <br />
            Open a workout and tap <b>Log this workout</b>, or use the button
            above.
          </p>
        </div>
      ) : (
        groups.map((date) => (
          <div className="log-date-group" key={date}>
            <div className="log-date-head">
              {prettyDate(date)}
              {date === todayS && <span className="today-tag">Today</span>}
            </div>
            {byDate.get(date)!.map((l) => {
              const color = COLORS[l.color] || COLORS.dim;
              return (
                <div className="log-entry" key={l.id}>
                  <span
                    className="log-entry-dot"
                    style={{ background: color, color }}
                  />
                  <span className="log-entry-name">{l.workoutName}</span>
                  <span className="log-entry-type">{l.type || ''}</span>
                  <button
                    className="log-entry-del"
                    aria-label="Remove"
                    onClick={() => onRemove(l.id)}
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        ))
      )}

      <ApiAccess />
    </>
  );
}
