"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { usePointerGlow } from "@/hooks/use-pointer-glow";
import type { Project } from "@/types/portfolio";

interface ProjectsSectionProps {
  projects: readonly Project[];
  onOpenProject: (index: number, trigger: HTMLElement | null) => void;
}

export function ProjectsSection({ projects, onOpenProject }: ProjectsSectionProps) {
  const updatePointerGlow = usePointerGlow();

  return (
    <section className="ecosystem section-shell" id="ecossistema">
      <Reveal>
        <SectionHeading
          eyebrow="Ecossistema Nocturne"
          title="O núcleo do Nocturne."
          copy="Quatro projetos que compartilham princípios de engenharia, documentação e uma mesma identidade."
        />
      </Reveal>

      <div className="project-list">
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <Reveal key={project.key}>
              <article
                className={`project-card project-${project.accent}`}
                id={project.key}
                onPointerMove={updatePointerGlow}
              >
                <button
                  className="project-card-trigger"
                  type="button"
                  aria-label={`Abrir detalhes de ${project.name}`}
                  aria-haspopup="dialog"
                  onClick={(e) => onOpenProject(index, e.currentTarget)}
                />
                <div className="project-index">{project.id}<span>/04</span></div>
                <div className="project-icon"><Icon size={28} strokeWidth={1.6} /></div>
                <div className="project-content">
                  <p>{project.role}</p>
                  <h3>{project.name}</h3>
                  <span>{project.description}</span>
                </div>
                <div className="project-tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <span className="project-link" aria-hidden="true">
                  <span>Abrir projeto</span><ArrowUpRight size={21} />
                </span>
                {index < projects.length - 1 && (
                  <div className="flow-label"><span />{index === 0 ? "INFORMS" : "EXPRESSES"}<span /></div>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
