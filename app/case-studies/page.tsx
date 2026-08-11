import type { Metadata } from "next";
import { CaseStudiesPage } from "./CaseStudiesPage";

export const metadata: Metadata = {
  title: "Case Studies — Proto Sprint",
  description:
    "Four fictionalized Proto Sprint case studies showing how focused prototypes can clarify products, services, content systems, and operations.",
  alternates: { canonical: "/case-studies" },
};

export default function Page() {
  return <CaseStudiesPage />;
}
