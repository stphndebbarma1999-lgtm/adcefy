export type ProductStatus = "draft" | "active" | "inactive";

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductVariantOption {
  id: string;
  /** e.g. "128GB", "Midnight Black" */
  name: string;
  priceAdjustment?: number;
  stock?: number;
  sku?: string;
}

export interface ProductVariantGroup {
  id: string;
  /** e.g. "Storage", "Color", "RAM" */
  name: string;
  options: ProductVariantOption[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;

  categoryId: string;
  categorySlug: string;
  subcategory?: string;

  shortDescription: string;
  description: string;

  price: number;
  originalPrice?: number;
  discountPercentage?: number;

  /** Public image URLs (e.g. Sirv). Empty array falls back to a neutral placeholder. */
  images: string[];

  rating: number;
  reviewCount: number;

  stock: number;
  sku: string;

  specifications: ProductSpecification[];
  variants: ProductVariantGroup[];

  tags: string[];

  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;

  status: ProductStatus;

  createdAt: string;
  updatedAt: string;
}

export type ProductInput = Omit<Product, "id" | "createdAt" | "updatedAt">;

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export function getStockStatus(stock: number): StockStatus {
  if (stock <= 0) return "out-of-stock";
  if (stock <= 5) return "low-stock";
  return "in-stock";
}
