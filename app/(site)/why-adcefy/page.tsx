import type { Metadata } from "next";
import { ShieldCheck, Truck, Headset, BadgePercent } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Why ADCEFY",
  alternates: { canonical: "/why-adcefy" },
};

const reasons = [
  {
    icon: ShieldCheck,
    title: "Bench-tested, every time",
    description: "Every product is checked and packed with care before it ships, not just pulled off a shelf.",
  },
  {
    icon: Truck,
    title: "Fast, tracked delivery",
    description: `Standard delivery in ${siteConfig.shipping.standardDeliveryDays} days, with express options where available.`,
  },
  {
    icon: BadgePercent,
    title: "Honest pricing",
    description: "No inflated MRPs or fake discounts — the price you see is the price you pay.",
  },
  {
    icon: Headset,
    title: "Real support",
    description: "Reach a real person over call or WhatsApp for order help, returns, or product questions.",
  },
];

export default function WhyAdcefyPage() {
  return (
    <div className="container-page py-10">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">Why {siteConfig.name}</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">{siteConfig.tagline}</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {reasons.map((reason) => (
          <div key={reason.title} className="flex gap-4 rounded-xl border border-border p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-ink">
              <reason.icon size={22} />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-ink">{reason.title}</h2>
              <p className="mt-1 text-sm text-muted">{reason.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
