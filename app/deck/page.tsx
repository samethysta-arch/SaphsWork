import type { Metadata } from "next";
import DeckExperience from "../../components/DeckExperience";

export const metadata: Metadata = {
  title: "Dax Design Library — Deck",
  description: "An interactive presentation about the Dax Design Library and the team behind it.",
  alternates: { canonical: "/deck/" },
};

export default function DeckPage() {
  return <DeckExperience />;
}
