import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ParticleBackground from "@/components/ParticleBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Syntyx Labs — Engineering the Future of Software",
  description:
    "Syntyx Labs is a forward-thinking software development company specializing in AI-driven solutions, custom software, and scalable technology that drives growth and innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ParticleBackground />
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
