import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

type Tone = "primary" | "danger" | "success" | "neutral" | "dark";

const toneClasses: Record<Tone, string> = {
  primary: "bg-primary text-white",
  danger: "bg-danger text-white",
  success: "bg-success text-white",
  neutral: "bg-surface-muted text-ink border border-border",
  dark: "bg-dark text-white",
};

export function Badge({ tone = "neutral", className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
