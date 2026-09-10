import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  value,
  onChange,
  max = 99,
}: {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}) {
  return (
    <div className="flex items-center rounded-lg border border-border">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="flex h-11 w-11 items-center justify-center text-muted hover:text-ink disabled:opacity-40"
        disabled={value <= 1}
      >
        <Minus size={16} />
      </button>
      <span className="w-10 text-center text-sm font-medium text-ink">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-11 w-11 items-center justify-center text-muted hover:text-ink disabled:opacity-40"
        disabled={value >= max}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
