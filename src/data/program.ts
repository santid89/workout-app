import type { WorkoutDay } from '@/types';

/**
 * The full weekly program. This was previously hardcoded as HTML markup in
 * index.html; modeling it as data is what makes new features (charts, editing,
 * alternate programs) tractable. HTML entities from the original are written
 * here as their literal Unicode characters.
 *
 * Design intent (2026 redesign, apartment edition): a deliberately balanced
 * week across the three sports — weightlifting, cycling (indoor + outdoor) and
 * golf — built around two hard rules from real life:
 *   • Weekdays: out the door at dawn, home and showered by 7:30.
 *   • Weekends: more room — just back by around 10.
 * Strength runs on a home dumbbell setup: two loadable handles (~10 lb each)
 * with 6×10 lb + 4×5 lb plates — a hard ceiling of ~50 lb per hand, no bench,
 * no bands, a mat, and a small floor space.
 *
 * The lifting is aimed squarely at the UPPER BODY — back, shoulders, chest,
 * arms — because that's what builds visible shape and it's the one thing the
 * bikes can't train. Legs get one short essentials block plus 3–4 rides a
 * week, which is plenty. Four short lift days: push (Mon), arms pump (Wed PM),
 * pull + leg essentials (Thu), with Sunday kept for golf and recovery. The
 * whole thing is pointed at staying lean at 185–190 lb while holding muscle.
 */
export const PROGRAM: WorkoutDay[] = [
  // ════════════════ MONDAY ════════════════
  {
    key: '1',
    short: 'Mon',
    name: 'Upper Push',
    type: 'Strength',
    chip: 'chip-blue',
    color: 'blue',
    eyebrow: 'Strength · Push',
    title: 'Upper Push',
    sub: 'Chest, shoulders and triceps to open the week — the floor press rotation is the anchor lift. Shoulder is in Phase B: cuff warm-up first, floor-protected pressing, nothing overhead yet. Optional easy spin after. Start ~5:50, showered by 7:30.',
    tags: ['~35 min lift + optional spin', 'Weekday · home by 7:30', 'DBs + mat'],
    exercises: [
      {
        name: 'Cuff warm-up',
        sets: '2 rounds',
        note: 'Every press session starts here, no exceptions: side-lying external rotations with a 5-lb plate × 12/side, then prone Y-T-W on the mat × 8 each. Two minutes that keep the joint centered before loading.',
        videoQuery: 'side lying dumbbell external rotation shoulder',
      },
      {
        name: 'Floor Press (rotation)',
        sets: '4 × 8–12',
        note: 'The main press and the shoulder’s comeback lift. No bench needed — the floor stops the elbows before the shoulder over-extends. Build from light (~20–25 lb/hand), add slowly, stop the set the moment anything feels off.',
        rotation: {
          title: '3-week cycle · floor press',
          rows: [
            { tag: 'A', name: 'Neutral-Grip DB Floor Press', desc: '— palms facing each other. The friendliest pressing angle; the default.' },
            { tag: 'B', name: 'DB Floor Press', desc: '— standard grip, elbows ~45°. Slightly more chest, still floor-protected.' },
            { tag: 'C', name: 'Single-Arm Floor Press', desc: '— one DB at a time; the free hand feels the ribs stay down. Anti-rotation bonus.' },
          ],
        },
        videoQuery: 'neutral grip dumbbell floor press form',
      },
      {
        name: 'Push-Up',
        sets: '3 × AMRAP−2',
        note: 'Grip the DB handles as push-up bars — neutral wrists, a touch more depth. Stop two reps shy of failure. Progress by slowing the negative, then elevating the feet. The chest-volume move that scales forever.',
        videoQuery: 'push up on dumbbells form tutorial',
      },
      {
        name: 'DB Lateral Raise',
        sets: '3 × 12–15',
        note: 'The width-builder — side delts are most of what reads as broad shoulders. Light (empty handles or +5s), slight elbow bend, raise to shoulder height and no higher, 3-sec negatives. Phase B rule: pain-free range only, stop shy of anything sharp.',
        videoQuery: 'dumbbell lateral raise proper form',
      },
      {
        name: 'Floor Skullcrusher',
        sets: '3 × 10–12',
        note: 'Lying on the mat, DBs pressed up, bend the elbows to lower them beside the ears, extend back up. Upper arms stay vertical — elbows do all the work. The floor keeps the bottom position honest and the shoulders neutral. Triceps are two-thirds of the arm.',
        videoQuery: 'dumbbell floor skull crusher lying triceps extension',
      },
      {
        name: 'Half-Kneeling 1-Arm Press (gated)',
        sets: '3 × 8/side',
        note: 'PHASE C — add only once the floor press is solid and pain-free for a few weeks. Half-kneeling, one DB, press up and slightly forward; the kneeling position keeps the ribs honest. This is the overhead comeback step — strict overhead work returns after this feels strong.',
        videoQuery: 'half kneeling single arm dumbbell press',
      },
    ],
    rides: [
      {
        variant: 'indoor',
        pill: 'Optional Spin · Indoor',
        title: '15–20 min easy if time allows',
        body: 'Easy Zone 2 flush, ~120–145W (55–65% of your 222W FTP), upright and relaxed on the Zwift Ride. Optional — the lift is the priority. Skip it without guilt to make 7:30.',
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
    sub: 'Your one hard, structured bike session — weather-proof and tightly time-boxed on the Zwift Ride. Alternate sweet-spot and VO₂ blocks by cycle week. FTP 222W. Cap it with an 8-minute core circuit on the mat.',
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
        body: 'Low recovery or short on time: steady ~140–160W and just bank the aerobic minutes. Either way finish with the mat core circuit — hollow holds, side planks, dead bugs.',
      },
    ],
  },

  // ════════════════ WEDNESDAY ════════════════
  {
    key: '3',
    short: 'Wed',
    name: 'Dawn Nine + Arms',
    type: 'Golf',
    chip: 'chip-green',
    color: 'green',
    eyebrow: 'Golf AM · Arms PM',
    title: 'Dawn Nine + Arms',
    sub: 'Two-part day. Dawn: tee off at first light and walk a fast nine — showered by 7:30, range as the backup. Evening: a ~25-min arms and delts pump at home — the pure shape work: biceps, triceps, side and rear delts.',
    tags: ['~75–90 min walking AM', '~25 min pump PM', 'Weekday · home by 7:30'],
    exercises: [
      {
        name: 'AM · Walk & play — fast 9',
        sets: '~75–90 min',
        note: 'Tee off ~5:30. Carry or push — skip the cart; the walking is the point. Brisk pace between shots so it doubles as Zone 1–2 steps. Roughly 7–8k steps and 300–500 kcal before most people are up. If a full swing ever tugs the healing side, bias the range and short game until it settles.',
      },
      {
        name: 'AM · Range + short game (backup)',
        sets: '~45 min',
        note: 'Course backed up or weather turning? A bucket working through the bag, then chipping and putting. All the skill, none of the time risk — call it at 7:00 and still make 7:30.',
      },
      {
        name: 'PM · Cuff primer',
        sets: '1 round',
        note: 'Quick version before loading: side-lying external rotations × 10/side + a few prone Y-T-Ws. One minute, keeps the shoulder honest.',
        videoQuery: 'side lying dumbbell external rotation shoulder',
      },
      {
        name: 'PM · Alternating DB Curl',
        sets: '3 × 10–12/arm',
        note: 'Standing, curl one arm at a time with a full squeeze at the top and a slow 3-sec negative. No swinging — brace like someone’s watching your form. Supinated grip for the biceps peak.',
        videoQuery: 'alternating dumbbell curl form tutorial',
      },
      {
        name: 'PM · Hammer Curl',
        sets: '3 × 10–12',
        note: 'Neutral grip, both arms. Hits the brachialis and forearms — that’s what makes arms look thick from the front and the side, not just flexed. Same rule: slow negatives, no swing.',
        videoQuery: 'hammer curl dumbbell form tutorial',
      },
      {
        name: 'PM · Triceps Kickback',
        sets: '3 × 12–15',
        note: 'Hinged over, upper arm pinned parallel to the floor, extend to full lockout and squeeze for 1 sec. Light weight, strict — this one is ruined by momentum. Shoulder-neutral triceps work.',
        videoQuery: 'dumbbell triceps kickback form tutorial',
      },
      {
        name: 'PM · Lateral + Rear-Delt superset',
        sets: '2 × 12 + 12',
        note: 'Lateral raises straight into bent-over rear-delt flys, light. Side delts for width, rear delts for the 3-D look from behind — and rear delts also protect the shoulder. Pain-free range, shoulder height max.',
        videoQuery: 'lateral raise rear delt fly superset dumbbell',
      },
    ],
  },

  // ════════════════ THURSDAY ════════════════
  {
    key: '4',
    short: 'Thu',
    name: 'Upper Pull + Legs',
    type: 'Strength',
    chip: 'chip-blue',
    color: 'blue',
    eyebrow: 'Strength · Pull + Leg Essentials',
    title: 'Upper Pull + Legs',
    sub: 'The back day — rows carry everything now that there’s no bar or pulldown — plus the week’s one condensed leg block. Fifteen minutes of leg essentials is deliberate: the bikes train your legs 3–4× a week already. Optional easy spin after.',
    tags: ['~40 min lift + optional spin', 'Weekday · home by 7:30', 'DBs + mat'],
    exercises: [
      {
        name: 'Bent-Over DB Row',
        sets: '4 × 10–12',
        note: 'Both DBs, hinged to ~45°, pull to the lower ribs, 1-sec squeeze, no heaving. The main pull of the week and the back-width builder. Work up to 2×50 and then slow the negatives.',
        videoQuery: 'bent over dumbbell row form tutorial',
      },
      {
        name: 'Single-Arm DB Row',
        sets: '3 × 10/side',
        note: 'Free hand braced on the knee (no bench needed), flat back, pull the DB to the hip. Load one DB heavier than the pair allows — this is where the back gets its heaviest work.',
        videoQuery: 'single arm dumbbell row knee braced form',
      },
      {
        name: 'Bent-Over Rear-Delt Fly',
        sets: '3 × 15',
        note: 'Hinged over, light DBs, slight elbow bend, sweep out leading with the elbows, 1-sec squeeze. Second rear-delt hit of the week — they need the frequency and they’re shoulder insurance.',
        videoQuery: 'bent over rear delt fly dumbbell form',
      },
      {
        name: 'DB Shrug',
        sets: '3 × 12–15',
        note: 'Heaviest pair you can hold, shrug straight up, 1-sec squeeze at the top, slow down. No rolling. Traps frame the whole upper body from the front and the back.',
        videoQuery: 'dumbbell shrug form tutorial',
      },
      {
        name: 'Legs · Goblet Squat',
        sets: '3 × 10',
        note: 'One heavy DB at the chest, deep and upright. First of three leg-essential moves — squat pattern covered in one exercise, no full leg day required.',
        videoQuery: 'goblet squat form tutorial',
      },
      {
        name: 'Legs · DB Romanian Deadlift',
        sets: '3 × 10',
        note: 'Hips back, DBs down the thighs to a deep hamstring stretch, drive forward. 3-sec negatives make 2×50 honest. The hinge, done.',
        videoQuery: 'dumbbell romanian deadlift form tutorial',
      },
      {
        name: 'Legs · Heavy DB Swing',
        sets: '2 × 15',
        note: 'One DB at ~40–50 lb, both hands. Hike, snap the hips, let it float to chest height — arms passive. Hip power and a heart-rate spike to close the block. Mind the clearance in a small room.',
        videoQuery: 'dumbbell swing form tutorial hip hinge',
      },
    ],
    rides: [
      {
        variant: 'indoor',
        pill: 'Optional Spin · Indoor',
        title: '15–20 min easy if time allows',
        body: 'Easy Zone 2 flush, ~120–145W, upright and relaxed on the Zwift Ride. Optional — the lift is the priority. Skip it without guilt to make 7:30.',
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
    eyebrow: 'Golf · Recovery',
    title: 'Golf + Recovery',
    sub: 'The easy day, and it stays easy: a relaxed round — nine, or a full eighteen if the morning is open — then cuff maintenance and a proper mobility block at home. No lifting today; four upper sessions during the week earn a real recovery day. Back by around 10 (later if you play 18).',
    tags: ['Relaxed round + mobility', 'Weekend · flexible'],
    exercises: [
      {
        name: 'Play — relaxed 9 or 18',
        sets: 'walk it',
        note: 'No clock pressure today. Walk the round for the steps and the head-space — low intensity is exactly what the day after a long ride wants. If your Whoop recovery is red, keep it to nine or take a true rest day. Sleep beats any extra session.',
      },
      {
        name: 'Cuff maintenance',
        sets: '2 rounds',
        note: 'Side-lying external rotations (5-lb plate) × 12/side + prone Y-T-W × 8 each. The weekly insurance dose for the shoulder, independent of the weekday warm-ups. Two minutes, do not skip.',
        videoQuery: 'prone ytw raise shoulder scapular exercise',
      },
      {
        name: 'Suitcase Carry (optional)',
        sets: '3 × 30–45 sec/side',
        note: 'One heavy DB, walk hallway laps or march in place, tall and level — don’t lean. Grip, obliques and posture work in a small footprint. Optional — skip it on low-energy days.',
        videoQuery: 'suitcase carry dumbbell form',
      },
      {
        name: 'Mobility & stretch',
        sets: '20–30 min',
        note: 'The real recovery work: hips, hamstrings, thoracic spine, shoulders, neck, plus golf-specific t-spine rotations and open-books on the mat. Foam-roll quads and glutes after the week’s riding.',
      },
      {
        name: 'Optional easy spin',
        sets: '20–30 min',
        note: 'Want a touch more movement? A very easy Zone 1 spin (~60% FTP) helps the legs shed Saturday’s ride. Totally optional — recovery pace only.',
      },
    ],
  },
];
