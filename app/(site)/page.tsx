import { Hero } from "@/components/home/Hero";
import { BenefitsStrip } from "@/components/home/BenefitsStrip";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductSection } from "@/components/home/ProductSection";
import { FlashSale } from "@/components/home/FlashSale";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { getFeaturedProductsAsync, getNewArrivalsAsync, getBestSellersAsync } from "@/lib/data/products.repo";

export default async function HomePage() {
  const [featured, newArrivals, bestSellers] = await Promise.all([
    getFeaturedProductsAsync(),
    getNewArrivalsAsync(),
    getBestSellersAsync(),
  ]);

  return (
    <>
      <Hero />
      <BenefitsStrip />
      <CategoryGrid />
      <ProductSection title="Featured Products" viewAllHref="/mobile" products={featured} />
      <FlashSale />
      <FeaturedCollections />
      <ProductSection title="New Arrivals" viewAllHref="/gadgets" products={newArrivals} />
      <ProductSection title="Best Sellers" viewAllHref="/laptop" products={bestSellers} />
    </>
  );
}
