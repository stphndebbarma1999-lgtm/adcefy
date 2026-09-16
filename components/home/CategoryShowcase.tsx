import Link from "next/link";
import { getCategoriesAsync } from "@/lib/data/categories.repo";
import { ProductImage } from "@/components/product/ProductImage";

export async function CategoryShowcase() {
  const categories = await getCategoriesAsync();
  if (categories.length === 0) return null;

  return (
    <section className="py-4">
      {/* Outer overflow-hidden clips off the native scrollbar track some
          mobile browsers still render despite the hidden-scrollbar utilities
          below; the inner div's negative margin pushes that track out of
          the visible area instead of relying on scrollbar styling alone. */}
      <div className="overflow-hidden">
        <div className="container-page -mb-5 flex justify-center gap-x-3 overflow-x-auto scroll-smooth pb-5 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className="group flex w-14 shrink-0 flex-col items-center gap-1.5 sm:w-16"
            >
              <div className="relative aspect-square w-14 overflow-hidden rounded-full bg-surface-muted sm:w-16">
                <ProductImage
                  src={category.image}
                  alt={category.name}
                  categorySlug={category.slug}
                  fill
                  sizes="64px"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-center text-[11px] font-medium leading-tight text-ink sm:text-xs">{category.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
