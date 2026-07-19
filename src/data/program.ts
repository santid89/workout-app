import type { WorkoutDay } from '@/types';

/**
 * The full weekly program. This was previously hardcoded as HTML markup in
 * index.html; modeling it as data is what makes new features (charts, editing,
 * alternate programs) tractable. HTML entities from the original are written
 * here as their literal Unicode characters.
 *
 * Design intent (2026 redesign): a deliberately balanced week across the three
 * sports — weightlifting, cycling (indoor + outdoor) and golf — built around
 * two hard rules from real life:
 *   • Weekdays: out the door at dawn, home and showered by 7:30.
 *   • Weekends: more room — just back by around 10.
 * Most days deliberately *combine* two things (a lift + an easy spin, golf +
 * mobility) so all three sports fit one week instead of fighting for it. The
 * whole thing is pointed at staying lean at 185–190 lb while holding muscle.
 */
export const PROGRAM: WorkoutDay[] = [
  // ════════════════ MONDAY ════════════════
  {
    key: '1',
    short: 'Mon',
    name: 'Lower Strength + Spin',
    type: 'Strength',
    chip: 'chip-blue',
    color: 'blue',
    eyebrow: 'Strength · Lower + Spin',
    title: 'Lower Strength + Spin',
    sub: 'Heavy legs and posterior chain, then flush them with an easy Zone 2 spin. Squat variation rotates each cycle. Rest 2–3 min on the main lift, 90 sec on accessories. Start ~5:45, showered by 7:30.',
    tags: ['~40 min lift + 20 min spin', 'Weekday · home by 7:30'],
    exercises: [
      {
        name: 'Squat (shoulder-safe rotation)',
        sets: '5 × 5',
        note: 'Heavy legs without loading the healing shoulder. Warm up thoroughly, brace hard, full depth, controlled descent, drive up with intent. The back-squat Back / Front / Tempo rotation returns once the bar-on-back hold is comfortable and pain-free — see Shoulder · Return to Load in About.',
        rotation: {
          title: '3-week cycle · shoulder-safe',
          rows: [
            { tag: 'A', name: 'Safety-Bar Squat', desc: '— the SSB handles keep the shoulders neutral; no external rotation to hold the bar.' },
            { tag: 'B', name: 'Leg Press', desc: '— zero load through the shoulders. Go heavy safely.' },
            { tag: 'C', name: 'Goblet Squat', desc: '— one DB/KB at the chest, hands neutral. Lighter, so reps can climb to 8–10.' },
          ],
        },
        videoQuery: 'safety bar squat form tutorial',
      },
      {
        name: 'Romanian Deadlift',
        sets: '4 × 6',
        note: 'Your heavy hinge — carries the deadlift stimulus now that the week is two lift days. Push hips back, soft knee bend, lower to a deep hamstring stretch, drive hips forward, bar close to the legs. The shoulders just hang here, but if a loaded barbell tugs the healing side, use a trap-bar or dumbbells and/or lighten.',
        videoQuery: 'romanian deadlift barbell form tutorial',
      },
      {
        name: 'Bulgarian Split Squat (DB)',
        sets: '3 × 8/leg',
        note: 'Rear foot laces-down on bench. Drop back knee straight down, front shin vertical. 2-sec down, 1-sec up. Single-leg strength and balance for the bike and the golf swing.',
        videoQuery: 'bulgarian split squat dumbbell form',
      },
      {
        name: 'Seated Leg Curl',
        sets: '3 × 12',
        note: 'Direct hamstring work to balance all the quad-dominant riding. Curl the pad down hard, 1-sec squeeze, slow 3-sec return. Keep hips pinned to the seat — no lifting to cheat the weight.',
        videoQuery: 'seated leg curl machine proper form',
      },
      {
        name: 'Standing Calf Raise',
        sets: '3 × 12',
        note: 'Full ROM. 1-sec pause at top, 1-sec pause at full stretch. No bouncing. Load with dumbbells off a step, or push through the balls of your feet on the leg-press plate.',
        videoQuery: 'standing calf raise form tutorial',
      },
      {
        name: 'Lying Leg Raise',
        sets: '3 × 12',
        note: 'On the floor, not hanging from a bar — no overhead dead-hang to strain the shoulder while it heals. Lower back pressed down, straight legs up to vertical, lower with control, stop before the heels touch. No momentum.',
        videoQuery: 'lying leg raise form tutorial',
      },
    ],
    rides: [
      {
        variant: 'indoor',
        pill: 'Flush Spin · Indoor',
        title: '20 min easy on the Zwift Ride',
        body: 'Straight off the rack: Zone 2, ~120–145W (55–65% of your 222W FTP), fully conversational. Clears the legs, adds a little burn, no extra fatigue. The one thing to drop if the clock is against 7:30.',
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
    eyebrow: 'Ride · Indoor Intervals',
    title: 'Indoor Intervals',
    sub: 'Your one hard, structured bike session — weather-proof and tightly time-boxed on the Zwift Ride. Alternate sweet-spot and VO₂ blocks by cycle week. FTP 222W. Cap it with an 8-minute core circuit.',
    tags: ['45–55 min', 'Weekday · home by 7:30', 'Finish: 8-min core'],
    rides: [
      {
        variant: 'indoor',
        pill: 'Sweet Spot · Weeks A / C',
        title: '3 × 12 min @ 195–205W (88–92% FTP)',
        body: '5 min easy, 5 min build, then 3 × 12 min at sweet spot with 4 min easy between. Best bang-for-buck aerobic power — raises FTP without wrecking recovery. Cadence 85–95.',
      },
      {
        variant: 'indoor',
        pill: 'VO₂ · Week B',
        title: '5 × 3 min @ 240–260W (108–117% FTP)',
        body: 'After a 12-min build: 5 × 3 min hard, 3 min easy spin between. Top-end power and a big calorie hit in a short window. Short and brutal — perfect for the weekday slot.',
      },
      {
        variant: 'fallback',
        pill: 'Fallback',
        title: '40 min Zone 2 + core',
        body: 'Low recovery or short on time: steady ~140–160W and just bank the aerobic minutes. Either way finish with the core circuit — hollow holds, side planks, Pallof press.',
      },
    ],
  },

  // ════════════════ WEDNESDAY ════════════════
  {
    key: '3',
    short: 'Wed',
    name: 'Dawn Nine',
    type: 'Golf',
    chip: 'chip-green',
    color: 'green',
    eyebrow: 'Golf · Dawn Nine',
    title: 'Dawn Nine',
    sub: 'Tee off at first light and walk a fast nine — the walking is the training and the reps are the skill work. To be showered by 7:30 it has to be a moving round; if the tee sheet is slow, hit the range and short-game area instead.',
    tags: ['~75–90 min walking', 'Weekday · home by 7:30'],
    exercises: [
      {
        name: 'Walk & play — fast 9',
        sets: '~75–90 min',
        note: 'Tee off ~5:30. Carry or push — skip the cart; the walking is the point. Brisk pace between shots so it doubles as Zone 1–2 steps. Roughly 7–8k steps and 300–500 kcal before most people are up. Shoulder: you’ve been playing through this fine — if a full swing ever tugs the healing side, bias the range and short game until it settles.',
      },
      {
        name: 'Range + short game (backup)',
        sets: '~45 min',
        note: 'Course backed up or weather turning? A bucket working through the bag, then chipping and putting. All the skill, none of the time risk — call it at 7:00 and still make 7:30.',
      },
      {
        name: 'Later / PM — 10-min mobility',
        sets: 'optional',
        note: 'Golf is rotational and one-sided. Thoracic rotations, open-books, hip-flexor and hamstring stretch, a few band pull-aparts. Do it at the desk or before bed.',
      },
    ],
  },

  // ════════════════ THURSDAY ════════════════
  {
    key: '4',
    short: 'Thu',
    name: 'Upper Rebuild',
    type: 'Strength',
    chip: 'chip-blue',
    color: 'blue',
    eyebrow: 'Rebuild · Upper (shoulder-safe)',
    title: 'Upper Rebuild',
    sub: 'A staged return for the shoulder, not the old heavy pressing day (dislocation 2026-06-16). Do the rotator-cuff + scapular block every week; add the pressing block only once you’re at/past your ~6-week mark (≈2026-07-28) and pain-free. Move up slowly — sharp pain or any instability means stop, and get a PT’s sign-off before anything overhead.',
    tags: ['~35–40 min', 'Weekday · home by 7:30', 'Pain-free range only'],
    exercises: [
      {
        name: 'Band External Rotation',
        sets: '3 × 15/side',
        note: 'Elbow pinned to your side at 90°, rotate the forearm outward against a light band, slow and controlled. The single most important rotator-cuff move for anterior stability — do it every session, including as a warm-up.',
        videoQuery: 'banded external rotation shoulder rehab',
      },
      {
        name: 'Band Pull-Apart',
        sets: '3 × 15',
        note: 'Arms straight out front, pull the band apart to your chest, squeeze the shoulder blades together, slow return. Scapular retraction and rear delts — reinforces the back of the shoulder.',
        videoQuery: 'band pull apart form tutorial',
      },
      {
        name: 'Prone Y-T-W Raises',
        sets: '2 × 8 each',
        note: 'Face-down on an incline bench, light or no weight. Raise the arms into a Y, then a T, then a W, squeezing the lower traps and scapulae. Slow. This is the scapular control that keeps the joint centered.',
        videoQuery: 'prone ytw raise shoulder scapular exercise',
      },
      {
        name: 'Chest-Supported DB Row',
        sets: '3 × 10',
        note: 'Chest on an incline bench so there’s no strain bracing a torso — just pull. Elbows to ~45°, squeeze, controlled. Safe horizontal pulling you can do the whole way through rehab.',
        videoQuery: 'chest supported dumbbell row form',
      },
      {
        name: 'Neutral-Grip DB Floor Press',
        sets: '3 × 10',
        note: 'REINTRODUCTION — start only when cleared / at 6+ weeks and pain-free. Palms facing each other, press from the floor. The floor stops your elbows before the shoulder over-extends, protecting the front of the joint; the neutral grip is the friendliest pressing angle. Start light, add slowly.',
        videoQuery: 'neutral grip dumbbell floor press',
      },
      {
        name: 'Landmine Press',
        sets: '3 × 8/side',
        note: 'REINTRODUCTION — add once the floor press feels solid. Pressing on a diagonal (bar wedged in a corner) trains the overhead pattern without the risky straight-overhead, abducted-and-externally-rotated position. This is as “overhead” as you go until fully stable — barbell bench, then strict overhead press, then push press come back later (see Shoulder · Return to Load).',
        videoQuery: 'landmine press form tutorial',
      },
    ],
    rides: [
      {
        variant: 'indoor',
        pill: 'Optional Spin · Indoor',
        title: '15–20 min easy if time allows',
        body: 'Easy Zone 2 flush, ~120–145W, upright and relaxed on the Zwift Ride — no weight jammed through the healing shoulder. Optional; skip it to make 7:30.',
      },
    ],
  },

  // ════════════════ FRIDAY ════════════════
  {
    key: '5',
    short: 'Fri',
    name: 'Outdoor Endurance',
    type: 'Ride',
    chip: 'chip-cyan',
    color: 'cyan',
    eyebrow: 'Ride · Outdoor Endurance',
    title: 'Outdoor Endurance',
    sub: 'Get outside on the Tarmac before work — 60–75 minutes of mostly Zone 2 with whatever terrain the route gives you. This is where the aerobic base and the calorie burn live. Dawn start, home to shower by 7:30.',
    tags: ['60–75 min', 'Weekday · home by 7:30', 'Outdoor'],
    rides: [
      {
        variant: 'outdoor',
        pill: 'Outdoor · Default',
        title: '60–75 min Zone 2 on the Tarmac SL8',
        body: 'Roll out ~5:40. Mostly Zone 2 — HR 120–148, ~123–167W — with natural surges over bridges and rollers. Steady, could-hold-a-conversation breathing. Loop close to home so you’re back to shower by ~7:15.',
      },
      {
        variant: 'indoor',
        pill: 'Indoor · Backup',
        title: '50 min Zwift Zone 2 / tempo',
        body: 'Rain or too dark: steady Zone 2 with a few 3–5 min tempo lifts (170–190W). Not as fun as outside, but the minutes still count.',
      },
      {
        variant: 'fallback',
        pill: 'Fallback',
        title: '30 min recovery spin',
        body: 'Legs cooked from Tuesday’s intervals? Easy 30 min at ~60% FTP, conversational. Still beats skipping.',
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
    eyebrow: 'Ride · Long',
    title: 'Long Ride',
    sub: 'The signature ride of the week and your single biggest calorie burn. It’s the weekend, so the 7:30 rule is off — just be back by around 10. Outdoor by default; build the duration slowly and keep it fun.',
    tags: ['1.5–2.5 hr', 'Weekend · back by ~10', 'Outdoor'],
    rides: [
      {
        variant: 'outdoor',
        pill: 'Outdoor · Default',
        title: '1.5–2.5 hr on the Tarmac SL8',
        body: 'Primarily Zone 2 with terrain — HR 120–148, ~123–167W. Build gradually: if last week was 90 min, make this 100. Stop for coffee. Over 90 min, take 50–80 g carbs/hr so you don’t bonk and cost yourself the rest of the day.',
      },
      {
        variant: 'indoor',
        pill: 'Indoor · Backup',
        title: '75–90 min Zwift group ride or long sweet-spot',
        body: 'If the weather is genuinely out: a Zwift group ride or a long steady effort. Duration matters more than intensity on this day.',
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
    eyebrow: 'Golf · Recovery Round',
    title: 'Golf + Recovery',
    sub: 'Your second golf slot and your active-recovery day in one: a relaxed round — nine, or a full eighteen if the morning is open — then a proper mobility session. Weekend pace, back by around 10 (later if you play 18). This is what protects everything else in the week.',
    tags: ['Relaxed round + mobility', 'Weekend · flexible'],
    exercises: [
      {
        name: 'Play — relaxed 9 or 18',
        sets: 'walk it',
        note: 'No clock pressure today. Walk the round for the steps and the head-space — low intensity is exactly what the day after a long ride wants. If your Whoop recovery is red, keep it to nine or take a true rest day. Sleep beats any extra session. Same shoulder rule as Wednesday: full swings are fine while they’re pain-free — ease back to the short game if not.',
      },
      {
        name: 'Mobility & stretch',
        sets: '20–30 min',
        note: 'The real recovery work: hips, hamstrings, thoracic spine, shoulders, neck, plus golf-specific t-spine rotations and open-books. Foam-roll quads and glutes after the week’s riding.',
      },
      {
        name: 'Optional easy spin',
        sets: '20–30 min',
        note: 'Want a touch more movement? A very easy Zone 1 spin (~60% FTP) helps the legs shed Saturday’s ride. Totally optional — recovery pace only.',
      },
    ],
  },
];
