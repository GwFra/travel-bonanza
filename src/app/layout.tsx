import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Header } from "@/components/Header";
import { auth } from "@/auth";

const montserrat = Montserrat_Alternates({
  subsets: ["cyrillic", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// Colour scheme
// https://coolors.co/a7b59d-f9f3e5-e0e2d2-b3723e-cdc8bd
// Convert
// https://oklch.com/#96.5,0.0196,87.51,100

export const metadata: Metadata = {
  title: "Bonanza",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${montserrat.className} antialiased min-h-screen w-full`}
        >
          <Header />
          <main>{children}</main>
          {/* Could add a footer for links, instagram & polarsteps */}
        </body>
      </SessionProvider>
    </html>
  );
}
