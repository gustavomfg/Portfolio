import { ArrowUpRight, Mail } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";

export function ContactSection() {
  return (
    <section className="contact section-shell" id="contato">
      <Reveal className="contact-card">
        <div className="contact-glow" />
        <p className="eyebrow"><span>+</span>Vamos conversar</p>
        <h2>Vamos construir<br /><em>algo interessante?</em></h2>
        <p className="contact-copy">Estou aberto a oportunidades, colaborações e boas conversas sobre software, arquitetura e tecnologia.</p>
        <div className="contact-actions">
          <a className="button button-light" href="mailto:gustavomfgdev@gmail.com">
            Enviar uma mensagem <Mail size={17} />
          </a>
          <div className="social-links">
            <a href="https://github.com/gustavomfg" target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/gustavomfg" target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
        <a className="contact-email" href="mailto:gustavomfgdev@gmail.com">
          gustavomfgdev@gmail.com
        </a>
      </Reveal>
    </section>
  );
}
