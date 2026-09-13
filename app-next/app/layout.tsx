import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://danieldev.me";
const TITLE =
  "Daniel Aguilar Bishop | AI/Prompt Engineer, Front-End Developer & Senior Digital Marketer";
const DESCRIPTION =
  "Daniel Aguilar Bishop: AI/Prompt Engineer, Front-End Developer, and Senior Digital Marketer with 14+ years turning strategy into shipped products.";
const OG_DESCRIPTION =
  "14+ years in digital marketing, combining strategy, front-end development, and applied AI to build real products.";

// Metadata portada literal de landing-app/index.html (ver SEO_GEO_REPORT.md) —
// no se rehace, solo se traduce al formato de Next.js Metadata API.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: "Daniel Aguilar Bishop" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: {
    icon: "/profile-photo.png",
    apple: "/profile-photo.png",
  },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: "Daniel Aguilar Bishop",
    locale: "en_US",
    title: TITLE,
    description: OG_DESCRIPTION,
    images: [{ url: "/profile-photo.png", width: 500, height: 500 }],
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: OG_DESCRIPTION,
    images: ["/profile-photo.png"],
  },
  other: {
    "theme-color": "#000000",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://danieldev.me/#profilepage",
      url: "https://danieldev.me/",
      name: TITLE,
      inLanguage: "en",
      isPartOf: { "@id": "https://danieldev.me/#website" },
      mainEntity: { "@id": "https://danieldev.me/#person" },
    },
    {
      "@type": "WebSite",
      "@id": "https://danieldev.me/#website",
      url: "https://danieldev.me/",
      name: "Daniel Aguilar Bishop",
      publisher: { "@id": "https://danieldev.me/#person" },
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": "https://danieldev.me/#person",
      name: "Daniel Aguilar Bishop",
      url: "https://danieldev.me/",
      image: "https://danieldev.me/profile-photo.png",
      jobTitle: [
        "AI/Prompt Engineer",
        "Front-End Developer",
        "Senior Digital Marketer",
      ],
      description: DESCRIPTION,
      email: "mailto:danielaguilarbishop@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cochabamba",
        addressCountry: "BO",
      },
      sameAs: [
        "https://www.linkedin.com/in/daniel-aguilar-bishop/",
        "https://elmedicovisible.com",
        "https://www.bizlyticsgrowth.com",
      ],
      knowsAbout: [
        "SEO",
        "GEO (Generative Engine Optimization)",
        "AEO (Answer Engine Optimization)",
        "Structured Data / JSON-LD",
        "React",
        "TypeScript",
        "Next.js",
        "AI Prompt Engineering",
        "Claude Code",
        "MCP (Model Context Protocol)",
        "Digital Marketing",
        "Google Ads",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Aquino University",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cochabamba",
          addressCountry: "BO",
        },
      },
      worksFor: [
        {
          "@type": "Organization",
          name: "AIM Internet Marketing",
          url: "https://www.aim-internet-marketing.com",
        },
        {
          "@type": "Organization",
          name: "HCMedic",
          url: "https://www.hcmedic.com",
        },
      ],
      founder: {
        "@type": "Organization",
        name: "Bizlytics",
        url: "https://www.bizlyticsgrowth.com",
      },
    },
    {
      "@type": "Book",
      "@id": "https://elmedicovisible.com/#book",
      name: "El Médico Visible",
      url: "https://elmedicovisible.com",
      author: { "@id": "https://danieldev.me/#person" },
      about:
        "Medical marketing, SEO, and GEO (Generative Engine Optimization) for medical practices",
      inLanguage: "es",
    },
    {
      "@type": "Event",
      "@id": "https://danieldev.me/#event-fisoderma",
      name: "FISODERMA 2.0",
      startDate: "2026-08-15",
      endDate: "2026-08-16",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "Asunción, Paraguay",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Asunción",
          addressCountry: "PY",
        },
      },
      performer: { "@id": "https://danieldev.me/#person" },
      about: "Business intelligence and digital transformation for medical practices",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}
