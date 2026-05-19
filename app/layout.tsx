import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'voyageo.ai — Votre agent de voyage IA',
    template: '%s | voyageo.ai',
  },
  description: 'Planifiez votre voyage parfait en quelques secondes avec votre assistant IA personnel.',
  keywords: 'agent de voyage IA, planification voyage, itinéraire, concierge voyage',
  openGraph: {
    title: 'voyageo.ai',
    description: 'Planifiez votre voyage parfait en quelques secondes avec votre assistant IA personnel.',
    siteName: 'voyageo.ai',
  },
  twitter: {
    title: 'voyageo.ai',
    description: 'Planifiez votre voyage parfait en quelques secondes avec votre assistant IA personnel.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <Navigation />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
