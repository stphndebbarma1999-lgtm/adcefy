import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Heart, Package, User } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "My Account",
  alternates: { canonical: "/account" },
};

const links = [
  { href: "/account/orders", label: "My Orders", icon: Package, description: "Track and manage your orders" },
  { href: "/wishlist", label: "Wishlist", icon: Heart, description: "Items you've saved for later" },
  { href: "/account", label: "Addresses", icon: MapPin, description: "Manage your saved addresses" },
];

export default function AccountPage() {
  return (
    <div className="container-page py-8">
      <div className="mb-8 flex flex-col items-center gap-3 rounded-xl border border-border bg-surface-muted px-6 py-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
          <User size={26} />
        </span>
        <div>
          <h1 className="text-lg font-bold text-ink">You&apos;re not logged in</h1>
          <p className="text-sm text-muted">Log in to view your orders, wishlist and saved addresses.</p>
        </div>
        <Button href="/login">Log In</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="flex flex-col gap-2 rounded-xl border border-border p-5 transition-colors hover:border-primary/40 hover:bg-primary-light"
          >
            <link.icon size={22} className="text-primary" />
            <span className="text-sm font-semibold text-ink">{link.label}</span>
            <span className="text-xs text-muted">{link.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
