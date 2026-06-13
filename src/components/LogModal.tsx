import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { DAYS } from '@/data/theme';
import { addLog } from '@/firebase/logs';
import { doSignIn } from '@/lib/actions';
import { toast } from '@/store/toastStore';
import { todayStr, prettyDate } from '@/lib/date';

export function LogModal() {
  const { open, workoutKey, date } = useAppStore((s) => s.logModal);
  const user = useAppStore((s) => s.user);
  const closeLogModal = useAppStore((s) => s.closeLogModal);

  const [selected, setSelected] = useState(workoutKey);
  const [day, setDay] = useState(date);
  const [saving, setSaving] = useState(false);

  // Sync local form state each time the modal is (re)opened.
  useEffect(() => {
    if (open) {
      setSelected(workoutKey);
      setDay(date);
    }
  }, [open, workoutKey, date]);

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
    const w = DAYS.find((x) => x.key === selected);
    if (!w) return;
    setSaving(true);
    try {
      await addLog(user.uid, {
        date: day,
        workoutKey: selected,
        workoutName: w.name,
        type: w.type,
        color: w.color,
      });
      closeLogModal();
      toast(`Logged ${w.name} · ${prettyDate(day)}`, 'success');
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
          Record which session you completed and when.
        </div>
        <div className="field">
          <label className="field-label" htmlFor="logWorkout">
            Workout
          </label>
          <select
            id="logWorkout"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {DAYS.map((w) => (
              <option value={w.key} key={w.key}>
                {w.short} · {w.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label className="field-label" htmlFor="logDate">
            Date completed
          </label>
          <input
            type="date"
            id="logDate"
            max={todayStr()}
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
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
