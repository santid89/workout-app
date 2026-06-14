import { useAppStore } from '@/store/useAppStore';
import { PROGRAM } from '@/data/program';
import { todayDayKey } from '@/data/theme';
import { todayStr, currentStreak, weekDates } from '@/lib/date';
import { LogCta } from './LogCta';
import { WeekStrip } from './WeekStrip';
import { ArrowRightIcon } from '@/lib/icons';

/**
 * The home view. Opens on the user's session for today: hero, one-tap log,
 * streak + week totals, and the week strip for jumping to any day.
 */
export function Today({ active }: { active: boolean }) {
  const logs = useAppStore((s) => s.logs);
  const selectDay = useAppStore((s) => s.selectDay);

  const todayKey = todayDayKey();
  const day = PROGRAM.find((d) => d.key === todayKey) ?? PROGRAM[0];

  const loggedDates = new Set(logs.map((l) => l.date));
  const streak = currentStreak(loggedDates);
  const dates = weekDates();
  const weekValues = new Set(Object.values(dates));
  const weekCount = [...loggedDates].filter((d) => weekValues.has(d)).length;
  const doneToday = logs.some(
    (l) => l.workoutKey === todayKey && l.date === todayStr()
  );

  return (
    <div className={'panel day-' + day.color + (active ? ' active' : '')}>
      <div className="container">
        <div className="today-hero">
          <div className="day-eyebrow">
            <span className="dot" />
            {doneToday ? 'Today · Logged' : 'Today · ' + day.eyebrow}
          </div>
          <h1 className="day-title">{day.title}</h1>
          <p className="day-sub">{day.sub}</p>
          {day.tags && (
            <div className="day-tags">
              {day.tags.map((tag, i) => (
                <span className="day-tag" key={i}>
                  {i === 0 && <span className="tag-dot" />}
                  {tag}
                </span>
              ))}
            </div>
          )}

          <LogCta workoutKey={todayKey} />

          <button className="today-open" onClick={() => selectDay(todayKey)}>
            <span>View full workout</span>
            <ArrowRightIcon className="today-open-arrow" />
          </button>
        </div>

        <div className="today-stats">
          <div className="today-stat">
            <div className="today-stat-value">{streak}</div>
            <div className="today-stat-label">Day streak</div>
          </div>
          <div className="today-stat">
            <div className="today-stat-value">{weekCount}</div>
            <div className="today-stat-label">This week</div>
          </div>
          <div className="today-stat">
            <div className="today-stat-value">{logs.length}</div>
            <div className="today-stat-label">All time</div>
          </div>
        </div>

        <div className="today-section-label">Your week</div>
        <WeekStrip />

        <button className="today-about" onClick={() => selectDay('about')}>
          About this program
          <ArrowRightIcon className="today-about-arrow" />
        </button>
      </div>
    </div>
  );
}
