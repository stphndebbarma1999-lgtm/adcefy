export type BannerPosition = "hero" | "promo" | "category" | "carousel";

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
