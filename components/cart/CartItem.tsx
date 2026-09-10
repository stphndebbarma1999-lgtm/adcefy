"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { ProductImage } from "@/components/product/ProductImage";
import { formatPrice } from "@/lib/utils/format";
import { useCart } from "@/lib/context/CartContext";
import type { CartItem as CartItemType } from "@/types/cart";

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-4">
      <Link href={`/product/${item.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-border">
        <ProductImage src={item.image} alt={item.name} />
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/product/${item.slug}`} className="text-sm font-medium text-ink hover:text-primary">
              {item.name}
            </Link>
            {Object.keys(item.selectedVariants).length > 0 && (
              <p className="text-xs text-muted">{Object.values(item.selectedVariants).join(" / ")}</p>
            )}
            <p className="text-xs text-muted">SKU: {item.sku}</p>
          </div>
          <button onClick={() => removeItem(item.id)} aria-label="Remove item" className="text-muted hover:text-danger">
            <Trash2 size={16} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center rounded-lg border border-border">
            <button
              aria-label="Decrease quantity"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-2 text-muted hover:text-ink"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <button
              aria-label="Increase quantity"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-2 text-muted hover:text-ink"
            >
              <Plus size={14} />
            </button>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-ink">{formatPrice(item.price * item.quantity)}</span>
            {item.originalPrice && (
              <span className="text-xs text-muted line-through">{formatPrice(item.originalPrice * item.quantity)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
