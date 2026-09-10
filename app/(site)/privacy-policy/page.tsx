import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <h1 className="mb-6 text-2xl font-bold text-ink">Privacy Policy</h1>
      <div className="flex flex-col gap-5 text-sm leading-relaxed text-muted">
        <p>
          {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains what
          information we collect when you use {siteConfig.domain}, how we use it, and the choices you have.
        </p>
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">Information We Collect</h2>
          <p>
            We collect information you provide directly, such as your name, email, phone number and shipping
            address when you place an order, create an account, or contact support. We also collect basic usage
            data (pages visited, device type) to improve the store experience.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">How We Use Your Information</h2>
          <p>
            We use your information to process orders, provide customer support, send order updates, and improve
            our products and services. We do not sell your personal information to third parties.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">Payment Information</h2>
          <p>
            We never store your card number, CVV, or other sensitive payment details on our servers. Payments are
            processed through secure third-party payment gateways.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">Contact Us</h2>
          <p>
            For privacy-related questions, email us at {siteConfig.contact.supportEmail}.
          </p>
        </section>
      </div>
    </div>
  );
}
