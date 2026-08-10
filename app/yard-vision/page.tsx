import type { Metadata } from "next";
import { YardVisionForm } from "./YardVisionForm";

export const metadata: Metadata = {
  title: "Yard Vision Builder — Show Ready Landscape",
  description:
    "A clickable concept for turning a homeowner's landscaping ideas into a focused project brief.",
};

export default function YardVisionPage() {
  return <YardVisionForm />;
}
