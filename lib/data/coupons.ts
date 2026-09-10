import type { Coupon } from "@/types/coupon";

export const coupons: Coupon[] = [
  {
    id: "cpn-1",
    code: "WELCOME10",
    discountType: "percentage",
    discountValue: 10,
    minOrderValue: 999,
    maxDiscount: 1000,
    startDate: "2026-01-01T00:00:00.000Z",
    expiryDate: "2026-12-31T00:00:00.000Z",
    usageLimit: 500,
    usedCount: 128,
    isActive: true,
  },
  {
    id: "cpn-2",
    code: "FLAT200",
    discountType: "fixed",
    discountValue: 200,
    minOrderValue: 1999,
    startDate: "2026-06-01T00:00:00.000Z",
    expiryDate: "2026-10-31T00:00:00.000Z",
    usageLimit: 200,
    usedCount: 54,
    isActive: true,
  },
];

export function getCoupons(): Coupon[] {
  return coupons;
}

export function getCouponByCode(code: string): Coupon | undefined {
  return coupons.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
}

export function validateCoupon(code: string, orderValue: number) {
  const coupon = getCouponByCode(code);
  if (!coupon) return { valid: false as const, message: "Invalid coupon code." };
  if (!coupon.isActive) return { valid: false as const, message: "This coupon is no longer active." };
  const now = new Date();
  if (now < new Date(coupon.startDate) || now > new Date(coupon.expiryDate)) {
    return { valid: false as const, message: "This coupon has expired." };
  }
  if (coupon.minOrderValue && orderValue < coupon.minOrderValue) {
    return {
      valid: false as const,
      message: `Minimum order value of ₹${coupon.minOrderValue} required.`,
    };
  }
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    return { valid: false as const, message: "This coupon has reached its usage limit." };
  }
  let discount =
    coupon.discountType === "percentage" ? (orderValue * coupon.discountValue) / 100 : coupon.discountValue;
  if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
  return { valid: true as const, coupon, discount: Math.round(discount) };
}
