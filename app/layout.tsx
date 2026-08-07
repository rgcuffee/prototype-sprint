import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = `${origin}/og.png`;

  return {
    metadataBase: new URL(origin),
    title: "Prototype Sprint — From idea to something real",
    description:
      "A focused three-hour working session to clarify, build, and move your product idea toward something you can use, test, share, or demonstrate.",
    alternates: {
      canonical: `${origin}/`,
    },
    icons: {
      icon: "/favicon.png",
      apple: "/favicon.png",
    },
    openGraph: {
      title: "Prototype Sprint — From idea to something real",
      description: "3 hours. $500. Build together live.",
      type: "website",
      images: [{ url: socialImage, width: 1734, height: 907, alt: "Prototype Sprint — From idea to something real." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Prototype Sprint — From idea to something real",
      description: "3 hours. $500. Build together live.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
