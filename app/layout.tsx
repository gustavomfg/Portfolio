import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/jetbrains-mono/wght.css";
import "@fontsource-variable/jetbrains-mono/wght-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nocturne — Full Stack Developer",
  description:
    "Portfólio de desenvolvimento Full Stack e apresentação do ecossistema Nocturne.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
