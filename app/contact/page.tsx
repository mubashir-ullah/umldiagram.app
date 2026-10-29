import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <SiteNav />
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 max-w-3xl">
        <nav className="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-1">/</span>
          <span className="text-foreground">Contact</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Contact UML Diagram Studio
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          UML Diagram Studio is a free browser UML diagram toolkit with PlantUML live preview and
          focused makers for common diagram types. Use this page to reach the people who run the site.
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Email</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a
                href="mailto:contact@umldiagram.app"
                className="text-primary hover:underline"
              >
                contact@umldiagram.app
              </a>
            </p>
            <p>
              For questions about the{" "}
              <Link href="/" className="text-primary hover:underline">
                free UML diagram tool
              </Link>{" "}
              or a specific maker in the{" "}
              <Link href="/tools" className="text-primary hover:underline">
                tools directory
              </Link>
              , email us and we will reply when we can.
            </p>
          </CardContent>
        </Card>

        <p className="text-sm text-muted-foreground">
          See also{" "}
          <Link href="/about" className="text-primary hover:underline">
            About
          </Link>
          ,{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy
          </Link>
          , and{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
