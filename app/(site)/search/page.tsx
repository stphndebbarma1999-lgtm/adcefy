import type { Metadata } from "next";
import { searchProductsAsync } from "@/lib/data/products.repo";
import { ProductGrid } from "@/components/product/ProductGrid";

export const metadata: Metadata = {
  title: "Search",
  alternates: { canonical: "/search" },
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const results = await searchProductsAsync(q);

  return (
    <div className="container-page py-8">
      <h1 className="text-2xl font-bold text-ink">
        {q ? (
          <>
            Search Results for &ldquo;{q}&rdquo;
          </>
        ) : (
          "Search"
        )}
      </h1>
      <p className="mt-1 mb-6 text-sm text-muted">{results.length} products found</p>
      <ProductGrid products={results} />
    </div>
  );
}
