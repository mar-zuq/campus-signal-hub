import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { fmtDate, fmtRange, type CampusEvent } from "@/data/events";
import { categoryStyles } from "./category";

type Props = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  events: CampusEvent[];
  onSelect: (e: CampusEvent) => void;
};

export function CommandPalette({ open, onOpenChange, events, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? events.filter((e) =>
          [e.title, e.venue, e.organizer, e.category, e.track, e.source]
            .join(" ")
            .toLowerCase()
            .includes(q),
        )
      : events;
    return list.slice(0, 30);
  }, [events, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 p-4 pt-[12vh] backdrop-blur-sm"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-popover shadow-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter" && results[active]) {
                onSelect(results[active]);
                onOpenChange(false);
              } else if (e.key === "Escape") {
                onOpenChange(false);
              }
            }}
            placeholder="Search notices, events, venues or organisers…"
            className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="mono rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">Nothing matches that.</p>
          )}
          {results.map((e, i) => (
            <button
              key={e.id}
              type="button"
              onMouseEnter={() => setActive(i)}
              onClick={() => {
                onSelect(e);
                onOpenChange(false);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left ${
                i === active ? "bg-accent" : ""
              }`}
            >
              <span className={`h-2 w-2 shrink-0 rounded-full ${categoryStyles[e.category].dot}`} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm">{e.title}</span>
                <span className="mono block truncate text-[11px] text-muted-foreground">
                  {fmtDate(e.date)} · {fmtRange(e)} · {e.venue}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
