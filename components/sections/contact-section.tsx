import { Mail } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";

export function ContactSection() {
  return (
    <section className="contact section-shell" id="contato">
      <Reveal className="contact-card">
        <div className="contact-glow" />
        <p className="eyebrow"><span>+</span>Vamos conversar</p>
        <h2>Quer conversar sobre<br /><em>algum projeto?</em></h2>
        <p className="contact-copy">Estou aberto a oportunidades e conversas sobre software, produto e tecnologia.</p>
        <div className="contact-actions">
          <a className="button button-light" href="mailto:contato@exemplo.com">Enviar uma mensagem <Mail size={17} /></a>
          <div className="social-links">
            <a href="#" aria-label="GitHub"><span aria-hidden="true">GH</span></a>
            <a href="#" aria-label="LinkedIn"><span aria-hidden="true">in</span></a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
