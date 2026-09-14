import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-page py-8">
      <h1 className="mb-2 text-2xl font-bold text-ink">Contact Us</h1>
      <p className="mb-8 max-w-xl text-sm text-muted">
        Have a question about an order or a product? Send us a message and our team will get back to you.
      </p>

      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="lg:w-80">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-ink">Email</p>
                <p className="text-sm text-muted">{siteConfig.contact.supportEmail}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-ink">Business Hours</p>
                <p className="text-sm text-muted">{siteConfig.contact.businessHours}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-ink">Address</p>
                <p className="text-sm text-muted">{siteConfig.contact.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
