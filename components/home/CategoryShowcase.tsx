import Link from "next/link";
import { getCategoriesAsync } from "@/lib/data/categories.repo";
import { ProductImage } from "@/components/product/ProductImage";

export async function CategoryShowcase() {
  const categories = await getCategoriesAsync();
  if (categories.length === 0) return null;

  return (
    <section className="container-page py-10">
      <h2 className="mb-6 text-2xl font-bold uppercase tracking-wide text-ink">Categories</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/${category.slug}`} className="group flex flex-col gap-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-surface-muted">
              <ProductImage
                src={category.image}
                alt={category.name}
                categorySlug={category.slug}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="text-center text-sm font-semibold uppercase tracking-wide text-ink">{category.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
