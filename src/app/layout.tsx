import type { Metadata, Viewport } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const siteUrl = "https://bekhruz.dev";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: {
    default: "Bekhruz Tursunbaev — Software Engineer & AI Architect",
    template: "%s | Bekhruz Tursunbaev",
  },
  description:
    "Software engineer who started coding at 12 and landed his first client at 14. Building practical AI tools, full-stack applications, and open-source software from Tashkent, Uzbekistan.",
  keywords: [
    "Bekhruz Tursunbaev",
    "Bekhruz Tursunboev",
    "Software Engineer",
    "AI Builder",
    "Full-Stack Developer",
    "Open Source",
    "Tashkent",
    "Uzbekistan",
    "TypeScript",
    "Next.js",
    "Python",
    "MulkTahlilchi",
    "ZiyoBuddy",
    "Machine Learning",
    "Computer Vision",
  ],
  authors: [{ name: "Bekhruz Tursunbaev", url: siteUrl }],
  creator: "Bekhruz Tursunbaev",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Bekhruz Tursunbaev",
    title: "Bekhruz Tursunbaev — Software Engineer & AI Architect",
    description:
      "Software engineer who started coding at 12. Building practical AI tools and full-stack applications from Tashkent, Uzbekistan.",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 800,
        alt: "Bekhruz Tursunbaev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bekhruz Tursunbaev — Software Engineer & AI Architect",
    description:
      "Software engineer who started coding at 12. Building AI tools and full-stack apps from Tashkent.",
    images: ["/profile.jpg"],
    creator: "@BexruzTursunboev",
  },
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
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/profile.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Bekhruz Tursunbaev",
              url: siteUrl,
              jobTitle: "Software Engineer",
              knowsAbout: ["Artificial Intelligence", "Full-Stack Development", "Open Source", "TypeScript", "Python", "Computer Vision"],
              sameAs: [
                "https://github.com/BekhruzTursunboev",
                "https://www.linkedin.com/in/bexruztursunbayev",
                "https://www.youtube.com/@BexruzTursunboev",
                "https://t.me/bekhruzAI",
                "https://t.me/tursunboevbekhruz",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Tashkent",
                addressCountry: "UZ",
              },
            }),
          }}
        />
      </head>
      <body className="overflow-x-hidden" suppressHydrationWarning>{children}</body>
    </html>
  );
}
