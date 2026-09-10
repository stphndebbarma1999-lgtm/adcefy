import type { Metadata } from "next";
import { CategoryPageContent, categoryMetadata, type SearchParams } from "@/components/category/CategoryPageContent";

export const metadata: Metadata = categoryMetadata("gadgets");

export default async function GadgetsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  return <CategoryPageContent categorySlug="gadgets" searchParams={params} />;
}
