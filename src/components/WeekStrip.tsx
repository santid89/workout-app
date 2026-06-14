import type { CSSProperties } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { DAYS, COLORS, todayDayKey } from '@/data/theme';
import { weekDates } from '@/lib/date';
import { CheckIcon } from '@/lib/icons';

/**
 * The seven-day navigation rail that replaces the old dropdown sheet. Always
 * visible: today is ringed, days logged this week show a check, and the active
 * day is filled. Tapping a day opens its workout (Train view).
 */
export function WeekStrip() {
  const selectedDay = useAppStore((s) => s.selectedDay);
  const selectDay = useAppStore((s) => s.selectDay);
  const logs = useAppStore((s) => s.logs);

  const todayKey = todayDayKey();
  const dates = weekDates();
  const loggedDates = new Set(logs.map((l) => l.date));

  return (
    <nav className="week-strip" aria-label="Week">
      {DAYS.map((d) => {
        const isToday = d.key === todayKey;
        const isActive = d.key === selectedDay;
        const isLogged = loggedDates.has(dates[d.key]);
        const color = COLORS[d.color];
        return (
          <button
            key={d.key}
            className={
              'week-day' +
              (isActive ? ' active' : '') +
              (isToday ? ' today' : '')
            }
            style={{ '--day-color': color } as CSSProperties}
            onClick={() => selectDay(d.key)}
            aria-pressed={isActive}
            aria-label={`${d.name}${isToday ? ', today' : ''}${
              isLogged ? ', logged' : ''
            }`}
          >
            <span className="week-day-name">{d.short}</span>
            <span className="week-day-mark">
              {isLogged ? (
                <span className="week-day-check" aria-hidden="true">
                  <CheckIcon />
                </span>
              ) : (
                <span className="week-day-dot" aria-hidden="true" />
              )}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
