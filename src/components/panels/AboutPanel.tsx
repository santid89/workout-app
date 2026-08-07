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
          Two targets by year-end: <b>~188 lb with the ~138 lb of lean mass
          held</b>, and a <b>comfortable 100-mile ride</b>. Three sports, each
          doing what it’s best at: <b>weightlifting</b> for the upper-body
          shape the bikes can’t build — and now for the legs and trunk the
          DEXA says were slipping; <b>cycling</b> (indoor and outdoor) as the
          aerobic engine, the biggest calorie burn, and the road to the
          century; and <b>golf</b> for the skill, the steps, and the
          head-space. You’re ~197 lb today, so the near-term job is a slow,
          muscle-sparing cut.
        </p>

        <div className="section-title">How This Is Built</div>
        <p className="prose">
          <b>Home mornings vs away mornings.</b> Three weekday dawns are
          apartment-bound now — she’s at the 6 a.m. class, you’re on kid duty —
          so those days run entirely on the dumbbells, the mat and the Zwift
          Ride. Two weekday mornings you can leave: one goes to the{' '}
          <b>building gym</b>, one to the <b>road or the tee</b>. Weekends are
          open as before. Wed/Fri are placeholders — slide the away days to
          whichever mornings she’s home and keep the pattern: gym mid-week,
          ride-or-golf next to the weekend.
        </p>
        <p className="prose">
          <b>Combined mornings.</b> Most days stack two things — a lift plus an
          easy spin, gym plus an evening pump — so all three sports fit one week
          instead of fighting over it. It’s also how you already train.
        </p>
        <p className="prose">
          <b>Built around your clock.</b> Weekday sessions are sized to finish
          and shower by <b>7:30</b>; the long ride and the relaxed round live on
          the weekend, where you just need to be back by around <b>10</b> — with
          the long-ride mornings stretching past that by fall, pre-negotiated.
        </p>
        <p className="prose">
          <b>Upper body at home, legs downstairs.</b> The dumbbells keep the
          upper-body frequency that builds shape — chest 2×, back 2×, delts 3×,
          arms 3× a week — but legs are no longer subcontracted to the bikes.
          The May DEXA was unambiguous: <b>legs and trunk lost the most lean</b>{' '}
          while riding the most, because Zone 2 volume doesn’t hold muscle in a
          deficit — load does. Wednesday’s heavy gym morning (leg press, RDL,
          split squats, trunk work) is the fix a 50-lb dumbbell ceiling can’t
          be.
        </p>
        <p className="prose">
          <b>The shoulder is in Phase B.</b> The{' '}
          <b>2026-06-16 dislocation</b> is past its 6-week mark and pain-free,
          so pressing is back — via the floor press, light and slow, with cuff
          work opening every session. Overhead comes last, and the gym day is
          deliberately shoulder-neutral. See{' '}
          <b>Shoulder — Return to Load</b> below.
        </p>
        <p className="prose">
          <b>Cycling, indoor and outdoor.</b> One hard indoor interval day
          (weather-proof and kid-duty-proof), one outdoor endurance slot, one
          long weekend ride growing toward the century, plus easy flush spins
          after lifting. FTP is <b>254W</b> (retested 2026-08-02) — every watt
          target in the app is built off it.
        </p>
        <p className="prose">
          <b>Golf counts.</b> One guaranteed slot (the relaxed Sunday round)
          plus the Friday trade against the outdoor ride. Walked, it’s real
          Zone 1–2 volume, not a day off.
        </p>

        <div className="section-title">Apartment Dumbbell Setup</div>
        <p className="prose">
          Home-day strength runs on <b>two loadable dumbbell handles
          (~10 lb each)</b> with <b>6×10 lb + 4×5 lb plates</b>, a mat, and a
          small patch of floor. Practical ceiling: <b>~50 lb per hand</b> — and
          both handles can sit at 50 at once (10+10 on each side of one, 10+5+5
          on each side of the other uses every plate). No bench, so pressing
          lives on the floor; no bands, so cuff work uses light plates; no bar
          or pulldown, so rows carry the back. Single-leg and single-arm
          variations, tempo, and pauses are what make 50 lb heavy.
        </p>

        <div className="section-title">The Building Gym</div>
        <p className="prose">
          Wednesday’s away morning uses the full gym downstairs — racks,
          machines, cables, real plates — and it exists in this program for one
          reason: <b>progressive overload for legs and trunk</b>, the regions
          the dumbbells can’t load and the DEXA says need it. The commute is an
          elevator, so a 50-minute session still beats the 7:30 shower.
          Shoulder rules ride along: grip at your sides, nothing overhead, no
          back-squat rack position until Phase C clears. If the gym morning
          dies, the old at-home leg block (goblet squat, DB RDL, heavy swings)
          is the fallback.
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
