"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchProducts } from "@/lib/data/products";
import { ProductImage } from "@/components/product/ProductImage";
import { formatPrice } from "@/lib/utils/format";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Resets the query and locks scroll when the overlay opens — tied to an
    // external system (the DOM/body scroll), not a value derivable during render.
    /* eslint-disable react-hooks/set-state-in-effect */
    if (open) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    /* eslint-enable react-hooks/set-state-in-effect */
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => searchProducts(query).slice(0, 6), [query]);

  if (!open) return null;

  const submitSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <button aria-label="Close search" className="absolute inset-0 bg-black/50" onClick={onClose} tabIndex={-1} />
      <div className="relative mx-auto mt-0 flex max-h-screen w-full max-w-2xl flex-col bg-white shadow-xl sm:mt-20 sm:rounded-2xl">
        <form onSubmit={submitSearch} className="flex items-center gap-3 border-b border-border p-4">
          <Search size={20} className="text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for mobiles, laptops, gadgets..."
            className="flex-1 text-sm text-ink outline-none placeholder:text-muted"
          />
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-md p-1 text-muted hover:bg-surface-muted">
            <X size={20} />
          </button>
        </form>
        <div className="overflow-y-auto p-2">
          {query.trim() && results.length === 0 && (
            <p className="p-6 text-center text-sm text-muted">No products found for &ldquo;{query}&rdquo;.</p>
          )}
          {results.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.slug}`}
              onClick={onClose}
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
          {query.trim() && results.length > 0 && (
            <button
              onClick={submitSearch}
              className="mt-1 w-full rounded-lg p-3 text-center text-sm font-medium text-primary hover:bg-surface-muted"
            >
              View all results for &ldquo;{query}&rdquo;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
