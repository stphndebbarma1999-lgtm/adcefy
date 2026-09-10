import type { Product } from "@/types/product";

export interface ActiveFilters {
  brand?: string[];
  rating?: string[];
  priceMin?: string;
  priceMax?: string;
  [key: string]: string[] | string | undefined;
}

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function matchesGenericOption(product: Product, filterId: string, optionValue: string): boolean {
  const normalizedOption = normalize(optionValue);

  if (product.subcategory && normalize(product.subcategory) === normalizedOption) return true;
  if (product.tags.some((t) => normalize(t) === normalizedOption)) return true;
  if (product.specifications.some((s) => normalize(s.value).includes(normalizedOption))) return true;
  if (filterId === "5g") return product.tags.some((t) => normalize(t) === "5g");

  return false;
}

export function applyFilters(products: Product[], filters: ActiveFilters): Product[] {
  return products.filter((product) => {
    if (filters.brand && filters.brand.length > 0 && !filters.brand.includes(product.brand)) {
      return false;
    }

    if (filters.rating && filters.rating.length > 0) {
      const minRating = Math.min(...filters.rating.map(Number));
      if (product.rating < minRating) return false;
    }

    if (filters.priceMin && product.price < Number(filters.priceMin)) return false;
    if (filters.priceMax && product.price > Number(filters.priceMax)) return false;

    for (const [key, value] of Object.entries(filters)) {
      if (["brand", "rating", "priceMin", "priceMax"].includes(key)) continue;
      if (!value || (Array.isArray(value) && value.length === 0)) continue;
      const values = Array.isArray(value) ? value : [value];
      const matchesAny = values.some((v) => matchesGenericOption(product, key, v));
      if (!matchesAny) return false;
    }

    return true;
  });
}

export function parseFiltersFromSearchParams(searchParams: Record<string, string | string[] | undefined>): ActiveFilters {
  const filters: ActiveFilters = {};
  for (const [key, value] of Object.entries(searchParams)) {
    if (value === undefined) continue;
    if (key === "sort" || key === "page" || key === "q") continue;
    if (key === "priceMin" || key === "priceMax") {
      filters[key] = Array.isArray(value) ? value[0] : value;
    } else {
      filters[key] = Array.isArray(value) ? value : value.split(",");
    }
  }
  return filters;
}
