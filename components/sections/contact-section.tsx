"use client";

import { Mail } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";

export function ContactSection() {
  const openEmailClient = () => {
    const localPart = "666hhuuug".split("").reverse().join("");
    const domain = "moc.liamg".split("").reverse().join("");

    window.location.href = `mailto:${localPart}@${domain}`;
  };

  return (
    <section className="contact section-shell" id="contato">
      <Reveal className="contact-card">
        <div className="contact-glow" />
        <p className="eyebrow"><span>+</span>Vamos conversar</p>
        <h2>Vamos construir<br /><em>algo interessante?</em></h2>
        <p className="contact-copy">Estou aberto a oportunidades, colaborações e boas conversas sobre software, arquitetura e tecnologia.</p>
        <div className="contact-actions">
          <button className="button button-light" type="button" onClick={openEmailClient}>
            Enviar uma mensagem <Mail size={17} />
          </button>
          <div className="social-links">
            <a href="https://github.com/gustavomfg" target="_blank" rel="noreferrer" aria-label="GitHub de Gustavo Maquias">
              <span aria-hidden="true">GH</span>
            </a>
            <a href="https://www.linkedin.com/in/gustavomfg" target="_blank" rel="noreferrer" aria-label="LinkedIn de Gustavo Maquias">
              <span aria-hidden="true">in</span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
