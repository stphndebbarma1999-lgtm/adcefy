import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllProductsAsync } from "@/lib/data/products.repo";
import { ProductCard } from "@/components/product/ProductCard";

export async function InStockSection() {
  const allProducts = await getAllProductsAsync();
  const products = allProducts.filter((p) => p.stock > 0).slice(0, 8);
  if (products.length === 0) return null;

  return (
    <section className="container-page py-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">In Stock Now</p>
          <h2 className="mt-1 text-2xl font-black uppercase tracking-tight text-ink sm:text-3xl">The Catalog</h2>
        </div>
        <Link
          href="/catalog"
          className="flex shrink-0 items-center gap-1 text-sm font-semibold text-ink hover:text-primary"
        >
          View Everything
          <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
