"use client";

import { useState } from "react";
import type { Coupon, DiscountType } from "@/types/coupon";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export type CouponFormData = Omit<Coupon, "id" | "usedCount">;

export function CouponFormModal({
  open,
  onClose,
  initialCoupon,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  initialCoupon?: Coupon;
  onSubmit: (data: CouponFormData) => void;
}) {
  const [code, setCode] = useState(initialCoupon?.code ?? "");
  const [discountType, setDiscountType] = useState<DiscountType>(initialCoupon?.discountType ?? "percentage");
  const [discountValue, setDiscountValue] = useState(String(initialCoupon?.discountValue ?? ""));
  const [minOrderValue, setMinOrderValue] = useState(String(initialCoupon?.minOrderValue ?? ""));
  const [maxDiscount, setMaxDiscount] = useState(String(initialCoupon?.maxDiscount ?? ""));
  const [startDate, setStartDate] = useState(initialCoupon?.startDate.slice(0, 10) ?? "");
  const [expiryDate, setExpiryDate] = useState(initialCoupon?.expiryDate.slice(0, 10) ?? "");
  const [usageLimit, setUsageLimit] = useState(String(initialCoupon?.usageLimit ?? ""));
  const [isActive, setIsActive] = useState(initialCoupon?.isActive ?? true);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !discountValue || !startDate || !expiryDate) {
      setError("Code, discount value, start date and expiry date are required.");
      return;
    }
    setError("");
    onSubmit({
      code: code.trim().toUpperCase(),
      discountType,
      discountValue: Number(discountValue),
      minOrderValue: minOrderValue ? Number(minOrderValue) : undefined,
      maxDiscount: maxDiscount ? Number(maxDiscount) : undefined,
      startDate: new Date(startDate).toISOString(),
      expiryDate: new Date(expiryDate).toISOString(),
      usageLimit: usageLimit ? Number(usageLimit) : undefined,
      isActive,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={initialCoupon ? "Edit Coupon" : "Create Coupon"}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="Coupon Code" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} error={error} />
        <div className="grid grid-cols-2 gap-4">
          <Select label="Discount Type" value={discountType} onChange={(e) => setDiscountType(e.target.value as DiscountType)}>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
          </Select>
          <Input label="Discount Value" type="number" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Minimum Order (₹)" type="number" value={minOrderValue} onChange={(e) => setMinOrderValue(e.target.value)} />
          <Input label="Maximum Discount (₹)" type="number" value={maxDiscount} onChange={(e) => setMaxDiscount(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <Input label="Expiry Date" type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
        </div>
        <Input label="Usage Limit (optional)" type="number" value={usageLimit} onChange={(e) => setUsageLimit(e.target.value)} />
        <Toggle checked={isActive} onChange={setIsActive} label="Active" />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{initialCoupon ? "Save Changes" : "Create Coupon"}</Button>
        </div>
      </form>
    </Modal>
  );
}
