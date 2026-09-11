import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { fmtDate, fmtRange, type CampusEvent } from "@/data/events";
import { categoryStyles } from "./category";

export function CatchUpModal({
  open,
  onOpenChange,
  events,
  today,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  events: CampusEvent[];
  today: string;
}) {
  const actionsDue = events.filter((e) => e.category === "action" && e.date <= today);
  const shifts = events.filter((e) => e.category === "schedule");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Catch me up</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          You missed <span className="font-semibold text-foreground">{events.length}</span> messages.{" "}
          <span className="font-semibold text-action">{actionsDue.length}</span> require action today
          and <span className="font-semibold text-schedule">{shifts.length}</span> schedules moved.
        </p>
        <div className="mt-2 space-y-2">
          {[...actionsDue, ...shifts].slice(0, 6).map((e) => (
            <div key={e.id} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${categoryStyles[e.category].dot}`} />
              <div>
                <p className="text-sm">{e.title}</p>
                <p className="mono text-[11px] text-muted-foreground">
                  {fmtDate(e.date)} · {fmtRange(e)} · {e.venue}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
