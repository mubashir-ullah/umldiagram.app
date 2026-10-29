import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  generateStructuredDataScript,
} from "@/lib/seo/structured-data";
import { SITE_URL } from "@/lib/seo/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Free UML Diagram Tool Online | Class, Sequence, Use Case",
    template: "%s | UML Diagram Studio",
  },
  description:
    "Create UML diagrams online for free. Class, sequence, activity, and use case diagram makers with live PlantUML preview. No install.",
  authors: [{ name: "Mubashir" }],
  creator: "UML Diagram Studio",
  publisher: "UML Diagram Studio",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Free UML Diagram Tool Online | Class, Sequence, Use Case",
    description:
      "Create UML diagrams online for free. Class, sequence, activity, and use case diagram makers with live PlantUML preview. No install.",
    url: SITE_URL,
    siteName: "UML Diagram Studio",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Free UML diagram tool online with live PlantUML preview",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free UML Diagram Tool Online | Class, Sequence, Use Case",
    description:
      "Create UML diagrams online for free. Class, sequence, activity, and use case diagram makers with live PlantUML preview. No install.",
    images: [`${SITE_URL}/og-image.png`],
    creator: "@umldiagram",
  },
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/UML-Diagram.ico", sizes: "any" },
    ],
    shortcut: "/UML-Diagram.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon-48.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/UML-Diagram.ico" sizes="any" />
        <link rel="shortcut icon" href="/UML-Diagram.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased">
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateStructuredDataScript(getOrganizationSchema()),
          }}
        />
        <script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateStructuredDataScript(getWebSiteSchema()),
          }}
        />
        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7603836772359035"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1KVJ6FZ5L5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1KVJ6FZ5L5');
          `}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

