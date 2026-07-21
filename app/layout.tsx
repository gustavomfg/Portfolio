import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/jetbrains-mono/wght.css";
import "@fontsource-variable/jetbrains-mono/wght-italic.css";
import "./globals.css";
import { LightField } from "@/components/atmosphere/light-field";
import { INTRO_SESSION_KEY } from "@/lib/intro-timeline";

export const metadata: Metadata = {
  title: "Nocturne — Full Stack Developer",
  description:
    "Portfólio de desenvolvimento Full Stack e apresentação do ecossistema Nocturne.",
  icons: {
    icon: "/nocturne-mark.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const introBootstrap = `
    try {
      var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var viewed = window.sessionStorage.getItem('${INTRO_SESSION_KEY}') === 'true';
      document.documentElement.dataset.nocturneIntro = reducedMotion || viewed ? 'skip' : 'play';
    } catch (error) {
      document.documentElement.dataset.nocturneIntro = 'play';
    }
  `;

  return (
    <html lang="pt-BR">
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootstrap }} />
        <noscript><style>{`.nocturne-intro { display: none !important; }`}</style></noscript>
      </head>
      <body>
        <LightField />
        {children}
      </body>
    </html>
  );
}
