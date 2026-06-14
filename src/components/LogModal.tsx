import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { DAYS } from '@/data/theme';
import { rotationRows, defaultVariationTag } from '@/data/rotation';
import { addLog } from '@/firebase/logs';
import { doSignIn } from '@/lib/actions';
import { toast } from '@/store/toastStore';
import { todayStr, prettyDate } from '@/lib/date';
import { ChevronIcon, DumbbellIcon, BikeIcon } from '@/lib/icons';
import type { LogMetrics } from '@/types';

type Activity = 'workout' | 'ride';

/** Parses a positive number from an input string, else undefined. */
function pos(s: string): number | undefined {
  const n = parseFloat(s);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

/** The non-ride sessions (rides are logged via the Ride activity instead). */
const WORKOUT_DAYS = DAYS.filter((d) => d.type !== 'Ride');
const typeOf = (key: string) => DAYS.find((d) => d.key === key)?.type;

const EMPTY = {
  weight: '',
  reps: '',
  rpe: '',
  durationMin: '',
  distanceKm: '',
};

export function LogModal() {
  const { open, workoutKey, date } = useAppStore((s) => s.logModal);
  const user = useAppStore((s) => s.user);
  const closeLogModal = useAppStore((s) => s.closeLogModal);

  const [activity, setActivity] = useState<Activity>('workout');
  // The day the modal opened on — used to name a ride done on a ride day.
  const [ctxKey, setCtxKey] = useState(workoutKey);
  const [selected, setSelected] = useState(workoutKey);
  const [day, setDay] = useState(date);
  const [variationTag, setVariationTag] = useState('');
  const [variationTouched, setVariationTouched] = useState(false);
  const [saving, setSaving] = useState(false);

  // Optional / metric detail.
  const [showDetail, setShowDetail] = useState(false);
  const [unit, setUnit] = useState<'kg' | 'lb'>('lb');
  const [metrics, setMetrics] = useState(EMPTY);
  const [note, setNote] = useState('');

  // Sync local form state each time the modal is (re)opened.
  useEffect(() => {
    if (open) {
      const openIsRide = typeOf(workoutKey) === 'Ride';
      setActivity(openIsRide ? 'ride' : 'workout');
      setCtxKey(workoutKey);
      // selected only ever holds a non-ride day (rides go through Ride mode).
      const sel = openIsRide ? WORKOUT_DAYS[0].key : workoutKey;
      setSelected(sel);
      setDay(date);
      setVariationTag(defaultVariationTag(sel, date) ?? '');
      setVariationTouched(false);
      setShowDetail(false);
      setMetrics(EMPTY);
      setNote('');
    }
  }, [open, workoutKey, date]);

  const rows = rotationRows(selected);
  const selDay = DAYS.find((x) => x.key === selected);
  const isStrength = selDay?.type === 'Strength' || selDay?.type === 'Power';
  const setMetric = (k: keyof typeof EMPTY, v: string) =>
    setMetrics((m) => ({ ...m, [k]: v }));

  const onWorkoutChange = (key: string) => {
    setSelected(key);
    setVariationTag(defaultVariationTag(key, day) ?? '');
    setVariationTouched(false);
  };

  const onDateChange = (newDate: string) => {
    setDay(newDate);
    // Follow the cycle's default until the user picks a variation themselves.
    if (!variationTouched) {
      setVariationTag(defaultVariationTag(selected, newDate) ?? '');
    }
  };

  const onSave = async () => {
    if (!user) {
      closeLogModal();
      doSignIn();
      return;
    }
    if (!day) {
      toast('Pick a date', 'error');
      return;
    }

    const trimmedNote = note.trim();
    setSaving(true);
    try {
      if (activity === 'ride') {
        // Rides are pure user input — duration/distance/note, no prescription.
        const detail: LogMetrics = {
          durationMin: pos(metrics.durationMin),
          distanceKm: pos(metrics.distanceKm),
        };
        if (trimmedNote) detail.note = trimmedNote;
        // Keep the signature name when the day itself is a ride day.
        const name =
          typeOf(ctxKey) === 'Ride'
            ? DAYS.find((d) => d.key === ctxKey)!.name
            : 'Ride';
        await addLog(user.uid, {
          date: day,
          workoutKey: ctxKey,
          workoutName: name,
          type: 'Ride',
          color: 'cyan',
          ...detail,
        });
        closeLogModal();
        toast(`Logged ride · ${prettyDate(day)}`, 'success');
        return;
      }

      const w = DAYS.find((x) => x.key === selected);
      if (!w) return;
      const variationRow =
        rows && variationTag ? rows.find((r) => r.tag === variationTag) : null;

      const detail: LogMetrics = {};
      if (isStrength) {
        detail.weight = pos(metrics.weight);
        detail.reps = pos(metrics.reps);
        detail.rpe = pos(metrics.rpe);
        if (detail.weight) detail.unit = unit;
      }
      if (trimmedNote) detail.note = trimmedNote;

      await addLog(user.uid, {
        date: day,
        workoutKey: selected,
        workoutName: w.name,
        type: w.type,
        color: w.color,
        variation: variationRow?.name,
        variationTag: variationRow?.tag,
        ...detail,
      });
      closeLogModal();
      const label = variationRow ? `${w.name} (${variationRow.name})` : w.name;
      toast(`Logged ${label} · ${prettyDate(day)}`, 'success');
    } catch (e) {
      const err = e as { code?: string; message?: string };
      toast("Couldn't save: " + (err.code || err.message), 'error');
    } finally {
      setSaving(false);
    }
  };

  const isRide = activity === 'ride';

  return (
    <div
      className={'modal-backdrop' + (open ? ' open' : '')}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeLogModal();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logModalTitle"
      >
        <div className="modal-title" id="logModalTitle">
          Log a workout
        </div>
        <div className="modal-sub">
          {isRide
            ? 'Log a ride — enter what you actually rode.'
            : 'Record which session you completed and when.'}
        </div>

        <div className="field">
          <label className="field-label">Activity</label>
          <div className="activity-seg" role="group" aria-label="Activity">
            <button
              type="button"
              className={!isRide ? 'active' : ''}
              aria-pressed={!isRide}
              onClick={() => setActivity('workout')}
            >
              <DumbbellIcon />
              Workout
            </button>
            <button
              type="button"
              className={isRide ? 'active' : ''}
              aria-pressed={isRide}
              onClick={() => setActivity('ride')}
            >
              <BikeIcon />
              Ride
            </button>
          </div>
        </div>

        {!isRide && (
          <>
            <div className="field">
              <label className="field-label" htmlFor="logWorkout">
                Workout
              </label>
              <select
                id="logWorkout"
                value={selected}
                onChange={(e) => onWorkoutChange(e.target.value)}
              >
                {WORKOUT_DAYS.map((w) => (
                  <option value={w.key} key={w.key}>
                    {w.short} · {w.name}
                  </option>
                ))}
              </select>
            </div>
            {rows && (
              <div className="field">
                <label className="field-label" htmlFor="logVariation">
                  Variation
                </label>
                <select
                  id="logVariation"
                  value={variationTag}
                  onChange={(e) => {
                    setVariationTag(e.target.value);
                    setVariationTouched(true);
                  }}
                >
                  {rows.map((r) => (
                    <option value={r.tag} key={r.tag}>
                      {r.tag} · {r.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}

        <div className="field">
          <label className="field-label" htmlFor="logDate">
            Date completed
          </label>
          <input
            type="date"
            id="logDate"
            max={todayStr()}
            value={day}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>

        {isRide ? (
          <>
            <div className="field-row">
              <div className="field">
                <label className="field-label" htmlFor="logDuration">
                  Duration <span className="field-hint">min</span>
                </label>
                <input
                  id="logDuration"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  placeholder="—"
                  value={metrics.durationMin}
                  onChange={(e) => setMetric('durationMin', e.target.value)}
                />
              </div>
              <div className="field">
                <label className="field-label" htmlFor="logDistance">
                  Distance <span className="field-hint">km</span>
                </label>
                <input
                  id="logDistance"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  placeholder="—"
                  value={metrics.distanceKm}
                  onChange={(e) => setMetric('distanceKm', e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="field-label" htmlFor="logNote">
                Note
              </label>
              <textarea
                id="logNote"
                className="field-textarea"
                rows={2}
                placeholder="Route, weather, how it felt…"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              className={'detail-toggle' + (showDetail ? ' open' : '')}
              onClick={() => setShowDetail((v) => !v)}
              aria-expanded={showDetail}
            >
              <span>Add detail (optional)</span>
              <ChevronIcon className="detail-chev" />
            </button>

            {showDetail && (
              <div className="detail-fields">
                {isStrength && (
                  <>
                    <div className="field-row">
                      <div className="field">
                        <label className="field-label" htmlFor="logWeight">
                          Top set load
                        </label>
                        <div className="input-unit">
                          <input
                            id="logWeight"
                            type="number"
                            inputMode="decimal"
                            min="0"
                            placeholder="—"
                            value={metrics.weight}
                            onChange={(e) =>
                              setMetric('weight', e.target.value)
                            }
                          />
                          <div
                            className="unit-toggle"
                            role="group"
                            aria-label="Unit"
                          >
                            <button
                              type="button"
                              className={unit === 'lb' ? 'active' : ''}
                              onClick={() => setUnit('lb')}
                            >
                              lb
                            </button>
                            <button
                              type="button"
                              className={unit === 'kg' ? 'active' : ''}
                              onClick={() => setUnit('kg')}
                            >
                              kg
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="field">
                        <label className="field-label" htmlFor="logReps">
                          Reps
                        </label>
                        <input
                          id="logReps"
                          type="number"
                          inputMode="numeric"
                          min="0"
                          placeholder="—"
                          value={metrics.reps}
                          onChange={(e) => setMetric('reps', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="field-label" htmlFor="logRpe">
                        RPE <span className="field-hint">— effort, 1–10</span>
                      </label>
                      <input
                        id="logRpe"
                        type="number"
                        inputMode="decimal"
                        min="1"
                        max="10"
                        step="0.5"
                        placeholder="—"
                        value={metrics.rpe}
                        onChange={(e) => setMetric('rpe', e.target.value)}
                      />
                    </div>
                  </>
                )}
                <div className="field">
                  <label className="field-label" htmlFor="logNote">
                    Note
                  </label>
                  <textarea
                    id="logNote"
                    className="field-textarea"
                    rows={2}
                    placeholder="How it felt, what you changed…"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>
            )}
          </>
        )}

        <div className="modal-actions">
          <button className="modal-btn secondary" onClick={closeLogModal}>
            Cancel
          </button>
          <button
            className="modal-btn primary"
            onClick={onSave}
            disabled={saving}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
