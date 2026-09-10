"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FilterDefinition } from "@/types/category";
import { Toggle } from "@/components/ui/Toggle";
import { formatPrice } from "@/lib/utils/format";
import { useCallback, useMemo } from "react";

export function FilterSidebar({ filters }: { filters: FilterDefinition[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      mutate(params);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const toggleCheckboxValue = (key: string, value: string) => {
    updateParams((params) => {
      const current = params.get(key)?.split(",").filter(Boolean) ?? [];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      if (next.length > 0) params.set(key, next.join(","));
      else params.delete(key);
    });
  };

  const setToggle = (key: string, checked: boolean) => {
    updateParams((params) => {
      if (checked) params.set(key, "true");
      else params.delete(key);
    });
  };

  const clearAll = () => {
    router.push(pathname, { scroll: false });
  };

  const hasActiveFilters = useMemo(() => Array.from(searchParams.keys()).some((k) => k !== "sort"), [searchParams]);

  return (
    <aside className="flex w-full flex-col gap-6 lg:w-64 lg:shrink-0">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink">Filters</h3>
        {hasActiveFilters && (
          <button onClick={clearAll} className="text-xs font-medium text-primary hover:underline">
            Clear All
          </button>
        )}
      </div>

      {filters.map((filter) => {
        if (filter.type === "range") {
          const min = searchParams.get("priceMin") ?? "";
          const max = searchParams.get("priceMax") ?? "";
          return (
            <div key={filter.id} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
              <p className="mb-3 text-sm font-medium text-ink">{filter.label}</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  defaultValue={min}
                  onBlur={(e) => updateParams((p) => (e.target.value ? p.set("priceMin", e.target.value) : p.delete("priceMin")))}
                  className="h-9 w-full rounded-md border border-border px-2 text-xs"
                />
                <span className="text-muted">–</span>
                <input
                  type="number"
                  placeholder="Max"
                  defaultValue={max}
                  onBlur={(e) => updateParams((p) => (e.target.value ? p.set("priceMax", e.target.value) : p.delete("priceMax")))}
                  className="h-9 w-full rounded-md border border-border px-2 text-xs"
                />
              </div>
              {(min || max) && (
                <p className="mt-2 text-xs text-muted">
                  {min ? formatPrice(Number(min)) : "₹0"} – {max ? formatPrice(Number(max)) : "Any"}
                </p>
              )}
            </div>
          );
        }

        if (filter.type === "toggle") {
          const checked = searchParams.get(filter.id) === "true";
          return (
            <div key={filter.id} className="border-t border-border pt-4">
              <Toggle checked={checked} onChange={(v) => setToggle(filter.id, v)} label={filter.label} />
            </div>
          );
        }

        const selected = searchParams.get(filter.id)?.split(",").filter(Boolean) ?? [];

        return (
          <div key={filter.id} className="border-t border-border pt-4">
            <p className="mb-3 text-sm font-medium text-ink">{filter.label}</p>
            <div className="flex flex-col gap-2.5">
              {filter.options?.map((option) => (
                <label key={option.value} className="flex cursor-pointer items-center gap-2 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={selected.includes(option.value)}
                    onChange={() => toggleCheckboxValue(filter.id, option.value)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </aside>
  );
}
