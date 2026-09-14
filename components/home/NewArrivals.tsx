import { getNewArrivalsAsync } from "@/lib/data/products.repo";
import { ProductCard } from "@/components/product/ProductCard";

export async function NewArrivals() {
  const products = await getNewArrivalsAsync();
  if (products.length === 0) return null;

  return (
    <section className="container-page py-8">
      <h2 className="mb-4 text-lg font-bold uppercase tracking-wide text-ink">New Arrivals</h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
