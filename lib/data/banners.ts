import type { Banner } from "@/types/banner";

export const banners: Banner[] = [
  {
    id: "banner-hero",
    title: "Elevate Your Everyday",
    subtitle:
      "Shop mobiles, laptops, gadgets, accessories and computer products at ADCEFY — premium technology for work, travel and lifestyle.",
    desktopImage: "",
    buttonText: "Shop Now",
    buttonUrl: "/mobile",
    position: "hero",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "banner-flash-sale",
    title: "Flash Sale",
    subtitle: "Up to 70% off on selected accessories. Limited time only.",
    desktopImage: "",
    buttonText: "Shop Now",
    buttonUrl: "/gadgets",
    position: "promo",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "banner-collection-tech",
    title: "Tech Essentials",
    subtitle: "Smart tech for modern life",
    desktopImage: "",
    buttonText: "Shop Collection",
    buttonUrl: "/gadgets",
    position: "category",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "banner-collection-travel",
    title: "Computing Collection",
    subtitle: "Built for work, study and everything in between",
    desktopImage: "",
    buttonText: "Shop Collection",
    buttonUrl: "/laptop",
    position: "category",
    sortOrder: 2,
    isActive: true,
  },
];

export function getActiveBanners(position?: Banner["position"]): Banner[] {
  return banners
    .filter((b) => b.isActive && (!position || b.position === position))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
