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
    "https://prototype-sprint.rgcuffee.chatgpt.site";

  return {
    metadataBase: new URL(origin),
    title: "Clean City Property Care — Las Vegas Pressure Washing",
    description:
      "Commercial and residential pressure washing for HOAs, apartment communities, commercial properties, loading docks, and homes across Las Vegas.",
    alternates: { canonical: `${origin}/` },
    icons: {
      icon: "/clean-city/logo.jpg",
      apple: "/clean-city/logo.jpg",
    },
    openGraph: {
      title: "Clean City Property Care — Cleaner surfaces. Stronger first impressions.",
      description: "Commercial and residential pressure washing across Las Vegas and North Las Vegas.",
      type: "website",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1731,
          height: 909,
          alt: "Clean City Property Care pressure washing in Las Vegas",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Clean City Property Care — Las Vegas Pressure Washing",
      description: "Commercial and residential pressure washing across Las Vegas and North Las Vegas.",
      images: [`${origin}/og.png`],
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
