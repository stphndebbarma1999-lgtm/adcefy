"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchProducts } from "@/lib/data/products";
import { ProductImage } from "@/components/product/ProductImage";
import { formatPrice } from "@/lib/utils/format";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const results = useMemo(() => searchProducts(query).slice(0, 6), [query]);
  const showDropdown = focused && query.trim().length > 0;

  const submitSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setFocused(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={submitSearch} className="flex h-11 items-center gap-2 rounded-lg border border-border bg-white px-3.5">
        <Search size={16} className="shrink-0 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search the catalog — headphones, laptops, cameras, watches..."
          className="w-full text-sm text-ink outline-none placeholder:text-muted"
        />
      </form>

      {showDropdown && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border border-border bg-white p-2 shadow-lg">
          {results.length === 0 && <p className="p-6 text-center text-sm text-muted">No products found for &ldquo;{query}&rdquo;.</p>}
          {results.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.slug}`}
              onClick={() => setFocused(false)}
              className="flex items-center gap-3 rounded-lg p-2 hover:bg-surface-muted"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border">
                <ProductImage src={p.images[0]} alt={p.name} categorySlug={p.categorySlug} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{p.name}</p>
                <p className="text-xs text-muted">{p.brand}</p>
              </div>
              <p className="text-sm font-semibold text-ink">{formatPrice(p.price)}</p>
            </Link>
          ))}
          {results.length > 0 && (
            <button
              onClick={submitSearch}
              className="mt-1 w-full rounded-lg p-3 text-center text-sm font-medium text-primary hover:bg-surface-muted"
            >
              View all results for &ldquo;{query}&rdquo;
            </button>
          )}
        </div>
      )}
    </div>
  );
}
