import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "voyageo.ai — Votre agent de voyage IA",
  description: "Planifiez votre voyage parfait en quelques secondes avec votre assistant IA personnel. Itinéraires, vols, hôtels, restaurants — tout en un.",
  openGraph: {
    title: "voyageo.ai",
    description: "Planifiez votre voyage parfait avec l'IA",
    siteName: "voyageo.ai",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
