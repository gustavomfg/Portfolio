import { Mail } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";

export function ContactSection() {
  return (
    <section className="contact section-shell" id="contato">
      <Reveal className="contact-layout" distance={18}>
        <div>
          <h2>Vamos conversar sobre uma <em>oportunidade?</em></h2>
          <p className="contact-copy">Busco uma primeira oportunidade para colaborar em software real e continuar evoluindo.</p>
        </div>
        <div className="contact-links">
          <a className="button button-primary" href="mailto:gustavomfgdev@gmail.com">
            Enviar uma mensagem <Mail size={17} />
          </a>
          <a className="contact-email" href="mailto:gustavomfgdev@gmail.com">
            gustavomfgdev@gmail.com
          </a>
        </div>
      </Reveal>
    </section>
  );
}
