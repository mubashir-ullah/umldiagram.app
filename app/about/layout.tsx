import type { Metadata } from "next";
import {
  generateStructuredDataScript,
  getAboutPageSchema,
  getBreadcrumbListSchema,
} from "@/lib/seo/structured-data";
import { SITE_URL } from "@/lib/seo/config";

export const metadata: Metadata = {
  title: { absolute: "About UML Diagram Studio" },
  description:
    "UML Diagram Studio is a free browser UML diagram toolkit with PlantUML live preview, focused makers, and PNG or SVG export.",
  keywords: [
    "uml diagram",
    "uml diagram tool",
    "free uml tool",
    "PlantUML",
    "class diagrams",
    "sequence diagrams",
    "uml online",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About UML Diagram Studio - Free UML Diagram Tool",
    description:
      "Learn about UML Diagram Studio, the free online UML diagram toolkit for class, sequence, activity, and more.",
    url: `${SITE_URL}/about`,
    siteName: "UML Diagram Studio",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "UML Diagram Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About UML Diagram Studio - Free UML Diagram Tool",
    description:
      "Learn about UML Diagram Studio, the free online UML diagram toolkit for class, sequence, activity, and more.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        id="about-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(getAboutPageSchema()),
        }}
      />
      <script
        id="about-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(
            getBreadcrumbListSchema([
              { name: "Home", url: SITE_URL },
              { name: "About", url: `${SITE_URL}/about` },
            ])
          ),
        }}
      />
      {children}
    </>
  );
}
