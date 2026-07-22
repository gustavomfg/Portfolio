import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/jetbrains-mono/wght.css";
import "@fontsource-variable/jetbrains-mono/wght-italic.css";
import "./globals.css";
import { LightField } from "@/components/atmosphere/light-field";

export const metadata: Metadata = {
  title: "Gustavo Fernandes — Full Stack Developer",
  description:
    "Portfólio de Gustavo Fernandes e apresentação do ecossistema Nocturne.",
  icons: {
    icon: "/nocturne-mark.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <LightField />
        {children}
      </body>
    </html>
  );
}
