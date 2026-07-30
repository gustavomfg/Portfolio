import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/jetbrains-mono/wght.css";
import "./globals.css";
import { LightField } from "@/components/atmosphere/light-field";
import { siteUrl } from "@/app/site-config";

const title = "Gustavo Maquias — Análise e Desenvolvimento de Sistemas";
const description =
  "Portfólio de Gustavo Maquias, estudante de Análise e Desenvolvimento de Sistemas, e apresentação do ecossistema Nocturne.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Gustavo Maquias" }],
  creator: "Gustavo Maquias",
  icons: {
    icon: "/nocturne-mark.svg",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Nocturne Portfolio",
    title,
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Gustavo Maquias — Nocturne Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <LightField />
        {children}
      </body>
    </html>
  );
}
