import Link from "next/link";
import { getCategoriesAsync } from "@/lib/data/categories.repo";
import { ProductImage } from "@/components/product/ProductImage";

export async function CategoryShowcase() {
  const categories = await getCategoriesAsync();
  if (categories.length === 0) return null;

  return (
    <section className="py-8">
      <h2 className="container-page mb-4 text-lg font-bold uppercase tracking-wide text-ink">Categories</h2>
      <div className="container-page grid auto-cols-[4rem] grid-flow-col grid-rows-2 gap-x-4 gap-y-3 overflow-x-auto pb-2 sm:auto-cols-[5rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => (
          <Link key={category.id} href={`/${category.slug}`} className="group flex w-16 shrink-0 flex-col items-center gap-1.5 sm:w-20">
            <div className="relative aspect-square w-16 overflow-hidden rounded-full bg-surface-muted sm:w-20">
              <ProductImage
                src={category.image}
                alt={category.name}
                categorySlug={category.slug}
                fill
                sizes="80px"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="text-center text-[11px] font-medium leading-tight text-ink sm:text-xs">{category.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
