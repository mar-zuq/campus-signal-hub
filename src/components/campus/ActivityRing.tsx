export function ActivityRing({ value, target }: { value: number; target: number }) {
  const pct = Math.min(value / target, 1);
  const r = 42;
  const c = 2 * Math.PI * r;

  return (
    <div className="rounded-xl border border-border bg-card p-5 text-center">
      <p className="text-sm font-semibold">KTU Activity Points</p>
      <div className="relative mx-auto mt-4 h-28 w-28">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" strokeWidth="8" className="stroke-secondary" />
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            className="stroke-opportunity"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct)}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="mono text-xl font-semibold">{value}</span>
          <span className="mono text-[11px] text-muted-foreground">/ {target}</span>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        S4 target · {target - value} points to go. Workshops with activity points are tagged in the
        feed.
      </p>
    </div>
  );
}
