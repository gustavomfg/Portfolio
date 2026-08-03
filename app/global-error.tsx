"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

const GLOBAL_ERROR_STYLES = `
  *, *::before, *::after { box-sizing: border-box; }
  html { min-height: 100%; background: #050407; color-scheme: dark; }
  body {
    min-width: 320px;
    min-height: 100%;
    margin: 0;
    background: #050407;
    color: #f4f2f8;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    -webkit-font-smoothing: antialiased;
  }
  .status-page {
    min-height: 100svh;
    width: min(100% - 32px, 760px);
    margin-inline: auto;
    display: grid;
    place-items: center;
    padding-block: 96px 48px;
  }
  .status-card {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding: clamp(30px, 7vw, 64px);
    border: 1px solid rgba(255, 255, 255, .07);
    border-radius: 17px;
    background: radial-gradient(circle at 88% 8%, rgba(145, 103, 255, .14), transparent 32%), rgba(10, 10, 16, .96);
    box-shadow: 0 24px 64px rgba(0, 0, 0, .25), inset 0 1px 0 rgba(255, 255, 255, .05);
  }
  .status-card::before {
    content: "";
    position: absolute;
    inset: 0 24px auto;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(169, 141, 255, .48), transparent);
  }
  .status-code {
    display: block;
    margin-bottom: 22px;
    color: #c6b3ff;
    font-size: .75rem;
    letter-spacing: .1em;
  }
  .status-card > svg { display: block; color: #c6b3ff; }
  .status-card h1 {
    max-width: 620px;
    margin: 24px 0 16px;
    color: #f4f2f8;
    font-size: clamp(38px, 7vw, 68px);
    line-height: 1.02;
    letter-spacing: -.055em;
    font-weight: 500;
    text-wrap: balance;
  }
  .status-card p {
    max-width: 540px;
    margin: 0 0 30px;
    color: #b3afbb;
    line-height: 1.7;
  }
  .status-card .button {
    min-height: 47px;
    width: fit-content;
    padding: 0 18px;
    border: 0;
    border-radius: 9px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 11px;
    background: #f1edf9;
    color: #121016;
    cursor: pointer;
    font: 600 .75rem ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }
  .status-card .button:focus-visible {
    outline: 2px solid #c6b3ff;
    outline-offset: 4px;
  }
  @media (max-width: 700px) {
    .status-card .button { width: 100%; }
  }
`;

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{GLOBAL_ERROR_STYLES}</style>
      </head>
      <body>
        <main className="status-page">
          <div className="status-card">
            <span className="status-code">PORTFÓLIO / FALHA CRÍTICA</span>
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
