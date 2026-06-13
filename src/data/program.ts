import type { WorkoutDay } from '@/types';

/**
 * The full weekly program. This was previously hardcoded as HTML markup in
 * index.html; modeling it as data is what makes new features (charts, editing,
 * alternate programs) tractable. HTML entities from the original are written
 * here as their literal Unicode characters.
 */
export const PROGRAM: WorkoutDay[] = [
  // ════════════════ MONDAY ════════════════
  {
    key: '1',
    short: 'Mon',
    name: 'Lower Power',
    type: 'Strength',
    chip: 'chip-blue',
    color: 'blue',
    eyebrow: 'Strength · Lower',
    title: 'Lower Power',
    sub: 'Heavy compound legs. Rotate squat variation each cycle. Rest 2–3 min on main lift, 90 sec on accessories.',
    tags: ['~45–50 min', 'Optional Z2 spin · 20–30 min'],
    exercises: [
      {
        name: 'Squat (rotation)',
        sets: '5 × 5',
        note: 'Heavy. Warm up thoroughly. Brace hard, full depth, control the descent, drive up with intent.',
        rotation: {
          title: '3-week cycle',
          rows: [
            { tag: 'A', name: 'Back Squat', desc: '— bar on traps, shoulder-width.' },
            { tag: 'B', name: 'Front Squat', desc: '— bar in front rack, elbows high.' },
            { tag: 'C', name: 'Tempo Back Squat', desc: '— 3-sec descent + 1-sec pause. -15% load.' },
          ],
        },
        videoQuery: 'back squat barbell form tutorial',
      },
      {
        name: 'Romanian Deadlift',
        sets: '4 × 6',
        note: 'Push hips back, soft knee bend. Lower until you feel a deep hamstring stretch. Drive hips forward. Bar stays close to legs.',
        videoQuery: 'romanian deadlift barbell form tutorial',
      },
      {
        name: 'Bulgarian Split Squat (DB)',
        sets: '3 × 8/leg',
        note: 'Rear foot laces-down on bench. Drop back knee straight down, front shin vertical. 2-sec down, 1-sec up.',
        videoQuery: 'bulgarian split squat dumbbell form',
      },
      {
        name: 'Leg Extension',
        sets: '3 × 12',
        note: 'Quad isolation on the machine. Pause 1 sec at full lockout and squeeze, then a 3-sec negative. Back flat against the pad — no swinging the weight up with momentum.',
        videoQuery: 'leg extension machine proper form',
      },
      {
        name: 'Standing Calf Raise',
        sets: '3 × 12',
        note: 'Full ROM. 1-sec pause at top, 1-sec pause at full stretch. No bouncing. Load it with dumbbells off a step, or push through the balls of your feet on the leg-press plate.',
        videoQuery: 'standing calf raise form tutorial',
      },
      {
        name: 'Lying Leg Raise',
        sets: '3 × 12',
        note: 'Lie flat, lower back pressed into the floor. Legs straight, raise to vertical, lower with control. Stop just before heels touch — keep tension. No momentum.',
        videoQuery: 'lying leg raise form tutorial',
      },
    ],
  },

  // ════════════════ TUESDAY ════════════════
  {
    key: '2',
    short: 'Tue',
    name: 'Upper Push & Press',
    type: 'Strength',
    chip: 'chip-blue',
    color: 'blue',
    eyebrow: 'Strength · Push',
    title: 'Upper Push & Press',
    sub: 'Heavy upper body. Press variation rotates. Rest 2 min on main lifts, 90 sec on accessories.',
    tags: ['~40–45 min', 'Optional Z2 spin · 20–30 min'],
    exercises: [
      {
        name: 'Bench Press (rotation)',
        sets: '5 × 5',
        note: 'Heavy. Scapulae retracted, slight arch, feet planted. 2-sec descent, brief pause on chest, drive up fast.',
        rotation: {
          title: '3-week cycle',
          rows: [
            { tag: 'A', name: 'Barbell Bench Press', desc: '— standard grip, full ROM.' },
            { tag: 'B', name: 'Close-Grip Bench Press', desc: '— hands inside shoulder width.' },
            { tag: 'C', name: 'Floor Press', desc: '— lockout strength, no leg drive.' },
          ],
        },
        videoQuery: 'barbell bench press proper form',
      },
      {
        name: 'Standing Overhead Press',
        sets: '4 × 6',
        note: 'Strict press, no leg drive. Brace core, tuck chin to let bar pass, press straight up. Full lockout overhead.',
        videoQuery: 'standing overhead press barbell form',
      },
      {
        name: 'Incline DB Press',
        sets: '3 × 8',
        note: 'Bench at 30–45°. Press straight up from upper chest. Elbows at ~45°, not flared.',
        videoQuery: 'incline dumbbell press form tutorial',
      },
      {
        name: 'Lateral Raise (DB)',
        sets: '3 × 12–15',
        note: 'Slight bend in elbows. Raise to shoulder height max. 3-sec negative on every rep.',
        videoQuery: 'dumbbell lateral raise proper form',
      },
      {
        name: 'Cable Reverse Fly',
        sets: '3 × 12–15',
        note: 'Dual pulley set to shoulder height, cables crossed. Slight elbow bend, arms sweep out and back to parallel leading with the elbows. Constant tension beats dumbbells here — squeeze the rear delts hard, 1-sec hold.',
        videoQuery: 'cable reverse fly rear delt form',
      },
      {
        name: 'Hollow Body Hold',
        sets: '3 × 30–45 sec',
        note: 'Lie flat, lower back pressed into the floor. Lift shoulders and legs slightly off the ground, arms extended overhead. Tight, cohesive shape. Scale by bending knees or shortening arm reach.',
        videoQuery: 'hollow body hold tutorial form',
      },
    ],
  },

  // ════════════════ WEDNESDAY ════════════════
  {
    key: '3',
    short: 'Wed',
    name: 'Mid-Week Ride',
    type: 'Ride',
    chip: 'chip-cyan',
    color: 'cyan',
    eyebrow: 'Ride Day',
    title: 'Mid-Week Ride',
    sub: 'Outdoor preferred — get fresh air. No lifting. Engine work for the legs while everything else recovers.',
    rides: [
      {
        variant: 'outdoor',
        pill: 'Outdoor · Default',
        title: '60–90 min on the Tarmac SL8 or Marlin',
        body: 'Mostly Zone 2 with natural terrain variation. Build the aerobic base. If you feel good, throw in a few harder efforts up climbs — but the point is volume, not punishment.',
      },
      {
        variant: 'indoor',
        pill: 'Indoor · Backup',
        title: '45–60 min Zwift structured',
        body: 'Sweet spot intervals (4 × 8 min @ 88–94% FTP) or tempo (3 × 12 min @ 76–87% FTP). FTP: 180W. Quality over duration when indoors.',
      },
      {
        variant: 'fallback',
        pill: 'Fallback',
        title: '30 min recovery spin',
        body: "If you're toast from Mon/Tue or short on time: easy spin, ~60–65% FTP, conversational. Still better than skipping.",
      },
    ],
  },

  // ════════════════ THURSDAY ════════════════
  {
    key: '4',
    short: 'Thu',
    name: 'Power & Athletic',
    type: 'Power',
    chip: 'chip-amber',
    color: 'amber',
    eyebrow: 'Power · Athletic',
    title: 'Power & Athletic',
    sub: 'Fast, explosive, intentful. Light loads, max speed. Full recovery between sets. Quality over quantity.',
    tags: ['~35–40 min', 'Optional Z2 spin · 20–30 min'],
    exercises: [
      {
        name: 'Hang Cleans',
        sets: '5 × 3',
        note: 'Start at mid-thigh. Snap hips forward, shrug, catch in front rack. Reset fully between reps. ~60–70% of your clean max — speed is the goal.',
        videoQuery: 'barbell hang clean form tutorial',
      },
      {
        name: 'Barbell Push Press',
        sets: '4 × 3',
        note: 'Dip knees slightly, drive through heels, punch the bar overhead. Lock out with ears in front of arms. Aggressive intent.',
        videoQuery: 'push press barbell form tutorial',
      },
      {
        name: 'Barbell Jump Squat',
        sets: '4 × 5',
        note: 'Light bar (30–40% of squat max). Quarter squat, jump as high as you can. Land soft with bent knees, reset, go again.',
        videoQuery: 'barbell jump squat form tutorial',
      },
      {
        name: 'Heavy DB Swing',
        sets: '3 × 15',
        note: 'Hold one heavy DB with both hands. Hike between legs, snap hips forward, let it float to chest height. Arms are passive — hips do the work.',
        videoQuery: 'dumbbell swing form tutorial hip hinge',
      },
      {
        name: 'Farmer Carry',
        sets: '2 × 50 yd',
        note: "Heaviest DBs you can grip for the distance. Brisk pace, tall posture, don't grind. Grip + structural carryover.",
        videoQuery: 'farmer carry dumbbell form tutorial',
      },
      {
        name: 'Cable Pallof Press',
        sets: '3 × 10/side',
        note: 'Anti-rotation core off the dual pulley at chest height. Slow press out, hold 2 sec, return. Resist the cable trying to twist you. Brace hard — the stack lets you load it heavier and progress cleanly.',
        videoQuery: 'cable pallof press form tutorial',
      },
    ],
  },

  // ════════════════ FRIDAY ════════════════
  {
    key: '5',
    short: 'Fri',
    name: 'Posterior & Pull',
    type: 'Strength',
    chip: 'chip-blue',
    color: 'blue',
    eyebrow: 'Strength · Pull',
    title: 'Posterior & Pull',
    sub: 'Heavy posterior chain + back width. Deadlift variation rotates. Rest 2–3 min on main, 90 sec on accessories.',
    tags: ['~45–50 min', 'Optional Z2 spin · 20–30 min'],
    exercises: [
      {
        name: 'Deadlift (rotation)',
        sets: '5 × 3',
        note: 'Push the floor away. Bar against shins. Full reset on the floor between reps — no touch-and-go.',
        rotation: {
          title: '3-week cycle',
          rows: [
            { tag: 'A', name: 'Conventional Deadlift', desc: '— feet hip-width, grip outside knees.' },
            { tag: 'B', name: 'Deficit Deadlift', desc: '— stand on a 1–1.5" plate. -10% load.' },
            { tag: 'C', name: 'Snatch-Grip Deadlift', desc: '— wide grip, trap stimulus. -15% load.' },
          ],
        },
        videoQuery: 'barbell deadlift form tutorial conventional',
      },
      {
        name: 'Bent Over Barbell Row',
        sets: '4 × 6',
        note: 'Torso at ~45°. Pull bar to lower chest, squeeze at the top for 1 sec. No momentum, no hitching.',
        videoQuery: 'barbell bent over row proper form',
      },
      {
        name: 'Single-Leg RDL (DB)',
        sets: '3 × 8/leg',
        note: 'Hinge forward on one leg, free leg extends behind you. Keep hips square. Touch a wall for balance if needed.',
        videoQuery: 'single leg rdl dumbbell form tutorial',
      },
      {
        name: 'Lat Pulldown',
        sets: '3 × 10',
        note: 'Real vertical pull at last. Wide-ish grip, drive elbows down and back, pull the bar to your upper chest. Lead with the elbows, not the hands. 1-sec squeeze at the bottom, controlled 3-sec stretch up — no leaning way back to heave it.',
        videoQuery: 'lat pulldown machine proper form',
      },
      {
        name: 'Cable Face Pull',
        sets: '3 × 15',
        note: 'Dual pulley at forehead height with a rope. Pull to your face, and at the end rotate your hands outward so thumbs point behind you. Squeeze for 1 sec. Shoulder health and rear-delt work in one.',
        videoQuery: 'cable face pull rope form rear delt',
      },
      {
        name: 'Seated Leg Curl',
        sets: '3 × 12',
        note: "Direct hamstring work to round out the posterior-chain day. Curl the pad down hard, 1-sec squeeze at the bottom, slow 3-sec return. Keep your hips pinned to the seat — don't let them lift to cheat the weight.",
        videoQuery: 'seated leg curl machine proper form',
      },
      {
        name: 'Side Plank',
        sets: '3 × 30–40 sec/side',
        note: "Forearm down, body in a straight line from head to heels. Hips up — don't let them sag. Anti-lateral flexion finisher. Stack feet, or stagger for stability.",
        videoQuery: 'side plank form tutorial',
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
    eyebrow: 'Long Ride',
    title: 'Long Ride',
    sub: "Signature ride of the week. Outdoor by default — this is what summer's for.",
    rides: [
      {
        variant: 'outdoor',
        pill: 'Outdoor · Default',
        title: '1.5–3 hours on the Tarmac SL8 or Marlin',
        body: 'Primarily Zone 2 with natural terrain variation. Build slowly — if last week was 90 min, this week aim for 100. Keep it fun. Stop for coffee. This is where the bulk of aerobic adaptation and calorie burn happens.',
      },
      {
        variant: 'indoor',
        pill: 'Indoor · Backup',
        title: '90–120 min Zwift event or structured ride',
        body: 'Group ride or long sweet-spot session if weather forces you inside. Duration matters more than intensity on this day.',
      },
    ],
  },

  // ════════════════ SUNDAY ════════════════
  {
    key: '7',
    short: 'Sun',
    name: 'Recovery',
    type: 'Rest',
    chip: 'chip-violet',
    color: 'violet',
    eyebrow: 'Recovery',
    title: 'Recovery',
    sub: 'Active rest — not a skip day. This protects everything else in the program.',
    recovery: {
      icon: '🧘',
      title: 'Yoga, Mobility, Stretching',
      body: '20–30 minutes. Focus on hip flexors, hamstrings, thoracic spine, shoulders, and neck. Optional easy 20–30 min spin if you want movement, recovery pace only. Sleep matters more than any extra session.',
    },
  },
];
