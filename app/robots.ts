import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/config";

const publicRules = {
  allow: "/",
  disallow: ["/api/", "/admin/"],
};

const answerEngineBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        ...publicRules,
      },
      ...answerEngineBots.map((userAgent) => ({
        userAgent,
        ...publicRules,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
