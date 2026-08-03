"use client";

import { ArrowDown } from "lucide-react";
import { useRef } from "react";

import { useScrollJourney } from "@/hooks/use-scroll-journey";
import { EclipseVisual } from "./EclipseVisual";
import { NocturneIdentity } from "./NocturneIdentity";

export function NocturneJourney() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useScrollJourney({ sectionRef });

  return (
    <section
      ref={sectionRef}
      className="journey"
      aria-label="Introdução ao portfólio"
    >
      <div className="journey-stage">
        <div className="journey-bridge" aria-hidden="true" />

        <div className="journey-eclipse-container">
          <EclipseVisual />
        </div>

        <div className="journey-welcome">
          <p className="journey-welcome__eyebrow">Portfólio profissional</p>
          <p className="journey-welcome__title">Bem-vindo.</p>
          <p className="journey-welcome__instruction">Role para conhecer</p>
        </div>

        <NocturneIdentity />

        <a className="journey-skip" href="#inicio">
          Ir direto ao portfólio
          <ArrowDown size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
