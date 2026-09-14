"use client";

/**
 * Admin working data store.
 *
 * Products, categories and banners are backed by Supabase (see
 * app/api/admin/products|categories|banners) — fetched on mount and kept in
 * sync via the CRUD calls below, so edits show up on the live storefront.
 *
 * Orders, customers, coupons and settings are still a browser-persisted
 * (localStorage) demo layer, seeded from lib/data. Once those move to
 * Supabase too, swap their methods below for the same fetch-based pattern.
 */

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "@/types/product";
import type { Category } from "@/types/category";
import type { Order, OrderStatus } from "@/types/order";
import type { Customer } from "@/types/customer";
import type { Coupon } from "@/types/coupon";
import type { Banner } from "@/types/banner";
import type { StoreSettings } from "@/types/settings";

import { orders as demoOrders } from "@/lib/data/orders";
import { customers as demoCustomers } from "@/lib/data/customers";
import { coupons as demoCoupons } from "@/lib/data/coupons";
import { defaultSettings } from "@/lib/data/settings";

const STORAGE_KEY = "adcefy_admin_store_v1";

interface AdminState {
  orders: Order[];
  customers: Customer[];
  coupons: Coupon[];
  settings: StoreSettings;
}

function seedState(): AdminState {
  return {
    orders: demoOrders,
    customers: demoCustomers,
    coupons: demoCoupons,
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
  categories: Category[];
  categoriesLoading: boolean;
  addCategory: (category: Omit<Category, "id">) => Promise<Category>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<Category>;
  deleteCategory: (id: string) => Promise<void>;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  addCoupon: (coupon: Omit<Coupon, "id" | "usedCount">) => Coupon;
  updateCoupon: (id: string, coupon: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  banners: Banner[];
  bannersLoading: boolean;
  addBanner: (banner: Omit<Banner, "id">) => Promise<Banner>;
  updateBanner: (id: string, banner: Partial<Banner>) => Promise<Banner>;
  deleteBanner: (id: string) => Promise<void>;
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

/** Fetches a Supabase-backed admin collection once on mount. */
function useAdminCollection<T>(endpoint: string, key: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [live, setLive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(endpoint);
        const data = await readJsonOrThrow(res);
        if (!cancelled) {
          setItems(data[key]);
          setLive(true);
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : `Failed to load ${key}.`);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { items, setItems, loading, live, error };
}

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AdminState>(seedState);
  const [hydrated, setHydrated] = useState(false);

  const {
    items: products,
    setItems: setProducts,
    loading: productsLoading,
    live: productsLive,
    error: productsError,
  } = useAdminCollection<Product>("/api/admin/products", "products");

  const {
    items: categories,
    setItems: setCategories,
    loading: categoriesLoading,
  } = useAdminCollection<Category>("/api/admin/categories", "categories");

  const {
    items: banners,
    setItems: setBanners,
    loading: bannersLoading,
  } = useAdminCollection<Banner>("/api/admin/banners", "banners");

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

  const addProduct = useCallback(async (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const data = await readJsonOrThrow(res);
    setProducts((prev) => [data.product, ...prev]);
    return data.product as Product;
  }, [setProducts]);

  const updateProduct = useCallback(async (id: string, product: Partial<Product>) => {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const data = await readJsonOrThrow(res);
    setProducts((prev) => prev.map((p) => (p.id === id ? data.product : p)));
    return data.product as Product;
  }, [setProducts]);

  const deleteProduct = useCallback(async (id: string) => {
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    await readJsonOrThrow(res);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, [setProducts]);

  const addCategory = useCallback(async (category: Omit<Category, "id">) => {
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    const data = await readJsonOrThrow(res);
    setCategories((prev) => [...prev, data.category].sort((a, b) => a.sortOrder - b.sortOrder));
    return data.category as Category;
  }, [setCategories]);

  const updateCategory = useCallback(async (id: string, category: Partial<Category>) => {
    const res = await fetch(`/api/admin/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    const data = await readJsonOrThrow(res);
    setCategories((prev) => prev.map((c) => (c.id === id ? data.category : c)).sort((a, b) => a.sortOrder - b.sortOrder));
    return data.category as Category;
  }, [setCategories]);

  const deleteCategory = useCallback(async (id: string) => {
    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    await readJsonOrThrow(res);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }, [setCategories]);

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

  const addBanner = useCallback(async (banner: Omit<Banner, "id">) => {
    const res = await fetch("/api/admin/banners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(banner),
    });
    const data = await readJsonOrThrow(res);
    setBanners((prev) => [...prev, data.banner].sort((a, b) => a.sortOrder - b.sortOrder));
    return data.banner as Banner;
  }, [setBanners]);

  const updateBanner = useCallback(async (id: string, banner: Partial<Banner>) => {
    const res = await fetch(`/api/admin/banners/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(banner),
    });
    const data = await readJsonOrThrow(res);
    setBanners((prev) => prev.map((b) => (b.id === id ? data.banner : b)).sort((a, b) => a.sortOrder - b.sortOrder));
    return data.banner as Banner;
  }, [setBanners]);

  const deleteBanner = useCallback(async (id: string) => {
    const res = await fetch(`/api/admin/banners/${id}`, { method: "DELETE" });
    await readJsonOrThrow(res);
    setBanners((prev) => prev.filter((b) => b.id !== id));
  }, [setBanners]);

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
    categories,
    categoriesLoading,
    addCategory,
    updateCategory,
    deleteCategory,
    updateOrderStatus,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    banners,
    bannersLoading,
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
