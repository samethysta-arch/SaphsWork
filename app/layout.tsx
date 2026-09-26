import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dax Design Library — Citadel",
  description: "A field archive of driver experience design by Grab's FF Design Team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
