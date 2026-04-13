import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Autolyst — Intelligent Real Estate Listings",
  description: "Automated real estate listing intelligence for modern realtors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-parchment text-ink">
        {children}
      </body>
    </html>
  );
}
