"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import { Logo } from "./Logo";
import { AnnouncementBar } from "./AnnouncementBar";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { useCart } from "@/lib/context/CartContext";
import { useWishlist } from "@/lib/context/WishlistContext";
import { getCategories } from "@/lib/data/categories";
import { cn } from "@/lib/utils/cn";

const categories = getCategories();
const navItems = [{ slug: "", name: "Home" }, ...categories.map((c) => ({ slug: c.slug, name: c.name }))];

export function Header() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <header className="sticky top-0 z-40 bg-white">
      <AnnouncementBar />
      <div className="border-b border-border">
        <div className="container-page flex h-20 items-center justify-between gap-4 lg:h-24">
          <Logo imageClassName="h-12 w-auto sm:h-14 lg:h-16" />

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              const href = `/${item.slug}`;
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    active ? "text-primary" : "text-ink"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden max-w-xs flex-1 items-center lg:flex">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-full items-center gap-2 rounded-lg border border-border bg-surface-muted px-3.5 text-sm text-muted hover:border-primary/40"
            >
              <Search size={16} />
              Search for products...
            </button>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="rounded-lg p-2 text-ink hover:bg-surface-muted lg:hidden"
            >
              <Search size={22} />
            </button>
            <Link href="/account" aria-label="Account" className="hidden rounded-lg p-2 text-ink hover:bg-surface-muted sm:block">
              <User size={22} />
            </Link>
            <Link href="/wishlist" aria-label="Wishlist" className="relative hidden rounded-lg p-2 text-ink hover:bg-surface-muted sm:block">
              <Heart size={22} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <button onClick={openCart} aria-label="Cart" className="relative rounded-lg p-2 text-ink hover:bg-surface-muted">
              <ShoppingCart size={22} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
