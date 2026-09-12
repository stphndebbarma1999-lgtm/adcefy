import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getAllProductsAsync, getProductBySlugAsync, getRelatedProductsAsync } from "@/lib/data/products.repo";
import { getCategoryBySlug } from "@/lib/data/categories";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { RecentlyViewedSection } from "@/components/product/RecentlyViewedSection";
import { RecordView } from "@/components/product/RecordView";
import { siteConfig } from "@/config/site";

export async function generateStaticParams() {
  const products = await getAllProductsAsync();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlugAsync(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: `${product.name} | ${siteConfig.name}`,
      description: product.shortDescription,
      images: product.images[0] ? [product.images[0]] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlugAsync(slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.categorySlug);
  const related = await getRelatedProductsAsync(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    sku: product.sku,
    brand: { "@type": "Brand", name: product.brand },
    image: product.images,
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/product/${product.slug}`,
      priceCurrency: siteConfig.currency,
      price: product.price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: category?.name ?? product.categorySlug, item: `${siteConfig.url}/${product.categorySlug}` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${siteConfig.url}/product/${product.slug}` },
    ],
  };

  return (
    <div className="container-page py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <RecordView slug={product.slug} />

      <nav className="mb-4 flex items-center gap-1.5 text-xs text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight size={12} />
        <Link href={`/${product.categorySlug}`} className="hover:text-primary">
          {category?.name ?? product.categorySlug}
        </Link>
        <ChevronRight size={12} />
        <span className="text-ink">{product.name}</span>
      </nav>

      <ProductDetailClient product={product} />

      <div className="mt-10">
        <ProductTabs product={product} />
      </div>

      <div className="mt-10 flex flex-col gap-10">
        <RelatedProducts title="Similar Products" products={related} />
        <RecentlyViewedSection excludeSlug={product.slug} />
      </div>
    </div>
  );
}
