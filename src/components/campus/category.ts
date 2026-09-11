import type { Category } from "@/data/events";

export const categoryStyles: Record<
  Category,
  { badge: string; dot: string; text: string; ring: string }
> = {
  action: {
    badge: "bg-action/12 text-action border-action/40",
    dot: "bg-action",
    text: "text-action",
    ring: "shadow-[inset_3px_0_0_0_var(--action)]",
  },
  schedule: {
    badge: "bg-schedule/12 text-schedule border-schedule/40",
    dot: "bg-schedule",
    text: "text-schedule",
    ring: "shadow-[inset_3px_0_0_0_var(--schedule)]",
  },
  opportunity: {
    badge: "bg-opportunity/12 text-opportunity border-opportunity/40",
    dot: "bg-opportunity",
    text: "text-opportunity",
    ring: "shadow-[inset_3px_0_0_0_var(--opportunity)]",
  },
  conflict: {
    badge: "bg-conflict/12 text-conflict border-conflict/40",
    dot: "bg-conflict",
    text: "text-conflict",
    ring: "shadow-[inset_3px_0_0_0_var(--conflict)]",
  },
};
