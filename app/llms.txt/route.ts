import { getAllTools } from "@/lib/data/tools";
import { SITE_URL } from "@/lib/seo/config";

export function GET() {
  const tools = getAllTools();
  const lines = [
    "# UML Diagram Studio",
    "",
    "> Free online UML diagram tool. Create class, sequence, activity, and use case diagrams in the browser with live PlantUML preview and PNG or SVG export.",
    "",
    "## Main pages",
    `- [Home](${SITE_URL}): Free UML diagram tool hub`,
    `- [Tools](${SITE_URL}/tools): Directory of diagram makers`,
    `- [Studio](${SITE_URL}/studio): Full UML diagram editor`,
    `- [About](${SITE_URL}/about): About the site`,
    `- [Contact](${SITE_URL}/contact): contact@umldiagram.app`,
    "",
    "## Diagram tools",
    ...tools.map(
      (tool) => `- [${tool.name}](${SITE_URL}/tools/${tool.slug}): ${tool.metaDescription}`
    ),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
