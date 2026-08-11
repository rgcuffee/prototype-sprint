import type { Metadata } from "next";
import { PromisePathBoard } from "./PromisePathBoard";

export const metadata: Metadata = {
  title: "Promise Path — Family stability product concept",
  description:
    "A guided path from family shelter to sustainable housing, with a whole-family stability board and case-manager support.",
  openGraph: {
    title: "Promise Path — From shelter to lasting stability",
    description:
      "A clear path from here to home—and a whole-family plan to stay home.",
    type: "website",
    images: [
      {
        url: "/og-promise-path.png",
        width: 1735,
        height: 907,
        alt: "Promise Path: a route from shelter to a whole-family stability board.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Promise Path — From shelter to lasting stability",
    description:
      "A clear path from here to home—and a whole-family plan to stay home.",
    images: ["/og-promise-path.png"],
  },
};

export default function FamilyPromiseProductBoard() {
  return <PromisePathBoard />;
}
