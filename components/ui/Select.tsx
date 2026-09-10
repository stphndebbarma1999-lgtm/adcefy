import { cn } from "@/lib/utils/cn";
import { ChevronDown } from "lucide-react";
import { forwardRef, type SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, id, className, children, ...props },
  ref
) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={inputId}
          className={cn(
            "h-11 w-full appearance-none rounded-lg border border-border bg-white pl-3.5 pr-9 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors",
            error && "border-danger focus:ring-danger focus:border-danger",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
});
