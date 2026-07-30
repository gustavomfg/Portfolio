import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";

export function Footer() {
  return (
    <footer className="site-footer section-shell">
      <div className="footer-brand"><BrandMark /><span>NOCTURNE</span></div>
      <p>Construído com propósito e aprendizado contínuo.</p>
      <a href="#inicio">Voltar ao topo <ArrowUpRight size={15} /></a>
    </footer>
  );
}
