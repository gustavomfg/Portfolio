"use client";

import { ArrowDown, ArrowRight, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import { BrandMark } from "@/components/ui/brand-mark";
import { useHydrated } from "@/hooks/use-hydrated";
import { usePointerGlow } from "@/hooks/use-pointer-glow";
import type { Project } from "@/types/portfolio";

interface HeroSectionProps {
  projects: readonly Project[];
  activeProject: number;
  onSelectProject: (index: number) => void;
}

function getNodePosition(index: number, total: number) {
  const angle = -3 * Math.PI / 4 + (2 * Math.PI * index) / total;

  return {
    x: 50 + Math.cos(angle) * 30,
    y: 50 + Math.sin(angle) * 32,
  };
}

export function HeroSection({ projects, activeProject, onSelectProject }: HeroSectionProps) {
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();
  const shouldAnimate = hydrated && !reduceMotion;
  const updatePointerGlow = usePointerGlow();
  const selectedProject = projects[activeProject];
  const nodePositions = projects.map((_, index) => getNodePosition(index, projects.length));

  if (!selectedProject) return null;

  return (
    <section className="hero section-shell" id="inicio">
      <div className="hero-grid">
        <motion.div
          key={shouldAnimate ? "animated-copy" : "static-copy"}
          className="hero-copy"
          initial={shouldAnimate ? { opacity: 0, y: 28 } : false}
          whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
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
        </motion.div>

        <motion.div
          key={shouldAnimate ? "animated-visual" : "static-visual"}
          className="system-visual"
          initial={shouldAnimate ? { opacity: 0, scale: 0.95 } : false}
          whileInView={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.18, duration: 0.9 }}
          aria-label="Fluxo do ecossistema Nocturne"
          onPointerMove={updatePointerGlow}
        >
          <div className="pointer-glow" aria-hidden="true" />
          <div className="visual-grid" />
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="core-mark"><BrandMark /></div>
          <span className="core-caption">NOCTURNE / CORE</span>
          <svg
            className="map-connections"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {nodePositions.map(({ x, y }, index) => (
              <path
                className="connection-base"
                d={`M50 50 L${x} ${y}`}
                key={`base-${projects[index]?.key ?? index}`}
              />
            ))}
            {nodePositions.map(({ x, y }, index) => (
              <path
                className="connection-flow"
                pathLength="1"
                d={`M50 50 L${x} ${y}`}
                key={`flow-${projects[index]?.key ?? index}`}
                style={{ animationDelay: `${index * -1.2}s` }}
              />
            ))}
          </svg>
          {projects.map((project, index) => {
            const Icon = project.icon;
            const position = nodePositions[index];

            if (!position) return null;

            return (
              <button
                className={`system-node ${activeProject === index ? "is-active" : ""}`}
                key={project.key}
                type="button"
                style={{
                  "--node-x": `${position.x}%`,
                  "--node-y": `${position.y}%`,
                } as CSSProperties}
                onClick={() => onSelectProject(index)}
                aria-label={`Destacar ${project.name}`}
                aria-pressed={activeProject === index}
              >
                <span className="node-icon"><Icon size={18} /></span>
                <span><small>0{index + 1}</small>{project.name.replace("Nocturne ", "")}</span>
              </button>
            );
          })}
          <div className="system-status"><span /> SYSTEMS CONNECTED</div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              className="active-readout"
              key={selectedProject.key}
              initial={reduceMotion ? false : { opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.24 }}
            >
              <small>ACTIVE / {selectedProject.id}</small>
              <strong>{selectedProject.name}</strong>
              <span>{selectedProject.role}</span>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="featured-rail" aria-label="Projetos em destaque">
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <button
              type="button"
              key={project.key}
              className={`featured-mini ${activeProject === index ? "is-active" : ""}`}
              onClick={() => onSelectProject(index)}
              aria-pressed={activeProject === index}
            >
              <span className="featured-number">{project.id}</span>
              <Icon size={19} />
              <span><small>{project.role}</small><strong>{project.name}</strong></span>
              <ChevronRight className="featured-arrow" size={18} />
            </button>
          );
        })}
      </div>
    </section>
  );
}
