import { Truck, RefreshCcw, ShieldCheck, Headset } from "lucide-react";
import { siteConfig } from "@/config/site";

const benefits = [
  {
    icon: Truck,
    color: "text-primary bg-primary-light",
    title: "Free Shipping",
    subtitle: `On orders over ${siteConfig.currencySymbol}${siteConfig.shipping.freeShippingThresholdInPaise / 100}`,
  },
  {
    icon: RefreshCcw,
    color: "text-success bg-green-50",
    title: "Easy Returns",
    subtitle: "7-day return policy",
  },
  {
    icon: ShieldCheck,
    color: "text-accent-purple bg-purple-50",
    title: "Secure Checkout",
    subtitle: "100% secure payment",
  },
  {
    icon: Headset,
    color: "text-accent-orange bg-orange-50",
    title: "24/7 Support",
    subtitle: "We're here to help",
  },
];

export function BenefitsStrip() {
  return (
    <section className="border-y border-border bg-white">
      <div className="container-page grid grid-cols-2 gap-6 py-6 lg:grid-cols-4">
        {benefits.map((b) => (
          <div key={b.title} className="flex items-center gap-3">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${b.color}`}>
              <b.icon size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{b.title}</p>
              <p className="text-xs text-muted">{b.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
