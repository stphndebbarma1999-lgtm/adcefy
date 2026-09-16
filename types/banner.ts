export type BannerPosition = "hero" | "promo" | "category" | "carousel";

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  desktopImage: string;
  mobileImage?: string;
  buttonText?: string;
  buttonUrl?: string;
  /** FK to categories.id. Clicking the banner opens this category's page. */
  categoryId?: string;
  /** Resolved from categoryId for linking/display — not a DB column itself. */
  categorySlug?: string;
  position: BannerPosition;
  sortOrder: number;
  isActive: boolean;
}
