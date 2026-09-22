import { siteConfig } from "@/config/site";

/** The registered-business details repeated across About, Privacy, Terms, Shipping and Refund pages. */
export function BusinessInfoBlock() {
  return (
    <div className="flex flex-col gap-1">
      <p>Business Name: {siteConfig.contact.operatedBy}</p>
      <p>Brand / Website: {siteConfig.name}</p>
      <p>GSTIN: {siteConfig.contact.gstin}</p>
      <p className="mt-2">Registered Business Address:</p>
      <p>{siteConfig.contact.address}</p>
      <p className="mt-2">Email: {siteConfig.contact.supportEmail}</p>
      <p>Phone: {siteConfig.contact.supportPhone}</p>
      <p>Website: {siteConfig.domain}</p>
    </div>
  );
}
