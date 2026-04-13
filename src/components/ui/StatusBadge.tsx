import { ListingStatus } from "@/lib/types";

const CONFIG: Record<
  ListingStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  intake: {
    label: "Intake",
    bg: "bg-stone/10",
    text: "text-stone",
    dot: "bg-stone",
  },
  processing: {
    label: "Processing",
    bg: "bg-gilt/15",
    text: "text-gilt",
    dot: "bg-gilt",
  },
  review: {
    label: "Review",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  published: {
    label: "Published",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  archived: {
    label: "Archived",
    bg: "bg-ink/8",
    text: "text-ink/40",
    dot: "bg-ink/30",
  },
};

interface StatusBadgeProps {
  status: ListingStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const cfg = CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-sans font-medium tracking-wide ${cfg.bg} ${cfg.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}
