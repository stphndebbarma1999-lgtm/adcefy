"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { ProductImage } from "@/components/product/ProductImage";
import { useCart } from "@/lib/context/CartContext";
import { formatPrice } from "@/lib/utils/format";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <Drawer open={isOpen} onClose={closeCart} title={`Your Cart (${items.length})`}>
      {items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
          <ShoppingBag size={40} className="text-muted" strokeWidth={1.5} />
          <p className="text-sm text-muted">Your cart is empty.</p>
          <Button href="/" size="sm" onClick={closeCart}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <ul className="flex-1 divide-y divide-border overflow-y-auto px-4">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3 py-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border">
                  <ProductImage src={item.image} alt={item.name} />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link href={`/product/${item.slug}`} onClick={closeCart} className="text-sm font-medium text-ink hover:text-primary">
                      {item.name}
                    </Link>
                    {Object.keys(item.selectedVariants).length > 0 && (
                      <p className="text-xs text-muted">{Object.values(item.selectedVariants).join(" / ")}</p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-border">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-muted hover:text-ink"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-muted hover:text-ink"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-ink">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
                <button
                  aria-label="Remove item"
                  onClick={() => removeItem(item.id)}
                  className="self-start text-muted hover:text-danger"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-border p-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-semibold text-ink">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Button href="/checkout" fullWidth onClick={closeCart}>
                Checkout
              </Button>
              <Button href="/cart" variant="outline" fullWidth onClick={closeCart}>
                View Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
