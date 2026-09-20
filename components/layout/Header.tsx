"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Heart, LogIn, Search, ShoppingCart, User, UserPlus } from "lucide-react";
import { Logo } from "./Logo";
import { AnnouncementBar } from "./AnnouncementBar";
import { useCart } from "@/lib/context/CartContext";
import { useWishlist } from "@/lib/context/WishlistContext";
import { getCategories } from "@/lib/data/categories";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { SearchOverlay } from "@/components/search/SearchOverlay";

const categories = getCategories();

const navLinks = [
  { label: "Catalog", href: "/catalog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const { itemCount, openCart } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!categoriesOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [categoriesOpen]);

  return (
    <header className="sticky top-0 z-40 bg-dark">
      <AnnouncementBar />
      <div className="border-b border-white/10">
        <div className="container-page flex h-20 items-center justify-between gap-4 lg:h-24">
          <Logo imageClassName="h-12 w-auto sm:h-14 lg:h-16" />

          <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
            <div ref={categoriesRef} className="relative">
              <button
                onClick={() => setCategoriesOpen((v) => !v)}
                aria-expanded={categoriesOpen}
                className="flex items-center gap-1 text-sm font-semibold text-white hover:text-primary"
              >
                Categories
                <ChevronDown size={14} className={categoriesOpen ? "rotate-180 transition-transform" : "transition-transform"} />
              </button>
              {categoriesOpen && (
                <div className="absolute left-0 top-full z-50 mt-2 grid w-72 grid-cols-2 gap-1 rounded-xl border border-border bg-white p-3 shadow-lg">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/${c.slug}`}
                      onClick={() => setCategoriesOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-ink hover:bg-surface-muted"
                    >
                      <CategoryIcon name={c.icon} size={16} className="shrink-0 text-muted" />
                      <span className="truncate">{c.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm font-semibold text-white hover:text-primary">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative hidden rounded-lg p-2 text-white hover:bg-white/10 sm:block"
            >
              <Heart size={22} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link
              href="/login"
              className="hidden items-center gap-1.5 rounded-lg border border-white/30 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:border-white lg:flex"
            >
              <LogIn size={15} />
              Sign In
            </Link>
            <Link
              href="/register"
              className="hidden items-center gap-1.5 rounded-lg border border-white/30 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:border-white lg:flex"
            >
              <UserPlus size={15} />
              Create Account
            </Link>

            <Link href="/account" aria-label="Account" className="rounded-lg p-2 text-white hover:bg-white/10">
              <User size={22} />
            </Link>

            <button
              onClick={openCart}
              aria-label="Cart"
              className="relative flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:bg-primary-dark sm:px-3.5"
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold text-primary">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-white/10 bg-dark">
        <div className="container-page py-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex h-11 w-full items-center gap-2 rounded-lg border border-border bg-white px-3.5 text-sm text-muted hover:border-primary/40"
          >
            <Search size={16} />
            Search the catalog — headphones, laptops, cameras, watches...
          </button>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
