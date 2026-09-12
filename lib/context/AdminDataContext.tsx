"use client";

/**
 * Admin working data store.
 *
 * This is a browser-persisted (localStorage) demo data layer that powers the
 * ADCEFY Admin UI end-to-end (add / edit / delete) without a backend. It is
 * seeded from lib/data on first load.
 *
 * IMPORTANT — this does NOT sync to the public storefront, which renders
 * from lib/data on the server for performance/SEO. Once Supabase is
 * connected (see lib/supabase), swap the methods below for real database
 * reads/writes (e.g. Server Actions backed by Supabase with RLS) and the
 * storefront + admin will share one live source of truth.
 */

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "@/types/product";
import type { Category } from "@/types/category";
import type { Order, OrderStatus } from "@/types/order";
import type { Customer } from "@/types/customer";
import type { Coupon } from "@/types/coupon";
import type { Banner } from "@/types/banner";
import type { StoreSettings } from "@/types/settings";

import { categories as demoCategories } from "@/lib/data/categories";
import { orders as demoOrders } from "@/lib/data/orders";
import { customers as demoCustomers } from "@/lib/data/customers";
import { coupons as demoCoupons } from "@/lib/data/coupons";
import { banners as demoBanners } from "@/lib/data/banners";
import { defaultSettings } from "@/lib/data/settings";

const STORAGE_KEY = "adcefy_admin_store_v1";

interface AdminState {
  categories: Category[];
  orders: Order[];
  customers: Customer[];
  coupons: Coupon[];
  banners: Banner[];
  settings: StoreSettings;
}

function seedState(): AdminState {
  return {
    categories: demoCategories,
    orders: demoOrders,
    customers: demoCustomers,
    coupons: demoCoupons,
    banners: demoBanners,
    settings: defaultSettings,
  };
}

let idCounter = 1000;
function generateId(prefix: string) {
  idCounter += 1;
  return `${prefix}-${Date.now()}-${idCounter}`;
}

interface AdminDataContextValue extends AdminState {
  isDemoMode: boolean;
  products: Product[];
  productsLoading: boolean;
  productsLive: boolean;
  productsError: string | null;
  addProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => Promise<Product>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, "id">) => Category;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  addCoupon: (coupon: Omit<Coupon, "id" | "usedCount">) => Coupon;
  updateCoupon: (id: string, coupon: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  addBanner: (banner: Omit<Banner, "id">) => Banner;
  updateBanner: (id: string, banner: Partial<Banner>) => void;
  deleteBanner: (id: string) => void;
  updateSettings: (settings: Partial<StoreSettings>) => void;
  adjustStock: (productId: string, stock: number) => Promise<void>;
  resetDemoData: () => void;
}

const AdminDataContext = createContext<AdminDataContextValue | undefined>(undefined);

async function readJsonOrThrow(res: Response) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AdminState>(seedState);
  const [hydrated, setHydrated] = useState(false);

  // Products live in Supabase (see app/api/admin/products), not localStorage —
  // fetched once on mount and kept in sync via the CRUD calls below.
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsLive, setProductsLive] = useState(false);
  const [productsError, setProductsError] = useState<string | null>(null);

  useEffect(() => {
    // One-time hydration from localStorage on mount — see CartContext for rationale.
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {
      // fall back to seed data
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage unavailable — admin edits stay in-memory only for this session
    }
  }, [state, hydrated]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/products");
        const data = await readJsonOrThrow(res);
        if (!cancelled) {
          setProducts(data.products);
          setProductsLive(true);
        }
      } catch (err) {
        if (!cancelled) setProductsError(err instanceof Error ? err.message : "Failed to load products.");
      } finally {
        if (!cancelled) setProductsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const addProduct = useCallback(async (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const data = await readJsonOrThrow(res);
    setProducts((prev) => [data.product, ...prev]);
    return data.product as Product;
  }, []);

  const updateProduct = useCallback(async (id: string, product: Partial<Product>) => {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const data = await readJsonOrThrow(res);
    setProducts((prev) => prev.map((p) => (p.id === id ? data.product : p)));
    return data.product as Product;
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    await readJsonOrThrow(res);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addCategory = useCallback((category: Omit<Category, "id">) => {
    const newCategory: Category = { ...category, id: generateId("cat") };
    setState((prev) => ({ ...prev, categories: [...prev.categories, newCategory] }));
    return newCategory;
  }, []);

  const updateCategory = useCallback((id: string, category: Partial<Category>) => {
    setState((prev) => ({
      ...prev,
      categories: prev.categories.map((c) => (c.id === id ? { ...c, ...category } : c)),
    }));
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setState((prev) => ({ ...prev, categories: prev.categories.filter((c) => c.id !== id) }));
  }, []);

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((o) => (o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o)),
    }));
  }, []);

  const addCoupon = useCallback((coupon: Omit<Coupon, "id" | "usedCount">) => {
    const newCoupon: Coupon = { ...coupon, id: generateId("cpn"), usedCount: 0 };
    setState((prev) => ({ ...prev, coupons: [newCoupon, ...prev.coupons] }));
    return newCoupon;
  }, []);

  const updateCoupon = useCallback((id: string, coupon: Partial<Coupon>) => {
    setState((prev) => ({ ...prev, coupons: prev.coupons.map((c) => (c.id === id ? { ...c, ...coupon } : c)) }));
  }, []);

  const deleteCoupon = useCallback((id: string) => {
    setState((prev) => ({ ...prev, coupons: prev.coupons.filter((c) => c.id !== id) }));
  }, []);

  const addBanner = useCallback((banner: Omit<Banner, "id">) => {
    const newBanner: Banner = { ...banner, id: generateId("ban") };
    setState((prev) => ({ ...prev, banners: [...prev.banners, newBanner] }));
    return newBanner;
  }, []);

  const updateBanner = useCallback((id: string, banner: Partial<Banner>) => {
    setState((prev) => ({ ...prev, banners: prev.banners.map((b) => (b.id === id ? { ...b, ...banner } : b)) }));
  }, []);

  const deleteBanner = useCallback((id: string) => {
    setState((prev) => ({ ...prev, banners: prev.banners.filter((b) => b.id !== id) }));
  }, []);

  const updateSettings = useCallback((settings: Partial<StoreSettings>) => {
    setState((prev) => ({ ...prev, settings: { ...prev.settings, ...settings } }));
  }, []);

  const adjustStock = useCallback(
    async (productId: string, stock: number) => {
      await updateProduct(productId, { stock });
    },
    [updateProduct]
  );

  const resetDemoData = useCallback(() => {
    setState(seedState());
  }, []);

  const value: AdminDataContextValue = {
    ...state,
    isDemoMode: true,
    products,
    productsLoading,
    productsLive,
    productsError,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    updateOrderStatus,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    addBanner,
    updateBanner,
    deleteBanner,
    updateSettings,
    adjustStock,
    resetDemoData,
  };

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error("useAdminData must be used within an AdminDataProvider");
  return ctx;
}
