"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, LayoutGrid, Search, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useCart } from "@/lib/context/CartContext";
import { getCategories } from "@/lib/data/categories";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { Drawer } from "@/components/ui/Drawer";

const categories = getCategories();

export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const items: {
    key: "home" | "categories" | "search" | "cart" | "account";
    label: string;
    icon: typeof Home;
    href?: string;
  }[] = [
    { key: "home", label: "Home", icon: Home, href: "/" },
    { key: "categories", label: "Categories", icon: LayoutGrid },
    { key: "search", label: "Search", icon: Search, href: "/search" },
    { key: "cart", label: "Cart", icon: ShoppingCart },
    { key: "account", label: "Account", icon: User, href: "/account" },
  ];

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-stretch border-t border-border bg-white pb-[env(safe-area-inset-bottom)] sm:hidden"
        aria-label="Mobile navigation"
      >
        {items.map((item) => {
          const active = item.href ? pathname === item.href : false;
          const commonClasses = cn(
            "relative flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-medium",
            active ? "text-primary" : "text-muted"
          );

          if (item.key === "categories") {
            return (
              <button key={item.key} onClick={() => setCategoriesOpen(true)} className={commonClasses}>
                <item.icon size={22} />
                {item.label}
              </button>
            );
          }
          if (item.key === "cart") {
            return (
              <button key={item.key} onClick={openCart} className={commonClasses}>
                <item.icon size={22} />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-[26%] flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-semibold text-white">
                    {itemCount}
                  </span>
                )}
                {item.label}
              </button>
            );
          }
          return (
            <Link key={item.key} href={item.href!} className={commonClasses}>
              <item.icon size={22} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Drawer open={categoriesOpen} onClose={() => setCategoriesOpen(false)} title="Shop by Category" side="bottom">
        <ul className="grid grid-cols-2 gap-3 p-4">
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/${c.slug}`}
                onClick={() => setCategoriesOpen(false)}
                className="flex flex-col items-center gap-2 rounded-xl border border-border p-4 text-center hover:border-primary/40"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-ink">
                  <CategoryIcon name={c.icon} size={22} />
                </span>
                <span className="text-sm font-medium text-ink">{c.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  );
}
