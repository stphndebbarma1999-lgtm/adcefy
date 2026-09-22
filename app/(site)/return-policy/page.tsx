import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BusinessInfoBlock } from "@/components/legal/BusinessInfoBlock";

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
          Welcome to {siteConfig.name}, operated by {siteConfig.contact.operatedBy}. This Cancellation &amp; Refund
          Policy explains the conditions and process for cancelling orders and requesting refunds for purchases made
          through {siteConfig.domain}.
        </p>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">1. Business Information</h2>
          <BusinessInfoBlock />
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">2. Order Cancellation</h2>
          <p>Customers may request cancellation of an order before the order is dispatched.</p>
          <p className="mt-2">To request cancellation, contact us as soon as possible:</p>
          <p className="mt-2">Email: {siteConfig.contact.supportEmail}</p>
          <p>Phone: {siteConfig.contact.supportPhone}</p>
          <p className="mt-2">
            Cancellation requests should include the order number and the customer&rsquo;s registered contact
            details.
          </p>
          <p className="mt-2">
            Once an order has been dispatched, cancellation may no longer be possible. In such cases, the customer
            may need to follow the applicable return procedure.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">3. Cancellation by {siteConfig.name}</h2>
          <p>{siteConfig.name} may cancel an order in circumstances including:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>The product is unavailable.</li>
            <li>There is an error in product information or pricing.</li>
            <li>The delivery address cannot be serviced.</li>
            <li>Payment has not been successfully confirmed.</li>
            <li>The transaction appears fraudulent or unauthorized.</li>
            <li>Technical or system errors prevent order processing.</li>
            <li>Cancellation is required for legal or regulatory reasons.</li>
          </ul>
          <p className="mt-2">
            If a paid order is cancelled by {siteConfig.name}, the applicable amount will be refunded through the
            original payment method or another appropriate payment method, subject to the payment provider&rsquo;s
            procedures.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">4. Refund Eligibility</h2>
          <p>A refund may be provided where:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>An eligible order is successfully cancelled before dispatch.</li>
            <li>{siteConfig.name} cancels a paid order.</li>
            <li>A returned product is approved for a refund under our Return &amp; Refund Policy.</li>
            <li>The wrong product was delivered and a refund is approved.</li>
            <li>A defective or damaged product is verified and a refund is approved.</li>
            <li>A product cannot be replaced and a refund is agreed upon.</li>
          </ul>
          <p className="mt-2">
            Refund eligibility may depend on the product category, condition, manufacturer warranty and applicable
            law.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">5. Refund Process</h2>
          <p>
            Where a refund is approved, we will initiate the refund after the applicable verification or return
            process has been completed.
          </p>
          <p className="mt-2">
            For returned products, the product may need to be received and inspected before the refund is
            processed.
          </p>
          <p className="mt-2">
            Refunds will normally be issued to the original payment method used for the transaction, where
            technically possible.
          </p>
          <p className="mt-2">
            The time taken for the refund to appear in the customer&rsquo;s bank account, card account or other
            payment account may vary depending on the payment provider or financial institution.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">6. Refund for Unavailable Products</h2>
          <p>
            If a customer has successfully paid for a product that subsequently becomes unavailable and{" "}
            {siteConfig.name} cannot fulfil the order, the applicable amount paid for that order will be refunded.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">7. Refund for Cancelled Orders</h2>
          <p>
            If an eligible order is cancelled before dispatch and payment has already been received, the applicable
            refund will be initiated after cancellation is confirmed.
          </p>
          <p className="mt-2">
            If the order has already been dispatched, the cancellation may not be processed and the customer may
            need to follow the applicable return process.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">8. Failed Delivery and Return to Origin</h2>
          <p>
            If an order cannot be delivered and is returned to {siteConfig.name} as Return to Origin (RTO), the
            refund, if applicable, will be processed after the shipment is received and the order is reviewed.
          </p>
          <p className="mt-2">
            Where permitted by applicable law and policy, shipping, return or other applicable charges resulting
            from customer-related delivery failure may be deducted from the refundable amount.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">9. Refund for Damaged, Defective or Incorrect Products</h2>
          <p>If you receive a damaged, defective or incorrect product, contact us as soon as possible at:</p>
          <p className="mt-2">Email: {siteConfig.contact.supportEmail}</p>
          <p>Phone: {siteConfig.contact.supportPhone}</p>
          <p className="mt-2">Please provide:</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Order number</li>
            <li>Customer name</li>
            <li>Contact number</li>
            <li>Description of the issue</li>
            <li>Photographs or videos of the product and packaging, where requested</li>
          </ul>
          <p className="mt-2">
            We will review the issue and may arrange a replacement, repair, refund or other appropriate resolution
            depending on the circumstances.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">10. Refund for Duplicate or Failed Payments</h2>
          <p>
            If your bank or payment provider shows a successful payment but the order was not successfully created,
            please contact us with the payment reference or transaction details.
          </p>
          <p className="mt-2">We will verify the transaction and, where applicable, process the refund.</p>
          <p className="mt-2">The time taken for such refunds may depend on the payment gateway, bank or financial institution.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">11. Non-Refundable Situations</h2>
          <p>A refund may not be available where:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>The customer has damaged the product after delivery.</li>
            <li>The product has been modified or repaired by an unauthorized person.</li>
            <li>The product has been misused or improperly handled.</li>
            <li>Required accessories or components are missing because of customer handling.</li>
            <li>A return request is made outside the applicable return period.</li>
            <li>The issue is caused by normal wear and tear.</li>
            <li>The product is specifically identified as non-returnable, subject to applicable law.</li>
          </ul>
          <p className="mt-2">
            Nothing in this policy is intended to exclude or restrict any rights that cannot legally be excluded or
            restricted.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">12. Payment Gateway and Bank Processing Time</h2>
          <p>
            Once {siteConfig.name} initiates an approved refund, the actual credit time may depend on the payment
            gateway, bank, card issuer or other financial institution.
          </p>
          <p className="mt-2">
            {siteConfig.name} cannot guarantee the exact time required by a third-party financial institution to
            credit the refunded amount.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">13. Cancellation and Refund Contact</h2>
          <p>For cancellation or refund-related questions, please contact:</p>
          <p className="mt-3 font-semibold text-ink">
            {siteConfig.contact.operatedBy} / {siteConfig.name}
          </p>
          <div className="mt-2">
            <BusinessInfoBlock />
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">14. Changes to This Policy</h2>
          <p>{siteConfig.name} may update this Cancellation &amp; Refund Policy from time to time.</p>
        </section>
      </div>
    </div>
  );
}
