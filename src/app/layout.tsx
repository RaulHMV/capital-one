import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import type React from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  preload: true,
  display: "swap",
  weight: ["400", "500", "600"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  preload: true,
  display: "swap",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Capital One - Sign In",
  description: "Secure banking portal for Capital One customers",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Capital One - Sign In</title>
      </head>
      <body className={`${inter.variable} ${montserrat.variable} antialiased flex flex-col min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
