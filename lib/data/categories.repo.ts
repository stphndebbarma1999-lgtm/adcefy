import type { Category, FilterDefinition } from "@/types/category";
import { createPublicClient } from "@/lib/supabase/public";
import {
  categories as demoCategoriesList,
  getCategories as getDemoCategories,
  getCategoryBySlug as getDemoCategoryBySlug,
} from "@/lib/data/categories";

/**
 * Server-only category reads: Supabase when configured, the static demo
 * list otherwise. Mirrors lib/data/products.repo.ts.
 *
 * Filters (the checkbox/range sidebar per category) aren't editable in the
 * admin UI yet, so they intentionally stay code-driven here — matched by
 * slug from lib/data/categories.ts — rather than trusting the mostly-empty
 * `filters` column. A brand-new category created only in Supabase (no match
 * in the code list) simply gets no filters, same as before this migration.
 */

const demoFiltersBySlug = new Map(demoCategoriesList.map((c) => [c.slug, c.filters]));

export interface CategoryRow {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image: string | null;
  icon: string;
  sort_order: number;
  is_active: boolean;
  filters: FilterDefinition[];
}

export function mapRowToCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? undefined,
    image: row.image ?? undefined,
    icon: row.icon,
    sortOrder: row.sort_order,
    isActive: row.is_active,
    filters: demoFiltersBySlug.get(row.slug) ?? [],
  };
}

/** Maps admin form input (camelCase, no id) to a DB row for insert/update. */
export function mapCategoryInputToRow(input: Partial<Omit<Category, "id">>) {
  const row: Record<string, unknown> = {};
  if (input.slug !== undefined) row.slug = input.slug;
  if (input.name !== undefined) row.name = input.name;
  if (input.description !== undefined) row.description = input.description || null;
  if (input.image !== undefined) row.image = input.image || null;
  if (input.icon !== undefined) row.icon = input.icon;
  if (input.sortOrder !== undefined) row.sort_order = input.sortOrder;
  if (input.isActive !== undefined) row.is_active = input.isActive;
  if (input.filters !== undefined) row.filters = input.filters;
  return row;
}

async function queryActiveCategories(): Promise<Category[] | null> {
  const supabase = createPublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data) return null;
  return (data as CategoryRow[]).map(mapRowToCategory);
}

export async function getCategoriesAsync(): Promise<Category[]> {
  const rows = await queryActiveCategories();
  if (rows === null) return getDemoCategories();
  // Supabase categories take priority; demo ones fill in only if their slug isn't already covered.
  const seenSlugs = new Set(rows.map((c) => c.slug));
  const demoExtras = getDemoCategories().filter((c) => !seenSlugs.has(c.slug));
  return [...rows, ...demoExtras].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getCategoryBySlugAsync(slug: string): Promise<Category | undefined> {
  const supabase = createPublicClient();
  if (supabase) {
    const { data } = await supabase.from("categories").select("*").eq("slug", slug).maybeSingle();
    if (data) return mapRowToCategory(data as CategoryRow);
  }
  return getDemoCategoryBySlug(slug);
}
