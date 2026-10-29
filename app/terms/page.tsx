import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <SiteNav />
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 max-w-3xl prose prose-sm dark:prose-invert text-muted-foreground">
        <nav className="text-sm mb-6 not-prose" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground text-muted-foreground">
            Home
          </Link>
          <span className="mx-1 text-muted-foreground">/</span>
          <span className="text-foreground">Terms</span>
        </nav>

        <h1 className="text-foreground">Terms of Use</h1>
        <p>Last updated: October 30, 2026</p>
        <p>
          By using umldiagram.app (UML Diagram Studio), you agree to these terms. The site provides
          free UML diagram tools in the browser.
        </p>
        <h2 className="text-foreground">The service</h2>
        <p>
          Editors and tool pages are provided as-is, without a paid subscription. Features and
          uptime can change or be unavailable.
        </p>
        <h2 className="text-foreground">Your diagrams</h2>
        <p>
          You keep rights to diagrams you create. You are responsible for the content you generate,
          including that it does not infringe others&apos; rights.
        </p>
        <h2 className="text-foreground">Acceptable use</h2>
        <p>
          Do not attempt to disrupt the site or use the tools for unlawful activity. We may
          rate-limit or block abuse.
        </p>
        <h2 className="text-foreground">Liability</h2>
        <p>
          Diagrams are aids for design and documentation. Review them before using them in
          production systems. We are not liable for damages arising from use of the site.
        </p>
        <h2 className="text-foreground">Contact</h2>
        <p>
          Questions: <Link href="/contact">contact</Link> or see our{" "}
          <Link href="/privacy">privacy policy</Link>.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
