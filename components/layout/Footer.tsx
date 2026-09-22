import Link from "next/link";
import { Camera, Mail, MapPin, Users, PlaySquare } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getCategories } from "@/lib/data/categories";
import { Logo } from "./Logo";

const categories = getCategories();

const customerServiceLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Track Order", href: "/track-order" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Return Policy", href: "/return-policy" },
  { label: "FAQ", href: "/faq" },
];

const accountLinks = [
  { label: "My Account", href: "/account" },
  { label: "My Orders", href: "/account/orders" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Cart", href: "/cart" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Return Policy", href: "/return-policy" },
];

function gmailComposeUrl(email: string) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-dark pb-16 sm:pb-0">
      <div className="container-page grid grid-cols-2 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="col-span-2 flex flex-col gap-4 lg:col-span-1">
          <Logo imageClassName="h-12 w-auto" />
          <p className="text-sm text-white/70">{siteConfig.description}</p>
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-lg border border-white/20 p-2 text-white/70 hover:text-primary"
            >
              <Camera size={16} />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="rounded-lg border border-white/20 p-2 text-white/70 hover:text-primary"
            >
              <Users size={16} />
            </a>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="rounded-lg border border-white/20 p-2 text-white/70 hover:text-primary"
            >
              <PlaySquare size={16} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">Shop</h3>
          <ul className="flex flex-col gap-2.5">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/${c.slug}`} className="text-sm text-white/70 hover:text-primary">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">Customer Service</h3>
          <ul className="flex flex-col gap-2.5">
            {customerServiceLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/70 hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">Account</h3>
          <ul className="flex flex-col gap-2.5">
            {accountLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/70 hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <h3 className="mb-4 text-sm font-semibold text-white">Get in Touch</h3>
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-2 text-sm text-white/70">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              {siteConfig.contact.address}
            </li>
            <li>
              <a
                href={gmailComposeUrl(siteConfig.contact.supportEmail)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-primary"
              >
                <Mail size={16} className="shrink-0" />
                {siteConfig.contact.supportEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <p className="text-xs text-white/70">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {policyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-xs text-white/70 hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
