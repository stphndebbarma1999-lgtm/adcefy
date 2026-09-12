import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getCategories } from "@/lib/data/categories";
import { getAllProductsAsync } from "@/lib/data/products.repo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/search",
    "/wishlist",
    "/cart",
    "/contact",
    "/track-order",
    "/faq",
    "/privacy-policy",
    "/terms",
    "/shipping-policy",
    "/return-policy",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = getCategories().map((c) => ({
    url: `${siteConfig.url}/${c.slug}`,
    lastModified: new Date(),
  }));

  const allProducts = await getAllProductsAsync();
  const productRoutes = allProducts.map((p) => ({
    url: `${siteConfig.url}/product/${p.slug}`,
    lastModified: p.updatedAt,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
