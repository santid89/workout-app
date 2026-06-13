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
          Build an elite-rugby-player body:{' '}
          <b>strong, powerful, athletic, durable</b>. Heavy compound lifts,
          Olympic lift derivatives, posterior chain bias, grip work, loaded
          carries, jumps. Not bodybuilding-isolation, not pure powerlifting.
          Athletic strength.
        </p>
        <p className="prose">
          Cycling provides the aerobic engine and burns the calories —
          weather-driven now that summer's here, with 4+ outdoor rides as the
          weekly target.
        </p>

        <div className="section-title">How This Differs from the Old Program</div>
        <p className="prose">
          <b>4 strength days, not 5.</b> Frees up Wednesday for a dedicated ride
          and gives the body real recovery slack.
        </p>
        <p className="prose">
          <b>Lower reps, heavier loads.</b> Main lifts run 3–6 reps (was 6–12).
          Strength bias for the rugby physique.
        </p>
        <p className="prose">
          <b>3-week movement rotation.</b> Each main lift cycles through three
          variations — same structure, different stimulus.
        </p>
        <p className="prose">
          <b>Olympic lift derivatives in, isolation out.</b> Hang cleans + push
          press anchor Thursday. No standalone skull crushers or curls — arms
          get hit through compounds.
        </p>
        <p className="prose">
          <b>Cycling weather-driven.</b> Wed and Sat are dedicated rides.
          Lift-day spins are optional.
        </p>

        <div className="section-title">Building Gym — Equipment Update</div>
        <p className="prose">
          Moved from the home gym to the building's gym. It has a{' '}
          <b>full rack and benches</b>, so every barbell main lift — squat,
          bench, overhead press, deadlift — and the Thursday Olympic work stay
          exactly as they were. What changed is the accessories, now that a
          machine circuit and a cable station are on hand.
        </p>
        <p className="prose">
          <b>Lat pulldown in.</b> Friday's DB pullover → lat pulldown. Finally a
          true vertical pull instead of an improvised lat stretch.
        </p>
        <p className="prose">
          <b>Cable station replaces bands.</b> Pallof press (Thu) and face pull
          (Fri) move to the dual adjustable pulley, and the reverse fly (Tue)
          goes cable too — constant tension and a real stack to progress on.
        </p>
        <p className="prose">
          <b>Direct leg machines added.</b> Leg extension caps Monday; seated
          leg curl adds hamstring volume to Friday's posterior-chain work.
        </p>
        <p className="prose">
          <b>Neck harness retired</b> with the home gym. No harness in the
          building gym — revisit if cervical work becomes a priority again.
        </p>
        <p className="prose">
          <b>Machine backups on tap.</b> Leg press (squat-day volume or a
          busy-rack fallback), chest press &amp; shoulder press (pressing when
          the bench/rack is taken), row machine (swap for barbell rows), and the
          dip machine all map cleanly onto the program. The biceps curl machine
          is there if you want it, but the plan still earns arms through
          compounds.
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
