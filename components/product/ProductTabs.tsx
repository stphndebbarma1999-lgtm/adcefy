"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { SpecificationTable } from "./SpecificationTable";
import { Rating } from "@/components/ui/Rating";
import { cn } from "@/lib/utils/cn";
import { siteConfig } from "@/config/site";
import { Truck, ShieldCheck } from "lucide-react";

const tabs = ["Description", "Specifications", "Warranty", "Shipping", "Reviews"] as const;
type Tab = (typeof tabs)[number];

export function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState<Tab>("Description");
  const warranty = product.specifications.find((s) => s.label.toLowerCase() === "warranty");

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              "shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
              active === tab ? "border-primary text-primary" : "border-transparent text-muted hover:text-ink"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="py-6">
        {active === "Description" && <p className="max-w-3xl text-sm leading-relaxed text-ink">{product.description}</p>}

        {active === "Specifications" && <SpecificationTable specifications={product.specifications} />}

        {active === "Warranty" && (
          <div className="flex items-start gap-3 text-sm text-ink">
            <ShieldCheck size={20} className="mt-0.5 shrink-0 text-success" />
            <p>{warranty ? warranty.value : "Warranty details are provided with the product packaging."}</p>
          </div>
        )}

        {active === "Shipping" && (
          <div className="flex items-start gap-3 text-sm text-ink">
            <Truck size={20} className="mt-0.5 shrink-0 text-primary" />
            <div>
              <p>
                Standard delivery in {siteConfig.shipping.standardDeliveryDays} business days.
                {siteConfig.shipping.expressEnabled && ` Express delivery available in ${siteConfig.shipping.expressDeliveryDays} business days.`}
              </p>
              <p className="mt-1 text-muted">
                Free shipping on orders over {siteConfig.currencySymbol}
                {siteConfig.shipping.freeShippingThresholdInPaise / 100}.
              </p>
            </div>
          </div>
        )}

        {active === "Reviews" && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-ink">{product.rating.toFixed(1)}</span>
              <div>
                <Rating value={product.rating} />
                <p className="text-xs text-muted">Based on {product.reviewCount.toLocaleString("en-IN")} ratings</p>
              </div>
            </div>
            <p className="text-xs text-muted">Detailed written reviews are not yet available for this demo catalog.</p>
          </div>
        )}
      </div>
    </div>
  );
}
