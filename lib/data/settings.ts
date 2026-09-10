import type { StoreSettings } from "@/types/settings";
import { siteConfig } from "@/config/site";

export const defaultSettings: StoreSettings = {
  storeName: siteConfig.name,
  logoUrl: siteConfig.logo.url,
  faviconUrl: siteConfig.logo.faviconUrl,
  supportEmail: siteConfig.contact.supportEmail,
  supportPhone: siteConfig.contact.supportPhone,
  address: siteConfig.contact.address,
  defaultShippingFee: siteConfig.shipping.defaultFeeInPaise / 100,
  freeShippingThreshold: siteConfig.shipping.freeShippingThresholdInPaise / 100,
  codEnabled: siteConfig.payments.codEnabled,
  upiEnabled: siteConfig.payments.upiEnabled,
  cardsEnabled: siteConfig.payments.cardsEnabled,
  netBankingEnabled: siteConfig.payments.netBankingEnabled,
  instagram: siteConfig.social.instagram,
  facebook: siteConfig.social.facebook,
  youtube: siteConfig.social.youtube,
};

export function getStoreSettings(): StoreSettings {
  return defaultSettings;
}
