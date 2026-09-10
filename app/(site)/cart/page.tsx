"use client";

import { useMemo } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export default function CartPage() {
  const { items, subtotal, appliedCoupon, couponError, applyCoupon } = useCart();

  const shippingFee = useMemo(() => {
    if (items.length === 0) return 0;
    return subtotal >= siteConfig.shipping.freeShippingThresholdInPaise / 100 ? 0 : siteConfig.shipping.defaultFeeInPaise / 100;
  }, [items.length, subtotal]);

  const discount = appliedCoupon?.discount ?? 0;
  const total = Math.max(0, subtotal - discount + shippingFee);

  if (items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center gap-3 py-20 text-center">
        <ShoppingBag size={48} className="text-muted" strokeWidth={1.5} />
        <h1 className="text-xl font-semibold text-ink">Your cart is empty</h1>
        <p className="text-sm text-muted">Looks like you haven&apos;t added anything yet.</p>
        <Button href="/" className="mt-2">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-2xl font-bold text-ink">Shopping Cart</h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1 divide-y divide-border rounded-xl border border-border px-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="w-full lg:w-80">
          <CartSummary
            subtotal={subtotal}
            discount={discount}
            shippingFee={shippingFee}
            total={total}
            appliedCoupon={appliedCoupon?.code}
            onApplyCoupon={applyCoupon}
            couponError={couponError}
            checkoutHref="/checkout"
          />
        </div>
      </div>
    </div>
  );
}
