import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/config";
import {
  generateStructuredDataScript,
  getBreadcrumbListSchema,
  getContactPageSchema,
} from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: { absolute: "Contact UML Diagram Studio" },
  description:
    "Contact UML Diagram Studio for questions about the free UML diagram tool, tutorials, or partnership inquiries.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact UML Diagram Studio",
    description:
      "Contact UML Diagram Studio for questions about the free UML diagram tool, tutorials, or partnership inquiries.",
    url: `${SITE_URL}/contact`,
    siteName: "UML Diagram Studio",
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Contact UML Diagram Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact UML Diagram Studio",
    description:
      "Contact UML Diagram Studio for questions about the free UML diagram tool, tutorials, or partnership inquiries.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        id="contact-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(getContactPageSchema()),
        }}
      />
      <script
        id="contact-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(
            getBreadcrumbListSchema([
              { name: "Home", url: SITE_URL },
              { name: "Contact", url: `${SITE_URL}/contact` },
            ])
          ),
        }}
      />
      {children}
    </>
  );
}
