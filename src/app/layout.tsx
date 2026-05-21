import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wanderly — ton voyage, planifié en une phrase",
  description:
    "La plateforme de voyage tout-en-un. Décris une envie, repars avec un voyage complet — vols, logement, restos, activités, budget.",
  keywords: ["voyage", "IA", "vols", "Airbnb", "budget", "itinéraire"],
  openGraph: {
    title: "Wanderly",
    description: "Ton prochain voyage, planifié en une phrase.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF7",
  width: "device-width",
  initialScale: 1,
};

const NO_FLASH = `(function(){try{var t=localStorage.getItem('wanderly-theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
      </head>
      <body className={`${inter.variable} ${fraunces.variable} font-sans`}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
