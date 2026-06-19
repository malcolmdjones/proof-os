import { Inter, Shrikhand } from "next/font/google";
import type { Metadata } from "next";

import { Providers } from "@/providers/providers";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const shrikhand = Shrikhand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-shrikhand",
});

export const metadata: Metadata = {
  title: "proof. OS",
  description: "Media-first business OS for proof.",
  icons: {
    icon: "/brand/logos/proof-logo-p-initial.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${shrikhand.variable} min-h-dvh bg-background font-sans text-foreground antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
