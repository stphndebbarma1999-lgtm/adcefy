"use client";

import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductImage } from "./ProductImage";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { formatPrice } from "@/lib/utils/format";
import { getStockStatus } from "@/types/product";
import { useCart } from "@/lib/context/CartContext";
import { useWishlist } from "@/lib/context/WishlistContext";
import { cn } from "@/lib/utils/cn";

function getKeySpec(product: Product): string | undefined {
  const [a, b] = product.specifications;
  if (a && b) return `${a.value} | ${b.value}`;
  return a?.value;
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const stockStatus = getStockStatus(product.stock);

  const handleAddToCart = () => {
    const selectedVariants: Record<string, string> = {};
    product.variants.forEach((group) => {
      if (group.options[0]) selectedVariants[group.name] = group.options[0].name;
    });
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0] ?? "",
      price: product.price,
      originalPrice: product.originalPrice,
      stock: product.stock,
      selectedVariants,
      sku: product.sku,
    });
  };

  const handleWishlist = () => {
    toggle({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0] ?? "",
      price: product.price,
      originalPrice: product.originalPrice,
      addedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-shadow hover:shadow-md">
      <Link href={`/product/${product.slug}`} className="relative block aspect-square bg-surface-muted">
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          categorySlug={product.categorySlug}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        {product.discountPercentage ? (
          <Badge tone="danger" className="absolute left-2.5 top-2.5">
            -{product.discountPercentage}%
          </Badge>
        ) : product.isNew ? (
          <Badge tone="primary" className="absolute left-2.5 top-2.5">
            New
          </Badge>
        ) : null}
      </Link>

      <button
        onClick={handleWishlist}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wishlisted}
        className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm hover:text-danger"
      >
        <Heart size={16} className={cn(wishlisted && "fill-danger text-danger")} />
      </button>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <p className="text-xs text-muted">{product.brand}</p>
        <Link href={`/product/${product.slug}`} className="line-clamp-2 text-sm font-medium text-ink hover:text-primary">
          {product.name}
        </Link>
        {getKeySpec(product) && <p className="text-xs text-muted">{getKeySpec(product)}</p>}
        <Rating value={product.rating} reviewCount={product.reviewCount} />
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-base font-bold text-ink">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        {stockStatus === "low-stock" && <p className="text-xs font-medium text-accent-orange">Only {product.stock} left</p>}
        {stockStatus === "out-of-stock" && <p className="text-xs font-medium text-danger">Out of Stock</p>}

        <button
          onClick={handleAddToCart}
          disabled={stockStatus === "out-of-stock"}
          className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
