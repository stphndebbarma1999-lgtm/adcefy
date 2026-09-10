import type { Product } from "@/types/product";

export type SortOption =
  | "recommended"
  | "newest"
  | "best-selling"
  | "top-rated"
  | "price-low-high"
  | "price-high-low"
  | "discount";

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "Newest" },
  { value: "best-selling", label: "Best Selling" },
  { value: "top-rated", label: "Top Rated" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "discount", label: "Biggest Discount" },
];

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const list = [...products];
  switch (sort) {
    case "newest":
      return list.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    case "best-selling":
      return list.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller));
    case "top-rated":
      return list.sort((a, b) => b.rating - a.rating);
    case "price-low-high":
      return list.sort((a, b) => a.price - b.price);
    case "price-high-low":
      return list.sort((a, b) => b.price - a.price);
    case "discount":
      return list.sort((a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0));
    default:
      return list;
  }
}
