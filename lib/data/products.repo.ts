import type { Product, ProductSpecification, ProductVariantGroup } from "@/types/product";
import { createPublicClient } from "@/lib/supabase/public";
import { getAllProducts as getAllDemoProducts, getProductBySlug as getDemoProductBySlug } from "@/lib/data/products";

/**
 * Server-only product reads: Supabase when configured, the static demo
 * catalog otherwise (local dev without credentials, or if a query fails).
 * Used by Server Components / route handlers only — client components
 * (search overlay, recently viewed, wishlist) still use the synchronous
 * demo-only functions in lib/data/products.ts until they're wired up too.
 */

export interface ProductRow {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category_id: string;
  category_slug: string;
  subcategory: string | null;
  short_description: string;
  description: string;
  price: number;
  original_price: number | null;
  discount_percentage: number | null;
  images: string[];
  rating: number;
  review_count: number;
  stock: number;
  sku: string;
  specifications: ProductSpecification[];
  variants: ProductVariantGroup[];
  tags: string[];
  is_featured: boolean;
  is_new: boolean;
  is_best_seller: boolean;
  status: Product["status"];
  created_at: string;
  updated_at: string;
}

export function mapRowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    categoryId: row.category_id,
    categorySlug: row.category_slug,
    subcategory: row.subcategory ?? undefined,
    shortDescription: row.short_description,
    description: row.description,
    price: Number(row.price),
    originalPrice: row.original_price != null ? Number(row.original_price) : undefined,
    discountPercentage: row.discount_percentage ?? undefined,
    images: row.images ?? [],
    rating: Number(row.rating),
    reviewCount: row.review_count,
    stock: row.stock,
    sku: row.sku,
    specifications: row.specifications ?? [],
    variants: row.variants ?? [],
    tags: row.tags ?? [],
    isFeatured: row.is_featured,
    isNew: row.is_new,
    isBestSeller: row.is_best_seller,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/** Maps admin form input (camelCase, no id/timestamps) to a DB row for insert/update. */
export function mapProductInputToRow(input: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>) {
  const row: Record<string, unknown> = {};
  if (input.slug !== undefined) row.slug = input.slug;
  if (input.name !== undefined) row.name = input.name;
  if (input.brand !== undefined) row.brand = input.brand;
  if (input.categoryId !== undefined) row.category_id = input.categoryId;
  if (input.categorySlug !== undefined) row.category_slug = input.categorySlug;
  if (input.subcategory !== undefined) row.subcategory = input.subcategory || null;
  if (input.shortDescription !== undefined) row.short_description = input.shortDescription;
  if (input.description !== undefined) row.description = input.description;
  if (input.price !== undefined) row.price = input.price;
  if (input.originalPrice !== undefined) row.original_price = input.originalPrice ?? null;
  if (input.discountPercentage !== undefined) row.discount_percentage = input.discountPercentage ?? null;
  if (input.images !== undefined) row.images = input.images;
  if (input.rating !== undefined) row.rating = input.rating;
  if (input.reviewCount !== undefined) row.review_count = input.reviewCount;
  if (input.stock !== undefined) row.stock = input.stock;
  if (input.sku !== undefined) row.sku = input.sku;
  if (input.specifications !== undefined) row.specifications = input.specifications;
  if (input.variants !== undefined) row.variants = input.variants;
  if (input.tags !== undefined) row.tags = input.tags;
  if (input.isFeatured !== undefined) row.is_featured = input.isFeatured;
  if (input.isNew !== undefined) row.is_new = input.isNew;
  if (input.isBestSeller !== undefined) row.is_best_seller = input.isBestSeller;
  if (input.status !== undefined) row.status = input.status;
  return row;
}

async function queryActiveProducts(): Promise<Product[] | null> {
  const supabase = createPublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error || !data) return null;
  return (data as ProductRow[]).map(mapRowToProduct);
}

export async function getAllProductsAsync(): Promise<Product[]> {
  const rows = await queryActiveProducts();
  if (rows === null) return getAllDemoProducts();
  return [...rows, ...getAllDemoProducts()];
}

export async function getProductBySlugAsync(slug: string): Promise<Product | undefined> {
  const supabase = createPublicClient();
  if (supabase) {
    const { data } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
    if (data) return mapRowToProduct(data as ProductRow);
  }
  return getDemoProductBySlug(slug);
}

export async function getProductsByCategoryAsync(categorySlug: string): Promise<Product[]> {
  const all = await getAllProductsAsync();
  return all.filter((p) => p.categorySlug === categorySlug);
}

export async function getRelatedProductsAsync(product: Product, limit = 4): Promise<Product[]> {
  const all = await getAllProductsAsync();
  return all.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, limit);
}

export async function searchProductsAsync(query: string): Promise<Product[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const all = await getAllProductsAsync();
  return all.filter((p) => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.categorySlug.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.specifications.some((s) => s.value.toLowerCase().includes(q))
    );
  });
}
