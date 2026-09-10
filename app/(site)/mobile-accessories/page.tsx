import type { Metadata } from "next";
import { CategoryPageContent, categoryMetadata, type SearchParams } from "@/components/category/CategoryPageContent";

export const metadata: Metadata = categoryMetadata("mobile-accessories");

export default async function MobileAccessoriesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  return <CategoryPageContent categorySlug="mobile-accessories" searchParams={params} />;
}
