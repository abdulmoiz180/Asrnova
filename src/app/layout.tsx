import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://asrnova.com"),
  title: {
    default: "Asrnova | Digital Experiences That Last",
    template: "%s | Asrnova",
  },
  description:
    "Asrnova creates premium digital stories and software solutions for startups and enterprises.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Asrnova",
    title: "Asrnova | Digital Experiences That Last",
    description:
      "Asrnova creates premium digital stories and software solutions for startups and enterprises.",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "Asrnova" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asrnova | Digital Experiences That Last",
    description:
      "Asrnova creates premium digital stories and software solutions for startups and enterprises.",
    images: ["/og/default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.className} ${outfit.variable} antialiased bg-black text-white`}
      >
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
