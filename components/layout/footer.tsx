import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";

export function Footer() {
  return (
    <footer className="site-footer section-shell">
      <div className="footer-brand"><BrandMark /><span>GUSTAVO MAQUIAS</span></div>
      <p>Engenharia, aprendizado contínuo e software construído com propósito.</p>
      <a href="#inicio">Voltar ao topo <ArrowUpRight size={15} /></a>
    </footer>
  );
}
