import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { PackageSearch } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/** `wide` opts into a denser desktop layout (up to 10 columns on large PC screens) for full listing pages. */
export function ProductGrid({ products, wide = false }: { products: Product[]; wide?: boolean }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
        <PackageSearch size={40} className="text-muted" strokeWidth={1.5} />
        <p className="text-sm font-medium text-ink">No products found</p>
        <p className="text-sm text-muted">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4",
        wide && "lg:grid-cols-6 xl:grid-cols-10"
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
