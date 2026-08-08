import { ArrowUpRight, Code2 } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { AccordionGallery } from "@/components/sections/accordion-gallery";
import { SysmonDepthShowcase } from "@/components/sections/depth-carousel";
import { ProjectExplorer, ProjectTrigger } from "@/components/sections/project-explorer";
import { SpotlightList } from "@/components/sections/spotlight-list";
import { NOCTURNE_STUDIO_EVIDENCE } from "@/data/portfolio";
import type { Project } from "@/types/portfolio";

interface ProjectsSectionProps {
  projects: readonly Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const studio = projects[0];
  const secondaryProjects = projects.slice(1);
  const studioSource = studio?.links?.find((link) => link.type === "source");

  if (!studio) return null;

  return (
    <ProjectExplorer projects={projects}>
      <section className="projects-section section-shell" id="projetos">
        <header className="evidence-heading">
          <h2>Projetos que sustentam minha candidatura.</h2>
          <p>
            Projetos reais são a principal evidência do que sei construir hoje.
          </p>
        </header>

        <Reveal className="studio-feature" distance={18}>
          <div className="studio-feature-heading">
            <span>Projeto principal / evidência atual</span>
            <span>{NOCTURNE_STUDIO_EVIDENCE.version}</span>
          </div>
          <div className="studio-feature-intro" id="projeto-studio">
            <div>
              <p className="project-role">{studio.role}</p>
              <h3>{studio.name}</h3>
              <p className="studio-description">{studio.description}</p>
            </div>
            <div className="studio-feature-actions">
              <p className="studio-feature-stack">{studio.tags.join(" · ")}</p>
              {studioSource ? (
                <a className="studio-source-link" href={studioSource.href} target="_blank" rel="noreferrer">
                  <Code2 size={15} aria-hidden="true" /> Ver código-fonte
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="studio-gallery-wrap">
            <AccordionGallery />
          </div>

          <div className="studio-evidence-dossier">
            <div className="studio-dossier-heading">
              <span>Depois da superfície</span>
              <span>Registro técnico verificável</span>
            </div>
            <div className="studio-evidence-groups">
              <article className="studio-evidence-group">
                <p className="studio-evidence-group-label">01 / Arquitetura</p>
                <h4>Workspace conectado por fronteiras explícitas.</h4>
                <p>
                  Electron, React, TypeScript e SQLite com IPC tipado. O renderer permanece isolado por contextIsolation, nodeIntegration desabilitado e uma fronteira preload/contextBridge; o Provider Abstraction Layer separa o workspace dos provedores.
                </p>
              </article>
              <article className="studio-evidence-group">
                <p className="studio-evidence-group-label">02 / Review Mode</p>
                <h4>Recomendações que continuam sob revisão humana.</h4>
                <p>
                  O Review Mode analisa arquitetura, segurança, testes, performance, documentação e manutenibilidade. Cada recomendação pode registrar evidência, confiança, origem, responsável, severidade, justificativa e histórico de decisão antes de qualquer alteração.
                </p>
              </article>
              <article className="studio-evidence-group">
                <p className="studio-evidence-group-label">03 / Estado atual</p>
                <h4>Beta verificável, com limites declarados.</h4>
                <p>
                  <strong>{NOCTURNE_STUDIO_EVIDENCE.version}</strong>. Workspace Memory, Second Brain, Awareness explicável, Secure Provider System, Credential Vault, Typed IPC, Packaging Pipeline e CI Validation estão implementados; recursos avançados de Build Mode, Docs Mode, Workspace Automation e a expansão de providers continuam em desenvolvimento.
                </p>
                <p className="studio-evidence-providers">
                  Providers documentados: {NOCTURNE_STUDIO_EVIDENCE.providers.join(", ")}.
                </p>
              </article>
            </div>
            <p className="evidence-gap">
              Screenshots, diagramas, benchmarks e cobertura de testes ainda não estão disponíveis nesta base.
            </p>
          </div>
        </Reveal>

        <section className="priority-secondary" aria-labelledby="sysmon-title">
          <SysmonDepthShowcase />
          <p className="evidence-gap sysmon-evidence-gap">Screenshots reais do SysMon ainda não estão disponíveis nesta base. Os slots acima permanecem explícitos para receber apenas capturas locais verificáveis.</p>
        </section>

        <section className="project-index" aria-labelledby="other-projects-title">
          <div className="index-heading">
            <h3 id="other-projects-title">Outros projetos</h3>
            <p>Índice técnico.</p>
          </div>
          <SpotlightList>
            {secondaryProjects.map((project) => (
              <article className="project-index-item" data-spotlight-item="true" key={project.key}>
                <div className="project-index-number">{project.id}</div>
                <div className="project-index-copy">
                  <p className="project-role">{project.role}</p>
                  <h4>{project.name}</h4>
                  <p>{project.description}</p>
                </div>
                <div className="project-index-meta">
                  <span>{project.tags.join(" · ")}</span>
                  <ProjectTrigger index={projects.indexOf(project)} name={project.name}>
                    Ver detalhes <ArrowUpRight size={15} aria-hidden="true" />
                  </ProjectTrigger>
                </div>
              </article>
            ))}
          </SpotlightList>
        </section>
      </section>
    </ProjectExplorer>
  );
}
