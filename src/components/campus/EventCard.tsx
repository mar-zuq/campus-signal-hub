import { AlertTriangle, CalendarDays, FileSignature, MapPin, Ticket, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categoryStyles } from "./category";
import {
  CATEGORY_LABEL,
  attendanceRisk,
  fmtDate,
  fmtRange,
  type CampusEvent,
} from "@/data/events";

type Props = {
  event: CampusEvent;
  conflicts: CampusEvent[];
  onOpenRisk: (e: CampusEvent) => void;
  onDutyLeave: (e: CampusEvent) => void;
};

export function EventCard({ event, conflicts, onOpenRisk, onDutyLeave }: Props) {
  const style = categoryStyles[event.category];
  const risk = attendanceRisk(conflicts.length);

  return (
    <article
      className={`rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50 sm:p-5 ${style.ring}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${style.badge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
          {CATEGORY_LABEL[event.category]}
        </span>
        <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[11px] text-muted-foreground">
          {event.track}
        </span>
        {event.official && (
          <span className="rounded-full border border-opportunity/40 bg-opportunity/10 px-2.5 py-0.5 text-[11px] text-opportunity">
            Official poster
          </span>
        )}
        {event.track === "Drishti" && (
          <span className="rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-[11px] text-muted-foreground">
            External source
          </span>
        )}
        {event.coordinator && (
          <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
            Coordinator
          </span>
        )}
      </div>

      <h3 className="mt-3 text-base font-semibold leading-snug sm:text-lg">{event.title}</h3>

      <p className="mt-1 text-sm text-muted-foreground">
        <span className="text-foreground/70">{event.source}</span> · {event.snippet}
      </p>

      <div className="mono mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/60 px-2 py-1">
          <CalendarDays className="h-3.5 w-3.5" />
          {fmtDate(event.date)}
          {event.endDate ? ` → ${fmtDate(event.endDate)}` : ""}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/60 px-2 py-1">
          {fmtRange(event)}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/60 px-2 py-1">
          <MapPin className="h-3.5 w-3.5" />
          {event.venue}
        </span>
        {event.fee && (
          <span className="inline-flex items-center gap-1.5">
            <Ticket className="h-3.5 w-3.5" />
            {event.fee}
          </span>
        )}
        {event.prize && (
          <span className="inline-flex items-center gap-1.5">
            <Trophy className="h-3.5 w-3.5" />
            {event.prize}
          </span>
        )}
      </div>

      <p className="mt-2 text-xs text-muted-foreground">{event.organizer}</p>

      {conflicts.length > 0 && (
        <button
          type="button"
          onClick={() => onOpenRisk(event)}
          className="mt-4 flex w-full items-start gap-3 rounded-lg border border-conflict/45 bg-conflict/10 p-3 text-left transition-colors hover:bg-conflict/15"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-conflict" />
          <span className="text-xs leading-relaxed">
            <span className="font-semibold text-conflict">
              Clashes with {conflicts.length} other {conflicts.length === 1 ? "session" : "sessions"}
            </span>
            <span className="block text-muted-foreground">
              {conflicts
                .slice(0, 2)
                .map((c) => c.title)
                .join(", ")}
              {conflicts.length > 2 ? ` +${conflicts.length - 2} more` : ""} · Attendance {risk.label}
            </span>
            <span className="mt-1 block font-medium text-conflict">Open risk assessment →</span>
          </span>
        </button>
      )}

      {event.coordinator && (
        <div className="mt-4">
          <Button variant="outline" size="sm" onClick={() => onDutyLeave(event)}>
            <FileSignature className="h-4 w-4" />
            Generate Duty Leave
          </Button>
        </div>
      )}
    </article>
  );
}
