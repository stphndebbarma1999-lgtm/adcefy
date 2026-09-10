import type { ProductVariantGroup } from "@/types/product";
import { cn } from "@/lib/utils/cn";

export function VariantSelector({
  group,
  selected,
  onSelect,
}: {
  group: ProductVariantGroup;
  selected?: string;
  onSelect: (optionName: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-ink">
        {group.name}
        {selected && <span className="ml-1.5 font-normal text-muted">— {selected}</span>}
      </p>
      <div className="flex flex-wrap gap-2">
        {group.options.map((option) => {
          const isSelected = option.name === selected;
          const outOfStock = option.stock === 0;
          return (
            <button
              key={option.id}
              type="button"
              disabled={outOfStock}
              onClick={() => onSelect(option.name)}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                isSelected ? "border-primary bg-primary-light text-primary" : "border-border text-ink hover:border-primary/40",
                outOfStock && "cursor-not-allowed opacity-40"
              )}
            >
              {option.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
