"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="status-page">
      <div className="status-card">
        <div className="status-brand"><BrandMark /><span>NOCTURNE</span></div>
        <span className="status-code">FALHA / INTERFACE</span>
        <AlertTriangle size={34} aria-hidden="true" />
        <h1>Algo interrompeu a experiência.</h1>
        <p>O problema pode ser temporário. Tente carregar esta parte do portfólio novamente.</p>
        <button className="button button-primary" type="button" onClick={reset}>
          Tentar novamente
          <RotateCcw size={17} aria-hidden="true" />
        </button>
      </div>
    </main>
  );
}
