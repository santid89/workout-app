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
  { label: 'Protein', desc: '1.1 g per lb — non-negotiable', value: '220 g' },
  { label: 'Fat', desc: 'Floor of ~0.4 g/lb for hormones', value: '75–80 g', muted: true },
  { label: 'Carbs (baseline)', desc: 'Varies by training load — see below', value: '285 g', muted: true },
];

export interface CarbRow {
  day: string;
  amount: string;
  rest: string;
}

export const CARBS_BY_DAY: CarbRow[] = [
  { day: 'Mon', amount: '~340 g', rest: '— squat heavy day' },
  { day: 'Tue', amount: '~285 g', rest: '— upper push' },
  { day: 'Wed', amount: '~285–340 g', rest: '— scale with ride duration' },
  { day: 'Thu', amount: '~285 g', rest: '— power day' },
  { day: 'Fri', amount: '~340 g', rest: '— deadlift heavy day' },
  { day: 'Sat', amount: '~340–400 g', rest: '— long ride, scale with duration' },
  { day: 'Sun', amount: '~220 g', rest: '— recovery day' },
];

export interface InfoCard {
  name: string;
  sets?: string;
  note: string;
}

export const AROUND_TRAINING: InfoCard[] = [
  {
    name: 'Pre-Lift Meal',
    sets: '60–90 min',
    note: '~30–40 g carbs + ~25 g protein. Oatmeal + whey, rice + chicken, or similar. Light enough to lift on.',
  },
  {
    name: 'Post-Lift Meal',
    sets: 'within 60 min',
    note: "~40–50 g protein + ~60–80 g carbs. Eat the bulk of the day's carbs here. Recovery window is real for heavy lifting.",
  },
  {
    name: 'Long Ride Fueling',
    sets: '50–80 g/hr',
    note: 'Saturday rides over 90 min: take carbs on the bike. Bars, gels, or a sports drink. Bonking on a 2-hr Z2 ride sets recovery back days.',
  },
];

export const CHECK_YOURSELF: InfoCard[] = [
  {
    name: 'Weekly',
    note: '7-day average weight should trend down ~0.3–0.4 lb. Stalled for 2+ weeks → drop calories 100–150. Losing >0.6 lb/week → eat more (that pace will cost lean mass).',
  },
  {
    name: 'DEXA',
    sets: 'Jul/Aug 2026',
    note: 'Primary check: lean mass holds at ~138 lb. If lean drops more than ~1 lb between scans, the deficit is too aggressive — bump calories up by 150–200 and re-check.',
  },
  {
    name: 'End-of-Year Goal',
    sets: '188 lbs',
    note: 'Target: 188 lbs by 2026-12-31 at ~138 lb lean / ~42 lb fat / 8 lb bone ≈ 22% body fat. ~11 lb of fat over ~32 weeks.',
  },
];

/* ───────────── ABOUT PANEL ───────────── */

export interface WeekRow {
  day: string;
  desc: ReactNode;
}

export const WEEK_AT_GLANCE: WeekRow[] = [
  { day: 'Mon', desc: 'Lower Power (Squat) + optional Z2 spin' },
  { day: 'Tue', desc: 'Upper Push & Press (Bench) + optional Z2 spin' },
  { day: 'Wed', desc: 'Ride day (60–90 min, outdoor goal)' },
  { day: 'Thu', desc: 'Power & Athletic (Cleans) + optional Z2 spin' },
  { day: 'Fri', desc: 'Posterior & Pull (Deadlift) + optional Z2 spin' },
  { day: 'Sat', desc: 'Long ride (1.5–3 hr, outdoor goal)' },
  { day: 'Sun', desc: 'Recovery: yoga, mobility, stretching' },
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
    title: '3-Week Rotation Schedule',
    items: [
      {
        h4: 'Mon — Squat',
        body: 'Week A: Back Squat · Week B: Front Squat · Week C: Tempo Back Squat (3-sec descent + pause).',
      },
      {
        h4: 'Tue — Bench Press',
        body: 'Week A: Standard Barbell Bench · Week B: Close-Grip Bench · Week C: Floor Press.',
      },
      {
        h4: 'Fri — Deadlift',
        body: 'Week A: Conventional · Week B: Deficit (1–1.5" plate) · Week C: Snatch-Grip.',
      },
      {
        h4: 'Cycle Start',
        body: (
          <>
            Week A begins the week of <b>2026-05-25</b>. Track the current week in
            your training log. After Week C, restart at Week A. Accessory lifts
            stay the same each week — only the main lift rotates.
          </>
        ),
      },
    ],
  },
  {
    title: 'Cycling Guidelines',
    items: [
      {
        h4: 'Wednesday — Dedicated Ride',
        body: 'Outdoor preferred, 60–90 min, mostly Z2. Indoor backup: Zwift sweet spot or tempo intervals, 45–60 min. FTP: 180W.',
      },
      {
        h4: 'Saturday — Long Signature Ride',
        body: '1.5–3 hr, outdoor. Build slowly. This is where most of the cycling fitness lives.',
      },
      {
        h4: 'Optional Post-Lift Spins (Mon, Tue, Thu, Fri)',
        body: '20–30 min easy. Skip without guilt if short on time or recovery is low. Counts toward the 4+ outdoor weekly target when done outside.',
      },
      {
        h4: 'Weekly Outdoor Target',
        body: '4+. Wed + Sat = 2 baseline. Hit 2 more on lift days when weather allows. Track in Strava.',
      },
    ],
  },
  {
    title: 'Progression & Recovery',
    items: [
      {
        h4: 'Main Lifts',
        body: "Add 5 lbs to a main lift once you've completed its sets/reps cleanly on two consecutive A-rotations of that movement (i.e., across two full 3-week cycles for the same variation). Don't chase weight inside a cycle.",
      },
      {
        h4: 'Accessories',
        body: 'When the top set hits the upper end of its rep range cleanly, add weight next session. Barbell: +5 lbs. Dumbbell: +2.5 lbs per hand.',
      },
      {
        h4: 'Machines & Cables',
        body: 'Run the pin stack one plate at a time: when the top set hits the upper end of its rep range cleanly across all sets, move up one. On cable moves (face pull, Pallof, reverse fly) prioritize control over load — if form breaks, drop a plate.',
      },
      {
        h4: 'Cycling',
        body: 'Re-test FTP every 6–8 weeks via Zwift ramp test. Adjust zones.',
      },
      {
        h4: 'Recovery Management',
        body: 'Monitor Whoop weekly. If recovery trends down 5+ days, drop the Wednesday ride to recovery pace first, then de-load the Friday deadlift. Saturday’s long ride and Monday’s squat are the last things to cut.',
      },
      {
        h4: 'Next Check-In',
        body: 'DEXA scan in July or August 2026.',
      },
    ],
  },
];
