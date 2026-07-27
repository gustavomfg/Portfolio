import { ArrowDown, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { HeroProjectVisual } from "@/components/sections/hero-project-visual";
import type { Project } from "@/types/portfolio";

interface HeroSectionProps {
  projects: readonly Project[];
}

export function HeroSection({ projects }: HeroSectionProps) {
  return (
    <section className="hero section-shell" id="inicio">
      <div className="hero-grid">
        <Reveal className="hero-copy" distance={28}>
          <p className="hero-kicker"><span className="prompt-sign">~/</span> Gustavo Maquias</p>
          <h1>
            Análise e Desenvolvimento.
            <span>Aprendendo ao construir.</span>
          </h1>
          <p className="hero-intro">
            Sou estudante de Análise e Desenvolvimento de Sistemas e estou construindo meu caminho para o desenvolvimento Full Stack por meio de projetos reais, arquitetura e aprendizado contínuo.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#ecossistema">
              Explorar ecossistema <ArrowDown size={17} />
            </a>
            <a className="button button-ghost" href="#sobre">
              Conhecer meu trabalho <ArrowRight size={17} />
            </a>
          </div>
          <div className="hero-meta" aria-label="Resumo profissional">
            <div><strong>04</strong><span>projetos Nocturne</span></div>
            <div><strong>Full Stack</strong><span>foco profissional</span></div>
            <div><strong>BR / remoto</strong><span>base de trabalho</span></div>
          </div>
        </Reveal>

        <HeroProjectVisual projects={projects} />
      </div>
    </section>
  );
}
