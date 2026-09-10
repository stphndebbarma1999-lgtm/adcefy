"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { sortOptions, type SortOption } from "@/lib/utils/sort";

export function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = (searchParams.get("sort") as SortOption) ?? "recommended";

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "recommended") params.delete("sort");
    else params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <select
      value={current}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 flex-1 rounded-lg border border-border bg-white px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary lg:flex-none"
      aria-label="Sort products"
    >
      {sortOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          Sort: {opt.label}
        </option>
      ))}
    </select>
  );
}
