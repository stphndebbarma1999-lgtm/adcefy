import { getActiveBannersAsync } from "@/lib/data/banners.repo";
import { HeroCarouselClient } from "./HeroCarouselClient";

export async function HeroCarousel() {
  const slides = await getActiveBannersAsync("carousel");
  if (slides.length === 0) return null;

  return <HeroCarouselClient slides={slides} />;
}
