import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Command, Radio, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/campus/EventCard";
import { IngestBar } from "@/components/campus/IngestBar";
import { RiskModal } from "@/components/campus/RiskModal";
import { DutyLeaveModal } from "@/components/campus/DutyLeaveModal";
import { CommandPalette } from "@/components/campus/CommandPalette";
import { CatchUpModal } from "@/components/campus/CatchUpModal";
import { ActivityRing } from "@/components/campus/ActivityRing";
import { PlanDrawer } from "@/components/campus/PlanDrawer";
import {
  DAYS,
  INITIAL_EVENTS,
  USER,
  findConflicts,
  fmtDate,
  fmtRange,
  toMinutes,
  type CampusEvent,
} from "@/data/events";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusSignal — DotSlash '26 & Drishti '26 Triage for CET" },
      {
        name: "description",
        content:
          "CampusSignal turns CET WhatsApp noise into a triaged feed: DotSlash Sept 11–12 schedule, clash alerts, duty leave letters and KTU activity points.",
      },
      { property: "og:title", content: "CampusSignal — Campus Triage for CET" },
      {
        property: "og:description",
        content:
          "Official DotSlash Day 1 schedule, conflict detection, AI notice parsing and duty leave letters in one dark dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FILTERS = [
  { key: "all", label: "All" },
  { key: "academics", label: "Academics" },
  { key: "opportunities", label: "Opportunities" },
  { key: "analytics", label: "Analytics" },
] as const;

function Index() {
  const [events, setEvents] = useState<CampusEvent[]>(INITIAL_EVENTS);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const [day, setDay] = useState<string>("2026-09-11");
  const [dayFilterOn, setDayFilterOn] = useState(false);
  const [riskEvent, setRiskEvent] = useState<CampusEvent | null>(null);
  const [dutyEvent, setDutyEvent] = useState<CampusEvent | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [catchUpOpen, setCatchUpOpen] = useState(false);
  const [highlight, setHighlight] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const conflictsFor = useMemo(() => {
    const map = new Map<string, CampusEvent[]>();
    events.forEach((e) => map.set(e.id, findConflicts(e, events)));
    return map;
  }, [events]);

  const dayEvents = useMemo(
    () =>
      events
        .filter((e) => e.date === day)
        .sort((a, b) => (toMinutes(a.start) ?? 1440) - (toMinutes(b.start) ?? 1440)),
    [events, day],
  );

  const visible = useMemo(() => {
    let list = events;
    if (dayFilterOn) list = list.filter((e) => e.date === day);
    if (filter === "academics") list = list.filter((e) => e.track === "Academic");
    if (filter === "opportunities") list = list.filter((e) => e.category === "opportunity");
    if (filter === "analytics") list = list.filter((e) => (conflictsFor.get(e.id)?.length ?? 0) > 0);
    return list;
  }, [events, filter, day, dayFilterOn, conflictsFor]);

  const actionsToday = events.filter((e) => e.category === "action" && e.date <= day).length;

  const openRisk = (e: CampusEvent) => setRiskEvent(e);

  return (
    <div className="min-h-screen pb-28">
      <header className="glass sticky top-0 z-30 border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="live-dot absolute inline-flex h-2.5 w-2.5 rounded-full bg-live" />
            </span>
            <span className="text-lg font-semibold tracking-tight">CampusSignal</span>
            <span className="mono hidden text-[11px] text-muted-foreground sm:inline">
              CET · live
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/50 md:flex"
            >
              <Search className="h-3.5 w-3.5" />
              Press ⌘K to search campus notices or ask AI what to do…
              <kbd className="mono rounded border border-border px-1.5 py-0.5 text-[10px]">⌘K</kbd>
            </button>
            <Button size="sm" onClick={() => setCatchUpOpen(true)}>
              <Zap className="h-4 w-4" />
              Catch Me Up
            </Button>
            <div className="flex items-center gap-2 rounded-full border border-border bg-secondary/60 py-1 pl-1 pr-3">
              <span className="mono flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-[11px] font-semibold text-primary">
                {USER.initials}
              </span>
              <span className="hidden text-[11px] leading-tight sm:block">
                <span className="block font-medium">{USER.name}</span>
                <span className="block text-muted-foreground">
                  {USER.short} · {USER.role}
                </span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="flex w-full items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-3 text-xs text-muted-foreground md:hidden"
          >
            <Command className="h-3.5 w-3.5" />
            Search campus notices…
          </button>

          <IngestBar onParsed={(e) => setEvents((prev) => [e, ...prev])} />

          {/* Day selector */}
          <section className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <Radio className="h-4 w-4 text-primary" />
                Today at DotSlash — {fmtDate(day)}
              </h2>
              <div className="flex items-center gap-2">
                {DAYS.map((d) => (
                  <Button
                    key={d.date}
                    size="sm"
                    variant={d.date === day ? "default" : "outline"}
                    onClick={() => setDay(d.date)}
                  >
                    {d.label}
                  </Button>
                ))}
                <Button
                  size="sm"
                  variant={dayFilterOn ? "default" : "outline"}
                  onClick={() => setDayFilterOn((v) => !v)}
                >
                  {dayFilterOn ? "Showing this day" : "Filter feed to day"}
                </Button>
              </div>
            </div>

            {dayEvents.length === 0 ? (
              <p className="mt-4 rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
                The official Day 2 schedule has not been shared yet, so nothing is listed here.
                Send the September 12 poster and it will be added exactly as printed.
              </p>
            ) : (
              <ul className="mt-4 space-y-1.5">
                {dayEvents.map((e) => {
                  const clashes = conflictsFor.get(e.id)?.length ?? 0;
                  return (
                    <li
                      key={e.id}
                      className="mono flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md border border-border bg-secondary/40 px-3 py-2 text-xs"
                    >
                      <span className="w-32 shrink-0 text-primary">{fmtRange(e)}</span>
                      <span className="font-sans text-sm text-foreground">{e.title}</span>
                      <span className="text-muted-foreground">{e.venue}</span>
                      {clashes > 0 && (
                        <span className="ml-auto text-conflict">{clashes} clash</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => (
              <Button
                key={f.key}
                size="sm"
                variant={filter === f.key ? "default" : "outline"}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </Button>
            ))}
            <span className="mono ml-auto text-xs text-muted-foreground">
              {visible.length} signals
            </span>
          </div>

          <div className="space-y-3">
            {visible.map((e) => (
              <div
                key={e.id}
                id={`ev-${e.id}`}
                className={highlight === e.id ? "rounded-xl ring-2 ring-primary" : ""}
              >
                <EventCard
                  event={e}
                  conflicts={conflictsFor.get(e.id) ?? []}
                  onOpenRisk={openRisk}
                  onDutyLeave={setDutyEvent}
                />
              </div>
            ))}
            {visible.length === 0 && (
              <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                No signals match this filter.
              </p>
            )}
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold">Signal summary</p>
            <dl className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Actions due by {fmtDate(day)}</dt>
                <dd className="mono text-action">{actionsToday}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Sessions on selected day</dt>
                <dd className="mono text-schedule">{dayEvents.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Cards with clashes</dt>
                <dd className="mono text-conflict">
                  {events.filter((e) => (conflictsFor.get(e.id)?.length ?? 0) > 0).length}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Total signals</dt>
                <dd className="mono">{events.length}</dd>
              </div>
            </dl>
          </div>

          <ActivityRing value={USER.activityPoints} target={USER.activityTarget} />

          <div className="rounded-xl border border-border bg-card p-5 text-xs text-muted-foreground">
            DotSlash cards come from the official Day 1 poster. Drishti '26 entries are gathered
            from public social posts and are labelled as external sources.
          </div>
        </aside>
      </main>

      <PlanDrawer events={events} day={day} />

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        events={events}
        onSelect={(e) => {
          setFilter("all");
          setDayFilterOn(false);
          setHighlight(e.id);
          setTimeout(() => {
            document.getElementById(`ev-${e.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 50);
          setTimeout(() => setHighlight(null), 2200);
        }}
      />
      <RiskModal
        event={riskEvent}
        conflicts={riskEvent ? (conflictsFor.get(riskEvent.id) ?? []) : []}
        onClose={() => setRiskEvent(null)}
      />
      <DutyLeaveModal event={dutyEvent} onClose={() => setDutyEvent(null)} />
      <CatchUpModal
        open={catchUpOpen}
        onOpenChange={setCatchUpOpen}
        events={events}
        today={day}
      />
    </div>
  );
}
