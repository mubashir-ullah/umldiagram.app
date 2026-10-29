import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <SiteNav />
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 max-w-3xl">
        <nav className="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-1">/</span>
          <span className="text-foreground">About</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          About UML Diagram Studio
        </h1>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            UML Diagram Studio is a free collection of online UML diagram tools. The site is
            organized as a hub for the keyword UML diagram, with focused makers for class,
            sequence, activity, use case, state, PlantUML, ERD, flowchart, and related views.
          </p>
          <p>
            Each tool page includes a live PlantUML editor, a starter template, export to PNG or
            SVG, and a short guide so you can create and learn without leaving the page. The{" "}
            <Link href="/studio" className="text-primary hover:underline">
              studio
            </Link>{" "}
            offers a full-height editor when you want more space.
          </p>
          <p>
            The project started as a hobby diagramming site and is now positioned as a practical
            toolkit for students, developers, and architects who need diagrams in the browser
            without a paid license.
          </p>
          <p>
            Browse the{" "}
            <Link href="/tools" className="text-primary hover:underline">
              tools directory
            </Link>{" "}
            or return to the{" "}
            <Link href="/" className="text-primary hover:underline">
              UML diagram hub
            </Link>
            .
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/tools">
            <Button>Browse tools</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline">Contact</Button>
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
