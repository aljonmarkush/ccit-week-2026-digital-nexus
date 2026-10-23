import type { Metadata, Viewport } from "next";
import { Anton, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollEffects from "@/components/layout/ScrollEffects";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "CCIT Week 2026 — Digital Nexus",
    template: "%s | CCIT Week 2026",
  },
  description:
    "Innovate Today, Transform Tomorrow: Empowering the Digital Generation.",
  icons: {
    icon: "/images/ccit-logo.png",
  },
  openGraph: {
    title: "CCIT Week 2026 — Digital Nexus",
    description:
      "A collision of code, creativity, competition, and community. Built by the digital generation.",
    url: "https://ccitweek2026.vercel.app",
    siteName: "CCIT Week 2026",
    images: [
      {
        url: "/images/ccit-logo.png",
        width: 1200,
        height: 630,
        alt: "CCIT Week 2026: Digital Nexus",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${anton.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#050507] text-white antialiased selection:bg-[#C6FF33] selection:text-black">
        <ScrollEffects />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}