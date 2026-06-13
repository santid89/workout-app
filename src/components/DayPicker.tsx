import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { DAYS, REF, todayDayKey } from '@/data/theme';
import type { DayMeta } from '@/types';

export function DayPicker() {
  const sheetOpen = useAppStore((s) => s.sheetOpen);
  const closeSheet = useAppStore((s) => s.closeSheet);
  const selectDay = useAppStore((s) => s.selectDay);
  const selectedDay = useAppStore((s) => s.selectedDay);
  const todayKey = todayDayKey();

  // Close on Escape.
  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSheet();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [sheetOpen, closeSheet]);

  const handlePick = (key: string) => {
    selectDay(key);
    closeSheet();
  };

  const renderItem = (d: DayMeta) => (
    <button
      key={d.key}
      className={'sheet-item' + (d.key === selectedDay ? ' active' : '')}
      onClick={() => handlePick(d.key)}
    >
      <span className="sheet-day">{d.short}</span>
      <span className="sheet-name">{d.name}</span>
      {d.key === todayKey && <span className="sheet-today-pill">Today</span>}
      <span className={'sheet-chip ' + d.chip}>{d.type}</span>
    </button>
  );

  return (
    <>
      <div
        className={'backdrop' + (sheetOpen ? ' open' : '')}
        onClick={closeSheet}
      />
      <div className={'sheet' + (sheetOpen ? ' open' : '')} role="listbox">
        <div className="sheet-inner">
          <div className="sheet-header">
            <span className="sheet-title">Choose a day</span>
            <button
              className="sheet-close"
              aria-label="Close"
              onClick={closeSheet}
            >
              ×
            </button>
          </div>
          <div className="sheet-section">{DAYS.map(renderItem)}</div>
          <div className="sheet-section">{REF.map(renderItem)}</div>
        </div>
      </div>
    </>
  );
}
