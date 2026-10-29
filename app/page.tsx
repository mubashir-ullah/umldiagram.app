import type { Metadata } from "next";
import { HomePageSEO } from "@/app/page-seo";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ToolEditor } from "@/components/tool-editor";
import {
  getFAQPageSchema,
  getHowToSchema,
  getSoftwareApplicationSchema,
  generateStructuredDataScript,
} from "@/lib/seo/structured-data";
import { HOME_FAQS, HOME_FEATURES, HOME_HOW_TO } from "@/lib/seo/home-content";
import { SITE_URL } from "@/lib/seo/config";

const HOME_DEFAULT_CODE = `@startuml
!theme plain
skinparam backgroundColor transparent
skinparam defaultFontName JetBrains Mono

title Simple Class Diagram

class User {
  -id: string
  -username: string
  -email: string
  +login()
  +logout()
}

class Post {
  -id: string
  -title: string
  -content: string
  -createdAt: Date
  +publish()
  +delete()
}

User "1" -- "*" Post : creates
@enduml`;

export const metadata: Metadata = {
  title: { absolute: "Free UML Diagram Tool Online | Class, Sequence, Use Case" },
  description:
    "Create UML diagrams online for free. Class, sequence, activity, and use case diagram makers with live PlantUML preview. No install.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
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
  },
};

const faqSchema = getFAQPageSchema(HOME_FAQS);
const howToSchema = getHowToSchema(
  HOME_HOW_TO.name,
  HOME_HOW_TO.description,
  HOME_HOW_TO.steps
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(faqSchema),
        }}
      />
      <script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(howToSchema),
        }}
      />
      <script
        id="software-application-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredDataScript(
            getSoftwareApplicationSchema({ featureList: HOME_FEATURES })
          ),
        }}
      />
      <SiteNav />
      <main className="flex-1">
        <div className="container mx-auto px-4 pt-6 max-w-5xl">
          <ToolEditor
            initialCode={HOME_DEFAULT_CODE}
            storageKey="plantuml-code-home"
          />
        </div>
        <HomePageSEO />
      </main>
      <SiteFooter />
    </div>
  );
}
