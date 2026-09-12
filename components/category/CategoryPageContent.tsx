import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/lib/data/categories";
import { getProductsByCategoryAsync } from "@/lib/data/products.repo";
import { applyFilters, parseFiltersFromSearchParams } from "@/lib/utils/filterProducts";
import { sortProducts, type SortOption } from "@/lib/utils/sort";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { MobileFilterDrawer } from "@/components/filters/MobileFilterDrawer";
import { SortDropdown } from "@/components/filters/SortDropdown";
import { ProductGrid } from "@/components/product/ProductGrid";
import { siteConfig } from "@/config/site";

export type SearchParams = Record<string, string | string[] | undefined>;

export async function CategoryPageContent({
  categorySlug,
  searchParams,
}: {
  categorySlug: string;
  searchParams: SearchParams;
}) {
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const allProducts = await getProductsByCategoryAsync(categorySlug);
  const filters = parseFiltersFromSearchParams(searchParams);
  const filtered = applyFilters(allProducts, filters);
  const sort = (searchParams.sort as SortOption) ?? "recommended";
  const sorted = sortProducts(filtered, sort);

  return (
    <div className="container-page py-8">
      <nav className="mb-4 flex items-center gap-1.5 text-xs text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="text-ink">{category.name}</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">{category.name}</h1>
        {category.description && <p className="mt-1 max-w-2xl text-sm text-muted">{category.description}</p>}
        <p className="mt-1 text-xs text-muted">{sorted.length} products</p>
      </div>

      <div className="mb-6 flex items-center gap-3 lg:hidden">
        <MobileFilterDrawer filters={category.filters} />
        <SortDropdown />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="hidden lg:block">
          <FilterSidebar filters={category.filters} />
        </div>
        <div className="flex-1">
          <div className="mb-4 hidden justify-end lg:flex">
            <SortDropdown />
          </div>
          <ProductGrid products={sorted} />
        </div>
      </div>
    </div>
  );
}

export function categoryMetadata(categorySlug: string) {
  const category = getCategoryBySlug(categorySlug);
  const name = category?.name ?? "Products";
  return {
    title: `${name} Online`,
    description: category?.description ?? `Shop ${name} online at ${siteConfig.name}.`,
    alternates: { canonical: `/${categorySlug}` },
  };
}
