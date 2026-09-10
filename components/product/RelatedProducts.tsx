import type { Product } from "@/types/product";
import { ProductGrid } from "./ProductGrid";

export function RelatedProducts({ title, products }: { title: string; products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mt-4">
      <h2 className="mb-4 text-xl font-bold text-ink">{title}</h2>
      <ProductGrid products={products} />
    </section>
  );
}
