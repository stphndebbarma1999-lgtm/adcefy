import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BusinessInfoBlock } from "@/components/legal/BusinessInfoBlock";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <h1 className="mb-1 text-2xl font-bold text-ink">Privacy Policy</h1>
      <p className="mb-6 text-sm text-muted">Effective Date: 22 September 2026</p>
      <div className="flex flex-col gap-5 text-sm leading-relaxed text-muted">
        <p>
          Welcome to {siteConfig.name}, an online electronics and technology store operated by{" "}
          {siteConfig.contact.operatedBy} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;).
        </p>
        <p>
          This Privacy Policy explains how we collect, use, store and protect information when you visit or make a
          purchase through {siteConfig.domain}.
        </p>
        <p>By using our website, you acknowledge that you have read and understood this Privacy Policy.</p>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">1. Business Information</h2>
          <BusinessInfoBlock />
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">2. Information We Collect</h2>
          <p>When you use our website or place an order, we may collect information necessary to provide our services.</p>
          <p className="mt-2">This may include:</p>

          <p className="mt-3 font-semibold text-ink">Personal Information</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Full name</li>
            <li>Billing and delivery address</li>
            <li>Phone number</li>
            <li>Email address</li>
            <li>Information provided when contacting customer support</li>
          </ul>

          <p className="mt-3 font-semibold text-ink">Order Information</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Products purchased</li>
            <li>Order number</li>
            <li>Order date</li>
            <li>Order amount</li>
            <li>Delivery and billing information</li>
            <li>Shipping and tracking information</li>
          </ul>

          <p className="mt-3 font-semibold text-ink">Payment Information</p>
          <p className="mt-1">Payments may be processed through third-party payment service providers.</p>
          <p className="mt-2">
            We generally do not store your complete debit card, credit card, banking or UPI credentials on our own
            systems. Payment information may be processed directly by the applicable payment gateway according to
            its own privacy and security policies.
          </p>

          <p className="mt-3 font-semibold text-ink">Technical Information</p>
          <p className="mt-1">
            When you visit our website, certain technical information may be automatically collected, such as:
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device type</li>
            <li>Operating system</li>
            <li>Pages visited</li>
            <li>Website activity</li>
            <li>Date and time of visits</li>
            <li>Referring website or source</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">3. How We Use Your Information</h2>
          <p>We may use collected information to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Process and fulfil your orders</li>
            <li>Confirm payments and orders</li>
            <li>Arrange product delivery</li>
            <li>Provide shipment tracking</li>
            <li>Communicate with you about your orders</li>
            <li>Respond to customer support enquiries</li>
            <li>Process returns, refunds and cancellations</li>
            <li>Improve our website, products and services</li>
            <li>Detect and prevent fraudulent or unauthorized transactions</li>
            <li>Maintain business and transaction records</li>
            <li>Comply with applicable legal, tax and regulatory requirements</li>
          </ul>
          <p className="mt-2">
            We will use personal information only for legitimate business purposes and as permitted by applicable
            law.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">4. Payment Processing</h2>
          <p>Payments made through {siteConfig.name} may be processed by third-party payment service providers.</p>
          <p className="mt-2">
            We do not intend to store complete payment credentials such as full card numbers, CVV numbers, banking
            passwords or UPI PINs on our website.
          </p>
          <p className="mt-2">
            Customers should enter payment information only through the secure payment interface provided during
            checkout.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">5. Cookies and Similar Technologies</h2>
          <p>{siteConfig.name} may use cookies and similar technologies to help operate and improve the website.</p>
          <p className="mt-2">Cookies may be used to:</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Keep the website functioning properly</li>
            <li>Remember certain preferences</li>
            <li>Maintain shopping-cart functionality</li>
            <li>Understand website usage</li>
            <li>Improve website performance and user experience</li>
          </ul>
          <p className="mt-2">
            You may be able to control or disable cookies through your browser settings. Disabling certain cookies
            may affect some website functionality.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">6. Sharing of Information</h2>
          <p>We may share necessary information with trusted third parties when required to provide our services.</p>
          <p className="mt-2">These may include:</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Payment gateway and payment service providers</li>
            <li>Courier and logistics companies</li>
            <li>Website hosting and technology service providers</li>
            <li>Customer-support service providers</li>
            <li>Fraud-prevention or security service providers</li>
            <li>Government authorities, regulators or law-enforcement agencies when legally required</li>
          </ul>
          <p className="mt-2">We share only information reasonably necessary for the relevant purpose.</p>
          <p className="mt-2">
            We do not intend to sell customers&rsquo; personal information to third parties for their independent
            marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">7. Courier and Delivery Information</h2>
          <p>
            To deliver your order, we may provide necessary customer information to the applicable logistics or
            courier provider.
          </p>
          <p className="mt-2">This may include your:</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Name</li>
            <li>Delivery address</li>
            <li>Phone number</li>
            <li>Order details</li>
          </ul>
          <p className="mt-2">This information is used for order delivery, tracking and related logistics services.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">8. Data Security</h2>
          <p>
            We take reasonable measures to protect personal information against unauthorized access, misuse,
            alteration, disclosure or destruction.
          </p>
          <p className="mt-2">
            However, no internet transmission or electronic storage system can be guaranteed to be completely
            secure.
          </p>
          <p className="mt-2">
            Customers should also take reasonable precautions, including keeping their account credentials and
            payment information confidential.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">9. Data Retention</h2>
          <p>We retain personal and transaction information for as long as reasonably necessary to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Provide our services</li>
            <li>Complete orders and customer support</li>
            <li>Maintain business and financial records</li>
            <li>Meet accounting, tax and legal obligations</li>
            <li>Resolve disputes</li>
            <li>Prevent fraud and misuse</li>
          </ul>
          <p className="mt-2">
            When information is no longer required for legitimate business or legal purposes, it may be deleted or
            securely disposed of, subject to applicable legal requirements.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">10. Third-Party Websites and Services</h2>
          <p>
            Our website may contain links to third-party websites, payment services, courier tracking services or
            other external services.
          </p>
          <p className="mt-2">Those third parties operate under their own terms and privacy policies.</p>
          <p className="mt-2">
            {siteConfig.name} is not responsible for the privacy practices or content of third-party websites or
            services.
          </p>
          <p className="mt-2">Customers should review the applicable privacy policies before providing information to third parties.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">11. Children&rsquo;s Privacy</h2>
          <p>Our website is intended for general consumers and is not specifically directed toward children.</p>
          <p className="mt-2">
            We do not knowingly request or collect personal information from children where prohibited by applicable
            law.
          </p>
          <p className="mt-2">
            If a parent or legal guardian believes that a child has provided personal information to us, they may
            contact us so that we can review and take appropriate action.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">12. Your Privacy Rights</h2>
          <p>Depending on applicable law, you may have rights regarding your personal information, including the right to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Request information about personal data we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of information where legally permitted</li>
            <li>Withdraw consent where processing is based on consent</li>
            <li>Raise a privacy-related complaint or concern</li>
          </ul>
          <p className="mt-2">
            Some requests may be subject to legal, regulatory, contractual or record-keeping requirements.
          </p>
          <p className="mt-2">To make a privacy-related request, contact us using the details provided below.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">13. Marketing Communications</h2>
          <p>
            If we send promotional or marketing communications, you may request to stop receiving such
            communications.
          </p>
          <p className="mt-2">
            Transactional communications, such as order confirmations, payment notifications, shipping updates,
            refund information and important service messages, may still be sent when necessary to provide our
            services.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">14. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our business, website,
            services or applicable legal requirements.
          </p>
          <p className="mt-2">Any updated version will be published on this page with a revised effective date.</p>
          <p className="mt-2">Customers are encouraged to review this page periodically.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">15. Contact Us</h2>
          <p>
            If you have questions, concerns or requests regarding this Privacy Policy or the handling of your
            personal information, please contact us:
          </p>
          <p className="mt-3 font-semibold text-ink">
            {siteConfig.contact.operatedBy} / {siteConfig.name}
          </p>
          <div className="mt-2">
            <BusinessInfoBlock />
          </div>
          <p className="mt-3">We will make reasonable efforts to review and respond to privacy-related enquiries.</p>
        </section>
      </div>
    </div>
  );
}
