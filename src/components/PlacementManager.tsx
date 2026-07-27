import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { activePlacements } from '@/data/placements';
import {
  addPlacement,
  renamePlacement,
  setPlacementActive,
  reorderPlacements,
  setCadenceDays,
  MAX_LABEL_LEN,
} from '@/firebase/injections';
import { toast } from '@/store/toastStore';
import { ChevronIcon } from '@/lib/icons';
import type { Placement } from '@/types';

/** Reports a failed write as a toast, keeping call sites to one line. */
function fail(e: unknown) {
  const err = e as { code?: string; message?: string };
  toast("Couldn't save: " + (err.code || err.message), 'error');
}

function PlacementRow({
  placement,
  index,
  count,
  onMove,
}: {
  placement: Placement;
  index: number;
  count: number;
  onMove: (index: number, delta: number) => void;
}) {
  const user = useAppStore((s) => s.user);
  const injections = useAppStore((s) => s.injections);
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(placement.label);

  const used = injections.filter((i) => i.placementId === placement.id).length;

  const onRename = async () => {
    const next = label.trim();
    setEditing(false);
    if (!user || !next || next === placement.label) {
      setLabel(placement.label);
      return;
    }
    try {
      await renamePlacement(user.uid, placement.id, next);
      toast('Renamed');
    } catch (e) {
      setLabel(placement.label);
      fail(e);
    }
  };

  const onRetire = async () => {
    if (!user) return;
    const msg = placement.active
      ? `Retire "${placement.label}"? It leaves the rotation but your ${used} logged ${used === 1 ? 'dose' : 'doses'} stay intact.`
      : `Put "${placement.label}" back into the rotation?`;
    if (!window.confirm(msg)) return;
    try {
      await setPlacementActive(user.uid, placement.id, !placement.active);
      toast(placement.active ? 'Retired' : 'Restored');
    } catch (e) {
      fail(e);
    }
  };

  return (
    <div className={'placement-row' + (placement.active ? '' : ' retired')}>
      {placement.active && (
        <div className="placement-move">
          <button
            aria-label={`Move ${placement.label} up`}
            disabled={index === 0}
            onClick={() => onMove(index, -1)}
          >
            <ChevronIcon className="placement-move-up" />
          </button>
          <button
            aria-label={`Move ${placement.label} down`}
            disabled={index === count - 1}
            onClick={() => onMove(index, 1)}
          >
            <ChevronIcon />
          </button>
        </div>
      )}

      {editing ? (
        <input
          className="placement-input"
          value={label}
          autoFocus
          maxLength={MAX_LABEL_LEN}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={onRename}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur();
            if (e.key === 'Escape') {
              setLabel(placement.label);
              setEditing(false);
            }
          }}
        />
      ) : (
        <button
          className="placement-label"
          onClick={() => placement.active && setEditing(true)}
          disabled={!placement.active}
        >
          {placement.label}
          <span className="placement-count">
            {used} {used === 1 ? 'dose' : 'doses'}
          </span>
        </button>
      )}

      <button className="placement-retire" onClick={onRetire}>
        {placement.active ? 'Retire' : 'Restore'}
      </button>
    </div>
  );
}

export function PlacementManager() {
  const open = useAppStore((s) => s.placementManagerOpen);
  const close = useAppStore((s) => s.closePlacementManager);
  const user = useAppStore((s) => s.user);
  const placements = useAppStore((s) => s.placements);
  const cadenceDays = useAppStore((s) => s.cadenceDays);

  const [newLabel, setNewLabel] = useState('');
  const [adding, setAdding] = useState(false);

  const active = activePlacements(placements);
  const retired = placements.filter((p) => !p.active);

  const onAdd = async () => {
    const label = newLabel.trim();
    if (!user || !label) return;
    setAdding(true);
    try {
      // New sites join at the end of the cycle.
      await addPlacement(user.uid, label, active.length);
      setNewLabel('');
      toast(`Added ${label}`, 'success');
    } catch (e) {
      fail(e);
    } finally {
      setAdding(false);
    }
  };

  const onMove = async (index: number, delta: number) => {
    if (!user) return;
    const next = [...active];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    try {
      await reorderPlacements(user.uid, next);
    } catch (e) {
      fail(e);
    }
  };

  const onCadence = async (value: string) => {
    const days = parseInt(value, 10);
    if (!user || !Number.isFinite(days) || days < 1 || days > 90) return;
    try {
      await setCadenceDays(user.uid, days);
    } catch (e) {
      fail(e);
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
        aria-labelledby="placementManagerTitle"
      >
        <div className="modal-title" id="placementManagerTitle">
          Placements &amp; schedule
        </div>
        <div className="modal-sub">
          Injections cycle through these sites in order. Tap a name to rename
          it.
        </div>

        <div className="field">
          <label className="field-label" htmlFor="cadence">
            Inject every <span className="field-hint">days</span>
          </label>
          <input
            id="cadence"
            type="number"
            inputMode="numeric"
            min="1"
            max="90"
            defaultValue={cadenceDays}
            onBlur={(e) => onCadence(e.target.value)}
          />
        </div>

        <div className="field-label">Rotation</div>
        <div className="placement-list">
          {active.map((p, i) => (
            <PlacementRow
              key={p.id}
              placement={p}
              index={i}
              count={active.length}
              onMove={onMove}
            />
          ))}
          {active.length === 0 && (
            <p className="rotation-empty">
              No active sites — add one below to restart the rotation.
            </p>
          )}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="newPlacement">
            Add a placement
          </label>
          <div className="placement-add">
            <input
              id="newPlacement"
              value={newLabel}
              maxLength={MAX_LABEL_LEN}
              placeholder="Back of left arm…"
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onAdd();
              }}
            />
            <button
              className="modal-btn primary"
              onClick={onAdd}
              disabled={adding || !newLabel.trim()}
            >
              Add
            </button>
          </div>
        </div>

        {retired.length > 0 && (
          <>
            <div className="field-label">Retired</div>
            <div className="placement-list">
              {retired.map((p) => (
                <PlacementRow
                  key={p.id}
                  placement={p}
                  index={0}
                  count={retired.length}
                  onMove={onMove}
                />
              ))}
            </div>
          </>
        )}

        <div className="modal-actions">
          <button className="modal-btn secondary" onClick={close}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
