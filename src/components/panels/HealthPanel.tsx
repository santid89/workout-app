import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { CONFIGURED } from '@/firebase/config';
import { removeInjection } from '@/firebase/injections';
import {
  activePlacements,
  nextPlacement,
  dueStatus,
  dueLabel,
} from '@/data/placements';
import { doSignIn } from '@/lib/actions';
import { toast } from '@/store/toastStore';
import { todayStr, prettyDate } from '@/lib/date';
import {
  PlusIcon,
  GoogleIcon,
  ChevronIcon,
  SyringeIcon,
  ArrowRightIcon,
} from '@/lib/icons';
import { DataExport } from '../DataExport';
import type { InjectionEntry } from '@/types';

/** One row in the history list — expands to show dose and note. */
function InjectionItem({
  entry,
  onRemove,
}: {
  entry: InjectionEntry;
  onRemove: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const expandable = entry.doseMg !== undefined || !!entry.note;

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
        <span
          className="log-entry-dot"
          style={{ background: 'var(--violet)', color: 'var(--violet)' }}
        />
        <span className="log-entry-name">{entry.placementLabel}</span>
        {entry.doseMg !== undefined && (
          <span className="log-entry-type">{entry.doseMg} mg</span>
        )}
        {expandable && <ChevronIcon className="log-entry-chev" />}
        <button
          className="log-entry-del"
          aria-label={`Remove injection on ${entry.date}`}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(entry.id);
          }}
        >
          ×
        </button>
      </div>
      {expandable && (
        <div className="log-entry-detail">
          {entry.doseMg !== undefined && (
            <div className="log-metrics">
              <span className="metric-chip">
                Dose:&nbsp;<b>{entry.doseMg}</b>&nbsp;mg
              </span>
            </div>
          )}
          {entry.note && <div className="log-note">“{entry.note}”</div>}
        </div>
      )}
    </div>
  );
}

export function HealthPanel({ active }: { active: boolean }) {
  return (
    <div
      className={'panel day-violet' + (active ? ' active' : '')}
      id="day-health"
    >
      <div className="container">
        <div className="day-header">
          <div className="day-eyebrow">
            <span className="dot" />
            Health
          </div>
          <h1 className="day-title">Injection Tracker</h1>
          <p className="day-sub">
            Every dose with the site it went in, so the rotation stays honest
            and you never have to remember which one is next.
          </p>
        </div>
        <HealthBody />
      </div>
    </div>
  );
}

function HealthBody() {
  const user = useAppStore((s) => s.user);
  const placements = useAppStore((s) => s.placements);
  const injections = useAppStore((s) => s.injections);
  const cadenceDays = useAppStore((s) => s.cadenceDays);
  const openInjectionModal = useAppStore((s) => s.openInjectionModal);
  const openPlacementManager = useAppStore((s) => s.openPlacementManager);

  if (!CONFIGURED) {
    return (
      <div className="notice">
        <h3>Connect Firebase to start tracking</h3>
        <p>
          Injection history needs a Firebase web config. Set the{' '}
          <code>VITE_FIREBASE_*</code> values in <code>.env</code> (the
          project's public config is already there). Full steps are in the
          README.
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="notice">
        <h3>Sign in to track your injections</h3>
        <p>
          Your placements and history are private to your account — stored
          behind your Google login and never included in the shareable API link.
        </p>
        <button className="auth-btn" onClick={doSignIn}>
          <GoogleIcon />
          <span className="auth-btn-text">Sign in with Google</span>
        </button>
      </div>
    );
  }

  const status = dueStatus(injections, cadenceDays);
  const next = nextPlacement(placements, injections);
  const rotation = activePlacements(placements);

  const onRemove = async (id: string) => {
    const entry = injections.find((i) => i.id === id);
    const when = entry ? prettyDate(entry.date) : 'this entry';
    // Health records don't come back — make a mis-tap take two taps.
    if (!window.confirm(`Delete the injection logged on ${when}?`)) return;
    try {
      await removeInjection(user.uid, id);
      toast('Removed');
    } catch (e) {
      const err = e as { code?: string; message?: string };
      toast("Couldn't remove: " + (err.code || err.message), 'error');
    }
  };

  // Group by date (already ordered date desc from Firestore).
  const groups: string[] = [];
  const byDate = new Map<string, InjectionEntry[]>();
  for (const i of injections) {
    if (!byDate.has(i.date)) {
      byDate.set(i.date, []);
      groups.push(i.date);
    }
    byDate.get(i.date)!.push(i);
  }
  const todayS = todayStr();

  const lastDose = injections.find((i) => i.doseMg !== undefined)?.doseMg;

  return (
    <>
      <div className={'due-banner ' + status.state}>
        <div className="due-banner-main">
          <span className="due-banner-label">{dueLabel(status)}</span>
          {status.nextDue && (
            <span className="due-banner-meta">
              Next: {prettyDate(status.nextDue)} · every {cadenceDays} days
            </span>
          )}
        </div>
        {next && (
          <div className="due-banner-next">
            <span className="due-banner-next-label">Next site</span>
            <span className="due-banner-next-site">{next.label}</span>
          </div>
        )}
      </div>

      <button
        className="log-cta"
        onClick={() => openInjectionModal(next?.id, todayStr())}
      >
        <PlusIcon />
        <span>Log an injection</span>
      </button>

      <div className="log-summary">
        <div className="log-stat">
          <div className="log-stat-value">{injections.length}</div>
          <div className="log-stat-label">Doses logged</div>
        </div>
        <div className="log-stat">
          <div className="log-stat-value">{rotation.length}</div>
          <div className="log-stat-label">Sites in rotation</div>
        </div>
        <div className="log-stat">
          <div className="log-stat-value">{lastDose ?? '—'}</div>
          <div className="log-stat-label">Last dose (mg)</div>
        </div>
      </div>

      <div className="today-section-label">Rotation</div>
      <div className="rotation-strip">
        {rotation.length === 0 ? (
          <p className="rotation-empty">
            No sites yet — add some to start the rotation.
          </p>
        ) : (
          rotation.map((p) => (
            <div
              className={'rotation-site' + (next?.id === p.id ? ' next' : '')}
              key={p.id}
            >
              <span className="rotation-site-label">{p.label}</span>
              {next?.id === p.id && (
                <span className="rotation-site-tag">Next</span>
              )}
            </div>
          ))
        )}
      </div>

      <button className="today-about" onClick={openPlacementManager}>
        Manage placements &amp; schedule
        <ArrowRightIcon className="today-about-arrow" />
      </button>

      {injections.length === 0 ? (
        <div className="empty-state">
          <span className="icon" aria-hidden="true">
            <SyringeIcon />
          </span>
          <p>
            No injections logged yet.
            <br />
            Tap <b>Log an injection</b> above to start the record.
          </p>
        </div>
      ) : (
        <>
          <div className="today-section-label">History</div>
          {groups.map((date) => (
            <div className="log-date-group" key={date}>
              <div className="log-date-head">
                {prettyDate(date)}
                {date === todayS && <span className="today-tag">Today</span>}
              </div>
              {byDate.get(date)!.map((entry) => (
                <InjectionItem
                  key={entry.id}
                  entry={entry}
                  onRemove={onRemove}
                />
              ))}
            </div>
          ))}
        </>
      )}

      <DataExport />
    </>
  );
}
