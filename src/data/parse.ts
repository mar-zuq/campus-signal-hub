import type { CampusEvent, Category } from "./events";

const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** Lightweight on-device parser that extracts category, date, time and venue from raw text. */
export function parseAnnouncement(text: string, channel: string): CampusEvent {
  const lower = text.toLowerCase();

  let category: Category = "opportunity";
  if (/(due|deadline|submit|last date|no extension|mandatory|fine)/.test(lower)) category = "action";
  if (/(shift|reschedul|postpon|prepon|moved|changed to)/.test(lower)) category = "schedule";

  const base = new Date("2026-09-11T09:00:00");
  let date = iso(base);
  if (/(tmrw|tomorrow)/.test(lower)) {
    const d = new Date(base);
    d.setDate(d.getDate() + 1);
    date = iso(d);
  }
  const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const toMatch = lower.match(/to\s+(sun|mon|tues|tue|wednes|wed|thurs|thu|fri|satur|sat)\w*/);
  if (toMatch) {
    const key = (toMatch[1] ?? "").slice(0, 3);
    const idx = weekdays.findIndex((w) => w.startsWith(key));
    if (idx >= 0) {
      const d = new Date(base);
      const delta = (idx - d.getDay() + 7) % 7 || 7;
      d.setDate(d.getDate() + delta);
      date = iso(d);
    }
  }

  let start: string | undefined;
  const time = lower.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/);
  if (time) {
    let h = Number(time[1]) % 12;
    if (time[3] === "pm") h += 12;
    start = `${pad(h)}:${time[2] ?? "00"}`;
  }

  const venue =
    text.match(/\b(?:at|in|venue[:\s])\s+([A-Z][A-Za-z0-9 ]{2,28})/)?.[1]?.trim() ??
    (text.match(/\bCS\d{3}\b/)?.[0] || "To be announced");

  const title = text
    .replace(/^(guys|hi|hello|notice:?|attention:?)\s*/i, "")
    .replace(/\s+/g, " ")
    .split(/[.\-–—]/)[0]
    .trim()
    .slice(0, 78);

  return {
    id: `ing-${Date.now()}`,
    title: title.charAt(0).toUpperCase() + title.slice(1),
    category,
    track: category === "opportunity" ? "Drishti" : "Academic",
    date,
    start,
    end: start ? undefined : undefined,
    venue,
    organizer: "Parsed from your inbox",
    source: channel,
    snippet: `"${text.slice(0, 70)}${text.length > 70 ? "…" : ""}"`,
  };
}

export const DEMOS = [
  {
    label: "WhatsApp: DBMS lab deadline",
    channel: "WhatsApp — S4 CSE",
    text: "Guys sir said KTU DBMS Lab project proposal due tmrw 4pm. No extension.",
  },
  {
    label: "Poster: TinyML workshop",
    channel: "Poster upload (OCR)",
    text: "IEEE CS Workshop on TinyML - Tomorrow 4:30 PM at Seminar Hall.",
  },
  {
    label: "Notice: OS internal shifted",
    channel: "Notice upload (OCR)",
    text: "Notice: OS Internal exam shifted from Thursday to Friday 10 AM.",
  },
];
