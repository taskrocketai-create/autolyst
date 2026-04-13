import { DashboardMetrics } from "@/lib/types";
import { TrendingUp, Home, ClipboardCheck, Send } from "lucide-react";

interface MetricsRowProps {
  metrics: DashboardMetrics;
}

const METRICS = (m: DashboardMetrics) => [
  {
    label: "Total Listings",
    value: m.totalListings,
    icon: Home,
    color: "text-ink",
    bg: "bg-ink/5",
  },
  {
    label: "Active",
    value: m.activeListings,
    icon: TrendingUp,
    color: "text-gilt",
    bg: "bg-gilt/10",
  },
  {
    label: "In Review",
    value: m.inReview,
    icon: ClipboardCheck,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "Published This Month",
    value: m.publishedThisMonth,
    icon: Send,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

export default function MetricsRow({ metrics }: MetricsRowProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {METRICS(metrics).map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="bg-white border border-ink/8 rounded-xl p-4 flex items-center gap-3"
          >
            <div className={`p-2 rounded-lg ${item.bg}`}>
              <Icon className={`w-4 h-4 ${item.color}`} />
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-ink leading-none">
                {item.value}
              </p>
              <p className="font-sans text-xs text-stone mt-0.5">{item.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
