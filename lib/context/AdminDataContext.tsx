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

import { products as demoProducts } from "@/lib/data/products";
import { categories as demoCategories } from "@/lib/data/categories";
import { orders as demoOrders } from "@/lib/data/orders";
import { customers as demoCustomers } from "@/lib/data/customers";
import { coupons as demoCoupons } from "@/lib/data/coupons";
import { banners as demoBanners } from "@/lib/data/banners";
import { defaultSettings } from "@/lib/data/settings";

const STORAGE_KEY = "adcefy_admin_store_v1";

interface AdminState {
  products: Product[];
  categories: Category[];
  orders: Order[];
  customers: Customer[];
  coupons: Coupon[];
  banners: Banner[];
  settings: StoreSettings;
}

function seedState(): AdminState {
  return {
    products: demoProducts,
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
  addProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
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
  adjustStock: (productId: string, stock: number) => void;
  resetDemoData: () => void;
}

const AdminDataContext = createContext<AdminDataContextValue | undefined>(undefined);

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AdminState>(seedState);
  const [hydrated, setHydrated] = useState(false);

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

  const addProduct = useCallback((product: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const newProduct: Product = { ...product, id: generateId("prod"), createdAt: now, updatedAt: now };
    setState((prev) => ({ ...prev, products: [newProduct, ...prev.products] }));
    return newProduct;
  }, []);

  const updateProduct = useCallback((id: string, product: Partial<Product>) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, ...product, updatedAt: new Date().toISOString() } : p)),
    }));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setState((prev) => ({ ...prev, products: prev.products.filter((p) => p.id !== id) }));
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

  const adjustStock = useCallback((productId: string, stock: number) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === productId ? { ...p, stock, updatedAt: new Date().toISOString() } : p)),
    }));
  }, []);

  const resetDemoData = useCallback(() => {
    setState(seedState());
  }, []);

  const value: AdminDataContextValue = {
    ...state,
    isDemoMode: true,
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
