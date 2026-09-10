import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Heart, Package, LogOut, User } from "lucide-react";
import { getCustomers } from "@/lib/data/customers";
import { formatDate } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "My Account",
  alternates: { canonical: "/account" },
};

const links = [
  { href: "/account/orders", label: "My Orders", icon: Package, description: "Track and manage your orders" },
  { href: "/wishlist", label: "Wishlist", icon: Heart, description: "Items you've saved for later" },
  { href: "/account", label: "Addresses", icon: MapPin, description: "Manage your saved addresses" },
  { href: "/login", label: "Log Out", icon: LogOut, description: "Sign out of your account" },
];

export default function AccountPage() {
  const [customer] = getCustomers();

  return (
    <div className="container-page py-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
          <User size={26} />
        </span>
        <div>
          <h1 className="text-xl font-bold text-ink">{customer.name}</h1>
          <p className="text-sm text-muted">
            {customer.email} · Joined {formatDate(customer.createdAt)}
          </p>
        </div>
      </div>

      <p className="mb-6 rounded-lg bg-primary-light px-4 py-2 text-xs text-primary">
        Showing demo account data — sign-in is not yet connected to a live backend.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
