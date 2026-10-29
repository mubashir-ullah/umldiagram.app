import { MetadataRoute } from "next";
import { SITE_CONTENT_UPDATED, SITE_URL } from "@/lib/seo/config";
import { getToolSlugsForSitemap } from "@/lib/seo/slugs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL.replace(/\/$/, "");
  const lastModified = new Date(SITE_CONTENT_UPDATED);

  const formatUrl = (path: string): string => {
    if (path === "/" || path === "") {
      return baseUrl;
    }
    return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`.replace(/\/$/, "");
  };

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: formatUrl("/"),
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: formatUrl("/tools"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: formatUrl("/studio"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: formatUrl("/about"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: formatUrl("/contact"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: formatUrl("/privacy"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: formatUrl("/terms"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const toolPages: MetadataRoute.Sitemap = getToolSlugsForSitemap().map((slug) => ({
    url: formatUrl(`/tools/${slug}`),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...toolPages];
}
