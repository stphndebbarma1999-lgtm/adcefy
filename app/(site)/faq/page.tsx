import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "FAQ",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    q: "How can I track my order?",
    a: "Use the Track Order page with your order ID and the email or phone number used at checkout.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We support UPI, credit/debit cards, net banking, and Cash on Delivery, subject to availability at checkout.",
  },
  {
    q: "What is your return policy?",
    a: "Most products can be returned within 7 days of delivery in original condition. See our Return Policy for details.",
  },
  {
    q: "Do you ship across India?",
    a: `Yes, ${siteConfig.name} ships across India. Delivery timeframes may vary by location.`,
  },
  {
    q: "How do I contact customer support?",
    a: `Reach us at ${siteConfig.contact.supportEmail}, ${siteConfig.contact.businessHours}.`,
  },
];

export default function FaqPage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <h1 className="mb-6 text-2xl font-bold text-ink">Frequently Asked Questions</h1>
      <div className="flex flex-col divide-y divide-border rounded-xl border border-border">
        {faqs.map((item) => (
          <div key={item.q} className="p-4">
            <p className="text-sm font-semibold text-ink">{item.q}</p>
            <p className="mt-1 text-sm text-muted">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
