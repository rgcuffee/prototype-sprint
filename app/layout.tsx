import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export function generateMetadata(): Metadata {
  const origin =
    process.env.URL ??
    process.env.DEPLOY_PRIME_URL ??
    "https://dls-mobile-detailing.rgcuffee.chatgpt.site";

  return {
    metadataBase: new URL(origin),
    title: "DLS Mobile Detailing — San Fernando Valley",
    description:
      "Mobile paint correction, ceramic coating, headlight restoration, engine bay cleaning, cutting, and polishing across the San Fernando Valley.",
    alternates: { canonical: `${origin}/` },
    icons: {
      icon: "/dls/favicon.jpg",
      apple: "/dls/favicon.jpg",
    },
    openGraph: {
      title: "DLS Mobile Detailing — Precision, delivered.",
      description: "Premium mobile detailing across the San Fernando Valley.",
      type: "website",
      images: [
        {
          url: `${origin}/og-dls.png`,
          width: 1536,
          height: 1024,
          alt: "DLS Mobile Detailing — Precision, delivered.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "DLS Mobile Detailing — Precision, delivered.",
      description: "Premium mobile detailing across the San Fernando Valley.",
      images: [`${origin}/og-dls.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={geistSans.variable}>{children}</body>
    </html>
  );
}
