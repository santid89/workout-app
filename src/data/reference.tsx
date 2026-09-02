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
  { day: 'Mon', amount: '~320 g', rest: '— heavy lower: squat' },
  { day: 'Tue', amount: '~330 g', rest: '— hard indoor intervals' },
  { day: 'Wed', amount: '~300 g', rest: '— upper push / pull' },
  { day: 'Thu', amount: '~320 g', rest: '— heavy lower: deadlift' },
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
    note: '~30–40 g carbs + ~25 g protein before a gym morning or the Tuesday intervals. Oatmeal + whey, rice + chicken, or similar. Light enough to move on. Dawn rides and golf can go fasted or on a banana + coffee.',
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
    sets: 'Sept 2026',
    note: 'The deciding vote: lean mass holds at ~138 lb, with legs and trunk — the regions that lost last time — flat or up. Lean down again → the deficit is too aggressive; bump calories 150–200 and re-check. Three heavy gym days + 190 g protein + creatine exist to keep this number flat.',
  },
  {
    name: 'Target',
    sets: '188 lb',
    note: 'Hold 185–190 lb as lean as possible — target ~188 by 2026-12-31 at ~138 lb lean / ~42 lb fat / 8 lb bone ≈ 22% body fat. From ~197 that’s ~9 lb over ~17 weeks, ~0.5 lb/week — slow and muscle-sparing on purpose.',
  },
  {
    name: 'After the century',
    sets: 'Nov →',
    note: 'The deficit holds until the century is banked. From November, move to maintenance (~2,950 kcal) with protein unchanged: a rugby build needs lean mass to go up, and that only happens once the cut and the long rides stop competing for it. Re-check DEXA in January.',
  },
];

/* ───────────── ABOUT PANEL ───────────── */

export interface WeekRow {
  day: string;
  desc: ReactNode;
}

export const WEEK_AT_GLANCE: WeekRow[] = [
  { day: 'Mon', desc: 'Gym · Lower A — back squat + 4 supersets (posterior chain, quads, trunk)' },
  { day: 'Tue', desc: 'Home · Indoor intervals (Zwift, FTP 254) + mat core' },
  { day: 'Wed', desc: 'Gym · Upper — bench + 4 push/pull supersets' },
  { day: 'Thu', desc: 'Gym · Lower B — deadlift + 3 supersets (glutes, traps & neck, carries)' },
  { day: 'Fri', desc: 'Outdoor Z2 ride (default) or dawn nine' },
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
    title: 'The Lifting Plan',
    items: [
      {
        h4: 'The target',
        body: (
          <>
            A rugby build: <b>legs, glutes, back thickness, traps and neck</b>,
            with a dense chest on top. That comes from heavy compound lifts and
            a lot of pulling, so two of the three gym days are lower-body and
            every day is anchored by a barbell lift.
          </>
        ),
      },
      {
        h4: 'Session template',
        body: 'Same shape every lift day, about 50 minutes: one anchor lift as straight sets with 3 min rest, then three or four supersets of three rounds each with 60–75 sec between rounds. The anchor is never superset — heavy squats and deadlifts need full rest.',
      },
      {
        h4: 'Supersets',
        body: 'A1 and A2 are done back to back, then rest, then the next round. Pairs are antagonists (push with pull) or unrelated regions (hinge with lunge, calves with trunk), so neither lift steals from the other. Direct arm work lives inside the Wednesday pairs — there is no separate pump session.',
      },
      {
        h4: 'Progression',
        body: (
          <>
            <b>Anchors:</b> add the stated load when every set is clean; miss
            twice, drop 10% and rebuild. <b>Supersets:</b> add weight when all
            rounds hit the top of the range. Log the anchor top set every week
            so the trend is visible.
          </>
        ),
      },
      {
        h4: 'The 4-week block',
        body: 'Weeks 1–3 build. Week 4 is the cut-back, matching the long-ride cut-back: anchors at 3 × 5 with 85%, supersets at two rounds, Tuesday intervals become Zone 2.',
      },
      {
        h4: 'The gym',
        body: 'Rack and barbell, bench, dumbbells, cables, leg press, leg curl, pull-up bar. Where a lift usually wants special kit the notes give the plain-gym version and what to swap in if it exists: trap bar for the deadlift, a neck harness for the plate work.',
      },
    ],
  },
  {
    title: 'Shoulder — Phase C',
    items: [
      {
        h4: 'Where this sits',
        body: (
          <>
            Shoulder dislocation on <b>2026-06-16</b>. September is week 11–12:{' '}
            <b>little to no pain, Phase C active</b>. Barbell bench and the bar
            on the back are allowed; strict overhead is the last gate. Not
            medical advice — let your PT gate each step up.
          </>
        ),
      },
      {
        h4: 'Gates',
        body: 'Landmine press until 8 reps/side are pain-free for 3 weeks, then strict barbell overhead press replaces it in the Wednesday A superset. Any sharp pain on a press: dumbbell version that session, no debate. Bar position bothers the shoulder on squats: front squat, cross-arm grip.',
      },
      {
        h4: 'What stays',
        body: 'The cuff warm-up opens every Wednesday and Sunday keeps a maintenance dose. Face pulls and lateral raises are in the plan for the joint as much as for the look.',
      },
      {
        h4: 'Non-negotiables',
        body: (
          <>
            Pain-free range, always. Re-dislocation risk is highest with the arm{' '}
            <b>abducted and externally rotated</b> — respect it. Sharp pain or
            instability means stop and regress.
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
        body: 'The one hard, structured session, at home on the Zwift Ride. Sweet spot 3 × 12 min @ 224–234W in weeks 1–2, VO₂ 5 × 3 min @ 275–295W in week 3, Zone 2 in the cut-back week 4. Weather-proof and time-boxed for the weekday slot.',
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
    title: 'Golf',
    items: [
      {
        h4: 'Friday — the trade',
        body: 'Tee off ~5:30, a fast walked nine (~7–8k steps), range + short game as the backup, home by 7:30. From September, bias Fridays to the bike and let the century have the miles — it gives the slot back in November.',
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
    title: 'Recovery & Scheduling',
    items: [
      {
        h4: 'Why the week is shaped this way',
        body: 'Heavy squat Monday, intervals Tuesday, upper Wednesday, heavy deadlift Thursday. The two heavy lower days sit three days apart, and Friday is deliberately easy so Saturday’s long ride starts on recovered legs. If Thursday’s warm-up sets feel like concrete, take Friday as the indoor Zone 2 backup — not a reason to skip the gym.',
      },
      {
        h4: 'Low-time mornings',
        body: 'Tight before 7:30? Do the anchor lift and the first two supersets, drop the rest — never skip the whole day. Gym morning dies? Slide the session to the next free weekday and keep the order: squat day before deadlift day.',
      },
      {
        h4: 'Recovery management',
        body: 'Watch the recovery scores weekly. Trending down 5+ days → soften Tuesday to Zone 2 first, then trim Saturday’s duration. The two heavy lower days and the Saturday long ride are the last things to cut — they serve the two goals directly. A red morning → Sunday becomes a full rest day.',
      },
      {
        h4: 'Next check-in',
        body: 'September 2026 DEXA. The deciding vote: lean holds at ~138 lb with legs and trunk flat or up = the deficit and the heavy lower days are working. Then the November switch to maintenance, and a January re-scan to see what the rugby block built.',
      },
    ],
  },
];
