import { Flame, Truck } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function AnnouncementBar() {
  return (
    <div className="hidden bg-dark text-white sm:block">
      <div className="container-page flex h-9 items-center justify-between text-xs">
        <p className="flex items-center gap-1.5">
          <Flame size={14} className="text-orange-400" />
          Summer Sale is Live! Get up to 60% off on selected items.{" "}
          <Link href="/mobile" className="ml-1 font-medium text-blue-300 hover:text-blue-200 hover:underline">
            Shop Now →
          </Link>
        </p>
        <p className="flex items-center gap-1.5 text-white/80">
          <Truck size={14} />
          Free shipping on orders over {siteConfig.currencySymbol}
          {siteConfig.shipping.freeShippingThresholdInPaise / 100}
        </p>
      </div>
    </div>
  );
}
