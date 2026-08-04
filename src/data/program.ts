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
 * Strength now runs on a home dumbbell setup: two loadable handles (~10 lb
 * each) with 6×10 lb + 4×5 lb plates — a hard ceiling of ~50 lb per hand, no
 * bench, no bands, a mat, and a small floor space. Four short lift days replace
 * the old two gym days; golf + mobility and lift + spin still stack so all
 * three sports fit one week. The whole thing is pointed at staying lean at
 * 185–190 lb while holding muscle.
 */
export const PROGRAM: WorkoutDay[] = [
  // ════════════════ MONDAY ════════════════
  {
    key: '1',
    short: 'Mon',
    name: 'Lower Strength',
    type: 'Strength',
    chip: 'chip-blue',
    color: 'blue',
    eyebrow: 'Strength · Lower + Spin',
    title: 'Lower Strength',
    sub: 'Heavy-for-dumbbells legs and posterior chain in the living room, then flush with an easy Zone 2 spin. Squat pattern rotates each cycle. With a 50 lb/hand ceiling, tempo and control ARE the load — earn every rep. Start ~5:50, showered by 7:30.',
    tags: ['~35 min lift + 20 min spin', 'Weekday · home by 7:30', 'DBs + mat'],
    exercises: [
      {
        name: 'Squat (rotation)',
        sets: '4 × 8–10',
        note: 'The main lower move. Brace hard, full depth, control the descent, drive up with intent. When 4×10 at the top loading feels owned, slow the tempo — the plates cap out, your control doesn’t.',
        rotation: {
          title: '3-week cycle · dumbbell',
          rows: [
            { tag: 'A', name: 'DB Front-Rack Squat', desc: '— both DBs racked at the shoulders, elbows up. Up to 100 lb total.' },
            { tag: 'B', name: 'Goblet Squat', desc: '— one heavy DB held at the chest. Deep, upright, big brace.' },
            { tag: 'C', name: 'Tempo Front-Rack Squat', desc: '— 3-sec descent + 1-sec pause in the hole. Drop a plate pair.' },
          ],
        },
        videoQuery: 'dumbbell front rack squat form tutorial',
      },
      {
        name: 'DB Romanian Deadlift',
        sets: '4 × 8–12',
        note: 'The heavy hinge. Push hips back, soft knees, DBs sliding down the thighs to a deep hamstring stretch, drive hips forward. At 2×50 the weight is modest for a hinge — 3-sec negatives and a 1-sec stretch pause make it honest.',
        videoQuery: 'dumbbell romanian deadlift form tutorial',
      },
      {
        name: 'Split Squat (DB pair)',
        sets: '3 × 8–10/leg',
        note: 'Front shin vertical, back knee straight down, 2-sec down 1-sec up. Progress by elevating the rear foot on a sturdy chair or the couch (Bulgarian-style) once flat-foot versions are owned — single-leg work is how legs stay heavy on limited plates.',
        videoQuery: 'dumbbell split squat form tutorial',
      },
      {
        name: 'Single-Leg Calf Raise',
        sets: '3 × 12–15/leg',
        note: 'DB in one hand, other hand on the wall for balance. Full ROM — 1-sec pause at the top, 1-sec at the stretch, no bouncing. One leg at a time doubles the effective load.',
        videoQuery: 'single leg dumbbell calf raise form',
      },
      {
        name: 'Lying Leg Raise',
        sets: '3 × 12',
        note: 'On the mat. Lower back pressed down, straight legs up to vertical, lower with control, stop before the heels touch. No momentum.',
        videoQuery: 'lying leg raise form tutorial',
      },
    ],
    rides: [
      {
        variant: 'indoor',
        pill: 'Flush Spin · Indoor',
        title: '20 min easy on the Zwift Ride',
        body: 'Straight after the lift: Zone 2, ~120–145W (55–65% of your 222W FTP), fully conversational. Clears the legs, adds a little burn, no extra fatigue. The one thing to drop if the clock is against 7:30.',
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
    name: 'Dawn Nine + Push',
    type: 'Golf',
    chip: 'chip-green',
    color: 'green',
    eyebrow: 'Golf AM · Push PM',
    title: 'Dawn Nine + Push',
    sub: 'Two-part day. Dawn: tee off at first light and walk a fast nine — showered by 7:30, range as the backup. Evening: a ~30-min dumbbell push session at home — the shoulder’s pressing comeback, floor press first, cuff work always.',
    tags: ['~75–90 min walking AM', '~30 min lift PM', 'Weekday · home by 7:30'],
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
        name: 'PM · Cuff warm-up',
        sets: '2 rounds',
        note: 'Every press session starts here, no exceptions: side-lying external rotations with a 5-lb plate × 12/side, then prone Y-T-W on the mat × 8 each. Replaces the old band work now that the bands are gone — same job, keeps the joint centered before loading.',
        videoQuery: 'side lying dumbbell external rotation shoulder',
      },
      {
        name: 'PM · Floor Press (rotation)',
        sets: '4 × 8–12',
        note: 'The pressing comeback, Phase B. No bench needed — the floor stops the elbows before the shoulder over-extends, protecting the front of the joint. Start light (~20–25 lb/hand), add slowly, and stop the set the moment anything feels off.',
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
        name: 'PM · Push-Up',
        sets: '3 × AMRAP−2',
        note: 'Grip the DB handles as push-up bars — neutral wrists, a touch more depth. Stop two reps shy of failure. Progress by slowing the negative, then elevating the feet. Bodyweight pressing volume that travels with any setup.',
        videoQuery: 'push up on dumbbells form tutorial',
      },
      {
        name: 'PM · Bent-Over Rear-Delt Fly',
        sets: '3 × 15',
        note: 'Hinged over, light — a 5-lb plate or empty feel per hand at first. Slight elbow bend, sweep out and back leading with the elbows, 1-sec squeeze. Balances the pressing and feeds the back of the shoulder.',
        videoQuery: 'bent over rear delt fly dumbbell form',
      },
      {
        name: 'PM · Half-Kneeling 1-Arm Press (gated)',
        sets: '3 × 8/side',
        note: 'PHASE C — add only once the floor press is solid and pain-free for a few weeks. Half-kneeling, one DB, press up and slightly forward; the kneeling position keeps the ribs honest. This is the overhead comeback step (the landmine went with the gym) — strict overhead work returns after this feels strong.',
        videoQuery: 'half kneeling single arm dumbbell press',
      },
    ],
  },

  // ════════════════ THURSDAY ════════════════
  {
    key: '4',
    short: 'Thu',
    name: 'Lower Unilateral',
    type: 'Strength',
    chip: 'chip-blue',
    color: 'blue',
    eyebrow: 'Strength · Unilateral + Power',
    title: 'Lower Unilateral',
    sub: 'Second leg day: single-leg strength and hip power. One leg at a time makes 50 lb per hand plenty heavy, and the DB swing keeps you explosive without a barbell. Optional easy spin after if the clock allows.',
    tags: ['~35 min lift + optional spin', 'Weekday · home by 7:30', 'DBs + mat'],
    exercises: [
      {
        name: 'DB Reverse Lunge',
        sets: '3 × 10/leg',
        note: 'DB in each hand, step back, back knee kisses the floor, drive up through the front heel. Reverse beats forward lunges in a small space — no travel, easier on the knees. Torso tall.',
        videoQuery: 'dumbbell reverse lunge form tutorial',
      },
      {
        name: 'Single-Leg RDL (DB)',
        sets: '3 × 8/leg',
        note: 'Hinge forward on one leg, free leg extends behind, hips square. DB in the opposite hand to the working leg. Touch the wall for balance if needed. Hamstrings + balance + ankle stability for the bike and the swing.',
        videoQuery: 'single leg rdl dumbbell form tutorial',
      },
      {
        name: 'Cossack Squat (goblet)',
        sets: '3 × 8/side',
        note: 'Wide stance, shift all the way over one leg, other leg straight, heel down. Goblet-hold one DB for counterbalance. Lateral strength and hip mobility the bike never trains — and the golf swing loves.',
        videoQuery: 'cossack squat goblet form tutorial',
      },
      {
        name: 'Heavy DB Swing',
        sets: '3 × 15',
        note: 'One DB loaded to ~40–50 lb, both hands on the handle. Hike it between the legs, snap the hips forward, let it float to chest height — arms passive, hips do everything. The power/explosive slot now that the barbell is gone. Mind the clearance in a small room.',
        videoQuery: 'dumbbell swing form tutorial hip hinge',
      },
      {
        name: 'Side Plank',
        sets: '3 × 30–40 sec/side',
        note: 'On the mat. Straight line head to heels, hips high. Anti-lateral-flexion core to finish — stack the feet, or stagger for stability.',
        videoQuery: 'side plank form tutorial',
      },
    ],
    rides: [
      {
        variant: 'indoor',
        pill: 'Optional Spin · Indoor',
        title: '15–20 min easy if time allows',
        body: 'Same easy Zone 2 flush as Monday, ~120–145W, upright and relaxed on the Zwift Ride. Optional — the lift is the priority. Skip it without guilt to make 7:30.',
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
    name: 'Golf + Pull',
    type: 'Golf',
    chip: 'chip-green',
    color: 'green',
    eyebrow: 'Golf · Pull · Recovery',
    title: 'Golf + Pull',
    sub: 'The easy day that still earns its keep: a relaxed round — nine, or a full eighteen if the morning is open — then a light dumbbell pull session and a proper mobility block at home. Weekend pace, back by around 10 (later if you play 18).',
    tags: ['Relaxed round + ~25 min pull + mobility', 'Weekend · flexible'],
    exercises: [
      {
        name: 'Play — relaxed 9 or 18',
        sets: 'walk it',
        note: 'No clock pressure today. Walk the round for the steps and the head-space — low intensity is exactly what the day after a long ride wants. If your Whoop recovery is red, keep it to nine or take a true rest day — skip the pull session too. Sleep beats any extra session.',
      },
      {
        name: 'Bent-Over DB Row',
        sets: '4 × 10–12',
        note: 'Both DBs, hinged to ~45°, pull to the lower ribs, 1-sec squeeze, no heaving. The main pull of the week — rows carry the whole back now that there’s no bar or pulldown. Work up to 2×50 and then slow the negatives.',
        videoQuery: 'bent over dumbbell row form tutorial',
      },
      {
        name: 'Single-Arm DB Row',
        sets: '3 × 10/side',
        note: 'Free hand braced on the knee (no bench needed), flat back, pull the DB to the hip. Load one DB heavier than the pair allows — this is where the back gets its heavy work.',
        videoQuery: 'single arm dumbbell row knee braced form',
      },
      {
        name: 'Cuff maintenance',
        sets: '2 rounds',
        note: 'Side-lying external rotations (5-lb plate) × 12/side + prone Y-T-W × 8 each. The weekly insurance dose for the shoulder, independent of Wednesday’s warm-up. Two minutes, do not skip.',
        videoQuery: 'prone ytw raise shoulder scapular exercise',
      },
      {
        name: 'Suitcase Carry (optional)',
        sets: '3 × 30–45 sec/side',
        note: 'One heavy DB, walk hallway laps or march in place, tall and level — don’t lean. Grip, obliques and posture work in a small footprint; the farmer-carry slot, apartment edition.',
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
