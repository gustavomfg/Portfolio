import { ArrowUpRight, Mail } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";

export function ContactSection() {
  return (
    <section className="contact section-shell" id="contato">
      <Reveal className="contact-layout" distance={18}>
        <div>
          <h2>Vamos conversar sobre uma <em>oportunidade?</em></h2>
          <p className="contact-copy">Busco oportunidades de estágio ou desenvolvimento júnior para colaborar com outros profissionais e continuar evoluindo por meio de desafios reais.</p>
        </div>
        <div className="contact-links">
          <a className="button button-primary" href="mailto:gustavomfgdev@gmail.com">
            Enviar uma mensagem <Mail size={17} />
          </a>
          <div className="contact-link-list">
            <a href="https://github.com/gustavomfg" target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/gustavomfg" target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a href="/curriculo-gustavo-maquias.pdf" target="_blank" rel="noreferrer" download="curriculo-gustavo-maquias.pdf">
              Currículo <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
          <a className="contact-email" href="mailto:gustavomfgdev@gmail.com">
            gustavomfgdev@gmail.com
          </a>
        </div>
      </Reveal>
    </section>
  );
}
