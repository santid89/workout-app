# Weekly Strava → Training Plan (routine prompt)

**Run this every Sunday night.** It reads the past week of Strava data, compares it
against my fixed weekly training structure, and drafts an email to me with a
comprehensive day-by-day plan for the coming week (Mon–Sun).

- **Athlete email:** `s.darmandrail@gmail.com`
- **Delivery:** a Gmail **draft** (review, then I hit send myself).
- **Philosophy:** *maintain* the current structure. Do **not** redesign the week.
  Keep the day types and split below; only tune loads, volume, intensity, and
  ride durations based on what actually happened last week and how recovered I am.

---

## My fixed weekly structure (do not change the shape)

| Day | Type | Title | Notes |
|-----|------|-------|-------|
| Mon | Strength · Lower | Lower Power | Squat 5×5 (3-wk rotation A/B/C), RDL, BSS, accessories. Optional Z2 spin 20–30 min. |
| Tue | Strength · Push | Upper Push & Press | Bench 5×5 (rotation), OHP, incline DB, delts. Optional Z2 spin. |
| Wed | Ride Day | Mid-Week Ride | 60–90 min outdoor Z2 (Tarmac SL8 / Marlin), or Zwift sweet-spot backup. No lifting. |
| Thu | Power · Athletic | Power & Athletic | Explosive, light loads, max speed, full recovery between sets. |
| Fri | Strength · Pull | Posterior & Pull | Deadlift variation (rotation), back width, posterior chain. |
| Sat | Long Ride | Long Ride | Signature ride of the week, outdoor by default. |
| Sun | Recovery | Recovery | Active rest — mobility, walk, easy spin. Protects the rest of the week. |

**Standing context:**
- FTP: **180 W** (verify against Strava zones each week; flag if it has shifted).
- Bikes: Specialized **Tarmac SL8** (road), Trek **Marlin** (backup/MTB).
- Strength main lifts run a **3-week A/B/C rotation** — work out which letter the
  coming week lands on from recent activity history and call it out per lift.
- Nutrition goal: cut to **188 lb by 2026-12-31**, ~0.35 lb/week, preserve lean
  mass. Include a short fueling note for the week (training-day vs rest-day macros).

---

## Steps

### 1. Establish the date window
- "Last week" = the most recent Monday 00:00 through Sunday 23:59 (the week ending today).
- "This week" = the upcoming Monday through Sunday.
- State both date ranges explicitly at the top of your analysis.

### 2. Pull Strava data
Use the Strava MCP tools:
- `get_athlete_profile` — confirm weight/measurement prefs (convert metric → imperial: km→mi, m→ft, kg→lb).
- `get_athlete_zones` — HR zones, power zones, **current FTP** (note if ≠ 180 W and whether estimated).
- `list_activities` with `range_start`/`range_end` covering last week (set `include_tags: true`).
  For the key sessions (long ride, hard rides, any PRs), pull `get_activity_performance`
  and, where useful, `get_activity_streams` (heart_rate, watts, velocity_smooth) to judge intensity.
- `get_gear` — note bike/shoe mileage; flag if anything is near a service interval (chain ~3,000 km, etc.).
- `get_training_plan` — if Strava returns a personalized plan, reconcile it with the structure above (mine wins on shape; theirs can inform intensity).

### 3. Analyze last week
Summarize concisely:
- **Completed vs planned** — which day-types actually happened (rides logged; note that
  strength sessions may not be on Strava — infer from gaps and ask nothing, just assume planned strength ran unless a ride replaced it).
- **Load** — total ride time/distance/elevation, time-in-zone, any TSS/relative-effort signal, biggest single session.
- **Recovery flags** — back-to-back hard days, a load spike vs prior weeks, or unusually high HR for given power (possible fatigue/illness). If fatigue is evident, bias the coming week slightly easier *within the same structure* (lower volume / drop intensity, not restructure).
- **Wins** — PRs, segment efforts, consistency streaks. Call these out to motivate.

### 4. Build the coming week — daily, comprehensive
For **each day Mon–Sun**, produce:
- Day type + title (from the table).
- The specific session: lifts with sets×reps and which rotation letter applies, OR
  ride duration + target zones/power (anchored to FTP 180 W: Z2 ≈ 110–125 W,
  sweet spot ≈ 160–170 W, threshold ≈ 175–185 W — recompute if FTP changed).
- A one-line "why" tied to last week's data (e.g. "shorter Sat ride — you spiked
  volume +40% last week, so we pull back this week").
- Duration estimate and one coaching cue.

Keep the same week shape every time. Adjustments are **dose**, not **design**.

### 5. Draft the email
Use `mcp__Gmail__create_draft`:
- **to:** `s.darmandrail@gmail.com`
- **subject:** `Training plan — week of <Mon date> (Strava-adjusted)`
- **body:** plain-text fallback. **htmlBody:** a clean, mobile-friendly HTML email:
  1. **Last week recap** — 3–5 bullet highlights + load summary.
  2. **This week at a glance** — one-line-per-day table.
  3. **Daily detail** — the full Mon–Sun breakdown from step 4.
  4. **Fueling note** — training vs rest-day macros toward the 188 lb goal.
  5. **Flags** — FTP change, gear service, fatigue/recovery callouts (only if relevant).
- Do **not** send. Leave it as a draft and report the draft was created.

### 6. (Optional) Mirror to the hosted site
Only if I explicitly ask in a given run: also regenerate the matching day-panels in
`public/index.html` and push to `claude/cool-keller-aqu273` so the Firebase site
reflects the new week. By default, **email draft only — no commits.**

---

## Notes for the running agent
- If Strava returns no activities for last week, say so plainly and produce a
  normal maintenance week (no fatigue assumptions).
- Never invent activities or numbers. If a tool fails, note it and continue with
  what you have.
- Be specific and concrete — this email is the plan I train off of all week.
