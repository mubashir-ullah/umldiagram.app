import { SITE_URL } from "./config";
import { HOME_FEATURES } from "./home-content";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export interface OrganizationSchema {
  "@context": string;
  "@type": string;
  "@id": string;
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs?: string[];
}

export interface WebSiteSchema {
  "@context": string;
  "@type": string;
  "@id": string;
  name: string;
  url: string;
  description: string;
  publisher: { "@id": string };
}

export interface SoftwareApplicationSchema {
  "@context": string;
  "@type": string;
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    "@type": string;
    price: string;
    priceCurrency: string;
  };
  description: string;
  url: string;
  featureList: string[];
}

export interface BreadcrumbListSchema {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    item: string;
  }>;
}

export interface ArticleSchema {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  author: {
    "@type": string;
    name: string;
  };
  publisher: {
    "@type": string;
    name: string;
    logo: {
      "@type": string;
      url: string;
    };
  };
  mainEntityOfPage: {
    "@type": string;
    "@id": string;
  };
}

export interface HowToSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  step: Array<{
    "@type": string;
    name: string;
    text: string;
  }>;
}

export interface FAQPageSchema {
  "@context": string;
  "@type": string;
  mainEntity: Array<{
    "@type": string;
    name: string;
    acceptedAnswer: {
      "@type": string;
      text: string;
    };
  }>;
}

export interface CollectionPageSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
}

export function getOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "UML Diagram Studio",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: "Free online UML diagram tool for creating professional class, sequence, activity, and use case diagrams.",
    sameAs: [
      "https://github.com/mubashir-ullah/UML-Diagram-Studio",
    ],
  };
}

export function getWebSiteSchema(): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "UML Diagram Studio",
    url: SITE_URL,
    description: "Free online UML diagram tool for creating professional diagrams.",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function getSoftwareApplicationSchema(overrides?: {
  name?: string;
  description?: string;
  url?: string;
  featureList?: string[];
}): SoftwareApplicationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: overrides?.name ?? "UML Diagram Studio",
    applicationCategory: "WebApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      overrides?.description ??
      "Free online UML diagram tool. Create class diagrams, sequence diagrams, activity diagrams, and more with real-time PlantUML preview.",
    url: overrides?.url ?? SITE_URL,
    featureList: overrides?.featureList ?? [...HOME_FEATURES],
  };
}

export function getBreadcrumbListSchema(
  items: Array<{ name: string; url: string }>
): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getArticleSchema(
  headline: string,
  description: string,
  url: string,
  datePublished: string,
  dateModified: string,
  author: string,
  image?: string
): ArticleSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: image || `${SITE_URL}/og-image.png`,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "UML Diagram Studio",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function getHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string }>
): HowToSchema {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step) => ({
      "@type": "HowToStep",
      name: step.name,
      text: step.text,
    })),
  };
}

export function getFAQPageSchema(
  faqs: Array<{ question: string; answer: string }>
): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getCollectionPageSchema(
  name: string,
  description: string,
  url: string
): CollectionPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
  };
}

export interface ItemListSchema {
  "@context": string;
  "@type": string;
  name: string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    url: string;
  }>;
}

export function getItemListSchema(
  name: string,
  items: Array<{ name: string; url: string }>
): ItemListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function getAboutPageSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/about#webpage`,
    name: "About UML Diagram Studio",
    url: `${SITE_URL}/about`,
    description:
      "UML Diagram Studio is a free browser UML diagram toolkit with PlantUML live preview, focused makers, and PNG or SVG export.",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
  };
}

export function getContactPageSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}/contact#webpage`,
    name: "Contact UML Diagram Studio",
    url: `${SITE_URL}/contact`,
    description:
      "Contact UML Diagram Studio for questions about the free UML diagram tool, tutorials, or partnership inquiries.",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      email: "contact@umldiagram.app",
    },
  };
}

export function getWebPageSchema(
  name: string,
  description: string,
  url: string
): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function generateStructuredDataScript(schema: object): string {
  return JSON.stringify(schema, null, 2);
}

