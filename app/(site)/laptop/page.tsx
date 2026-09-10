import type { Metadata } from "next";
import { CategoryPageContent, categoryMetadata, type SearchParams } from "@/components/category/CategoryPageContent";

export const metadata: Metadata = categoryMetadata("laptop");

export default async function LaptopPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  return <CategoryPageContent categorySlug="laptop" searchParams={params} />;
}
