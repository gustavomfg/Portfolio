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
            eyebrow="Projetos em destaque"
            title="Conhecimento aplicado em software real."
            copy="Projetos pessoais que registram minha evolução técnica e transformam estudos de arquitetura, web, desktop e inteligência artificial em experiência prática."
          />
        </Reveal>

        <div className="project-list">
          {projects.map((project, index) => (
            <Reveal key={project.key}>
              <ProjectCard accent={project.accent} projectKey={project.key}>
                <ProjectTrigger index={index} name={project.name} />
                <div className="project-card-head">
                  <div className="project-index">{project.id}<span>/{projectTotal}</span></div>
                  <div className="project-status"><span />{project.status}</div>
                </div>
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
              </ProjectCard>
            </Reveal>
          ))}
        </div>
      </section>
    </ProjectExplorer>
  );
}
