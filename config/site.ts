/**
 * Central site configuration.
 * Every brand-specific value used across the app should be read from here —
 * never hardcode the store name, domain, or contact details in components.
 */
export const siteConfig = {
  name: "ADCEFY",
  legalName: "ADCEFY",
  domain: "adcefy.com",
  url: "https://adcefy.com",
  tagline: "Latest Technology. Better Prices.",
  description:
    "Shop mobiles, laptops, gadgets, accessories and computer products at ADCEFY — India's trusted electronics store.",

  currency: "INR",
  currencySymbol: "₹",
  locale: "en-IN",

  logo: {
    // Configurable logo URL. Empty string falls back to the text wordmark.
    url: "/logo.png",
    faviconUrl: "/favicon.ico",
  },

  contact: {
    operatedBy: "A.D. Computer Enterprise",
    supportEmail: "contact@adcefy.com",
    supportPhone: "+91 7005212711",
    whatsapp: "+91 9366026432",
    address: "Mandwi Bazaar, Mandwi Composite Market, Room No. 73, First Floor, West Tripura, 799045",
    businessHours: "Mon–Sat, 9:00 AM – 7:00 PM IST",
  },

  social: {
    instagram: "https://instagram.com/adcefy",
    facebook: "https://facebook.com/adcefy",
    youtube: "https://youtube.com/@adcefy",
  },

  shipping: {
    defaultFeeInPaise: 9900, // ₹99
    freeShippingThresholdInPaise: 99900, // ₹999
    standardDeliveryDays: "4-7",
    expressDeliveryDays: "1-2",
    expressEnabled: true,
  },

  payments: {
    codEnabled: true,
    upiEnabled: true,
    cardsEnabled: true,
    netBankingEnabled: true,
  },

  seo: {
    defaultTitle: "ADCEFY | Mobiles, Laptops, Gadgets & Electronics Online",
    titleTemplate: "%s | ADCEFY",
    keywords: [
      "ADCEFY",
      "electronics online",
      "buy mobile online",
      "laptop online india",
      "gadgets online",
      "computer accessories",
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
