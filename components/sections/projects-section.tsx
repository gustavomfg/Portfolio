import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import {
  ProjectCard,
  ProjectExplorer,
  ProjectTrigger,
} from "@/components/sections/project-explorer";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectIcon } from "@/components/ui/project-icon";
import type { Project } from "@/types/portfolio";

interface ProjectsSectionProps {
  projects: readonly Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const projectTotal = String(projects.length).padStart(2, "0");

  return (
    <ProjectExplorer projects={projects}>
      <section className="ecosystem section-shell" id="ecossistema">
        <Reveal>
          <SectionHeading
            eyebrow="Ecossistema Nocturne"
            title="O núcleo do Nocturne."
            copy="Quatro projetos que compartilham princípios de engenharia, documentação e uma mesma identidade."
          />
        </Reveal>

        <div className="project-list">
          {projects.map((project, index) => (
            <Reveal key={project.key}>
              <ProjectCard accent={project.accent} projectKey={project.key}>
                <ProjectTrigger index={index} name={project.name} />
                <div className="project-index">{project.id}<span>/{projectTotal}</span></div>
                <div className="project-icon">
                  <ProjectIcon icon={project.icon} size={28} strokeWidth={1.6} />
                </div>
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
              </ProjectCard>
            </Reveal>
          ))}
        </div>
      </section>
    </ProjectExplorer>
  );
}
