import { HeroCarousel } from "@/components/home/HeroCarousel";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { NewArrivals } from "@/components/home/NewArrivals";

// Without this, the homepage uses no dynamic APIs (no cookies/headers/searchParams),
// so Next prerenders it once at build time and freezes that HTML forever — a
// product added in admin afterwards would never appear. This makes it ISR
// instead: regenerated at most once per minute.
export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <CategoryShowcase />
      <NewArrivals />
    </>
  );
}
