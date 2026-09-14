"use client";

import Link from "next/link";
import { Heart, ShoppingCart, User } from "lucide-react";
import { Logo } from "./Logo";
import { AnnouncementBar } from "./AnnouncementBar";
import { useCart } from "@/lib/context/CartContext";
import { useWishlist } from "@/lib/context/WishlistContext";

export function Header() {
  const { itemCount, openCart } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <header className="sticky top-0 z-40 bg-white">
      <AnnouncementBar />
      <div className="border-b border-border">
        <div className="container-page flex h-20 items-center justify-between gap-4 lg:h-24">
          <Logo imageClassName="h-12 w-auto sm:h-14 lg:h-16" />

          <div className="flex items-center gap-1 sm:gap-2">
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
    </header>
  );
}
