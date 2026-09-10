export type BannerPosition = "hero" | "promo" | "category";

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  desktopImage: string;
  mobileImage?: string;
  buttonText?: string;
  buttonUrl?: string;
  position: BannerPosition;
  sortOrder: number;
  isActive: boolean;
}
