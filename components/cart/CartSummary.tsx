"use client";

import { useState } from "react";
import { Tag } from "lucide-react";
import { formatPrice } from "@/lib/utils/format";
import { Button } from "@/components/ui/Button";

export function CartSummary({
  subtotal,
  discount,
  shippingFee,
  total,
  appliedCoupon,
  onApplyCoupon,
  couponError,
  checkoutHref,
}: {
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  appliedCoupon?: string;
  onApplyCoupon?: (code: string) => void;
  couponError?: string;
  checkoutHref?: string;
}) {
  const [code, setCode] = useState("");

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border p-5">
      <h2 className="text-base font-semibold text-ink">Order Summary</h2>

      {onApplyCoupon && (
        <div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Coupon code"
                className="h-10 w-full rounded-lg border border-border pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={() => onApplyCoupon(code)}
              className="h-10 shrink-0 rounded-lg border border-border px-4 text-sm font-medium text-ink hover:bg-surface-muted"
            >
              Apply
            </button>
          </div>
          {couponError && <p className="mt-1.5 text-xs text-danger">{couponError}</p>}
          {appliedCoupon && !couponError && (
            <p className="mt-1.5 text-xs text-success">Coupon &ldquo;{appliedCoupon}&rdquo; applied.</p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Subtotal</span>
          <span className="text-ink">{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <span className="text-muted">Discount</span>
            <span className="text-success">-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted">Shipping</span>
          <span className="text-ink">{shippingFee === 0 ? "Free" : formatPrice(shippingFee)}</span>
        </div>
        <div className="mt-1 flex justify-between border-t border-border pt-2 text-base font-semibold">
          <span className="text-ink">Total</span>
          <span className="text-ink">{formatPrice(total)}</span>
        </div>
      </div>

      {checkoutHref && (
        <Button href={checkoutHref} fullWidth size="lg">
          Proceed to Checkout
        </Button>
      )}
    </div>
  );
}
