import type { Metadata } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import "@fontsource-variable/jetbrains-mono/wght.css";
import "./globals.css";
import { LightField } from "@/components/atmosphere/light-field";

export const metadata: Metadata = {
  title: "Gustavo Maquias — Análise e Desenvolvimento de Sistemas",
  description:
    "Portfólio de Gustavo Maquias, estudante de Análise e Desenvolvimento de Sistemas, e apresentação do ecossistema Nocturne.",
  icons: {
    icon: "/nocturne-mark.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  // Nonce-based CSP requires request-time rendering so Next.js can apply the
  // nonce from the incoming Content-Security-Policy header to framework scripts.
  await headers();

  return (
    <html lang="pt-BR">
      <body>
        <LightField />
        {children}
      </body>
    </html>
  );
}
