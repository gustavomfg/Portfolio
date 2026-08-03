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
            Desenvolvedor em formação.
            <span>Engenharia construída na prática.</span>
          </h1>
          <p className="hero-intro">
            Sou estudante de Análise e Desenvolvimento de Sistemas, com foco em desenvolvimento Full Stack. Transformo aprendizado em aplicações reais para evoluir em arquitetura, backend, web e desktop.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#ecossistema">
              Conhecer meus projetos <ArrowDown size={17} />
            </a>
            <a className="button button-ghost" href="#sobre">
              Sobre mim <ArrowRight size={17} />
            </a>
          </div>
          <div className="hero-meta" aria-label="Resumo profissional">
            <div><strong>{projectTotal}</strong><span>projetos autorais</span></div>
            <div><strong>Full Stack</strong><span>objetivo profissional</span></div>
            <div><strong>Web & Desktop</strong><span>áreas de interesse</span></div>
          </div>
        </Reveal>

        <HeroProjectVisual projects={projects} />
      </div>
    </section>
  );
}
