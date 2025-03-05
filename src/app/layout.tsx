import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat_Alternates({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// Colour scheme
// https://coolors.co/a7b59d-f9f3e5-e0e2d2-b3723e-cdc8bd

export const metadata: Metadata = {
  title: "Bonanza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>{children}</body>
    </html>
  );
}
