import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  attendanceRisk,
  fmtDate,
  fmtRange,
  toMinutes,
  type CampusEvent,
} from "@/data/events";

type Props = {
  event: CampusEvent | null;
  conflicts: CampusEvent[];
  onClose: () => void;
};

export function RiskModal({ event, conflicts, onClose }: Props) {
  if (!event) return null;
  const all = [event, ...conflicts];
  const starts = all.map((e) => toMinutes(e.start) ?? 0);
  const ends = all.map((e) => toMinutes(e.end) ?? (toMinutes(e.start) ?? 0) + 60);
  const min = Math.min(...starts) - 30;
  const max = Math.max(...ends) + 30;
  const span = Math.max(max - min, 60);
  const risk = attendanceRisk(conflicts.length);

  return (
    <Dialog open={!!event} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Risk Assessment — {fmtDate(event.date)}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border border-conflict/45 bg-conflict/10 p-3">
            <p className="text-sm font-semibold text-conflict">
              Predicted attendance: {risk.label}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {conflicts.length + 1} sessions run in overlapping slots across different venues (
              {all.map((e) => e.venue).join(", ")}). You can physically attend only one for the full
              duration.
            </p>
          </div>

          <div className="space-y-2">
            {all.map((e, i) => {
              const s = toMinutes(e.start) ?? 0;
              const en = toMinutes(e.end) ?? s + 60;
              return (
                <div key={e.id} className="space-y-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-sm font-medium">
                      {i === 0 ? "▶ " : ""}
                      {e.title}
                    </span>
                    <span className="mono text-xs text-muted-foreground">
                      {fmtRange(e)} · {e.venue}
                    </span>
                  </div>
                  <div className="h-6 w-full overflow-hidden rounded-md border border-border bg-secondary/50">
                    <div
                      className={`h-full rounded-md ${i === 0 ? "bg-primary/70" : "bg-conflict/45"}`}
                      style={{
                        marginLeft: `${((s - min) / span) * 100}%`,
                        width: `${((en - s) / span) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end">
            <Button onClick={onClose}>Got it, dismiss</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
