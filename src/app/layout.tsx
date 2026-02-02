import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kalicharan Mahasivabhattu | Career Mentor & Technologist",
  description: "Professional mentor and technologist offering career guidance, AI-assisted learning, and support for solo builders.",
  keywords: ["Career Mentor", "Technologist", "AI Learning", "Career Guidance", "Solo Building"],
  authors: [{ name: "Kalicharan Mahasivabhattu" }],
  openGraph: {
    title: "Kalicharan Mahasivabhattu | Career Mentor & Technologist",
    description: "Professional mentor and technologist offering career guidance, AI-assisted learning, and support for solo builders.",
    url: "https://mkalicharan.com",
    siteName: "Kalicharan Mahasivabhattu",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalicharan Mahasivabhattu | Career Mentor & Technologist",
    description: "Professional mentor and technologist offering career guidance, AI-assisted learning, and support for solo builders.",
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
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
