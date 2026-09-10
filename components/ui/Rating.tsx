import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function Rating({
  value,
  reviewCount,
  size = 14,
  className,
}: {
  value: number;
  reviewCount?: number;
  size?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(value);
          return (
            <Star
              key={i}
              size={size}
              className={filled ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
            />
          );
        })}
      </div>
      <span className="sr-only">{value} out of 5 stars</span>
      {reviewCount !== undefined && (
        <span className="text-xs text-muted">({reviewCount.toLocaleString("en-IN")})</span>
      )}
    </div>
  );
}
