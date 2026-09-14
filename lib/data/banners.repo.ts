import type { Banner, BannerPosition } from "@/types/banner";
import { createPublicClient } from "@/lib/supabase/public";
import { getActiveBanners as getDemoActiveBanners } from "@/lib/data/banners";

/**
 * Server-only banner reads: Supabase when configured, the static demo list
 * otherwise. Mirrors lib/data/products.repo.ts.
 */

export interface BannerRow {
  id: string;
  title: string;
  subtitle: string | null;
  desktop_image: string;
  mobile_image: string | null;
  button_text: string | null;
  button_url: string | null;
  position: BannerPosition;
  sort_order: number;
  is_active: boolean;
}

export function mapRowToBanner(row: BannerRow): Banner {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle ?? undefined,
    desktopImage: row.desktop_image,
    mobileImage: row.mobile_image ?? undefined,
    buttonText: row.button_text ?? undefined,
    buttonUrl: row.button_url ?? undefined,
    position: row.position,
    sortOrder: row.sort_order,
    isActive: row.is_active,
  };
}

/** Maps admin form input (camelCase, no id) to a DB row for insert/update. */
export function mapBannerInputToRow(input: Partial<Omit<Banner, "id">>) {
  const row: Record<string, unknown> = {};
  if (input.title !== undefined) row.title = input.title;
  if (input.subtitle !== undefined) row.subtitle = input.subtitle || null;
  if (input.desktopImage !== undefined) row.desktop_image = input.desktopImage;
  if (input.mobileImage !== undefined) row.mobile_image = input.mobileImage || null;
  if (input.buttonText !== undefined) row.button_text = input.buttonText || null;
  if (input.buttonUrl !== undefined) row.button_url = input.buttonUrl || null;
  if (input.position !== undefined) row.position = input.position;
  if (input.sortOrder !== undefined) row.sort_order = input.sortOrder;
  if (input.isActive !== undefined) row.is_active = input.isActive;
  return row;
}

export async function getActiveBannersAsync(position?: BannerPosition): Promise<Banner[]> {
  const supabase = createPublicClient();
  if (supabase) {
    let query = supabase.from("banners").select("*").eq("is_active", true).order("sort_order", { ascending: true });
    if (position) query = query.eq("position", position);
    const { data, error } = await query;
    if (!error && data) return (data as BannerRow[]).map(mapRowToBanner);
  }
  return getDemoActiveBanners(position);
}
