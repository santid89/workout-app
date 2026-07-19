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
  { label: 'Protein', desc: '1.1 g per lb — non-negotiable on a cut', value: '220 g' },
  { label: 'Fat', desc: 'Floor of ~0.4 g/lb for hormones', value: '75–80 g', muted: true },
  { label: 'Carbs (baseline)', desc: 'Varies by training load — see below', value: '285 g', muted: true },
];

export interface CarbRow {
  day: string;
  amount: string;
  rest: string;
}

export const CARBS_BY_DAY: CarbRow[] = [
  { day: 'Mon', amount: '~300 g', rest: '— lower strength + spin' },
  { day: 'Tue', amount: '~320 g', rest: '— hard indoor intervals' },
  { day: 'Wed', amount: '~250 g', rest: '— golf, easy walking day' },
  { day: 'Thu', amount: '~300 g', rest: '— upper strength + power' },
  { day: 'Fri', amount: '~300–340 g', rest: '— outdoor ride, scale with length' },
  { day: 'Sat', amount: '~340–420 g', rest: '— long ride, scale with duration' },
  { day: 'Sun', amount: '~230 g', rest: '— golf + recovery' },
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
    note: '~30–40 g carbs + ~25 g protein before a lift or the hard Tuesday intervals. Oatmeal + whey, rice + chicken, or similar. Light enough to move on. Dawn rides and golf can go fasted or on a banana + coffee.',
  },
  {
    name: 'Post-Session Meal',
    sets: 'within 60 min',
    note: 'After lifting or a hard ride: ~40–50 g protein + ~60–80 g carbs. Put the bulk of the day’s carbs here. The recovery window is real when you’re training hard in a deficit.',
  },
  {
    name: 'Long-Ride Fueling',
    sets: '50–80 g/hr',
    note: 'Saturday rides over 90 min: take carbs on the bike — bars, gels, or a sports drink. Bonking on a 2-hr Z2 ride sets recovery back days and wrecks the rest of the weekend.',
  },
];

export const CHECK_YOURSELF: InfoCard[] = [
  {
    name: 'Weekly',
    note: 'Starting ~199 lb. The 7-day average weight should trend down ~0.3–0.4 lb. Stalled 2+ weeks → drop calories 100–150. Losing >0.6 lb/week → eat more; that pace will cost lean mass.',
  },
  {
    name: 'DEXA',
    sets: 'Jul/Aug 2026',
    note: 'Primary check: lean mass holds at ~138 lb. If lean drops more than ~1 lb between scans, the deficit is too aggressive — bump calories 150–200 and re-check. Two lift days + high protein exist to keep this number flat.',
  },
  {
    name: 'Target',
    sets: '185–190 lb',
    note: 'Hold 185–190 lb as lean as possible — target ~188 by 2026-12-31 at ~138 lb lean / ~42 lb fat / 8 lb bone ≈ 22% body fat. From ~199 that’s ~11 lb of fat over the back half of the year — slow and muscle-sparing on purpose.',
  },
];

/* ───────────── ABOUT PANEL ───────────── */

export interface WeekRow {
  day: string;
  desc: ReactNode;
}

export const WEEK_AT_GLANCE: WeekRow[] = [
  { day: 'Mon', desc: 'Lower strength (shoulder-safe squat) + 20-min Z2 flush spin' },
  { day: 'Tue', desc: 'Indoor intervals (Zwift, FTP 222) + core' },
  { day: 'Wed', desc: 'Golf — dawn speed-9 (+ PM mobility)' },
  { day: 'Thu', desc: 'Upper rebuild — cuff/scap rehab + staged pressing return' },
  { day: 'Fri', desc: 'Outdoor endurance ride (Z2, 60–75 min)' },
  { day: 'Sat', desc: 'Long outdoor ride (1.5–2.5 hr, back by ~10)' },
  { day: 'Sun', desc: 'Golf — relaxed round + mobility (active recovery)' },
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
            Shoulder dislocation on <b>2026-06-16</b>, ~6-week rehab → cleared to
            load around <b>2026-07-28</b>. Cycling and golf continued throughout;
            only loaded lifting paused. The plan brings lifting back in stages
            rather than cold. This isn’t medical advice — let your PT gate it.
          </>
        ),
      },
      {
        h4: 'Phase A — now to clearance',
        body: 'Thursday is rotator-cuff + scapular work only — external rotations, band pull-aparts, Y-T-W raises, chest-supported rows. No pressing, nothing overhead. Legs (shoulder-safe squats), core, cycling and golf carry the week.',
      },
      {
        h4: 'Phase B — reintroduce (wks 6–9)',
        body: 'Once cleared and pain-free, add the neutral-grip DB floor press, then the landmine press — light, higher reps, slow progression. Bring the back squat back if the bar-on-back hold is comfortable.',
      },
      {
        h4: 'Phase C — rebuild (wks 9–12)',
        body: 'Controlled-ROM barbell bench and incline pressing return; then the strict overhead press; the push press is last, and only once the shoulder is fully stable. Work back toward normal strength targets.',
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
        h4: 'Mon — Squat (shoulder-safe for now)',
        body: 'Week A: Safety-Bar Squat · Week B: Leg Press · Week C: Goblet Squat — holds that spare the shoulder. The original Back / Front / Tempo back-squat rotation returns once you’re cleared to load the bar on your back (Phase B).',
      },
      {
        h4: 'Thu — Bench Press (on hold)',
        body: 'Paused while the shoulder rebuilds. Pressing comes back through rehab — floor press → landmine → barbell bench. The Barbell / Close-Grip / Floor bench rotation resumes in Phase C.',
      },
      {
        h4: 'The Hinge',
        body: (
          <>
            The heavy deadlift pattern lives inside Monday now as the{' '}
            <b>Romanian deadlift</b>, rather than on its own day. Two lift days
            can’t each carry a full main lift — squat and bench rotate, the
            hinge rides along on leg day.
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
        body: 'The one hard, structured session. Sweet spot 3 × 12 min @ 195–205W (weeks A/C) or VO₂ 5 × 3 min @ 240–260W (week B). FTP 222W. Weather-proof and time-boxed for the weekday slot.',
      },
      {
        h4: 'Friday — Outdoor Endurance',
        body: '60–75 min mostly Zone 2 on the Tarmac SL8 — HR 120–148, ~123–167W. Dawn start, home by 7:30. The base-building, calorie-burning ride.',
      },
      {
        h4: 'Saturday — Long Ride',
        body: '1.5–2.5 hr outdoor, weekend, back by ~10. Build duration slowly. This is where most of the cycling fitness — and the biggest single calorie burn — lives.',
      },
      {
        h4: 'Easy Flush Spins',
        body: '15–20 min Zone 2 (~120–145W) right after Monday’s lift, and optionally Thursday’s. Clears the legs and adds a little burn without adding fatigue. First thing to cut against the 7:30 clock.',
      },
      {
        h4: 'FTP',
        body: 'Currently 222W. Re-test every 6–8 weeks via a Zwift ramp test and update the interval targets above.',
      },
    ],
  },
  {
    title: 'Golf & the Clock',
    items: [
      {
        h4: 'Weekday window — by 7:30',
        body: 'Wednesday is a dawn tee time and a fast, moving nine — walked, for the Zone 1–2 steps. If the tee sheet is slow, the range + short-game area is the backup so you still shower by 7:30.',
      },
      {
        h4: 'Weekend window — back by ~10',
        body: 'Sunday is the relaxed slot: nine or a full eighteen, no clock pressure. Low intensity the day after the long ride makes it double as active recovery, paired with a real mobility session.',
      },
      {
        h4: 'Why it’s in the plan',
        body: 'Two golf slots, because it’s the sport you actually get up for and the walking is genuine easy aerobic volume. Balance across golf, cycling and lifting is the whole point of the redesign.',
      },
    ],
  },
  {
    title: 'Progression & Recovery',
    items: [
      {
        h4: 'Main Lifts',
        body: 'Add 5 lbs to a main lift once you’ve completed its sets/reps cleanly on two consecutive A-rotations of that movement (two full 3-week cycles for the same variation). Don’t chase weight inside a cycle.',
      },
      {
        h4: 'Accessories & Machines',
        body: 'When the top set hits the upper end of its rep range cleanly across all sets, move up — barbell +5 lbs, dumbbell +2.5/hand, machine one pin. On cables (face pull, Pallof) prioritize control over load.',
      },
      {
        h4: 'Combining on Low-Time Days',
        body: 'The stacked days flex. Tight on time before 7:30? Lift only and drop the spin; ride the intervals and skip the core; hit the range instead of playing nine. Do the primary, shed the add-on — never skip the whole day.',
      },
      {
        h4: 'Recovery Management',
        body: 'Monitor Whoop weekly. If recovery trends down 5+ days, soften Tuesday’s intervals to steady Zone 2 first, then trim Saturday’s duration. Monday’s squat and one outdoor ride are the last things to cut. A red day → Sunday becomes a full rest day.',
      },
      {
        h4: 'Next Check-In',
        body: 'DEXA scan in July or August 2026 — the deciding vote on whether the deficit is holding lean mass.',
      },
    ],
  },
];
