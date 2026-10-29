import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <SiteNav />
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 max-w-3xl prose prose-sm dark:prose-invert text-muted-foreground">
        <nav className="text-sm mb-6 not-prose" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground text-muted-foreground">
            Home
          </Link>
          <span className="mx-1 text-muted-foreground">/</span>
          <span className="text-foreground">Privacy</span>
        </nav>

        <h1 className="text-foreground">Privacy Policy</h1>
        <p>Last updated: October 30, 2026</p>
        <p>
          UML Diagram Studio (umldiagram.app) is a free online UML diagram toolkit. This page
          explains what we collect and how we use it.
        </p>
        <h2 className="text-foreground">Diagrams you create</h2>
        <p>
          Diagram code you type in the editor may be stored in your browser (localStorage) so your
          work can persist on that device. We do not require an account to use the tools.
        </p>
        <h2 className="text-foreground">Email newsletter</h2>
        <p>
          If you subscribe in the footer, we store the email address you submit so we can send
          product updates. You can unsubscribe using the link in those emails or by writing to{" "}
          <a href="mailto:contact@umldiagram.app">contact@umldiagram.app</a>.
        </p>
        <h2 className="text-foreground">Analytics and ads</h2>
        <p>
          The site may load Google Analytics and Google AdSense. Those services can set cookies and
          collect usage data according to Google&apos;s policies.
        </p>
        <h2 className="text-foreground">Contact</h2>
        <p>
          Questions: <Link href="/contact">contact page</Link> or contact@umldiagram.app.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
