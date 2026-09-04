import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Gumma Digital — Freelance App & Website Development",
    template: "%s — Gumma Digital",
  },
  description:
    "Gumma Digital is an independent software studio building custom web apps, websites, and mobile apps for founders and small teams. Direct access to the developer, start to finish.",
  icons: { icon: [{ url: "/assets/favicon.svg", type: "image/svg+xml" }] },
  openGraph: {
    type: "website",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />

        <ScrollReveal />
      </body>
    </html>
  );
}
