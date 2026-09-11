export type Category = "action" | "schedule" | "opportunity" | "conflict";

export type CampusEvent = {
  id: string;
  title: string;
  category: Category;
  track: "DotSlash" | "Drishti" | "Academic";
  date: string; // YYYY-MM-DD
  endDate?: string;
  start?: string; // HH:MM 24h
  end?: string;
  venue: string;
  organizer: string;
  source: string;
  snippet: string;
  coordinator?: boolean;
  fee?: string;
  prize?: string;
  activityPoints?: boolean;
  official?: boolean;
  note?: string;
};

export const USER = {
  name: "Mohammed Marzuq A",
  short: "S4 CSE (Roll 46)",
  role: "IEEE SB Coordinator",
  studentId: "TVE24CS101",
  initials: "MA",
  activityPoints: 85,
  activityTarget: 100,
};

export const DAYS = [
  { date: "2026-09-11", label: "Sep 11", sub: "DotSlash Day 1" },
  { date: "2026-09-12", label: "Sep 12", sub: "DotSlash Day 2" },
];

// ---- Official DotSlash Day 1 schedule (from the shared poster) ----
const dotslashDay1: CampusEvent[] = [
  {
    id: "ds-inaug",
    title: "Inauguration Ceremony",
    category: "schedule",
    track: "DotSlash",
    date: "2026-09-11",
    start: "10:00",
    end: "11:00",
    venue: "CETAA Hall",
    organizer: "DotSlash '26",
    source: "DotSlash Official Poster",
    snippet: "Day 1 schedule poster",
    official: true,
  },
  {
    id: "ds-esp32",
    title: "Build with ESP32",
    category: "opportunity",
    track: "DotSlash",
    date: "2026-09-11",
    start: "10:00",
    end: "12:30",
    venue: "CS116",
    organizer: "DotSlash '26",
    source: "DotSlash Official Poster",
    snippet: "Day 1 schedule poster",
    official: true,
    coordinator: true,
  },
  {
    id: "ds-n8n",
    title: "Automate Everything: Master n8n",
    category: "opportunity",
    track: "DotSlash",
    date: "2026-09-11",
    start: "13:00",
    end: "14:30",
    venue: "CS115",
    organizer: "DotSlash '26",
    source: "DotSlash Official Poster",
    snippet: "Day 1 schedule poster",
    official: true,
  },
  {
    id: "ds-rapid",
    title: "Rapid Prototyping",
    category: "opportunity",
    track: "DotSlash",
    date: "2026-09-11",
    start: "10:00",
    end: "13:00",
    venue: "CS217",
    organizer: "DotSlash '26",
    source: "DotSlash Official Poster",
    snippet: "Day 1 schedule poster",
    official: true,
    coordinator: true,
  },
  {
    id: "ds-reverse",
    title: "Reverse Coding",
    category: "opportunity",
    track: "DotSlash",
    date: "2026-09-11",
    start: "11:00",
    end: "13:00",
    venue: "CS103",
    organizer: "DotSlash '26",
    source: "DotSlash Official Poster",
    snippet: "Day 1 schedule poster",
    official: true,
  },
  {
    id: "ds-turing",
    title: "The Turing Heist",
    category: "opportunity",
    track: "DotSlash",
    date: "2026-09-11",
    start: "14:00",
    end: "16:00",
    venue: "CS104",
    organizer: "DotSlash '26",
    source: "DotSlash Official Poster",
    snippet: "Day 1 schedule poster",
    official: true,
  },
  {
    id: "ds-aitools",
    title: "AI Tools Workshop",
    category: "opportunity",
    track: "DotSlash",
    date: "2026-09-11",
    start: "10:00",
    end: "11:30",
    venue: "CS214",
    organizer: "DotSlash '26",
    source: "DotSlash Official Poster",
    snippet: "Day 1 schedule poster",
    official: true,
  },
  {
    id: "ds-scratch",
    title: "Scratch Workshop",
    category: "opportunity",
    track: "DotSlash",
    date: "2026-09-11",
    start: "10:00",
    end: "12:00",
    venue: "CS104",
    organizer: "DotSlash '26",
    source: "DotSlash Official Poster",
    snippet: "Day 1 schedule poster",
    official: true,
  },
  {
    id: "ds-cyber",
    title: "Smart Surfing: Cybersecurity Workshop",
    category: "opportunity",
    track: "DotSlash",
    date: "2026-09-11",
    start: "10:30",
    end: "12:00",
    venue: "CS312",
    organizer: "DotSlash '26",
    source: "DotSlash Official Poster",
    snippet: "Day 1 schedule poster",
    official: true,
  },
  {
    id: "ds-hardware",
    title: "PC Hardware Workshop",
    category: "opportunity",
    track: "DotSlash",
    date: "2026-09-11",
    start: "11:00",
    end: "12:30",
    venue: "CS206",
    organizer: "DotSlash '26",
    source: "DotSlash Official Poster",
    snippet: "Day 1 schedule poster",
    official: true,
  },
  {
    id: "ds-opensource",
    title: "Understanding Open Source Ecosystems",
    category: "opportunity",
    track: "DotSlash",
    date: "2026-09-11",
    start: "14:00",
    end: "16:00",
    venue: "SDPK Hall",
    organizer: "DotSlash '26",
    source: "DotSlash Official Poster",
    snippet: "Day 1 schedule poster",
    official: true,
    coordinator: true,
  },
];

// Day 2 intentionally left empty until the official schedule is shared.
const dotslashDay2: CampusEvent[] = [];

// ---- Academic / critical items ----
const academics: CampusEvent[] = [
  {
    id: "ac-dbms",
    title: "KTU DBMS Lab project proposal submission",
    category: "action",
    track: "Academic",
    date: "2026-09-14",
    start: "16:00",
    venue: "CSE Dept Office",
    organizer: "Dr. Anitha R, CSE",
    source: "WhatsApp — S4 CSE Official",
    snippet: "\"proposal due 4pm. No extension.\"",
  },
  {
    id: "ac-os",
    title: "OS Internal Exam shifted to Friday",
    category: "schedule",
    track: "Academic",
    date: "2026-09-18",
    start: "10:00",
    end: "11:30",
    venue: "CS Block Exam Hall",
    organizer: "CSE Exam Cell",
    source: "Dept Notice Board",
    snippet: "\"shifted from Thursday to Friday 10 AM\"",
  },
  {
    id: "ac-fee",
    title: "KTU Semester exam fee — last date",
    category: "action",
    track: "Academic",
    date: "2026-09-12",
    start: "17:00",
    venue: "KTU Portal",
    organizer: "University Office",
    source: "KTU Circular",
    snippet: "\"late fee applies after 12 Sept\"",
  },
  {
    id: "ac-ieee",
    title: "IEEE SB monthly report submission",
    category: "action",
    track: "Academic",
    date: "2026-09-11",
    start: "18:00",
    venue: "Online (IEEE vTools)",
    organizer: "IEEE Kerala Section",
    source: "IEEE SB Coordinators group",
    snippet: "\"report due before EOD\"",
    coordinator: true,
  },
  {
    id: "ac-mentor",
    title: "Faculty mentoring session — S4 CSE",
    category: "schedule",
    track: "Academic",
    date: "2026-09-12",
    start: "15:00",
    end: "16:00",
    venue: "CS201",
    organizer: "Mentor: Prof. Vinod K",
    source: "Class group",
    snippet: "\"attendance mandatory\"",
  },
  {
    id: "ac-library",
    title: "Library book return — overdue notice",
    category: "action",
    track: "Academic",
    date: "2026-09-11",
    start: "16:30",
    venue: "Central Library",
    organizer: "CET Library",
    source: "Email",
    snippet: "\"fine accrues daily\"",
  },
];

// ---- Drishti '26 (externally sourced) ----
const drishti: CampusEvent[] = [
  {
    id: "dr-signal",
    title: "Signal Showdown (IET x Drishti)",
    category: "opportunity",
    track: "Drishti",
    date: "2026-09-19",
    venue: "CET Campus",
    organizer: "IET on Campus x Drishti '26",
    source: "discover.snaptiqz.com (Scraped)",
    snippet: "Reg Rs 149 · Prize pool Rs 3,000",
    fee: "Rs 149",
    prize: "Rs 3,000",
  },
  {
    id: "dr-tinyml",
    title: "TinyML: From Zero to Edge Intelligence",
    category: "opportunity",
    track: "Drishti",
    date: "2026-09-18",
    endDate: "2026-09-19",
    venue: "Seminar Hall, CET",
    organizer: "IEEE SB CET",
    source: "Drishti Instagram",
    snippet: "2-day workshop · KTU Activity Points",
    fee: "Rs 399",
    activityPoints: true,
    coordinator: true,
  },
  {
    id: "dr-sangraha",
    title: "Sangraha '26: Exhibition & Competition of Collectibles",
    category: "opportunity",
    track: "Drishti",
    date: "2026-09-20",
    venue: "CET Campus",
    organizer: "Drishti '26",
    source: "discover.snaptiqz.com (Scraped)",
    snippet: "Reg Rs 49 · Prize pool Rs 6,000",
    fee: "Rs 49",
    prize: "Rs 6,000",
    activityPoints: true,
  },
  {
    id: "dr-expo",
    title: "Drishti '26 Project Expo",
    category: "opportunity",
    track: "Drishti",
    date: "2026-09-18",
    endDate: "2026-09-20",
    venue: "CET Campus",
    organizer: "Drishti '26",
    source: "discover.snaptiqz.com (Scraped)",
    snippet: "Rs 49 (Rs 300 per team) · Prize pool Rs 1 Lakh",
    fee: "Rs 49 / Rs 300 per team",
    prize: "Rs 1 Lakh",
  },
  {
    id: "dr-nix",
    title: "Workshop on Nix and NixOS",
    category: "opportunity",
    track: "Drishti",
    date: "2026-09-19",
    venue: "CET Campus",
    organizer: "FOSS Cell CET",
    source: "Drishti Instagram",
    snippet: "Free entry · KTU Activity Points",
    fee: "Free",
    activityPoints: true,
  },
  {
    id: "dr-juniors",
    title: "Drishti For Juniors x LITSOC",
    category: "opportunity",
    track: "Drishti",
    date: "2026-09-19",
    start: "10:00",
    end: "17:00",
    venue: "CET Campus",
    organizer: "Drishti '26 x LITSOC",
    source: "discover.snaptiqz.com (Scraped)",
    snippet: "Reg Rs 499 · Prize pool Rs 10,000",
    fee: "Rs 499",
    prize: "Rs 10,000",
  },
  {
    id: "dr-shaan",
    title: "Shaan Rahman Live in Concert",
    category: "opportunity",
    track: "Drishti",
    date: "2026-09-19",
    start: "18:30",
    end: "21:30",
    venue: "CET Main Ground",
    organizer: "Drishti '26",
    source: "Drishti Instagram",
    snippet: "Cultural highlight of Drishti '26",
  },
];

export const INITIAL_EVENTS: CampusEvent[] = [
  ...academics,
  ...dotslashDay1,
  ...dotslashDay2,
  ...drishti,
];

export const CATEGORY_LABEL: Record<Category, string> = {
  action: "Critical Action",
  schedule: "Schedule Shift",
  opportunity: "Opportunity",
  conflict: "Conflict Alert",
};

export const toMinutes = (t?: string) => {
  if (!t) return null;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export const fmtTime = (t?: string) => {
  if (!t) return "All day";
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, "0")} ${suffix}`;
};

export const fmtRange = (e: CampusEvent) =>
  e.start ? `${fmtTime(e.start)}${e.end ? ` – ${fmtTime(e.end)}` : ""}` : "All day";

export const fmtDate = (d: string) =>
  new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });

/** Events that overlap in time on the same day (different venue = you must choose). */
export function findConflicts(event: CampusEvent, all: CampusEvent[]): CampusEvent[] {
  const s = toMinutes(event.start);
  const e = toMinutes(event.end) ?? (s !== null ? s + 60 : null);
  if (s === null || e === null) return [];
  return all.filter((other) => {
    if (other.id === event.id || other.date !== event.date) return false;
    const os = toMinutes(other.start);
    const oe = toMinutes(other.end) ?? (os !== null ? os + 60 : null);
    if (os === null || oe === null) return false;
    return s < oe && os < e;
  });
}

export function attendanceRisk(count: number) {
  if (count >= 4) return { label: "Very low — 65% drop expected", tone: "action" as const };
  if (count >= 2) return { label: "Low — 40% drop expected", tone: "conflict" as const };
  return { label: "Moderate — 20% drop expected", tone: "conflict" as const };
}
