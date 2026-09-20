import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saphira Amethysta — Product Designer",
  description:
    "Selected product design work and experience by Saphira Amethysta, Product Design Lead in Singapore.",
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
