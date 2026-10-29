import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: { absolute: "404 - Page Not Found | UML Diagram Studio" },
  description: "The page you are looking for does not exist. Return to the UML Diagram Studio homepage to create UML diagrams.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <SiteNav />
      <main className="flex-1 w-full flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-foreground">404 Page Not Found</h1>
            </div>

            <p className="mt-4 text-sm text-muted-foreground mb-6">
              The page you are looking for does not exist. It may have been moved or deleted.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/">
                <Button>Go to Home</Button>
              </Link>
              <Link href="/tools">
                <Button variant="outline">Browse tools</Button>
              </Link>
              <Link href="/studio">
                <Button variant="outline">Open studio</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
