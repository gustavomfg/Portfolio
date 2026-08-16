import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/jetbrains-mono/wght.css";
import "./globals.css";
import { siteUrl } from "@/app/site-config";

const title = "Gustavo Maquias — Análise e Desenvolvimento de Sistemas";
const description =
  "Portfólio de Gustavo Maquias, estudante de Análise e Desenvolvimento de Sistemas com foco em desenvolvimento Full Stack, arquitetura e aplicações web e desktop.";

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
    icon: "/gf-mark.svg",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Gustavo Maquias — Portfolio",
    title,
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Portfólio profissional de Gustavo Maquias",
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
        {children}
      </body>
    </html>
  );
}
