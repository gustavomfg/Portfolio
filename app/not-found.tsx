import { ArrowLeft, Compass } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "@/components/ui/brand-mark";

export default function NotFound() {
  return (
    <main className="status-page">
      <div className="status-card">
        <div className="status-brand"><BrandMark /><span>NOCTURNE</span></div>
        <span className="status-code">ERRO / 404</span>
        <Compass size={34} aria-hidden="true" />
        <h1>Esta rota saiu de órbita.</h1>
        <p>A página que você procura não existe ou foi movida para outra parte do ecossistema.</p>
        <Link className="button button-primary" href="/">
          <ArrowLeft size={17} aria-hidden="true" />
          Voltar ao portfólio
        </Link>
      </div>
    </main>
  );
}
