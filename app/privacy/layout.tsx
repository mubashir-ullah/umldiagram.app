import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/config";
import {
  generateStructuredDataScript,
  getBreadcrumbListSchema,
  getWebPageSchema,
} from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | UML Diagram Studio" },
  description:
    "How UML Diagram Studio handles emails, local diagram storage, analytics, and advertising on umldiagram.app.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: {
    title: "Privacy Policy | UML Diagram Studio",
    description:
      "How UML Diagram Studio handles emails, local diagram storage, analytics, and advertising on umldiagram.app.",
    url: `${SITE_URL}/privacy`,
    siteName: "UML Diagram Studio",
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "UML Diagram Studio privacy policy" }],
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        id="privacy-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(
            getWebPageSchema(
              "Privacy Policy",
              "How UML Diagram Studio handles emails, local diagram storage, analytics, and advertising on umldiagram.app.",
              `${SITE_URL}/privacy`
            )
          ),
        }}
      />
      <script
        id="privacy-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(
            getBreadcrumbListSchema([
              { name: "Home", url: SITE_URL },
              { name: "Privacy", url: `${SITE_URL}/privacy` },
            ])
          ),
        }}
      />
      {children}
    </>
  );
}
