import { Clock, Sheet as SheetIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { fmtDate, fmtRange, toMinutes, type CampusEvent } from "@/data/events";
import { categoryStyles } from "./category";

export function PlanDrawer({ events, day }: { events: CampusEvent[]; day: string }) {
  const now = 11 * 60; // demo "current time" inside the fest day

  const upcoming = [...events]
    .filter((e) => e.date >= day)
    .sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
      return (toMinutes(a.start) ?? 1440) - (toMinutes(b.start) ?? 1440);
    });

  const deadlines = upcoming.filter((e) => e.category === "action").slice(0, 2);
  const doable = upcoming
    .filter((e) => e.date === day && (toMinutes(e.start) ?? 0) >= now)
    .slice(0, 2);

  const plan = [...deadlines, ...doable].slice(0, 4);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-5 right-5 z-40 rounded-full shadow-elevated sm:bottom-8 sm:right-8"
        >
          <Clock className="h-4 w-4" />2 Hours Free — Plan
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <SheetIcon className="h-4 w-4 text-primary" />
            What should I do next?
          </SheetTitle>
        </SheetHeader>
        <div className="space-y-3 px-4 pb-8">
          <p className="text-sm text-muted-foreground">
            You have a two-hour gap. Based on the nearest deadlines and what is still running on{" "}
            {fmtDate(day)}, here is the order that costs you the least.
          </p>
          {plan.map((e, i) => (
            <div key={e.id} className="rounded-lg border border-border bg-card p-3">
              <div className="flex items-center gap-2">
                <span className="mono flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-xs text-primary">
                  {i + 1}
                </span>
                <span className={`h-2 w-2 rounded-full ${categoryStyles[e.category].dot}`} />
                <span className="text-sm font-medium">{e.title}</span>
              </div>
              <p className="mono mt-2 text-xs text-muted-foreground">
                {fmtDate(e.date)} · {fmtRange(e)} · {e.venue}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {e.category === "action"
                  ? "Hard deadline — clear this before anything optional."
                  : "Optional, but it is the nearest session you can still walk into."}
              </p>
            </div>
          ))}
          {plan.length === 0 && (
            <p className="text-sm text-muted-foreground">Nothing pressing. Enjoy the break.</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
