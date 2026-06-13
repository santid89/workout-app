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

/** Builds a YouTube search URL from a query, matching the original "How to" links. */
export function youtubeSearch(query: string): string {
  return `https://www.youtube.com/results?search_query=${query.replace(/ /g, '+')}`;
}
