import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientComponents from "@/components/ClientComponents";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://syntyxlabs.com";

export const metadata: Metadata = {
  title: "Syntyx Labs — Engineering the Future of Software",
  description:
    "Syntyx Labs is a forward-thinking software development company specializing in AI-driven solutions, custom software, and scalable technology that drives growth and innovation.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Syntyx Labs — Engineering the Future of Software",
    description:
      "Syntyx Labs is a forward-thinking software development company specializing in AI-driven solutions, custom software, and scalable technology that drives growth and innovation.",
    url: siteUrl,
    siteName: "Syntyx Labs",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Syntyx Labs — Engineering the Future of Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Syntyx Labs — Engineering the Future of Software",
    description:
      "Syntyx Labs is a forward-thinking software development company specializing in AI-driven solutions, custom software, and scalable technology that drives growth and innovation.",
    images: ["/opengraph-image"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Syntyx Labs",
  url: siteUrl,
  description:
    "A forward-thinking software development company specializing in AI-driven solutions, custom software, and scalable technology.",
  logo: `${siteUrl}/icon.svg`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: `${siteUrl}/#contact`,
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ClientComponents />
        {children}
      </body>
    </html>
  );
}
