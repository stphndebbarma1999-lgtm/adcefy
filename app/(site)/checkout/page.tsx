"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { CartSummary } from "@/components/cart/CartSummary";
import { formatPrice } from "@/lib/utils/format";
import { isValidEmail, isValidIndianPhone, isValidPincode } from "@/lib/utils/validation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

const indianStates = [
  "Andhra Pradesh", "Delhi", "Gujarat", "Haryana", "Karnataka", "Kerala",
  "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal",
];

interface FormState {
  email: string;
  phone: string;
  fullName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  pincode: string;
}

const emptyForm: FormState = {
  email: "",
  phone: "",
  fullName: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  pincode: "",
};

export default function CheckoutPage() {
  const { items, subtotal, appliedCoupon, clearCart } = useCart();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [delivery, setDelivery] = useState<"standard" | "express">("standard");
  const [payment, setPayment] = useState<"upi" | "card" | "netbanking" | "cod">(
    siteConfig.payments.upiEnabled ? "upi" : "cod"
  );
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const shippingFee = useMemo(() => {
    if (delivery === "express") return 199;
    return subtotal >= siteConfig.shipping.freeShippingThresholdInPaise / 100 ? 0 : siteConfig.shipping.defaultFeeInPaise / 100;
  }, [delivery, subtotal]);

  const discount = appliedCoupon?.discount ?? 0;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const paymentOptions = [
    { id: "upi" as const, label: "UPI", enabled: siteConfig.payments.upiEnabled },
    { id: "card" as const, label: "Credit / Debit Card", enabled: siteConfig.payments.cardsEnabled },
    { id: "netbanking" as const, label: "Net Banking", enabled: siteConfig.payments.netBankingEnabled },
    { id: "cod" as const, label: "Cash on Delivery", enabled: siteConfig.payments.codEnabled },
  ].filter((p) => p.enabled);

  const updateField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!isValidEmail(form.email)) next.email = "Enter a valid email address.";
    if (!isValidIndianPhone(form.phone)) next.phone = "Enter a valid 10-digit mobile number.";
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.address.trim()) next.address = "Address is required.";
    if (!form.city.trim()) next.city = "City is required.";
    if (!form.state.trim()) next.state = "State is required.";
    if (!isValidPincode(form.pincode)) next.pincode = "Enter a valid 6-digit PIN code.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const generatedNumber = `ADC${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNumber(generatedNumber);
    clearCart();
  };

  if (orderNumber) {
    return (
      <div className="container-page flex flex-col items-center gap-3 py-20 text-center">
        <CheckCircle2 size={56} className="text-success" strokeWidth={1.5} />
        <h1 className="text-2xl font-bold text-ink">Order Placed!</h1>
        <p className="max-w-md text-sm text-muted">
          Thank you, {form.fullName}. Your order <span className="font-semibold text-ink">#{orderNumber}</span> has been
          recorded. You will receive updates at {form.email}.
        </p>
        <p className="max-w-md text-xs text-muted">
          This is a demo checkout — no real payment has been processed and no live order record was created.
        </p>
        <div className="mt-2 flex gap-3">
          <Button href="/track-order">Track Order</Button>
          <Button href="/" variant="outline">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center gap-3 py-20 text-center">
        <ShoppingBag size={48} className="text-muted" strokeWidth={1.5} />
        <h1 className="text-xl font-semibold text-ink">Your cart is empty</h1>
        <p className="text-sm text-muted">Add items to your cart before checking out.</p>
        <Button href="/" className="mt-2">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-2xl font-bold text-ink">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="flex flex-col gap-8 lg:flex-row">
        <div className="flex flex-1 flex-col gap-8">
          <section>
            <h2 className="mb-3 text-base font-semibold text-ink">Contact</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Email" type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} error={errors.email} />
              <Input label="Phone" type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} error={errors.phone} />
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-ink">Shipping Address</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Full Name"
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                error={errors.fullName}
                className="sm:col-span-2"
              />
              <Input
                label="Address"
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                error={errors.address}
                className="sm:col-span-2"
              />
              <Input
                label="Apartment / Landmark (optional)"
                value={form.apartment}
                onChange={(e) => updateField("apartment", e.target.value)}
                className="sm:col-span-2"
              />
              <Input label="City" value={form.city} onChange={(e) => updateField("city", e.target.value)} error={errors.city} />
              <Select label="State" value={form.state} onChange={(e) => updateField("state", e.target.value)} error={errors.state}>
                <option value="">Select state</option>
                {indianStates.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
              <Input label="PIN Code" value={form.pincode} onChange={(e) => updateField("pincode", e.target.value)} error={errors.pincode} />
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-ink">Delivery</h2>
            <div className="flex flex-col gap-2">
              <label
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-lg border p-3 text-sm",
                  delivery === "standard" ? "border-primary bg-primary-light" : "border-border"
                )}
              >
                <span className="flex items-center gap-2">
                  <input type="radio" checked={delivery === "standard"} onChange={() => setDelivery("standard")} />
                  Standard ({siteConfig.shipping.standardDeliveryDays} business days)
                </span>
                <span className="font-medium">
                  {subtotal >= siteConfig.shipping.freeShippingThresholdInPaise / 100 ? "Free" : formatPrice(siteConfig.shipping.defaultFeeInPaise / 100)}
                </span>
              </label>
              {siteConfig.shipping.expressEnabled && (
                <label
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-lg border p-3 text-sm",
                    delivery === "express" ? "border-primary bg-primary-light" : "border-border"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <input type="radio" checked={delivery === "express"} onChange={() => setDelivery("express")} />
                    Express ({siteConfig.shipping.expressDeliveryDays} business days)
                  </span>
                  <span className="font-medium">{formatPrice(199)}</span>
                </label>
              )}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-ink">Payment</h2>
            <div className="flex flex-col gap-2">
              {paymentOptions.map((option) => (
                <label
                  key={option.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm",
                    payment === option.id ? "border-primary bg-primary-light" : "border-border"
                  )}
                >
                  <input type="radio" checked={payment === option.id} onChange={() => setPayment(option.id)} />
                  {option.label}
                </label>
              ))}
            </div>
            {payment !== "cod" && (
              <p className="mt-2 text-xs text-muted">
                Payment gateway integration is not yet connected — this is a UI-only demo checkout.
              </p>
            )}
          </section>
        </div>

        <div className="w-full lg:w-96">
          <div className="mb-4 flex flex-col gap-3 rounded-xl border border-border p-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-ink">
                  {item.name} <span className="text-muted">x{item.quantity}</span>
                </span>
                <span className="font-medium text-ink">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <CartSummary subtotal={subtotal} discount={discount} shippingFee={shippingFee} total={total} />
          <Button type="submit" fullWidth size="lg" className="mt-4">
            Place Order
          </Button>
        </div>
      </form>
    </div>
  );
}
