"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="pt-BR">
      <body>
        <main className="status-page">
          <div className="status-card">
            <span className="status-code">NOCTURNE / FALHA CRÍTICA</span>
            <AlertTriangle size={34} aria-hidden="true" />
            <h1>Não foi possível carregar o portfólio.</h1>
            <p>Tente novamente. Se o problema continuar, recarregue a página em alguns instantes.</p>
            <button className="button button-primary" type="button" onClick={reset}>
              Tentar novamente
              <RotateCcw size={17} aria-hidden="true" />
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
