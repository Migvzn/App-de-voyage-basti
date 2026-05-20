import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Wanderly — Votre agent de voyage IA",
    template: "%s | Wanderly",
  },
  description: "La plateforme voyage qui remplace Airbnb, Skyscanner, TripAdvisor et GetYourGuide. Planifiez votre voyage parfait avec l'IA en 60 secondes.",
  keywords: ["voyage", "IA", "itinéraire", "planification", "Airbnb", "vols", "hôtels"],
  openGraph: {
    title: "Wanderly — Votre agent de voyage IA",
    description: "Planifiez votre voyage parfait avec l'IA en 60 secondes.",
    siteName: "Wanderly",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#FAFAF7] text-[#0A0A0A]">
        {children}
      </body>
    </html>
  );
}
