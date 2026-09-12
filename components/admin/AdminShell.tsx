"use client";

import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";
import { Drawer } from "@/components/ui/Drawer";
import { AdminDataProvider, useAdminData } from "@/lib/context/AdminDataContext";

function DataModeBadge() {
  const { productsLive, productsLoading } = useAdminData();

  if (productsLoading) return null;

  if (productsLive) {
    return (
      <span
        title="Products are saved to your Supabase database. Categories, orders, customers, coupons, banners and settings are still demo data stored in this browser."
        className="ml-auto rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800"
      >
        Products Live
      </span>
    );
  }

  return (
    <span
      title="No database connected — every section runs on demo data stored in this browser and won't appear on the live storefront."
      className="ml-auto rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800"
    >
      Demo Mode
    </span>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AdminDataProvider>
      <div className="flex min-h-screen bg-surface-muted">
        <aside className="hidden w-64 shrink-0 border-r border-border bg-white lg:block">
          <div className="sticky top-0 h-screen">
            <AdminSidebar />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-white px-4 lg:px-6">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="rounded-lg p-2 text-ink hover:bg-surface-muted lg:hidden"
            >
              <Menu size={22} />
            </button>
            <p className="text-sm font-semibold text-ink">ADCEFY Admin</p>
            <DataModeBadge />
          </header>

          <main className="flex-1 p-4 lg:p-6">{children}</main>
        </div>
      </div>

      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} side="left" widthClassName="max-w-64">
        <AdminSidebar onNavigate={() => setMobileOpen(false)} />
      </Drawer>
    </AdminDataProvider>
  );
}
