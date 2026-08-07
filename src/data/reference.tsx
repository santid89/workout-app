import type { ReactNode } from 'react';

/* ───────────── FUEL PANEL ───────────── */

export interface FuelStat {
  label: string;
  desc: string;
  value: string;
  muted?: boolean;
}

export const FUEL_STATS: FuelStat[] = [
  { label: 'Daily Calories', desc: '~250 kcal below estimated TDEE', value: '~2,700' },
  { label: 'Protein', desc: '~1 g per lb — non-negotiable on a cut', value: '190 g' },
  { label: 'Fat', desc: 'Floor of ~0.4 g/lb for hormones', value: '75–80 g', muted: true },
  { label: 'Carbs (baseline)', desc: 'Varies by training load — see below', value: '~315 g', muted: true },
];

export interface CarbRow {
  day: string;
  amount: string;
  rest: string;
}

export const CARBS_BY_DAY: CarbRow[] = [
  { day: 'Mon', amount: '~300 g', rest: '— upper push + spin' },
  { day: 'Tue', amount: '~330 g', rest: '— hard indoor intervals' },
  { day: 'Wed', amount: '~330 g', rest: '— heavy gym lower AM + pump PM' },
  { day: 'Thu', amount: '~300 g', rest: '— pull day + optional spin' },
  { day: 'Fri', amount: '~300–340 g', rest: '— ride or golf, scale with length' },
  { day: 'Sat', amount: '~350–450 g', rest: '— long ride, scale with duration' },
  { day: 'Sun', amount: '~250 g', rest: '— golf + recovery' },
];

export interface InfoCard {
  name: string;
  sets?: string;
  note: string;
}

export const AROUND_TRAINING: InfoCard[] = [
  {
    name: 'Pre-Session Meal',
    sets: '60–90 min',
    note: '~30–40 g carbs + ~25 g protein before a lift, the Tuesday intervals, or the Wednesday gym day. Oatmeal + whey, rice + chicken, or similar. Light enough to move on. Dawn rides and golf can go fasted or on a banana + coffee.',
  },
  {
    name: 'Post-Session Meal',
    sets: 'within 60 min',
    note: 'After lifting or a hard ride: ~40–50 g protein + ~60–80 g carbs. Put the bulk of the day’s carbs here. The recovery window is real when you’re training hard in a deficit.',
  },
  {
    name: 'Long-Ride Fueling',
    sets: '60–90 g/hr',
    note: 'Saturday rides over 2 hr: take carbs on the bike — bars, gels, or a sports drink — from the first hour, not when you fade. As the century build stretches past 3 hr this stops being optional; bonking a 4-hr ride wrecks the whole weekend and the next week’s training.',
  },
];

export const CHECK_YOURSELF: InfoCard[] = [
  {
    name: 'Weekly',
    note: 'Starting ~197 lb. The 7-day average weight should trend down ~0.3–0.45 lb. Stalled 2+ weeks → drop calories 100–150. Losing >0.6 lb/week → eat more; that pace will cost lean mass.',
  },
  {
    name: 'DEXA',
    sets: 'Aug 2026',
    note: 'The scan is due this month and it’s the deciding vote: lean mass holds at ~138 lb, with legs and trunk — the regions that lost last time — flat or up. Lean down again → the deficit is too aggressive; bump calories 150–200 and re-check. Three lift days + 190 g protein + creatine exist to keep this number flat.',
  },
  {
    name: 'Target',
    sets: '188 lb',
    note: 'Hold 185–190 lb as lean as possible — target ~188 by 2026-12-31 at ~138 lb lean / ~42 lb fat / 8 lb bone ≈ 22% body fat. From ~197 that’s ~9 lb over ~21 weeks, ~0.43 lb/week — slow and muscle-sparing on purpose.',
  },
];

/* ───────────── ABOUT PANEL ───────────── */

export interface WeekRow {
  day: string;
  desc: ReactNode;
}

export const WEEK_AT_GLANCE: WeekRow[] = [
  { day: 'Mon', desc: 'Home · Upper push — floor press rotation, delts, triceps (+ spin)' },
  { day: 'Tue', desc: 'Home · Indoor intervals (Zwift, FTP 254) + mat core' },
  { day: 'Wed', desc: 'Away · Building gym: heavy lower + trunk AM · arms pump PM' },
  { day: 'Thu', desc: 'Home · Upper pull — rows, rear delts, traps + swing finisher' },
  { day: 'Fri', desc: 'Away · Outdoor Z2 ride (default) or dawn nine' },
  { day: 'Sat', desc: 'Long ride — century build, 2–4½ hr and growing' },
  { day: 'Sun', desc: 'Golf relaxed round + cuff maintenance + mobility' },
];

export interface AccordionItemData {
  h4: string;
  body: ReactNode;
}

export interface AccordionData {
  title: string;
  items: AccordionItemData[];
}

export const ABOUT_ACCORDIONS: AccordionData[] = [
  {
    title: 'Shoulder — Return to Load',
    items: [
      {
        h4: 'Where this sits',
        body: (
          <>
            Shoulder dislocation on <b>2026-06-16</b>. Early August is week 7–8:{' '}
            <b>pain-free, Phase B active</b>, with the Phase C gate opening
            around mid-August if the floor press keeps feeling solid. Cycling
            and golf continued throughout; only loaded lifting paused. This
            isn’t medical advice — let your PT gate each step up.
          </>
        ),
      },
      {
        h4: 'Phase A — done',
        body: 'Weeks 0–6: rotator-cuff + scapular work only, no pressing, nothing overhead, while legs, core, cycling and golf carried the week. Its habits stay: every press session still opens with the cuff warm-up (side-lying external rotations + prone Y-T-W), and Sunday keeps a maintenance dose.',
      },
      {
        h4: 'Phase B — now (wks 6–9)',
        body: 'The floor press rotation on Monday is the comeback lift: light (~20–25 lb/hand), higher reps, slow progression, floor-protected range. Rows, curls and triceps work are unrestricted; lateral raises stay light, to shoulder height, pain-free range only. Nothing overhead yet. Any sharp pain or instability → back to Phase A for a week.',
      },
      {
        h4: 'Phase C — next (wks 9–12)',
        body: 'Once the floor press is solid and pain-free for a few weeks, add the half-kneeling single-arm press (the gated card on Monday) — the overhead comeback step. Strict two-arm overhead pressing comes after that, and only once fully stable.',
      },
      {
        h4: 'The gym day and the shoulder',
        body: (
          <>
            Wednesday downstairs is <b>shoulder-neutral by design</b>: leg press
            instead of back squat on purpose, because the low-bar rack grip is
            the abducted, externally-rotated position that re-dislocates
            shoulders. Grip stays at your sides on everything. And yes, the gym
            has benches and shoulder machines — <b>they stay off-limits</b>{' '}
            until the home pressing progression clears Phase C. The equipment
            doesn’t gate the return; the shoulder does.
          </>
        ),
      },
      {
        h4: 'Non-negotiables',
        body: (
          <>
            Pain-free range, always. Re-dislocation risk is highest with the arm{' '}
            <b>abducted and externally rotated</b> (the throwing / “cocked”
            position) — respect it. Sharp pain or a feeling of instability means
            stop and regress. Get a PT’s sign-off before anything overhead.
          </>
        ),
      },
    ],
  },
  {
    title: '3-Week Rotation Schedule',
    items: [
      {
        h4: 'Mon — Floor Press',
        body: 'Week A: Neutral-Grip DB Floor Press · Week B: Standard-Grip DB Floor Press · Week C: Single-Arm Floor Press. The one rotating main lift — floor-protected range while the shoulder finishes rebuilding.',
      },
      {
        h4: 'Legs moved downstairs',
        body: (
          <>
            The old 15-min Thursday leg block is retired as the main leg work.
            The May DEXA showed <b>legs −2.0 lb and trunk −3.7 lb of lean</b>{' '}
            despite riding 3–4× a week — Z2 volume doesn’t hold muscle in a
            deficit; load does. Wednesday’s building-gym day (leg press, RDL,
            split squats, curls, trunk) is the fix. The old block — goblet
            squat, DB RDL, heavy swings — survives as the <b>at-home fallback</b>{' '}
            for weeks the gym morning dies.
          </>
        ),
      },
      {
        h4: 'Cycle Start',
        body: (
          <>
            Week A begins the week of <b>2026-05-25</b>. Track the current week
            in your log. After Week C, restart at Week A. Accessories stay the
            same each week — only the main lift rotates.
          </>
        ),
      },
    ],
  },
  {
    title: 'Cycling — Indoor & Outdoor',
    items: [
      {
        h4: 'Tuesday — Indoor Intervals',
        body: 'The one hard, structured session, at home on the Zwift Ride. Sweet spot 3 × 12 min @ 224–234W (weeks A/C) or VO₂ 5 × 3 min @ 275–295W (week B). Weather-proof, kid-duty-proof, and time-boxed for the weekday slot.',
      },
      {
        h4: 'The ERG rule',
        body: (
          <>
            ERG mode is for warm-ups, easy spins and Zone 2 <b>only</b>. Sweet
            spot and VO₂ blocks ride in level mode: when fatigue drops your
            cadence, ERG answers by raising the force, and the spiral buries
            the interval. Hold the watts yourself.
          </>
        ),
      },
      {
        h4: 'Friday — Outdoor Endurance (the default)',
        body: '60–75 min mostly Zone 2 on the Tarmac SL8 — HR 120–148, ~142–190W. Dawn start, home by 7:30. Kept deliberately easy so Saturday’s long ride gets fresh legs. This slot trades with the dawn nine; from September, the bike should win most weeks.',
      },
      {
        h4: 'Saturday — Long Ride',
        body: '2–4½ hr outdoor and growing — the century build lives here. Zone 2 (~142–190W), +15–20 min a week, every 4th week cut back. See Century Countdown below for the full schedule.',
      },
      {
        h4: 'Easy Flush Spins',
        body: '15–20 min Zone 2 (~140–165W) right after Monday’s lift, and optionally Thursday’s. Clears the legs and adds a little burn without adding fatigue. First thing to cut against the 7:30 clock.',
      },
      {
        h4: 'FTP',
        body: 'Currently 254W (Garmin, retested 2026-08-02 — up from 222 this spring; every watt target in the app was rebuilt off the new number). Re-test every 6–8 weeks via a Zwift ramp test — a century block this long will move it again, and stale zones make hard days too easy and easy days too hard.',
      },
    ],
  },
  {
    title: 'Century Countdown',
    items: [
      {
        h4: 'The goal',
        body: (
          <>
            A comfortable <b>100-mile ride by year-end</b>. Comfort is built,
            not summoned: the Saturday ride grows ~15–20 min a week from
            today’s ~2 hr to a 4½–5 hr capstone, and then the century is just
            one more rung — not a leap.
          </>
        ),
      },
      {
        h4: 'August — Build',
        body: 'Saturdays 2 → 3 hr (35–50 mi), Zone 2 with terrain. Every 4th week cut to ~60% and absorb. Keep Tuesday intervals honest — FTP is what makes 100 miles at Zone 2 feel easy.',
      },
      {
        h4: 'September — Extend',
        body: 'Saturdays 3 → 4 hr (50–65 mi). Rehearse century-day fueling for real: 60–90 g carbs/hr, the bottles and food you’ll actually carry. These rides will start outrunning the back-by-10 rule — pre-negotiate those mornings on the family calendar.',
      },
      {
        h4: 'October — Peak',
        body: 'The capstone: 4½–5 hr / 70–80 mi by mid-to-late October. If it goes well, the century window opens — a crisp late-October or November morning beats gambling on December weather.',
      },
      {
        h4: 'Century day + fallback',
        body: 'Easy week before: Tuesday becomes a few short openers, Friday a gentle spin. Ride it at conversational Zone 2 (~142–175W), eat every 30 minutes from the start, and stop when you need to — a comfortable century with two café stops still counts. If weather kills the window, the deadline is 12-31 and an indoor century counts if it must.',
      },
    ],
  },
  {
    title: 'Golf & the Away-Day Math',
    items: [
      {
        h4: 'Why golf shares a slot now',
        body: (
          <>
            Three weekday mornings are apartment-bound, and one of the two away
            mornings went to the gym — the DEXA made that call, not preference.
            So weekday golf now <b>shares Friday with the outdoor ride</b>{' '}
            instead of owning Wednesday. Sunday is untouched.
          </>
        ),
      },
      {
        h4: 'Friday — the trade',
        body: 'Same drill as the old Wednesday: tee off ~5:30, a fast walked nine (~7–8k steps), range + short game as the backup, home by 7:30. Take it freely in August; from September, bias Fridays to the bike and let the century have the miles — it gives the slot back in November.',
      },
      {
        h4: 'Sunday — the relaxed slot',
        body: 'Nine or a full eighteen, no clock pressure. Low intensity the day after the long ride makes it double as active recovery, paired with cuff maintenance and a real mobility block once you’re home.',
      },
      {
        h4: 'Why it stays in the plan',
        body: 'Because it’s the sport you actually get up for, and walked golf is genuine easy aerobic volume. Balance across golf, cycling and lifting is still the point — the ratio just tilts toward the bike until the century is banked.',
      },
    ],
  },
  {
    title: 'Progression & Recovery',
    items: [
      {
        h4: 'Double Progression (the DB rule)',
        body: (
          <>
            Every lift has a rep range. Start at the bottom, add reps session to
            session; when <b>all sets</b> hit the top of the range cleanly, add
            weight and reset to the bottom. Plate steps per hand: 10 (empty) →
            20 → 30 → 40 → 50 lb; a single pair of 5s buys the half-step when a
            full jump is too big.
          </>
        ),
      },
      {
        h4: 'At the 50 lb Ceiling (home days)',
        body: 'Both handles max at ~50 lb (that combination uses every plate). When a home lift owns 50s at the top of its range, the load lever is gone — so pull the other ones: 3-sec negatives, pause reps, 1½ reps, single-limb versions, shorter rest. Rep quality is the progression, not the number on the handle.',
      },
      {
        h4: 'Downstairs, the ceiling is gone',
        body: 'The gym day runs the same double progression but with real steps — 5–10 lb a week on the leg press and RDL. Those two are meant to get genuinely heavy over the fall; that is the entire reason an away morning is spent on them. Log the top set every week so the trend is visible.',
      },
      {
        h4: 'Why Tue + Wed stack back-to-back',
        body: 'Hard intervals Tuesday, heavy legs Wednesday — deliberately adjacent. Consolidating the stress keeps Thursday and Friday genuinely easy, so Saturday’s long ride starts on recovered legs. If Wednesday’s warm-up sets feel like concrete, that’s a signal to take next Tuesday as the Z2 fallback — not a reason to skip the gym.',
      },
      {
        h4: 'Combining on Low-Time Days',
        body: 'The stacked days flex: do the primary, shed the add-on — never skip the whole day. Tight before 7:30? Lift only and drop the spin; ride the intervals, skip the core. Gym morning dies (sick kid, schedule flip)? Run the at-home fallback leg block — goblet squats, DB RDLs, heavy swings, ~15 min — and slide the away day elsewhere in the week if one’s still free. The arms pump floats to any evening.',
      },
      {
        h4: 'Recovery Management',
        body: 'Watch the recovery scores weekly — sleep score and body battery have both dipped lately, so this is live. Trending down 5+ days → soften Tuesday to Zone 2 first, then trim Saturday’s duration. The Wednesday gym day and the Saturday long ride are the last things to cut — they serve the two goals directly. A red morning → Sunday becomes a full rest day.',
      },
      {
        h4: 'Next Check-In',
        body: 'August 2026 DEXA — due now. The deciding vote on the whole design: lean holds at ~138 lb with legs and trunk flat or up = the deficit and the new leg day are working. Pair it with the planned fasted morning panel.',
      },
    ],
  },
];
