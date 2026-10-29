import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * SEO middleware: normalizes URLs for consistent indexing.
 * - Redirects HTTP to HTTPS on production host only (not localhost)
 * - Redirects www to non-www
 * - Redirects trailing slash to no trailing slash (except for root /)
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  let redirect = false;
  const host = url.hostname;
  const isLocal =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "::1" ||
    host.endsWith(".local");

  // HTTP → HTTPS on production only. Local Next.js serves HTTP without TLS.
  if (!isLocal && url.protocol === "http:" && host === "umldiagram.app") {
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  // www → non-www
  if (host === "www.umldiagram.app") {
    url.hostname = "umldiagram.app";
    url.protocol = "https:";
    redirect = true;
  }

  // Trailing slash → no trailing slash (except root)
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.replace(/\/+$/, "");
    redirect = true;
  }

  if (redirect) {
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}
