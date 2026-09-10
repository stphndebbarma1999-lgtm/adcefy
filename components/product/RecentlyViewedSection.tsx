"use client";

import { useRecentlyViewedSlugs } from "@/lib/hooks/useRecentlyViewed";
import { getProductBySlug } from "@/lib/data/products";
import { ProductGrid } from "./ProductGrid";

export function RecentlyViewedSection({ excludeSlug }: { excludeSlug?: string }) {
  const slugs = useRecentlyViewedSlugs(excludeSlug);
  const products = slugs.map((slug) => getProductBySlug(slug)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (products.length === 0) return null;

  return (
    <section className="mt-4">
      <h2 className="mb-4 text-xl font-bold text-ink">Recently Viewed</h2>
      <ProductGrid products={products} />
    </section>
  );
}
