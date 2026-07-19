import type { DayColor, DayMeta } from '@/types';

/** The 7 loggable workout days, keyed '1'..'7'. */
export const DAYS: DayMeta[] = [
  { key: '1', short: 'Mon', name: 'Lower Strength + Spin', type: 'Strength', chip: 'chip-blue', color: 'blue' },
  { key: '2', short: 'Tue', name: 'Indoor Intervals', type: 'Ride', chip: 'chip-cyan', color: 'cyan' },
  { key: '3', short: 'Wed', name: 'Dawn Nine', type: 'Golf', chip: 'chip-green', color: 'green' },
  { key: '4', short: 'Thu', name: 'Upper Rebuild', type: 'Strength', chip: 'chip-blue', color: 'blue' },
  { key: '5', short: 'Fri', name: 'Outdoor Endurance', type: 'Ride', chip: 'chip-cyan', color: 'cyan' },
  { key: '6', short: 'Sat', name: 'Long Ride', type: 'Ride', chip: 'chip-cyan', color: 'cyan' },
  { key: '7', short: 'Sun', name: 'Golf + Recovery', type: 'Golf', chip: 'chip-green', color: 'green' },
];

/** Reference panels — not loggable. */
export const REF: DayMeta[] = [
  { key: 'log', short: 'Log', name: 'Workout History', type: 'Log', chip: 'chip-green', color: 'green' },
  { key: 'fuel', short: 'Fuel', name: 'Macros & Nutrition', type: 'Reference', chip: 'chip-green', color: 'green' },
  { key: 'about', short: 'About', name: 'Program info', type: 'Reference', chip: 'chip-dim', color: 'dim' },
];

export const COLORS: Record<DayColor, string> = {
  blue: '#5b8def',
  cyan: '#22d3ee',
  amber: '#f59e0b',
  violet: '#a78bfa',
  green: '#34d399',
  dim: '#5f6877',
};

/** Maps a JS weekday (0=Sun..6=Sat) to a workout key '1'..'7'. */
export function todayDayKey(): string {
  const jsDay = new Date().getDay();
  const map: Record<number, string> = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    0: '7',
  };
  return map[jsDay];
}
