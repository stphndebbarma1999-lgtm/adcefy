import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
  tone: "primary" | "success" | "purple" | "orange" | "danger";
}

const toneClasses: Record<Stat["tone"], string> = {
  primary: "bg-primary-light text-primary",
  success: "bg-green-50 text-success",
  purple: "bg-purple-50 text-accent-purple",
  orange: "bg-orange-50 text-accent-orange",
  danger: "bg-red-50 text-danger",
};

export function DashboardStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-border bg-white p-4">
          <span className={cn("mb-3 flex h-10 w-10 items-center justify-center rounded-lg", toneClasses[stat.tone])}>
            <stat.icon size={18} />
          </span>
          <p className="text-xl font-bold text-ink">{stat.value}</p>
          <p className="text-xs text-muted">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
