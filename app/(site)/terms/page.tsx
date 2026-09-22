import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BusinessInfoBlock } from "@/components/legal/BusinessInfoBlock";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <h1 className="mb-1 text-2xl font-bold text-ink">Terms & Conditions</h1>
      <p className="mb-6 text-sm text-muted">Effective Date: 22 September 2026</p>
      <div className="flex flex-col gap-5 text-sm leading-relaxed text-muted">
        <p>
          Welcome to {siteConfig.name}, operated by {siteConfig.contact.operatedBy}. These Terms &amp; Conditions
          govern your use of {siteConfig.domain} and the purchase of products through our website.
        </p>
        <p>
          By accessing or using our website, you agree to these Terms &amp; Conditions. Please read them carefully
          before placing an order.
        </p>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">1. Business Information</h2>
          <BusinessInfoBlock />
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">2. Use of the Website</h2>
          <p>You may use {siteConfig.name} for lawful purposes only.</p>
          <p className="mt-2">You agree not to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Use the website for fraudulent or unlawful activities.</li>
            <li>Attempt to gain unauthorized access to our website, systems or accounts.</li>
            <li>Interfere with the operation or security of the website.</li>
            <li>Submit false, misleading or unauthorized information.</li>
            <li>Use automated methods to interfere with website functionality without our permission.</li>
          </ul>
          <p className="mt-2">
            We reserve the right to restrict or terminate access where we reasonably believe that the website is
            being misused.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">3. Products and Product Information</h2>
          <p>
            We make reasonable efforts to ensure that product descriptions, specifications, images, prices and
            availability displayed on our website are accurate.
          </p>
          <p className="mt-2">However:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Product colours may vary depending on your device display.</li>
            <li>Product specifications may change according to manufacturer updates.</li>
            <li>Product images may be for representation purposes where stated.</li>
            <li>Availability may change without prior notice.</li>
          </ul>
          <p className="mt-2">
            If there is an error in a product listing, we reserve the right to correct the error and, where
            appropriate, contact the customer before fulfilling the order.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">4. Prices and Taxes</h2>
          <p>All product prices will be displayed on the website before you place an order.</p>
          <p className="mt-2">Applicable taxes, shipping charges and other charges, if any, will be displayed during checkout.</p>
          <p className="mt-2">Where applicable, GST will be charged in accordance with applicable tax laws.</p>
          <p className="mt-2">The applicable GSTIN of {siteConfig.contact.operatedBy} is:</p>
          <p className="mt-1 font-semibold text-ink">GSTIN: {siteConfig.contact.gstin}</p>
          <p className="mt-2">
            Prices may be changed at any time without prior notice. A price change will not affect an order that has
            already been successfully confirmed, except where required to correct an obvious pricing or listing
            error.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">5. Orders</h2>
          <p>
            When you place an order through {siteConfig.name}, you are making a request to purchase the selected
            products.
          </p>
          <p className="mt-2">
            After placing an order, you may receive an order confirmation by email, SMS or other available
            communication method.
          </p>
          <p className="mt-2">
            An order is considered accepted by us when we confirm that the order is being processed or dispatched.
          </p>
          <p className="mt-2">We reserve the right to cancel or decline an order in circumstances including:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Product availability issues</li>
            <li>Incorrect product or pricing information</li>
            <li>Suspected fraudulent or unauthorized transactions</li>
            <li>Delivery restrictions</li>
            <li>Technical errors</li>
            <li>Other legitimate business or legal reasons</li>
          </ul>
          <p className="mt-2">
            If we cancel a paid order, the applicable amount will be refunded through the appropriate payment
            method, subject to the applicable payment and refund process.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">6. Payment</h2>
          <p>Payments may be processed through third-party payment service providers.</p>
          <p className="mt-2">You agree to provide accurate payment and billing information when placing an order.</p>
          <p className="mt-2">
            {siteConfig.name} does not request or require customers to share their UPI PIN, banking password, card
            PIN or other confidential payment credentials with us.
          </p>
          <p className="mt-2">
            If a payment is unsuccessful, the order may not be processed until successful payment confirmation is
            received.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">7. Shipping and Delivery</h2>
          <p>Orders are normally processed within 1–2 business days after successful payment and order confirmation.</p>
          <p className="mt-2">Estimated delivery times vary according to the destination and courier service.</p>
          <p className="mt-2">
            For detailed information regarding shipping charges, processing times, delivery estimates, failed
            deliveries and tracking, please refer to our{" "}
            <a href="/shipping-policy" className="text-primary hover:underline">
              Shipping &amp; Delivery Policy
            </a>
            .
          </p>
          <p className="mt-2">Delivery dates are estimates and may be affected by circumstances outside our reasonable control.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">8. Returns, Refunds and Cancellations</h2>
          <p>
            Returns, refunds and cancellations are governed by our{" "}
            <a href="/return-policy" className="text-primary hover:underline">
              Return &amp; Refund Policy
            </a>
            .
          </p>
          <p className="mt-2">Customers should review the Return &amp; Refund Policy before placing an order.</p>
          <p className="mt-2">
            Certain products may have specific return or replacement conditions depending on their type, condition,
            manufacturer warranty or applicable law.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">9. Damaged or Incorrect Products</h2>
          <p>Customers should inspect delivered packages and products as soon as reasonably possible after delivery.</p>
          <p className="mt-2">
            If you receive a damaged, defective or incorrect product, contact us at {siteConfig.contact.supportEmail}{" "}
            with your order details and, where requested, photographs or videos of the product and packaging.
          </p>
          <p className="mt-2">
            We will review the matter and provide an appropriate resolution according to our applicable policies and
            the circumstances of the case.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">10. Manufacturer Warranty</h2>
          <p>
            Where a product is covered by a manufacturer&rsquo;s warranty, the warranty will be subject to the
            manufacturer&rsquo;s applicable terms and conditions.
          </p>
          <p className="mt-2">
            {siteConfig.name} does not replace or modify the manufacturer&rsquo;s warranty unless expressly stated on
            the relevant product page or invoice.
          </p>
          <p className="mt-2">
            Customers may be required to contact the manufacturer or an authorized service centre for
            warranty-related service.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">11. Intellectual Property</h2>
          <p>
            All content on {siteConfig.name}, including text, logos, graphics, photographs, website design, product
            information and other materials, is owned by or licensed to {siteConfig.contact.operatedBy} or its
            respective content providers unless otherwise stated.
          </p>
          <p className="mt-2">
            You may not reproduce, copy, modify, distribute, publish or commercially exploit our website content
            without prior written permission, except where permitted by applicable law.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">12. Third-Party Services and Links</h2>
          <p>
            Our website may use or link to third-party services, including payment gateways, courier services,
            analytics services and other external platforms.
          </p>
          <p className="mt-2">Third-party services operate under their own terms and policies.</p>
          <p className="mt-2">
            We are not responsible for the content, availability, security or policies of third-party websites or
            services.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">13. Limitation of Liability</h2>
          <p>We will make reasonable efforts to keep {siteConfig.name} available and functioning properly.</p>
          <p className="mt-2">
            However, we are not responsible for temporary website unavailability, technical failures, network
            problems, courier delays or other circumstances beyond our reasonable control.
          </p>
          <p className="mt-2">
            Nothing in these Terms &amp; Conditions excludes or limits any liability that cannot legally be excluded
            or limited under applicable law.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">14. Fraud and Unauthorized Transactions</h2>
          <p>We may take reasonable measures to identify and prevent fraudulent or unauthorized transactions.</p>
          <p className="mt-2">
            If we reasonably suspect fraudulent activity, we may delay, restrict or cancel an order and may request
            additional information where appropriate.
          </p>
          <p className="mt-2">
            We may also cooperate with payment providers, logistics providers, authorities or law-enforcement
            agencies where required by law.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">15. Privacy</h2>
          <p>
            Your use of {siteConfig.name} is also governed by our{" "}
            <a href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </a>
            , which explains how we collect, use and protect personal information.
          </p>
          <p className="mt-2">Please review our Privacy Policy before using the website or placing an order.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">16. Changes to These Terms</h2>
          <p>
            We may update these Terms &amp; Conditions from time to time to reflect changes in our website, business,
            services or applicable legal requirements.
          </p>
          <p className="mt-2">The updated version will be published on this page with a revised effective date.</p>
          <p className="mt-2">
            Your continued use of the website after an update constitutes use of the website under the updated
            Terms, subject to applicable law.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">17. Governing Law and Jurisdiction</h2>
          <p>These Terms &amp; Conditions shall be governed by the laws applicable in India.</p>
          <p className="mt-2">
            Subject to applicable law, disputes relating to the website or purchases made through {siteConfig.name}{" "}
            shall be subject to the jurisdiction of the appropriate courts having jurisdiction over the relevant
            matter and location.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">18. Contact Us</h2>
          <p>
            For questions regarding these Terms &amp; Conditions, orders, products or our services, please contact:
          </p>
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
