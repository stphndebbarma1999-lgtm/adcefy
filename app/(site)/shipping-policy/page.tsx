import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Shipping Policy",
  alternates: { canonical: "/shipping-policy" },
};

export default function ShippingPolicyPage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <h1 className="mb-6 text-2xl font-bold text-ink">Shipping Policy</h1>
      <div className="flex flex-col gap-5 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">Delivery Timeframes</h2>
          <p>
            Standard delivery typically takes {siteConfig.shipping.standardDeliveryDays} business days.
            {siteConfig.shipping.expressEnabled &&
              ` Express delivery is available in select locations within ${siteConfig.shipping.expressDeliveryDays} business days.`}
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">Shipping Charges</h2>
          <p>
            Orders above {formatPrice(siteConfig.shipping.freeShippingThresholdInPaise / 100)} ship free. Orders
            below this amount incur a flat shipping fee of {formatPrice(siteConfig.shipping.defaultFeeInPaise / 100)}.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">Order Tracking</h2>
          <p>
            Once your order ships, you can check its status anytime from the{" "}
            <a href="/track-order" className="text-primary hover:underline">
              Track Order
            </a>{" "}
            page.
          </p>
        </section>
      </div>
    </div>
  );
}
