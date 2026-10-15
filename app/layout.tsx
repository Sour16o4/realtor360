import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

// Self-hosted variable fonts (Inter for the app, Manrope for the navbar), so builds work offline.
const inter = localFont({ src: "./fonts/Inter.woff2", variable: "--font-inter", weight: "100 900" });
const manrope = localFont({ src: "./fonts/Manrope.woff2", variable: "--font-manrope", weight: "200 800" });

export const metadata: Metadata = {
  title: "Realtor360",
  description: "Real estate CRM dashboard",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
