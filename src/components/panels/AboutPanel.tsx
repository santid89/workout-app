import { WEEK_AT_GLANCE, ABOUT_ACCORDIONS } from '@/data/reference';
import { Accordion } from '../Accordion';

export function AboutPanel({ active }: { active: boolean }) {
  return (
    <div className={'panel' + (active ? ' active' : '')} id="day-about">
      <div className="container">
        <div className="day-header">
          <div className="day-eyebrow">
            <span className="dot" style={{ background: 'var(--text-muted)' }} />
            Reference
          </div>
          <h1 className="day-title">About</h1>
          <p className="day-sub">
            Goal, philosophy, rotation schedule, and progression rules.
          </p>
        </div>

        <div className="section-title">Goal</div>
        <p className="prose">
          Stay lean and athletic at <b>185–190 lb</b> — as low a body fat as you
          can hold your ~138 lb of lean mass at. Three sports, each doing what
          it’s best at: <b>weightlifting</b> aimed squarely at the upper body —
          back, shoulders, chest, arms — because that’s what builds visible
          shape; <b>cycling</b> (indoor and outdoor) as the aerobic engine, the
          biggest calorie burn, and the de-facto leg training; and <b>golf</b>{' '}
          for the skill, the steps, and the head-space. You’re ~199 lb today, so
          the near-term job is a slow, muscle-sparing cut.
        </p>

        <div className="section-title">How This Is Built</div>
        <p className="prose">
          <b>Combined mornings.</b> Most days stack two things — a lift plus an
          easy spin, golf plus mobility — so all three sports fit one week
          instead of fighting over it. It’s also how you already train.
        </p>
        <p className="prose">
          <b>Built around your clock.</b> Weekday sessions are sized to finish
          and shower by <b>7:30</b>; the long ride and the relaxed round live on
          the weekend, where you just need to be back by around <b>10</b>.
        </p>
        <p className="prose">
          <b>Upper body first.</b> Four short home sessions, three of them
          upper: push (Mon), arms &amp; delts pump (Wed PM), pull (Thu) — chest
          2×, back 2×, delts 3×, arms 3× a week, the frequency that builds
          shape. Legs get one ~15-min essentials block inside Thursday, not a
          day of their own — the bikes already train them 3–4× a week, and
          honestly, leg day was the one you dreaded. Short enough that skipping
          never feels justified.
        </p>
        <p className="prose">
          <b>The shoulder is in Phase B.</b> The{' '}
          <b>2026-06-16 dislocation</b> is past its 6-week mark and pain-free,
          so pressing is back — via the floor press, light and slow, with cuff
          work opening every session. Overhead comes last. See{' '}
          <b>Shoulder — Return to Load</b> below.
        </p>
        <p className="prose">
          <b>Cycling, indoor and outdoor.</b> One hard indoor interval day
          (weather-proof, time-boxed), one outdoor endurance ride, one long
          weekend ride, plus easy flush spins after lifting. FTP is 222W.
        </p>
        <p className="prose">
          <b>Golf counts.</b> Two slots — a fast dawn nine mid-week and a relaxed
          recovery round on the weekend. Walked, it’s real Zone 1–2 volume, not a
          day off.
        </p>

        <div className="section-title">Apartment Dumbbell Setup</div>
        <p className="prose">
          The whole strength program runs on <b>two loadable dumbbell handles
          (~10 lb each)</b> with <b>6×10 lb + 4×5 lb plates</b>, a mat, and a
          small patch of floor. Practical ceiling: <b>~50 lb per hand</b> — and
          both handles can sit at 50 at once (10+10 on each side of one, 10+5+5
          on each side of the other uses every plate). No bench, so pressing
          lives on the floor; no bands, so cuff work uses light plates; no bar
          or pulldown, so rows carry the back. Single-leg and single-arm
          variations, tempo, and pauses are what make 50 lb heavy.
        </p>

        <div className="section-title">Week at a Glance</div>
        {WEEK_AT_GLANCE.map((row) => (
          <div className="week-row" key={row.day}>
            <span className="week-row-day">{row.day}</span>
            <span className="week-row-desc">{row.desc}</span>
          </div>
        ))}

        {ABOUT_ACCORDIONS.map((acc) => (
          <Accordion data={acc} key={acc.title} />
        ))}
      </div>
    </div>
  );
}
