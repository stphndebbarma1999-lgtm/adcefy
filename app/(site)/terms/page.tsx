import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <h1 className="mb-6 text-2xl font-bold text-ink">Terms & Conditions</h1>
      <div className="flex flex-col gap-5 text-sm leading-relaxed text-muted">
        <p>
          By accessing or using {siteConfig.domain}, you agree to be bound by these Terms & Conditions. Please read
          them carefully before placing an order.
        </p>
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">Orders & Pricing</h2>
          <p>
            All prices are listed in Indian Rupees (₹) and are subject to change without notice. We reserve the
            right to refuse or cancel any order at our discretion, including in cases of pricing errors or
            suspected fraud.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">Product Information</h2>
          <p>
            We make every effort to display product details, specifications and images accurately. Minor
            variations between the product image and the item received may occur.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">Limitation of Liability</h2>
          <p>
            {siteConfig.name} is not liable for indirect or consequential damages arising from the use of our
            products or website.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">Governing Law</h2>
          <p>These terms are governed by the laws of India.</p>
        </section>
      </div>
    </div>
  );
}
