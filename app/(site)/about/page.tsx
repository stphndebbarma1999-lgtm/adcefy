import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BusinessInfoBlock } from "@/components/legal/BusinessInfoBlock";

export const metadata: Metadata = {
  title: "About Us",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <h1 className="mb-6 text-2xl font-bold text-ink">About Us</h1>
      <div className="flex flex-col gap-5 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">Welcome to {siteConfig.name}</h2>
          <p>
            {siteConfig.name} is an online electronics and technology store operated by{" "}
            {siteConfig.contact.operatedBy}, based in West Tripura, India.
          </p>
          <p className="mt-2">
            We provide a range of technology products, including mobile phones, laptops, computer accessories,
            electronic gadgets, wireless headphones and other consumer electronics.
          </p>
          <p className="mt-2">
            Our goal is to make technology products easily accessible to customers through a convenient and reliable
            online shopping experience.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">What We Offer</h2>
          <p>At {siteConfig.name}, customers can browse and purchase technology products through our online store. We aim to provide:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Mobile phones and accessories</li>
            <li>Laptops and computer products</li>
            <li>Headphones and audio accessories</li>
            <li>Electronic gadgets</li>
            <li>Computer accessories</li>
            <li>Other technology and consumer electronic products</li>
          </ul>
          <p className="mt-2">
            Product availability, specifications, pricing and delivery information are displayed on the respective
            product pages.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">Our Commitment</h2>
          <p>
            We focus on providing customers with a straightforward shopping experience, clear product information
            and secure order processing.
          </p>
          <p className="mt-2">
            We carefully pack products before dispatch and provide available shipment tracking information after an
            order is shipped.
          </p>
          <p className="mt-2">
            We also maintain clear policies regarding shipping, returns, refunds, privacy and terms of service so
            that customers can understand the conditions of their purchases before placing an order.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">Our Business Information</h2>
          <BusinessInfoBlock />
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">Customer Support</h2>
          <p>
            If you have questions about our products, orders, shipping, returns or refunds, you can contact our
            customer support team using the contact details provided above.
          </p>
          <p className="mt-2">
            We aim to respond to customer enquiries and provide appropriate assistance regarding orders and
            purchases.
          </p>
        </section>

        <p>Thank you for choosing {siteConfig.name}.</p>
      </div>
    </div>
  );
}
