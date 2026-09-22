import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  alternates: { canonical: "/shipping-policy" },
};

export default function ShippingPolicyPage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <h1 className="mb-6 text-2xl font-bold text-ink">Shipping & Delivery Policy</h1>
      <div className="flex flex-col gap-5 text-sm leading-relaxed text-muted">
        <p>
          Welcome to {siteConfig.name} (accessible via {siteConfig.domain}). We are committed to delivering your
          tech gadgets, mobiles, laptops, and accessories safely and efficiently across India. Please review our
          operational shipping guidelines below.
        </p>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">1. Shipping Charges</h2>
          <p>
            Orders Over {formatPrice(siteConfig.shipping.freeShippingThresholdInPaise / 100)}: We offer 100% Free
            Standard Shipping on all orders with a cart value exceeding{" "}
            {formatPrice(siteConfig.shipping.freeShippingThresholdInPaise / 100)}.
          </p>
          <p className="mt-2">
            Orders Under {formatPrice(siteConfig.shipping.freeShippingThresholdInPaise / 100)}: A nominal flat
            shipping fee will be calculated and displayed at the checkout page based on the delivery location.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">2. Processing and Dispatch Timelines</h2>
          <p>
            Order Processing: All orders are processed, quality-checked, and packaged securely within 1 to 2
            business days of receiving order confirmation.
          </p>
          <p className="mt-2">
            Dispatch Notification: Once your package leaves our fulfillment unit, you will receive a tracking link
            via your registered email address and phone number to monitor your shipment in real-time.
          </p>
          <p className="mt-2">Holidays: Orders are not processed or dispatched on Sundays or national/public holidays.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">3. Estimated Delivery Timelines</h2>
          <p>Delivery times depend strictly on your geographic location in India. Our typical transit frames are as follows:</p>
          <p className="mt-2">Metro & Tier-1 Cities: 3 to 5 business days post-dispatch.</p>
          <p className="mt-2">Tier-2 & Tier-3 Cities: 4 to 7 business days post-dispatch.</p>
          <p className="mt-2">Northeast India, J&amp;K, and Remote Regions: 5 to 9 business days post-dispatch.</p>
          <p className="mt-2">
            Please note: External disruptions such as extreme weather events, local lockdowns, or high-volume
            festive seasons may cause unforeseen delays with our logistics providers.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">4. Logistics and Courier Partners</h2>
          <p>
            To ensure your premium electronics arrive safely, {siteConfig.name} partners with India&rsquo;s leading,
            highly trusted national courier services. Your order may be shipped via Blue Dart, Delhivery, Xpressbees,
            DTDC, or India Post depending on regional optimization.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">5. Delivery Verification and Transit Damage</h2>
          <p>
            Secure Delivery: High-value items (like mobile phones and laptops) require an OTP or a physical
            signature upon delivery to prevent theft.
          </p>
          <p className="mt-2">
            Damaged Packaging: If you notice that the shipping box or tamper-evident seal is heavily broken or open
            at the time of delivery, please refuse to accept the package from the courier agent and report it
            immediately to {siteConfig.contact.supportEmail}.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">6. Address Corrections and Undelivered Shipments</h2>
          <p>
            Incorrect Address: Customers are responsible for providing correct and complete delivery addresses
            (including PIN codes and active contact numbers). If an item is returned to us due to an incorrect or
            incomplete address provided by you, re-shipping charges will apply.
          </p>
          <p className="mt-2">
            Failed Delivery Attempts: Our courier partners will attempt delivery up to three times before marking a
            shipment as a Return to Origin (RTO).
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">7. Contact Information</h2>
          <p>
            For any assistance regarding order transit, tracking, or delayed shipments, please get in touch with
            our customer care division:
          </p>
          <p className="mt-2">Registered Address: {siteConfig.contact.address}</p>
          <p className="mt-2">Support Email: {siteConfig.contact.supportEmail}</p>
          <p className="mt-2">Customer Support No.: {siteConfig.contact.supportPhone}</p>
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
