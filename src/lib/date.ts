/** Formats a Date as "YYYY-MM-DD" in local time. */
export function ymd(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}

export const todayStr = (): string => ymd(new Date());

/** Humanizes a YYYY-MM-DD string: "Today", "Yesterday", or "Mon, Jan 15". */
export function prettyDate(s: string): string {
  const [y, m, d] = s.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((date.getTime() - today.getTime()) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === -1) return 'Yesterday';
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Maps each workout-day key ('1'=Mon .. '7'=Sun) to its YYYY-MM-DD date in the
 * current Monday-started week. Used by the week strip to mark logged days.
 */
export function weekDates(): Record<string, string> {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  // JS: 0=Sun..6=Sat. Shift so Monday is the start of the week.
  const mondayOffset = (now.getDay() + 6) % 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - mondayOffset);
  const out: Record<string, string> = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    out[String(i + 1)] = ymd(d);
  }
  return out;
}

/**
 * Current logging streak: consecutive days up to today that have at least one
 * log. Accepts the set of logged YYYY-MM-DD dates. Today not yet logged doesn't
 * break a streak that's live through yesterday.
 */
export function currentStreak(loggedDates: Set<string>): number {
  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  // If today isn't logged yet, start counting from yesterday.
  if (!loggedDates.has(ymd(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (loggedDates.has(ymd(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** Builds a YouTube search URL from a query, matching the original "How to" links. */
export function youtubeSearch(query: string): string {
  return `https://www.youtube.com/results?search_query=${query.replace(/ /g, '+')}`;
}
