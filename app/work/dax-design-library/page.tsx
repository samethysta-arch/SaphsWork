import type { Metadata } from "next";
import { PageFrame } from "../../../components/FormoChrome";
import DaxCaseStudy from "../../../components/DaxCaseStudy";

export const metadata: Metadata = {
  title: "Dax Design Library",
  description: "A reusable, searchable design library that helps teams create grounded prototypes from existing Driver app journeys.",
};

export default function DaxDesignLibraryPage() {
  return <PageFrame showHeader={false}><DaxCaseStudy /></PageFrame>;
}
