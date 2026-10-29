/**
 * Slug helpers for sitemap and validation.
 */
import { getToolSlugs } from "@/lib/data/tools";

export function getToolSlugsForSitemap(): string[] {
  return getToolSlugs();
}
