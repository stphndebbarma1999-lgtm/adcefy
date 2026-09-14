import { getActiveBannersAsync } from "@/lib/data/banners.repo";
import { HeroCarouselClient } from "./HeroCarouselClient";

export async function HeroCarousel() {
  const slides = await getActiveBannersAsync("carousel");

  if (slides.length === 0) {
    // Reserve the same 2:1 space even with no active slides yet, so the
    // page doesn't jump straight to Categories with no banner at all.
    return <div className="aspect-[2/1] w-full bg-surface-muted" />;
  }

  return <HeroCarouselClient slides={slides} />;
}
