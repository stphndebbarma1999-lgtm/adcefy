"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem } from "@/types/cart";
import { validateCoupon } from "@/lib/data/coupons";

const STORAGE_KEY = "adcefy_cart";
const COUPON_STORAGE_KEY = "adcefy_cart_coupon";

interface AppliedCoupon {
  code: string;
  discount: number;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "id" | "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon?: AppliedCoupon;
  couponError: string;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function makeLineId(productId: string, selectedVariants: Record<string, string>) {
  const variantKey = Object.entries(selectedVariants)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join("|");
  return `${productId}__${variantKey}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | undefined>();
  const [couponError, setCouponError] = useState("");

  useEffect(() => {
    // One-time hydration from localStorage on mount — the server has no
    // access to it, so this can't be a lazy useState initializer without
    // causing a hydration mismatch.
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
      const rawCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (rawCoupon) setAppliedCoupon(JSON.parse(rawCoupon));
    } catch {
      // ignore corrupted local storage
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable (private browsing, quota) — cart stays in-memory only
    }
  }, [items, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (appliedCoupon) localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      else localStorage.removeItem(COUPON_STORAGE_KEY);
    } catch {
      // storage unavailable — coupon stays in-memory only
    }
  }, [appliedCoupon, hydrated]);

  const addItem = useCallback((item: Omit<CartItem, "id" | "quantity">, quantity = 1) => {
    setItems((prev) => {
      const id = makeLineId(item.productId, item.selectedVariants);
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: Math.min(i.quantity + quantity, i.stock || 99) } : i
        );
      }
      return [...prev, { ...item, id, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock || 99)) } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(undefined);
    setCouponError("");
  }, []);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);

  const applyCoupon = useCallback(
    (code: string) => {
      if (!code.trim()) return;
      const result = validateCoupon(code, subtotal);
      if (!result.valid) {
        setCouponError(result.message);
        setAppliedCoupon(undefined);
        return;
      }
      setCouponError("");
      setAppliedCoupon({ code: result.coupon.code, discount: result.discount });
    },
    [subtotal]
  );

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(undefined);
    setCouponError("");
  }, []);

  const value: CartContextValue = {
    items,
    itemCount,
    subtotal,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
