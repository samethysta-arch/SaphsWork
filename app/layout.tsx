import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.samethysta.com"),
  title: {
    default: "Saphira Amethysta — Product Design Lead",
    template: "%s | Saphira Amethysta",
  },
  description: "Selected product design work by Saphira Amethysta, Product Design Lead based in Singapore.",
  alternates: { canonical: "/" },
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
