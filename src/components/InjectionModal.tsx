import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { activePlacements, nextPlacement } from '@/data/placements';
import { addInjection, MAX_DOSE_MG } from '@/firebase/injections';
import { doSignIn } from '@/lib/actions';
import { toast } from '@/store/toastStore';
import { todayStr, prettyDate } from '@/lib/date';
import type { InjectionDetail } from '@/types';

/** Parses a positive number from an input string, else undefined. */
function pos(s: string): number | undefined {
  const n = parseFloat(s);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

export function InjectionModal() {
  const { open, date, placementId } = useAppStore((s) => s.injectionModal);
  const user = useAppStore((s) => s.user);
  const placements = useAppStore((s) => s.placements);
  const injections = useAppStore((s) => s.injections);
  const close = useAppStore((s) => s.closeInjectionModal);

  const [site, setSite] = useState('');
  const [day, setDay] = useState(date);
  const [dose, setDose] = useState('');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const rotation = activePlacements(placements);

  // Sync local form state each time the modal is (re)opened. The site defaults
  // to the caller's choice, else to whatever the rotation calls for next.
  useEffect(() => {
    if (!open) return;
    const suggested = placementId || nextPlacement(placements, injections)?.id;
    setSite(suggested || '');
    setDay(date);
    // Carry the last dose forward — it changes rarely, and only on purpose.
    const lastDose = injections.find((i) => i.doseMg !== undefined)?.doseMg;
    setDose(lastDose !== undefined ? String(lastDose) : '');
    setNote('');
    // placements/injections are intentionally omitted: re-running this on every
    // snapshot would stomp on what the user is typing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, date, placementId]);

  const onSave = async () => {
    if (!user) {
      close();
      doSignIn();
      return;
    }
    if (!day) {
      toast('Pick a date', 'error');
      return;
    }
    const chosen = rotation.find((p) => p.id === site);
    if (!chosen) {
      toast('Pick a placement', 'error');
      return;
    }
    const doseMg = pos(dose);
    if (dose && doseMg === undefined) {
      toast('Dose must be a positive number', 'error');
      return;
    }
    if (doseMg !== undefined && doseMg > MAX_DOSE_MG) {
      toast(`Dose looks too high — max ${MAX_DOSE_MG} mg`, 'error');
      return;
    }

    setSaving(true);
    try {
      const detail: InjectionDetail = { doseMg };
      const trimmed = note.trim();
      if (trimmed) detail.note = trimmed;
      await addInjection(user.uid, {
        date: day,
        placementId: chosen.id,
        placementLabel: chosen.label,
        ...detail,
      });
      close();
      toast(`Logged ${chosen.label} · ${prettyDate(day)}`, 'success');
    } catch (e) {
      const err = e as { code?: string; message?: string };
      toast("Couldn't save: " + (err.code || err.message), 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={'modal-backdrop' + (open ? ' open' : '')}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="injectionModalTitle"
      >
        <div className="modal-title" id="injectionModalTitle">
          Log an injection
        </div>
        <div className="modal-sub">
          Record the site and the date. The next site in your rotation is
          pre-selected.
        </div>

        {rotation.length === 0 ? (
          <p className="modal-sub">
            You have no active placements. Add one from <b>Manage placements</b>{' '}
            first.
          </p>
        ) : (
          <div className="field">
            <label className="field-label" htmlFor="injSite">
              Placement
            </label>
            <select
              id="injSite"
              value={site}
              onChange={(e) => setSite(e.target.value)}
            >
              {rotation.map((p) => (
                <option value={p.id} key={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="field">
          <label className="field-label" htmlFor="injDate">
            Date
          </label>
          <input
            type="date"
            id="injDate"
            max={todayStr()}
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="injDose">
            Dose <span className="field-hint">mg — optional</span>
          </label>
          <input
            id="injDose"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.5"
            placeholder="—"
            value={dose}
            onChange={(e) => setDose(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="injNote">
            Note <span className="field-hint">optional</span>
          </label>
          <textarea
            id="injNote"
            className="field-textarea"
            rows={2}
            placeholder="Site reaction, side effects, how it went…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="modal-btn secondary" onClick={close}>
            Cancel
          </button>
          <button
            className="modal-btn primary"
            onClick={onSave}
            disabled={saving || rotation.length === 0}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
