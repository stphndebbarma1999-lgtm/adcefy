import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { getCategoriesAsync } from "@/lib/data/categories.repo";
import { getAllProductsAsync } from "@/lib/data/products.repo";
import { ProductGrid } from "@/components/product/ProductGrid";

export const metadata: Metadata = {
  title: "Catalog",
  alternates: { canonical: "/catalog" },
};

// Regenerated at most once a minute so new/updated products show up without a full rebuild.
export const revalidate = 60;

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeSlug } = await searchParams;
  const [categories, products] = await Promise.all([getCategoriesAsync(), getAllProductsAsync()]);

  const counts = new Map<string, number>();
  for (const p of products) counts.set(p.categorySlug, (counts.get(p.categorySlug) ?? 0) + 1);

  const activeCategory = categories.find((c) => c.slug === activeSlug);
  const filtered = activeCategory ? products.filter((p) => p.categorySlug === activeCategory.slug) : products;

  const chips = [
    { slug: undefined as string | undefined, name: "All Products", count: products.length },
    ...categories
      .filter((c) => (counts.get(c.slug) ?? 0) > 0)
      .map((c) => ({ slug: c.slug as string | undefined, name: c.name, count: counts.get(c.slug) ?? 0 })),
  ];

  return (
    <div className="container-page py-8">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">{activeCategory ? activeCategory.name : "Catalog"}</h1>
      <p className="mt-1 mb-6 text-sm text-muted">Every order tested and made real.</p>

      <div className="mb-6 flex flex-wrap gap-2 border-b border-border pb-6">
        {chips.map((chip) => {
          const active = chip.slug === activeCategory?.slug;
          return (
            <Link
              key={chip.slug ?? "all"}
              href={chip.slug ? `/catalog?category=${chip.slug}` : "/catalog"}
              className={cn(
                "rounded-lg border px-3.5 py-2 text-xs font-semibold uppercase tracking-wide transition-colors",
                active ? "border-ink bg-ink text-white" : "border-border bg-white text-ink hover:border-ink/40"
              )}
            >
              {chip.name} <span className={active ? "text-white/70" : "text-muted"}>{chip.count}</span>
            </Link>
          );
        })}
      </div>

      <ProductGrid products={filtered} />
    </div>
  );
}
