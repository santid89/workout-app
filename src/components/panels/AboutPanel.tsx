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
            Goal, how the week is built, the lifting plan, and the rules.
          </p>
        </div>

        <div className="section-title">Goal</div>
        <p className="prose">
          Two targets by year-end:{' '}
          <b>~188 lb with the ~138 lb of lean mass held</b>, and a{' '}
          <b>comfortable 100-mile ride</b>. Behind both sits the longer one: a{' '}
          <b>rugby build</b> — legs, glutes, a thick back, traps and neck, a
          dense chest. Lifting is pointed at that; cycling is the aerobic engine
          and the road to the century; golf is the skill, the steps and the
          head-space. You’re ~197 lb today, so the near-term job is a slow,
          muscle-sparing cut — and from November, once the century is banked,
          maintenance calories so the lifting has something to build with.
        </p>

        <div className="section-title">How This Is Built</div>
        <p className="prose">
          <b>Three gym mornings.</b> The building gym is open to every weekday
          dawn again, so all three lift days moved downstairs and were rebuilt
          from scratch: <b>Lower A</b> (squat) Monday, <b>Upper</b> (bench,
          push/pull) Wednesday, <b>Lower B</b> (deadlift, traps, neck, carries)
          Thursday. Two lower days out of three is deliberate — the May DEXA
          lost the most lean in legs and trunk, and rugby legs are the point.
        </p>
        <p className="prose">
          <b>One shape, every lift day.</b> A heavy anchor lift as straight sets
          with full rest, then three or four <b>supersets</b> done A1/A2 back to
          back. About 50 minutes, showered by <b>7:30</b>. Anchor lifts are
          fixed and progress by load; nothing rotates.
        </p>
        <p className="prose">
          <b>Notes are one line.</b> Setup, the one cue that matters, tempo, how
          to progress. The reasoning lives here in About, not on the cards.
        </p>
        <p className="prose">
          <b>The bike is untouched.</b> Hard intervals Tuesday, the outdoor ride
          or the dawn nine Friday, the long ride Saturday growing toward the
          century. FTP is <b>254W</b> (retested 2026-08-02) — every watt target
          in the app is built off it. Everything runs on a 4-week block: three
          weeks build, the fourth cuts back, on the bike and in the gym
          together.
        </p>
        <p className="prose">
          <b>The shoulder is in Phase C.</b> The <b>2026-06-16 dislocation</b>{' '}
          is past week 11 with little to no pain, so barbell bench and the bar
          on the back are in. Strict overhead is the last gate, reached through
          the landmine press. See <b>Shoulder — Phase C</b> below.
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
