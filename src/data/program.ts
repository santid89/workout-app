import type { WorkoutDay } from '@/types';

/**
 * The full weekly program. This was previously hardcoded as HTML markup in
 * index.html; modeling it as data is what makes new features (charts, editing,
 * alternate programs) tractable. HTML entities from the original are written
 * here as their literal Unicode characters.
 *
 * Design intent (2026 redesign, away-day edition): the week is shaped by one
 * new fact of life — three weekday dawns are spent inside the apartment (she's
 * at the 6 a.m. class, you're on kid duty), and only two weekday mornings plus
 * the weekend allow leaving (building gym, road, or tee). So the week splits
 * into HOME mornings (dumbbells + mat + Zwift Ride) and AWAY mornings, and
 * each away morning is spent where the apartment genuinely can't follow:
 *   • One on the building's full gym — a heavy lower-body + trunk day, because
 *     the May DEXA showed legs (−2.0 lb) and trunk (−3.7 lb) losing the most
 *     lean despite riding 3–4× a week. Load holds muscle in a deficit; Z2
 *     volume doesn't, and 50-lb dumbbells can't load legs meaningfully.
 *   • One on the road or the tee — outdoor Z2 by default while the century
 *     build is on, the dawn nine when golf wins the argument.
 * Wed/Fri are placeholders for the away days — slide them to whichever
 * mornings she's home and keep the pattern (gym mid-week, ride-or-golf near
 * the weekend). Upper body still runs at home on the dumbbells: two handles,
 * ~50 lb per hand ceiling, no bench, floor pressing. All watt targets are
 * built off FTP 254W (Garmin retest 2026-08-02). The whole thing is pointed
 * at 188 lb by year-end with lean mass held, and a comfortable century.
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
    eyebrow: 'Home · Strength · Push',
    title: 'Upper Push',
    sub: 'Chest, shoulders and triceps to open the week — the floor press rotation is the anchor lift. Home morning: dumbbells and the mat while the apartment sleeps. Shoulder is in Phase B: cuff warm-up first, floor-protected pressing, nothing overhead yet. Optional easy spin after. Start ~5:50, showered by 7:30.',
    tags: ['~35 min lift + optional spin', 'Home day · DBs + mat', 'Showered by 7:30'],
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
        body: 'Easy Zone 2 flush, ~140–165W (55–65% of your 254W FTP), upright and relaxed on the Zwift Ride. Optional — the lift is the priority. Skip it without guilt to make 7:30.',
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
    sub: 'Your one hard, structured bike session — weather-proof, apartment-proof, and tightly time-boxed on the Zwift Ride. Alternate sweet-spot and VO₂ blocks by cycle week. FTP 254W. Cap it with an 8-minute core circuit on the mat.',
    tags: ['45–55 min', 'Home day · Zwift', 'Finish: 8-min core'],
    rides: [
      {
        variant: 'indoor',
        pill: 'Sweet Spot · Weeks A / C',
        title: '3 × 12 min @ 224–234W (88–92% FTP)',
        body: '5 min easy, 5 min build, then 3 × 12 min at sweet spot with 4 min easy between. Best bang-for-buck aerobic power — raises FTP without wrecking recovery. Ride the blocks in level mode, not ERG: at this intensity a fading cadence sends ERG piling force onto dying legs. Hold the watts yourself. Cadence 85–95.',
      },
      {
        variant: 'indoor',
        pill: 'VO₂ · Week B',
        title: '5 × 3 min @ 275–295W (108–116% FTP)',
        body: 'After a 12-min build: 5 × 3 min hard, 3 min easy spin between. Top-end power and a big calorie hit in a short window. Level mode, not ERG — the ERG spiral is most brutal exactly here. Short and savage; perfect for the weekday slot.',
      },
      {
        variant: 'fallback',
        pill: 'Fallback',
        title: '40 min Zone 2 + core',
        body: 'Low recovery or short on time: steady ~145–180W and just bank the aerobic minutes (ERG is fine at this intensity). Either way finish with the mat core circuit — hollow holds, side planks, dead bugs.',
      },
    ],
  },

  // ════════════════ WEDNESDAY ════════════════
  {
    key: '3',
    short: 'Wed',
    name: 'Gym Lower',
    type: 'Power',
    chip: 'chip-amber',
    color: 'amber',
    eyebrow: 'Away · Gym · Lower + Trunk',
    title: 'Building Gym: Lower',
    sub: 'The first away morning and the week’s one heavy day, in the full gym downstairs. The May DEXA was blunt: legs and trunk lost the most lean while riding the most — Z2 volume doesn’t hold muscle, load does. Real machines and real weight do what 50-lb dumbbells can’t. Evening: the ~25-min arms & delts pump back upstairs. Start ~5:50 — the commute is an elevator — showered by 7:30.',
    tags: ['~50 min gym AM', '~25 min pump PM', 'Away day · building gym'],
    exercises: [
      {
        name: 'AM · Warm-up',
        sets: '~5 min',
        note: 'Easy spin on a gym bike or brisk incline walk, leg swings and hip openers, then two light feeder sets of the first lift. The day’s only job is quality reps through a full range — earn them.',
      },
      {
        name: 'AM · Leg Press',
        sets: '4 × 8–10',
        note: 'The squat-pattern anchor, chosen over the barbell on purpose: a bar on the back demands the exact abducted, externally-rotated arm position the healing shoulder hates. Press with the legs, load without compromise. Controlled depth, knees tracking the toes, no slamming lockouts. Add 5–10 lb a week — this is the progressive-overload lever the apartment can’t offer.',
        videoQuery: 'leg press 45 degree machine form',
      },
      {
        name: 'AM · Romanian Deadlift',
        sets: '3 × 8–10',
        note: 'Barbell from the rack or the heaviest DBs on the row — grip at your sides keeps the shoulder neutral either way. Hips back to a deep hamstring stretch, flat back, drive forward. The hinge that the swing, the pedal stroke and the golf swing all borrow from.',
        videoQuery: 'barbell romanian deadlift form',
      },
      {
        name: 'AM · Bulgarian Split Squat',
        sets: '3 × 8–10/leg',
        note: 'Rear foot on a bench, DBs at your sides. Single-leg strength is the cycling carryover — and it exposes the left/right gap that flat pedaling hides. Famously sore-making: start modest, add slowly.',
        videoQuery: 'bulgarian split squat dumbbell form',
      },
      {
        name: 'AM · Leg Curl + Calf Raise',
        sets: '3 × 10–12 + 12–15',
        note: 'Superset. Riding trains hip extension for thousands of reps and knee flexion for none — hamstring curls are the posterior chain’s insurance policy. Calves: pause at the stretch, full squeeze at the top. Slow negatives on both.',
        videoQuery: 'seated leg curl machine form',
      },
      {
        name: 'AM · Cable Crunch + Back Extension',
        sets: '3 × 12 + 12',
        note: 'Superset. The trunk lost 3.7 lb of lean between scans — this is the direct fix. Cable crunch: hips still, pull ribs to pelvis. Back extension: hinge, don’t hyperextend; hug a plate once 12 gets easy.',
        videoQuery: 'cable crunch and back extension form',
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
    name: 'Upper Pull',
    type: 'Strength',
    chip: 'chip-blue',
    color: 'blue',
    eyebrow: 'Home · Strength · Pull',
    title: 'Upper Pull',
    sub: 'The back day — rows carry everything with no bar or pulldown at home. Legs moved downstairs to Wednesday, so this is pure pull now, plus a short heavy-swing finisher for hip power. Home morning, dumbbells and the mat. Optional easy spin after.',
    tags: ['~35 min lift + optional spin', 'Home day · DBs + mat', 'Showered by 7:30'],
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
        note: 'Free hand braced on the knee (no bench needed), flat back, pull the DB to the hip. Load one DB heavier than the pair allows — this is where the back gets its heaviest home work.',
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
        name: 'Heavy DB Swing (finisher)',
        sets: '2 × 15',
        note: 'One DB at ~40–50 lb, both hands. Hike, snap the hips, let it float to chest height — arms passive. Hip power and a heart-rate spike to close the session; light enough after Wednesday’s hinging that it helps more than it costs. Mind the clearance in a small room.',
        videoQuery: 'dumbbell swing form tutorial hip hinge',
      },
    ],
    rides: [
      {
        variant: 'indoor',
        pill: 'Optional Spin · Indoor',
        title: '15–20 min easy if time allows',
        body: 'Easy Zone 2 flush, ~140–165W, upright and relaxed on the Zwift Ride. Optional — the lift is the priority. Skip it without guilt to make 7:30.',
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
    eyebrow: 'Away · Ride or Golf',
    title: 'Outdoor Ride — or the Dawn Nine',
    sub: 'The second away morning, and it’s a choice: 60–75 min of outdoor Zone 2 on the Tarmac (the default while the century build is on), or a dawn nine when golf wins the argument. Either way it’s a dawn start and home to shower by 7:30.',
    tags: ['60–75 min', 'Away day · ride or golf', 'Home by 7:30'],
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
        body: 'Carry or push, brisk between shots: ~7–8k steps and 300–500 kcal of real Zone 1–2 work. Range + short game if the sheet is backed up — call it at 7:00 and still make 7:30. Trade freely in August; from September on, bias this slot to the bike — the century needs the miles more than par needs the practice.',
      },
      {
        variant: 'indoor',
        pill: 'Indoor · Weather backup',
        title: '50 min Zwift Zone 2 / tempo',
        body: 'Rain or too dark: steady Zone 2 with a few 3–5 min tempo lifts (195–220W). Doesn’t need the away slot at all — bank it at home and give the morning back.',
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
    sub: 'The easy day, and it stays easy: a relaxed round — nine, or a full eighteen if the morning is open — then cuff maintenance and a proper mobility block at home. No lifting today; three lift days plus the pump during the week earn a real recovery day. Back by around 10 (later if you play 18).',
    tags: ['Relaxed round + mobility', 'Weekend · flexible'],
    exercises: [
      {
        name: 'Play — relaxed 9 or 18',
        sets: 'walk it',
        note: 'No clock pressure today. Walk the round for the steps and the head-space — low intensity is exactly what the day after a long ride wants. If your recovery score is red, keep it to nine or take a true rest day. Sleep beats any extra session.',
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
        note: 'Want a touch more movement? A very easy Zone 1 spin (~150W, 60% FTP) helps the legs shed Saturday’s ride. Totally optional — recovery pace only.',
      },
    ],
  },
];
