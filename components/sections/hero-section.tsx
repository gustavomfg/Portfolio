import { ArrowDown, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { HeroProjectVisual } from "@/components/sections/hero-project-visual";
import type { Project } from "@/types/portfolio";

interface HeroSectionProps {
  projects: readonly Project[];
}

export function HeroSection({ projects }: HeroSectionProps) {
  const projectTotal = String(projects.length).padStart(2, "0");

  return (
    <section className="hero section-shell" id="inicio">
      <div className="hero-grid">
        <Reveal className="hero-copy" distance={28}>
          <p className="hero-kicker"><span className="prompt-sign">~/</span> Gustavo Maquias</p>
          <h1>
            Software com propósito.
            <span>Engenharia aprendida na prática.</span>
          </h1>
          <p className="hero-intro">
            Sou estudante de Análise e Desenvolvimento de Sistemas. Construo aplicações web e desktop para aprofundar Full Stack, arquitetura e práticas de engenharia.
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
            <div><strong>{projectTotal}</strong><span>projetos Nocturne</span></div>
            <div><strong>Full Stack</strong><span>foco profissional</span></div>
            <div><strong>BR / remoto</strong><span>base de trabalho</span></div>
          </div>
        </Reveal>

        <HeroProjectVisual projects={projects} />
      </div>
    </section>
  );
}
