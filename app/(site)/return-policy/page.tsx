import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Return Policy",
  alternates: { canonical: "/return-policy" },
};

export default function ReturnPolicyPage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <h1 className="mb-6 text-2xl font-bold text-ink">Return Policy</h1>
      <div className="flex flex-col gap-5 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">7-Day Return Window</h2>
          <p>
            Most products can be returned within 7 days of delivery, provided they are unused, in their original
            packaging, and accompanied by all accessories and manuals.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">Non-Returnable Items</h2>
          <p>
            For hygiene reasons, certain accessories (e.g. earbuds, screen protectors once applied) may not be
            eligible for return unless defective.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">Refunds</h2>
          <p>
            Once we receive and inspect your returned item, refunds are processed to your original payment method
            within 5–7 business days.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">How to Initiate a Return</h2>
          <p>
            Contact us at {siteConfig.contact.supportEmail} with your order number to start a return or exchange.
          </p>
        </section>
      </div>
    </div>
  );
}
