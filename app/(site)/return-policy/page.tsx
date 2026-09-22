import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy",
  alternates: { canonical: "/return-policy" },
};

export default function ReturnPolicyPage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <h1 className="mb-6 text-2xl font-bold text-ink">Cancellation & Refund Policy</h1>
      <div className="flex flex-col gap-5 text-sm leading-relaxed text-muted">
        <p>
          At {siteConfig.name}, we want to ensure a transparent experience for our customers. Please read our
          guidelines below regarding order cancellations and refunds for electronics and accessories.
        </p>
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">Cancellations</h2>
          <p>
            You can cancel your order within 24 hours of purchase or before the order has been shipped, whichever
            is earlier. Once the order is shipped, cancellation is not possible.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">Returns & Replacements</h2>
          <p>
            We offer a 7-day return/replacement window from the date of delivery. Returns are only accepted if the
            product is received in a damaged condition, is defective, or is different from what was ordered. The
            item must be unused and in its original packaging.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">Refund Processing</h2>
          <p>
            Once we receive and inspect your returned item, we will notify you of the approval or rejection of your
            refund. Approved refunds will be processed and automatically credited back to your original payment
            method within 5 to 7 business days (as per standard banking timelines).
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">How to Initiate a Return</h2>
          <p>
            Contact us at {siteConfig.contact.supportEmail} with your order number to start a cancellation, return,
            or replacement.
          </p>
        </section>
      </div>
    </div>
  );
}
