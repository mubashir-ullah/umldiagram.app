import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { TOOL_CATEGORIES, getToolsByCategory } from "@/lib/data/tools";
import {
  HOME_FAQ_LINKS,
  HOME_FAQS,
  HOME_FEATURES,
  HOME_HOW_TO,
} from "@/lib/seo/home-content";

function linkifyAnswer(question: string, answer: string): ReactNode {
  const links = HOME_FAQ_LINKS[question];
  if (!links?.length) return answer;

  const sorted = [...links].sort((a, b) => b.phrase.length - a.phrase.length);
  const nodes: ReactNode[] = [];
  let index = 0;

  while (index < answer.length) {
    const match = sorted.find((link) => answer.startsWith(link.phrase, index));
    if (match) {
      nodes.push(
        <Link
          key={`${match.href}-${index}`}
          href={match.href}
          className="text-primary hover:underline"
        >
          {match.phrase}
        </Link>
      );
      index += match.phrase.length;
      continue;
    }

    let next = index + 1;
    while (
      next < answer.length &&
      !sorted.some((link) => answer.startsWith(link.phrase, next))
    ) {
      next += 1;
    }
    nodes.push(answer.slice(index, next));
    index = next;
  }

  return nodes;
}

export function HomePageSEO() {
  return (
    <div className="w-full bg-background">
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-5xl space-y-14">
        <section className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Free UML Diagram Tool Online
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Create UML diagrams in your browser with live PlantUML preview and PNG or SVG export.
            Pick a focused maker for the diagram type you need, or open the studio for a blank canvas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link href="/tools">
              <Button size="lg">
                Browse diagram tools
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/studio">
              <Button size="lg" variant="outline">
                Open studio
              </Button>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">What is a UML diagram?</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              A UML diagram is a standard visual for modeling software structure and behavior.
              UML stands for Unified Modeling Language. Teams use these diagrams to agree on design,
              document services for onboarding, and explain flows to people who will not read every
              source file.
            </p>
            <p>
              Structural diagrams describe what exists: classes, objects, components, packages, and
              deployment nodes. Behavioral diagrams describe what happens: message sequences,
              activities, use cases, and state changes. Choosing the right view answers a specific
              question instead of forcing every detail onto one crowded picture.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Features</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HOME_FEATURES.map((feature) => (
              <li
                key={feature}
                className="border border-border rounded-lg px-4 py-3 text-muted-foreground"
              >
                {feature}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Diagram tools by category</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Each tool page includes a live editor, a starter template, and a short guide for that
            diagram type.
          </p>
          <div className="space-y-8">
            {TOOL_CATEGORIES.map((category) => (
              <div key={category.id}>
                <h3 className="text-xl font-semibold mb-1">
                  <Link href={`/tools#${category.id}`} className="hover:underline">
                    {category.name}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {getToolsByCategory(category.id).map((toolItem) => (
                    <li key={toolItem.slug}>
                      <Link
                        href={`/tools/${toolItem.slug}`}
                        className="block border border-border rounded-lg px-4 py-3 hover:bg-muted/40 transition-colors"
                      >
                        <span className="font-medium">{toolItem.name}</span>
                        <span className="block text-sm text-muted-foreground mt-0.5">
                          {toolItem.intro.slice(0, 110)}
                          {toolItem.intro.length > 110 ? "…" : ""}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">How to create a UML diagram here</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground leading-relaxed ml-1">
            {HOME_HOW_TO.steps.map((step) => (
              <li key={step.name}>{step.text}</li>
            ))}
          </ol>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Prefer a blank canvas? Use the{" "}
            <Link href="/studio" className="text-primary hover:underline">
              studio
            </Link>
            {" "}
            or the{" "}
            <Link href="/tools/plantuml-online" className="text-primary hover:underline">
              PlantUML online editor
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Popular starting points</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">
                <Link href="/tools/class-diagram-maker" className="hover:underline">
                  Class diagrams
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">
                Types, fields, methods, and relationships for object-oriented design.
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">
                <Link href="/tools/sequence-diagram-maker" className="hover:underline">
                  Sequence diagrams
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">
                Message order between actors and services for feature and API flows.
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">
                <Link href="/tools/activity-diagram-maker" className="hover:underline">
                  Activity diagrams
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">
                Workflows, decisions, and business or product procedures.
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">
                <Link href="/tools/use-case-diagram-maker" className="hover:underline">
                  Use case diagrams
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">
                Actors and goals at the system boundary for requirements workshops.
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">
                <Link href="/tools/er-diagram-maker" className="hover:underline">
                  ER diagrams
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">
                Entities, keys, and relationships for database design.
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">
                <Link href="/tools/plantuml-online" className="hover:underline">
                  PlantUML online
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">
                Text-based diagrams you can keep next to code reviews.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Why text-based diagrams</h2>
          <p className="text-muted-foreground leading-relaxed">
            Text diagrams review cleanly in pull requests and stay versionable in git. This site
            keeps that workflow in the browser so everyday drafting does not require a local Java
            install. Drag-and-drop tools are still useful in workshops. Use whichever medium your
            audience will actually read.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently asked questions</h2>
          <div className="space-y-4">
            {HOME_FAQS.map((faq) => (
              <div key={faq.question} className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">
                  {linkifyAnswer(faq.question, faq.answer)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-muted/40 rounded-lg p-6 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">
            Ready to make a diagram?
          </h2>
          <p className="text-muted-foreground mb-4">
            Start with a focused maker or open the full studio. No signup required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/tools/class-diagram-maker">
              <Button size="lg">Class diagram maker</Button>
            </Link>
            <Link href="/tools">
              <Button size="lg" variant="outline">
                View all tools
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
