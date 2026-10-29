import Link from "next/link";
import type { ToolDefinition } from "@/lib/data/tools";
import { getRelatedTools, getCategoryById } from "@/lib/data/tools";
import { ToolEditor } from "@/components/tool-editor";

interface ToolPageContentProps {
  tool: ToolDefinition;
}

export function ToolPageContent({ tool }: ToolPageContentProps) {
  const related = getRelatedTools(tool);
  const category = getCategoryById(tool.category);

  return (
    <article className="container mx-auto px-4 py-8 max-w-5xl">
      <nav className="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/tools" className="hover:text-foreground">
              Tools
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">{tool.name}</li>
        </ol>
      </nav>

      <header className="mb-6">
        {category ? (
          <p className="text-sm text-muted-foreground mb-2">{category.name}</p>
        ) : null}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          {tool.h1}
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          {tool.intro}
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Features</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
          {tool.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      <section className="mb-10" aria-label={`${tool.name} editor`}>
        <ToolEditor
          initialCode={tool.defaultCode}
          storageKey={`tool-${tool.slug}`}
        />
        <p className="mt-3 text-sm text-muted-foreground">
          Need a blank canvas? Open the{" "}
          <Link href="/studio" className="text-primary hover:underline">
            full UML studio
          </Link>
          .
        </p>
      </section>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
        {tool.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-semibold mb-3">{section.heading}</h2>
            {section.body.split("\n").map((paragraph, index) => (
              <p
                key={`${section.heading}-${index}`}
                className="text-muted-foreground leading-relaxed mb-3 whitespace-pre-line"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        {tool.faqs.length > 0 ? (
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Frequently asked questions
            </h2>
            <div className="space-y-4 not-prose">
              {tool.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="border border-border rounded-lg p-4"
                >
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Related tools</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/tools/${item.slug}`}
                    className="block border border-border rounded-lg p-4 hover:bg-muted/40 transition-colors"
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className="block text-sm text-muted-foreground mt-1">
                      {item.intro.slice(0, 100)}
                      {item.intro.length > 100 ? "…" : ""}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Browse the full{" "}
              <Link href="/tools" className="text-primary hover:underline">
                UML diagram tools
              </Link>{" "}
              directory or return to the{" "}
              <Link href="/" className="text-primary hover:underline">
                UML diagram hub
              </Link>
              .
            </p>
          </section>
        ) : null}
      </div>
    </article>
  );
}
