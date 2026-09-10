"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, Zap } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductGallery } from "./ProductGallery";
import { VariantSelector } from "./VariantSelector";
import { QuantitySelector } from "./QuantitySelector";
import { DeliveryChecker } from "./DeliveryChecker";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils/format";
import { getStockStatus } from "@/types/product";
import { useCart } from "@/lib/context/CartContext";
import { useWishlist } from "@/lib/context/WishlistContext";
import { cn } from "@/lib/utils/cn";

export function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem, openCart } = useCart();
  const { isWishlisted, toggle } = useWishlist();

  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.variants.forEach((group) => {
      if (group.options[0]) initial[group.name] = group.options[0].name;
    });
    return initial;
  });
  const [quantity, setQuantity] = useState(1);

  const priceAdjustment = useMemo(() => {
    return product.variants.reduce((sum, group) => {
      const selectedName = selectedVariants[group.name];
      const option = group.options.find((o) => o.name === selectedName);
      return sum + (option?.priceAdjustment ?? 0);
    }, 0);
  }, [product.variants, selectedVariants]);

  const finalPrice = product.price + priceAdjustment;
  const finalOriginalPrice = product.originalPrice ? product.originalPrice + priceAdjustment : undefined;
  const stockStatus = getStockStatus(product.stock);
  const wishlisted = isWishlisted(product.id);

  const buildCartItem = () => ({
    productId: product.id,
    slug: product.slug,
    name: product.name,
    image: product.images[0] ?? "",
    price: finalPrice,
    originalPrice: finalOriginalPrice,
    stock: product.stock,
    selectedVariants,
    sku: product.sku,
  });

  const handleAddToCart = () => {
    addItem(buildCartItem(), quantity);
  };

  const handleBuyNow = () => {
    addItem(buildCartItem(), quantity);
    openCart();
    router.push("/checkout");
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
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
      <ProductGallery images={product.images} name={product.name} categorySlug={product.categorySlug} />

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-muted">{product.brand}</p>
          <h1 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">{product.name}</h1>
          <div className="mt-2 flex items-center gap-3">
            <Rating value={product.rating} reviewCount={product.reviewCount} />
            <span className="text-xs text-muted">SKU: {product.sku}</span>
          </div>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-ink">{formatPrice(finalPrice)}</span>
          {finalOriginalPrice && <span className="text-lg text-muted line-through">{formatPrice(finalOriginalPrice)}</span>}
          {product.discountPercentage && <Badge tone="danger">-{product.discountPercentage}%</Badge>}
        </div>

        <p className="text-sm leading-relaxed text-muted">{product.shortDescription}</p>

        <p
          className={cn(
            "text-sm font-medium",
            stockStatus === "in-stock" && "text-success",
            stockStatus === "low-stock" && "text-accent-orange",
            stockStatus === "out-of-stock" && "text-danger"
          )}
        >
          {stockStatus === "in-stock" && "In Stock"}
          {stockStatus === "low-stock" && `Only ${product.stock} left in stock`}
          {stockStatus === "out-of-stock" && "Out of Stock"}
        </p>

        {product.variants.map((group) => (
          <VariantSelector
            key={group.id}
            group={group}
            selected={selectedVariants[group.name]}
            onSelect={(name) => setSelectedVariants((prev) => ({ ...prev, [group.name]: name }))}
          />
        ))}

        <div className="flex items-center gap-4">
          <p className="text-sm font-medium text-ink">Quantity</p>
          <QuantitySelector value={quantity} onChange={setQuantity} max={Math.max(1, product.stock)} />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleAddToCart}
            disabled={stockStatus === "out-of-stock"}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg border border-primary bg-white text-sm font-semibold text-primary transition-colors hover:bg-primary-light disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            disabled={stockStatus === "out-of-stock"}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <Zap size={18} />
            Buy Now
          </button>
          <button
            onClick={handleWishlist}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wishlisted}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border text-ink hover:text-danger"
          >
            <Heart size={20} className={cn(wishlisted && "fill-danger text-danger")} />
          </button>
        </div>

        <DeliveryChecker />
      </div>
    </div>
  );
}
