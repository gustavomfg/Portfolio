import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { SplitText } from "@/components/animations/split-text";
import { Reveal } from "@/components/animations/reveal";
import { HeroLanyard } from "@/components/sections/hero-lanyard";

export function HeroSection() {
  return (
    <section className="hero section-shell" id="inicio">
      <div className="hero-grid">
        <div className="hero-copy">
          <h1>
            <SplitText text="Gustavo Maquias" />
            <span>Desenvolvedor Full Stack em início de carreira.</span>
          </h1>
          <p className="hero-intro">
            Estudante de ADS que constrói aplicações web e desktop para aprofundar arquitetura, backend e engenharia de software.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projeto-studio">
              Ver projeto principal <ArrowDown size={17} aria-hidden="true" />
            </a>
            <a className="button button-ghost" href="#contato">
              Entrar em contato <Mail size={17} aria-hidden="true" />
            </a>
          </div>
          <nav className="hero-links" aria-label="Links profissionais">
            <a href="https://github.com/gustavomfg" target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/gustavomfg" target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a href="/curriculo-gustavo-maquias.pdf" target="_blank" rel="noreferrer" download="curriculo-gustavo-maquias.pdf">
              Currículo <small>PDF</small> <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </nav>
        </div>

        <Reveal className="hero-lanyard-entry" delay={0.08} distance={12}>
          <HeroLanyard />
        </Reveal>
      </div>
    </section>
  );
}
