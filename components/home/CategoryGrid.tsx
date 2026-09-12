import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { getCategories } from "@/lib/data/categories";
import { getProductsByCategoryAsync } from "@/lib/data/products.repo";
import { CategoryIcon } from "@/components/ui/CategoryIcon";

export async function CategoryGrid() {
  const categories = getCategories();
  const counts = await Promise.all(categories.map((category) => getProductsByCategoryAsync(category.slug)));

  return (
    <section className="container-page py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-ink">Shop by Category</h2>
        <Link href="/mobile" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          View All Categories <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {categories.map((category, index) => {
          const count = counts[index].length;
          return (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className="flex flex-col items-center gap-2 rounded-xl border border-border p-4 text-center transition-colors hover:border-primary/40 hover:bg-primary-light"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-muted text-ink">
                <CategoryIcon name={category.icon} size={26} strokeWidth={1.5} />
              </span>
              <span className="text-sm font-medium text-ink">{category.name}</span>
              <span className="text-xs text-muted">{count}+ Items</span>
            </Link>
          );
        })}
        <Link
          href="/mobile"
          className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border p-4 text-center text-muted transition-colors hover:border-primary/40 hover:text-primary"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-muted">
            <LayoutGrid size={26} strokeWidth={1.5} />
          </span>
          <span className="text-sm font-medium">Accessories</span>
          <span className="text-xs">Explore more</span>
        </Link>
      </div>
    </section>
  );
}
