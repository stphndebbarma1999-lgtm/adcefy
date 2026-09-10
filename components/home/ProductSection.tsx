import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductGrid } from "@/components/product/ProductGrid";

export function ProductSection({
  title,
  viewAllHref,
  products,
}: {
  title: string;
  viewAllHref: string;
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="container-page py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-ink">{title}</h2>
        <Link href={viewAllHref} className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          View All Products <ArrowRight size={14} />
        </Link>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
