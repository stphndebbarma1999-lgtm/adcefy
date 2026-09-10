"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "@/lib/context/WishlistContext";
import { useCart } from "@/lib/context/CartContext";
import { ProductImage } from "@/components/product/ProductImage";
import { formatPrice } from "@/lib/utils/format";
import { Button } from "@/components/ui/Button";
import { getProductBySlug } from "@/lib/data/products";

export default function WishlistPage() {
  const { items, remove } = useWishlist();
  const { addItem } = useCart();

  const moveToCart = (productId: string, slug: string) => {
    const product = getProductBySlug(slug);
    if (!product) return;
    addItem({
      productId,
      slug: product.slug,
      name: product.name,
      image: product.images[0] ?? "",
      price: product.price,
      originalPrice: product.originalPrice,
      stock: product.stock,
      selectedVariants: {},
      sku: product.sku,
    });
    remove(productId);
  };

  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-2xl font-bold text-ink">My Wishlist</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <Heart size={40} className="text-muted" strokeWidth={1.5} />
          <p className="text-sm font-medium text-ink">Your wishlist is empty</p>
          <p className="text-sm text-muted">Save items you love and find them here anytime.</p>
          <Button href="/" size="sm" className="mt-2">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.productId} className="flex gap-3 rounded-xl border border-border p-3">
              <Link href={`/product/${item.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-border">
                <ProductImage src={item.image} alt={item.name} />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link href={`/product/${item.slug}`} className="text-sm font-medium text-ink hover:text-primary">
                    {item.name}
                  </Link>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-ink">{formatPrice(item.price)}</span>
                    {item.originalPrice && (
                      <span className="text-xs text-muted line-through">{formatPrice(item.originalPrice)}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveToCart(item.productId, item.slug)}
                    className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary text-xs font-medium text-white hover:bg-primary-dark"
                  >
                    <ShoppingCart size={14} /> Move to Cart
                  </button>
                  <button
                    onClick={() => remove(item.productId)}
                    aria-label="Remove from wishlist"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted hover:text-danger"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
