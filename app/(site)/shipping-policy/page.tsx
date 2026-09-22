import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/utils/format";
import { BusinessInfoBlock } from "@/components/legal/BusinessInfoBlock";

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
          Welcome to {siteConfig.name}, operated by {siteConfig.contact.operatedBy}. This Shipping &amp; Delivery
          Policy explains how orders placed through {siteConfig.domain} are processed, shipped and delivered.
        </p>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">1. Business Information</h2>
          <BusinessInfoBlock />
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">2. Shipping Charges</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Orders above {formatPrice(siteConfig.shipping.freeShippingThresholdInPaise / 100)}: Standard shipping
              is free.
            </li>
            <li>
              Orders below {formatPrice(siteConfig.shipping.freeShippingThresholdInPaise / 100)}: Applicable
              shipping charges will be calculated and displayed at checkout before payment.
            </li>
          </ul>
          <p className="mt-2">
            Any applicable shipping charges will be clearly shown before the customer completes the order.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">3. Order Processing and Dispatch</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Orders are normally processed within 1–2 business days after successful payment and order confirmation.</li>
            <li>Products may be inspected and securely packaged before dispatch.</li>
            <li>
              Once an order has been dispatched, available tracking information will be provided to the customer
              through the contact details provided during checkout.
            </li>
            <li>Orders are generally not processed or dispatched on Sundays and public holidays.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">4. Estimated Delivery Time</h2>
          <p>Estimated delivery time after dispatch is generally:</p>
          <div className="mt-3 overflow-hidden rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-muted text-ink">
                <tr>
                  <th className="px-3 py-2 font-semibold">Delivery Location</th>
                  <th className="px-3 py-2 font-semibold">Estimated Delivery</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-3 py-2">Metro &amp; Tier-1 Cities</td>
                  <td className="px-3 py-2">3–5 business days</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Tier-2 &amp; Tier-3 Cities</td>
                  <td className="px-3 py-2">4–7 business days</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Northeast India, J&amp;K &amp; Remote Locations</td>
                  <td className="px-3 py-2">5–9 business days</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3">These are estimated delivery periods and are not guaranteed delivery dates.</p>
          <p className="mt-2">
            Delivery may take longer due to circumstances outside our reasonable control, including adverse weather,
            transportation disruptions, natural events, public holidays, high order volumes, courier delays or
            restrictions affecting certain locations.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">5. Courier and Logistics Partners</h2>
          <p>
            Orders may be shipped through third-party courier and logistics providers depending on the delivery
            location, product and availability.
          </p>
          <p className="mt-2">Our delivery partners may include:</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Delhivery</li>
            <li>Blue Dart</li>
            <li>DTDC</li>
            <li>Xpressbees</li>
            <li>India Post</li>
            <li>Other suitable logistics providers</li>
          </ul>
          <p className="mt-2">The courier partner may vary depending on the order and delivery location.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">6. Delivery Verification</h2>
          <p>
            For certain high-value products, the courier partner may require an OTP, signature or other delivery
            verification.
          </p>
          <p className="mt-2">
            Customers should provide the required information to the authorized delivery person to complete
            delivery.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">7. Damaged or Tampered Packages</h2>
          <p>Customers are advised to inspect the external packaging at the time of delivery.</p>
          <p className="mt-2">
            If the package appears severely damaged, opened or tampered with, customers should, where possible,
            refuse delivery and contact us immediately at:
          </p>
          <p className="mt-2">Email: {siteConfig.contact.supportEmail}</p>
          <p>Phone: {siteConfig.contact.supportPhone}</p>
          <p className="mt-2">
            If a damaged package is accepted, customers should contact us as soon as possible and provide
            photographs or videos of the package and product when requested.
          </p>
          <p className="mt-2">
            We will review the matter and provide an appropriate resolution in accordance with our{" "}
            <a href="/return-policy" className="text-primary hover:underline">
              Return &amp; Refund Policy
            </a>{" "}
            and applicable law.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">8. Incorrect or Incomplete Address</h2>
          <p>Customers are responsible for providing an accurate and complete delivery address, including:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Full name</li>
            <li>House/building information</li>
            <li>Street/locality</li>
            <li>City</li>
            <li>State</li>
            <li>PIN code</li>
            <li>Valid phone number</li>
          </ul>
          <p className="mt-2">
            {siteConfig.name} is not responsible for delivery delays or failed deliveries resulting from an
            incorrect or incomplete address provided by the customer.
          </p>
          <p className="mt-2">
            If an order is returned to us because of an incorrect or incomplete address, additional shipping charges
            may apply if the customer requests re-delivery.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">9. Failed Delivery and Return to Origin</h2>
          <p>Our courier partner may make multiple delivery attempts.</p>
          <p className="mt-2">
            If delivery cannot be completed after the applicable delivery attempts, the shipment may be returned to{" "}
            {siteConfig.name} as Return to Origin (RTO).
          </p>
          <p className="mt-2">
            If an order is returned because of an incorrect address, customer unavailability or refusal to accept
            the package, any applicable re-shipping charges or refund deductions will be handled according to our{" "}
            <a href="/return-policy" className="text-primary hover:underline">
              Return &amp; Refund Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">10. Delivery Delays</h2>
          <p>
            Although we make reasonable efforts to process and dispatch orders within the stated processing period,
            delivery may be delayed because of circumstances outside our control.
          </p>
          <p className="mt-2">
            If your order is significantly delayed, please contact our customer support team with your order number
            so that we can check the shipment status with the courier provider.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">11. Order Tracking</h2>
          <p>Once your order has been dispatched, tracking information will be provided where available.</p>
          <p className="mt-2">
            Customers can also check their order status through our{" "}
            <a href="/track-order" className="text-primary hover:underline">
              Track Order
            </a>{" "}
            page.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">12. Delivery Areas</h2>
          <p>
            We generally provide delivery services across India, subject to courier availability and serviceability
            of the customer&rsquo;s PIN code.
          </p>
          <p className="mt-2">
            Certain remote or restricted locations may have limited delivery availability or longer delivery times.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">13. Contact Us</h2>
          <p>For questions regarding shipping, delivery, tracking or delayed orders, please contact:</p>
          <p className="mt-3 font-semibold text-ink">
            {siteConfig.contact.operatedBy} / {siteConfig.name}
          </p>
          <div className="mt-2">
            <BusinessInfoBlock />
          </div>
        </section>
      </div>
    </div>
  );
}
