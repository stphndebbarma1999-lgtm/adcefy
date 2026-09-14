import type { Banner } from "@/types/banner";

export const banners: Banner[] = [
  {
    id: "banner-carousel-1",
    title: "Latest Technology, Better Prices",
    desktopImage: "",
    buttonUrl: "/mobile",
    position: "carousel",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "banner-carousel-2",
    title: "New Mobile Launches",
    desktopImage: "",
    buttonUrl: "/mobile",
    position: "carousel",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "banner-carousel-3",
    title: "Laptops for Work & Play",
    desktopImage: "",
    buttonUrl: "/laptop",
    position: "carousel",
    sortOrder: 3,
    isActive: true,
  },
  {
    id: "banner-carousel-4",
    title: "Gadgets & Wearables",
    desktopImage: "",
    buttonUrl: "/gadgets",
    position: "carousel",
    sortOrder: 4,
    isActive: true,
  },
  {
    id: "banner-carousel-5",
    title: "Computer Accessories",
    desktopImage: "",
    buttonUrl: "/computer",
    position: "carousel",
    sortOrder: 5,
    isActive: true,
  },
  {
    id: "banner-carousel-6",
    title: "Audio & Sound",
    desktopImage: "",
    buttonUrl: "/headphones-earbuds",
    position: "carousel",
    sortOrder: 6,
    isActive: true,
  },
];

export function getActiveBanners(position?: Banner["position"]): Banner[] {
  return banners
    .filter((b) => b.isActive && (!position || b.position === position))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
