import type { WorkoutDay } from '@/types';

/**
 * The full weekly program, as typed data.
 *
 * Design intent (September 2026 rebuild): the building gym is available every
 * weekday morning again, so all three lift days moved downstairs and the
 * program was rebuilt from scratch around a rugby physique — legs, glutes,
 * back thickness, traps and neck, with a dense chest on top. Every lift day
 * has the same shape: one heavy anchor lift done as straight sets, then three
 * or four supersets (A1/A2 back to back), about 50 minutes. Anchor lifts are
 * fixed and progress by load; nothing rotates. The bike days are untouched —
 * the century build stays the aerobic goal and the deficit holds until it is
 * banked. Notes are one line: setup · cue · tempo · progression.
 */
export const PROGRAM: WorkoutDay[] = [
  // ════════════════ MONDAY ════════════════
  {
    key: '1',
    short: 'Mon',
    name: 'Lower A',
    type: 'Strength',
    chip: 'chip-amber',
    color: 'amber',
    eyebrow: 'Gym · Lower A · Squat',
    title: 'Lower A: Squat',
    sub: 'Back squat first, heavy and rested. Then four supersets: posterior chain, quads, trunk, calves. Showered by 7:30.',
    tags: ['~50 min', 'Building gym', 'Anchor + 4 supersets'],
    exercises: [
      {
        name: 'Warm-up',
        sets: '5 min',
        note: 'Easy bike, leg swings, hip openers, then two light feeder sets of squat.',
      },
      {
        name: 'Back Squat',
        sets: '4 × 5',
        rest: '3 min',
        note: 'High bar on the traps, brace, sit between the heels, hip crease below the knee. Add 5 lb when all four sets are clean. Bar position bothers the shoulder: front squat, cross-arm grip.',
        videoQuery: 'high bar back squat form',
      },
      {
        name: 'Romanian Deadlift',
        sets: '3 × 8',
        superset: 'A',
        rest: '60–75 s',
        note: 'Soft knees, hips back until the hamstrings stop you, bar on the thighs, flat back. 3 sec down.',
        videoQuery: 'barbell romanian deadlift form',
      },
      {
        name: 'Walking Lunge',
        sets: '3 × 10/leg',
        superset: 'A',
        rest: '60–75 s',
        note: 'Dumbbells at the sides, long step, rear knee kisses the floor, torso tall.',
        videoQuery: 'dumbbell walking lunge form',
      },
      {
        name: 'Leg Press',
        sets: '3 × 12',
        superset: 'B',
        rest: '60–75 s',
        note: 'Feet mid-plate, shoulder width. Lower until the hips start to tuck. 3 sec down, no lockout slam.',
        videoQuery: 'leg press 45 degree machine form',
      },
      {
        name: 'Seated Leg Curl',
        sets: '3 × 12',
        superset: 'B',
        rest: '60–75 s',
        note: 'Hips pinned, curl to full bend, 3 sec back. Pause at the stretch.',
        videoQuery: 'seated leg curl machine form',
      },
      {
        name: 'Cable Crunch',
        sets: '3 × 12',
        superset: 'C',
        rest: '60–75 s',
        note: 'Kneeling, rope at the forehead, hips still. Pull ribs to pelvis, 1 sec squeeze.',
        videoQuery: 'kneeling cable crunch form',
      },
      {
        name: 'Back Extension',
        sets: '3 × 12',
        superset: 'C',
        rest: '60–75 s',
        note: 'Hinge at the hips to a flat line, never past. Hug a plate once 12 is easy.',
        videoQuery: '45 degree back extension form',
      },
      {
        name: 'Standing Calf Raise',
        sets: '3 × 15',
        superset: 'D',
        rest: '60–75 s',
        note: 'Full stretch at the bottom, 2 sec hold at the top.',
        videoQuery: 'standing calf raise machine form',
      },
      {
        name: 'Pallof Press',
        sets: '3 × 10/side',
        superset: 'D',
        rest: '60–75 s',
        note: 'Cable at chest height, press out and hold 2 sec. Hips square.',
        videoQuery: 'pallof press cable form',
      },
    ],
  },

  // ════════════════ TUESDAY ════════════════
  {
    key: '2',
    short: 'Tue',
    name: 'Indoor Intervals',
    type: 'Ride',
    chip: 'chip-cyan',
    color: 'cyan',
    eyebrow: 'Home · Ride · Indoor Intervals',
    title: 'Indoor Intervals',
    sub: 'The one hard, structured bike session, time-boxed on the Zwift Ride. Sweet spot two weeks, VO₂ the third, easy on the cut-back week. FTP 254W. Finish with 8 minutes of mat core.',
    tags: ['45–55 min', 'Home · Zwift', 'Finish: 8-min core'],
    rides: [
      {
        variant: 'indoor',
        pill: 'Sweet Spot · Weeks 1–2',
        title: '3 × 12 min @ 224–234W (88–92% FTP)',
        body: '5 min easy, 5 min build, then 3 × 12 min at sweet spot with 4 min easy between. Level mode, not ERG: hold the watts yourself. Cadence 85–95.',
      },
      {
        variant: 'indoor',
        pill: 'VO₂ · Week 3',
        title: '5 × 3 min @ 275–295W (108–116% FTP)',
        body: 'After a 12-min build: 5 × 3 min hard, 3 min easy spin between. Level mode, not ERG. Short and savage.',
      },
      {
        variant: 'fallback',
        pill: 'Week 4 · Cut-back or low recovery',
        title: '40 min Zone 2 + core',
        body: 'Steady ~145–180W and bank the aerobic minutes (ERG is fine here). Finish with the mat core circuit: hollow holds, side planks, dead bugs.',
      },
    ],
  },

  // ════════════════ WEDNESDAY ════════════════
  {
    key: '3',
    short: 'Wed',
    name: 'Upper',
    type: 'Strength',
    chip: 'chip-blue',
    color: 'blue',
    eyebrow: 'Gym · Upper · Push / Pull',
    title: 'Upper: Push / Pull',
    sub: 'Bench first, heavy and rested. Then four push/pull supersets: vertical, horizontal, shoulders, arms. Cuff warm-up before any pressing.',
    tags: ['~50 min', 'Building gym', 'Anchor + 4 supersets'],
    exercises: [
      {
        name: 'Cuff warm-up',
        sets: '1 round',
        note: 'Side-lying external rotations × 12/side, band pull-aparts × 20. Every press session, no exceptions.',
        videoQuery: 'side lying dumbbell external rotation shoulder',
      },
      {
        name: 'Barbell Bench Press',
        sets: '4 × 6',
        rest: '3 min',
        note: 'Shoulder blades pinned, feet planted, bar to the lower chest, elbows ~45°. Slow down, drive up. Add 5 lb when all four sets are clean. Sharp pain: dumbbell bench that session.',
        videoQuery: 'barbell bench press form',
      },
      {
        name: 'Pull-Up',
        sets: '4 × 6–8',
        superset: 'A',
        rest: '60–75 s',
        note: 'Full hang, pull the chest to the bar, 2 sec down. Add a plate at 8. Under 6: lat pulldown, same reps.',
        videoQuery: 'strict pull up form',
      },
      {
        name: 'Landmine Press',
        sets: '4 × 8/side',
        superset: 'A',
        rest: '60–75 s',
        note: 'Half-kneeling, press up and forward, ribs down. Strict barbell overhead press replaces it when 8 reps are pain-free for 3 weeks.',
        videoQuery: 'half kneeling landmine press form',
      },
      {
        name: 'Chest-Supported Row',
        sets: '3 × 10',
        superset: 'B',
        rest: '60–75 s',
        note: 'Chest on an incline bench, dumbbells, pull elbows to the hips, 1 sec squeeze.',
        videoQuery: 'chest supported dumbbell row incline bench form',
      },
      {
        name: 'Incline DB Press',
        sets: '3 × 10',
        superset: 'B',
        rest: '60–75 s',
        note: 'Bench at 30°, elbows under the wrists, dumbbells touch at the top.',
        videoQuery: 'incline dumbbell press form',
      },
      {
        name: 'Face Pull',
        sets: '3 × 15',
        superset: 'C',
        rest: '60–75 s',
        note: 'Rope at eye height, pull to the ears, elbows high, thumbs back.',
        videoQuery: 'cable face pull form',
      },
      {
        name: 'DB Lateral Raise',
        sets: '3 × 15',
        superset: 'C',
        rest: '60–75 s',
        note: 'Slight elbow bend, to shoulder height, 3 sec down.',
        videoQuery: 'dumbbell lateral raise proper form',
      },
      {
        name: 'EZ-Bar Curl',
        sets: '3 × 10',
        superset: 'D',
        rest: '60–75 s',
        note: 'Elbows pinned, no swing, 3 sec down.',
        videoQuery: 'ez bar curl form',
      },
      {
        name: 'Cable Pushdown',
        sets: '3 × 12',
        superset: 'D',
        rest: '60–75 s',
        note: 'Elbows pinned, full lockout, 1 sec squeeze.',
        videoQuery: 'cable triceps pushdown form',
      },
    ],
  },

  // ════════════════ THURSDAY ════════════════
  {
    key: '4',
    short: 'Thu',
    name: 'Lower B',
    type: 'Strength',
    chip: 'chip-amber',
    color: 'amber',
    eyebrow: 'Gym · Lower B · Hinge + Armour',
    title: 'Lower B: Hinge + Armour',
    sub: 'Deadlift first, heavy and rested. Then three supersets: single-leg and glutes, traps and neck, carries and trunk. Friday stays easy so Saturday gets fresh legs.',
    tags: ['~45 min', 'Building gym', 'Anchor + 3 supersets'],
    exercises: [
      {
        name: 'Warm-up',
        sets: '5 min',
        note: 'Easy bike, hip openers, then two light feeder sets of deadlift.',
      },
      {
        name: 'Deadlift',
        sets: '4 × 5',
        rest: '3 min',
        note: 'Bar over mid-foot, shins near vertical, lats tight. Push the floor away, lock out with the glutes. Add 10 lb when all four sets are clean. Trap bar if the gym has one.',
        videoQuery: 'conventional deadlift form',
      },
      {
        name: 'Bulgarian Split Squat',
        sets: '3 × 8/leg',
        superset: 'A',
        rest: '60–75 s',
        note: 'Rear foot on a bench, dumbbells at the sides, straight down, front knee over toes.',
        videoQuery: 'bulgarian split squat dumbbell form',
      },
      {
        name: 'Hip Thrust',
        sets: '3 × 10',
        superset: 'A',
        rest: '60–75 s',
        note: 'Upper back on a bench, bar or dumbbell on the hips, drive to a flat line, 2 sec squeeze.',
        videoQuery: 'barbell hip thrust form',
      },
      {
        name: 'Barbell Shrug',
        sets: '3 × 10',
        superset: 'B',
        rest: '60–75 s',
        note: 'Straight up, 2 sec hold at the top, slow down. No rolling.',
        videoQuery: 'barbell shrug form',
      },
      {
        name: 'Neck Flexion + Extension',
        sets: '3 × 15 each',
        superset: 'B',
        rest: '60–75 s',
        note: 'Lying on a bench, plate on the forehead, then on the back of the head. Full range, slow. Start at 5 lb. Harness if the gym has one.',
        videoQuery: 'plate neck flexion extension bench',
      },
      {
        name: 'Farmer Carry',
        sets: '3 × 40 m',
        superset: 'C',
        rest: '60–75 s',
        note: 'Heaviest dumbbells you can hold, tall, no lean, fast walk.',
        videoQuery: 'farmer carry dumbbell form',
      },
      {
        name: 'Hanging Leg Raise',
        sets: '3 × 10',
        superset: 'C',
        rest: '60–75 s',
        note: 'Dead hang, legs to hip height with the pelvis tucking, 3 sec down. Knees-to-chest until 10 is clean.',
        videoQuery: 'hanging leg raise form',
      },
    ],
  },

  // ════════════════ FRIDAY ════════════════
  {
    key: '5',
    short: 'Fri',
    name: 'Ride or Nine',
    type: 'Ride',
    chip: 'chip-cyan',
    color: 'cyan',
    eyebrow: 'Ride or Golf',
    title: 'Outdoor Ride — or the Dawn Nine',
    sub: 'A choice: 60–75 min of outdoor Zone 2 on the Tarmac (the default while the century build is on), or a dawn nine when golf wins the argument. Either way it’s a dawn start and home to shower by 7:30.',
    tags: ['60–75 min', 'Ride or golf', 'Home by 7:30'],
    rides: [
      {
        variant: 'outdoor',
        pill: 'Outdoor · Default',
        title: '60–75 min Zone 2 on the Tarmac SL8',
        body: 'Roll out ~5:40. Mostly Zone 2 — HR 120–148, ~142–190W — with natural surges over bridges and rollers. Steady, could-hold-a-conversation breathing. Loop close to home so you’re back to shower by ~7:15. Deliberately easy: it keeps the legs fresh for Saturday.',
      },
      {
        variant: 'fallback',
        pill: 'The Trade · Dawn Nine',
        title: 'Tee off ~5:30 — walk a fast nine',
        body: 'Carry or push, brisk between shots: ~7–8k steps and 300–500 kcal of real Zone 1–2 work. Range + short game if the sheet is backed up — call it at 7:00 and still make 7:30. From September on, bias this slot to the bike — the century needs the miles more than par needs the practice.',
      },
      {
        variant: 'indoor',
        pill: 'Indoor · Weather backup',
        title: '50 min Zwift Zone 2 / tempo',
        body: 'Rain or too dark: steady Zone 2 with a few 3–5 min tempo lifts (195–220W). Bank it at home and give the morning back.',
      },
    ],
  },

  // ════════════════ SATURDAY ════════════════
  {
    key: '6',
    short: 'Sat',
    name: 'Long Ride',
    type: 'Ride',
    chip: 'chip-cyan',
    color: 'cyan',
    eyebrow: 'Ride · Long · Century Build',
    title: 'Long Ride',
    sub: 'The signature ride of the week and the engine of the century goal — every Saturday from here is a rung on the ladder to 100 miles. Weekend rules: back by around 10 now, and pre-negotiate the later mornings as the rides grow through fall. Outdoor by default.',
    tags: ['2–4½ hr · builds weekly', 'Weekend · fuel on the bike', 'Outdoor'],
    rides: [
      {
        variant: 'outdoor',
        pill: 'Outdoor · Default',
        title: 'Zone 2 on the Tarmac SL8 — add 15–20 min a week',
        body: 'Primarily Zone 2 with terrain — HR 120–148, ~142–190W. From ~2 hr now toward a 4½–5 hr capstone in October; every 4th Saturday cut to ~60% and absorb. Over 2 hr, take 60–90 g carbs/hr — fueling is a skill the century will examine, so practice it now. Full schedule: About → Century Countdown.',
      },
      {
        variant: 'indoor',
        pill: 'Indoor · Backup',
        title: '90 min – 2 hr Zwift group ride or long sweet-spot',
        body: 'If the weather is genuinely out: a group ride holds long durations honestly. Duration matters more than intensity today — but once the build passes 3 hr, don’t let two long-ride Saturdays in a row go virtual if the road is at all rideable.',
      },
    ],
  },

  // ════════════════ SUNDAY ════════════════
  {
    key: '7',
    short: 'Sun',
    name: 'Golf + Recovery',
    type: 'Golf',
    chip: 'chip-green',
    color: 'green',
    eyebrow: 'Golf · Recovery',
    title: 'Golf + Recovery',
    sub: 'The easy day: a relaxed round, cuff maintenance, and a proper mobility block at home. No lifting. Back by around 10, later if you play 18.',
    tags: ['Relaxed round + mobility', 'Weekend · flexible'],
    exercises: [
      {
        name: 'Play — relaxed 9 or 18',
        sets: 'walk it',
        note: 'Walk the round, no clock. Recovery score red: nine only, or a true rest day.',
      },
      {
        name: 'Cuff maintenance',
        sets: '2 rounds',
        note: 'Side-lying external rotations × 12/side, prone Y-T-W × 8 each. Two minutes, do not skip.',
        videoQuery: 'prone ytw raise shoulder scapular exercise',
      },
      {
        name: 'Mobility & stretch',
        sets: '20–30 min',
        note: 'Hips, hamstrings, thoracic spine, shoulders, neck. Open-books and t-spine rotations for golf. Foam-roll quads and glutes.',
      },
      {
        name: 'Optional easy spin',
        sets: '20–30 min',
        note: 'Zone 1 only, ~150W. Skip it if the legs say so.',
      },
    ],
  },
];
