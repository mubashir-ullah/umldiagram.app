import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { TOOL_CATEGORIES, getAllTools, getToolsByCategory } from "@/lib/data/tools";
import { SITE_URL } from "@/lib/seo/config";
import {
  generateStructuredDataScript,
  getBreadcrumbListSchema,
  getCollectionPageSchema,
  getItemListSchema,
} from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: { absolute: "UML Diagram Tools Directory | Free Online Makers" },
  description:
    "Browse free UML diagram tools: class, sequence, activity, use case, PlantUML, ERD, flowchart, and more. One page per keyword with a live editor.",
  alternates: { canonical: `${SITE_URL}/tools` },
  openGraph: {
    title: "UML Diagram Tools Directory | Free Online Makers",
    description:
      "Browse free UML diagram tools: class, sequence, activity, use case, PlantUML, ERD, flowchart, and more.",
    url: `${SITE_URL}/tools`,
    siteName: "UML Diagram Studio",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "UML diagram tools directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UML Diagram Tools Directory | Free Online Makers",
    description:
      "Browse free UML diagram tools: class, sequence, activity, use case, PlantUML, ERD, flowchart, and more.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function ToolsIndexPage() {
  const breadcrumbs = getBreadcrumbListSchema([
    { name: "Home", url: SITE_URL },
    { name: "Tools", url: `${SITE_URL}/tools` },
  ]);
  const itemList = getItemListSchema(
    "UML Diagram Tools",
    getAllTools().map((tool) => ({
      name: tool.name,
      url: `${SITE_URL}/tools/${tool.slug}`,
    }))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <script
        id="tools-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(
            getCollectionPageSchema(
              "UML Diagram Tools",
              "Directory of free online UML diagram makers and related diagram tools.",
              `${SITE_URL}/tools`
            )
          ),
        }}
      />
      <script
        id="tools-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(breadcrumbs),
        }}
      />
      <script
        id="tools-itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(itemList),
        }}
      />
      <SiteNav />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-5xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          UML diagram tools
        </h1>
        <p className="text-muted-foreground text-lg mb-10 max-w-3xl">
          Pick a keyword-specific tool. Each page includes a live PlantUML editor
          plus a focused guide so you can create and learn in one place.
        </p>

        <div className="space-y-12">
          {TOOL_CATEGORIES.map((category) => {
            const items = getToolsByCategory(category.id);
            return (
              <section key={category.id} id={category.id}>
                <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
                <p className="text-muted-foreground mb-4">
                  {category.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {items.map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="block h-full border border-border rounded-lg p-4 hover:bg-muted/40 transition-colors"
                      >
                        <span className="font-medium">{tool.name}</span>
                        <span className="block text-sm text-muted-foreground mt-1">
                          {tool.intro}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
