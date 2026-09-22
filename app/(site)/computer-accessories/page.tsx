import type { Metadata } from "next";
import { CategoryPageContent, categoryMetadata, type SearchParams } from "@/components/category/CategoryPageContent";

export const metadata: Metadata = categoryMetadata("computer-accessories");

export default async function ComputerAccessoriesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  return <CategoryPageContent categorySlug="computer-accessories" searchParams={params} />;
}
