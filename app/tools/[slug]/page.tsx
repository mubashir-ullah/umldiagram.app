import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ToolPageContent } from "@/components/tool-page-content";
import { getToolBySlug, getToolSlugs } from "@/lib/data/tools";
import { SITE_URL } from "@/lib/seo/config";
import {
  generateStructuredDataScript,
  getBreadcrumbListSchema,
  getFAQPageSchema,
  getSoftwareApplicationSchema,
} from "@/lib/seo/structured-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getToolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) {
    return { title: "Tool not found" };
  }
  const url = `${SITE_URL}/tools/${tool.slug}`;
  return {
    title: { absolute: `${tool.title} | UML Diagram Studio` },
    description: tool.metaDescription,
    alternates: { canonical: url },
    keywords: [tool.keyword],
    openGraph: {
      title: tool.title,
      description: tool.metaDescription,
      url,
      siteName: "UML Diagram Studio",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: tool.h1,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.metaDescription,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) {
    notFound();
  }

  const url = `${SITE_URL}/tools/${tool.slug}`;
  const breadcrumbs = getBreadcrumbListSchema([
    { name: "Home", url: SITE_URL },
    { name: "Tools", url: `${SITE_URL}/tools` },
    { name: tool.name, url },
  ]);

  const appSchema = getSoftwareApplicationSchema({
    name: tool.name,
    description: tool.metaDescription,
    url,
    featureList: tool.features,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <script
        id={`tool-app-${tool.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(appSchema),
        }}
      />
      <script
        id={`tool-breadcrumb-${tool.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(breadcrumbs),
        }}
      />
      {tool.faqs.length > 0 ? (
        <script
          id={`tool-faq-${tool.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateStructuredDataScript(getFAQPageSchema(tool.faqs)),
          }}
        />
      ) : null}
      <SiteNav />
      <main className="flex-1">
        <ToolPageContent tool={tool} />
      </main>
      <SiteFooter />
    </div>
  );
}
