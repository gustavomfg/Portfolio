import { ArrowUpRight, Code2 } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";
import { SysmonDepthShowcase } from "@/components/sections/depth-carousel";
import { NocturneStudioEvidence } from "@/components/sections/nocturne-studio-evidence";
import { ProjectExplorer, ProjectTrigger } from "@/components/sections/project-explorer";
import { SmokedGlassList } from "@/components/sections/smoked-glass-list";
import { NOCTURNE_STUDIO_EVIDENCE } from "@/data/portfolio";
import type { Project } from "@/types/portfolio";

interface ProjectsSectionProps {
  projects: readonly Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const studio = projects[0];
  const secondaryProjects = projects.filter((project) => project.key !== "studio" && project.key !== "portfolio");
  const studioSource = studio?.links?.find((link) => link.type === "source");

  if (!studio) return null;

  return (
    <ProjectExplorer projects={projects}>
      <section className="projects-section section-shell" id="projetos">
        <header className="evidence-heading">
          <h2>Projetos que mostram como eu construo</h2>
          <p>
            Arquitetura, decisões e implementação mostram como cada projeto toma forma
          </p>
        </header>

        <Reveal className="studio-feature" distance={18}>
          <div className="studio-feature-heading">
            <span>Projeto principal / registro atual</span>
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
            <NocturneStudioEvidence />
          </div>

          <div className="studio-evidence-dossier">
            <div className="studio-dossier-heading">
              <span>Depois da superfície</span>
              <span>Registro técnico</span>
            </div>
            <div className="studio-evidence-groups">
              <article className="studio-evidence-group">
                <p className="studio-evidence-group-label">01 / Arquitetura</p>
                <h4>Workspace conectado por fronteiras explícitas</h4>
                <p>
                  Electron, React, TypeScript e SQLite com IPC tipado. O renderer permanece isolado por contextIsolation, nodeIntegration desabilitado e uma fronteira preload/contextBridge; o Provider Abstraction Layer separa o workspace dos provedores
                </p>
              </article>
              <article className="studio-evidence-group">
                <p className="studio-evidence-group-label">02 / Review Mode</p>
                <h4>Recomendações que continuam sob revisão humana.</h4>
                <p>
                  O Review Mode analisa arquitetura, segurança, testes, performance, documentação e manutenibilidade. Cada recomendação pode registrar evidência, confiança, origem, responsável, severidade, justificativa e histórico de decisão antes de qualquer alteração
                </p>
              </article>
              <article className="studio-evidence-group">
                <p className="studio-evidence-group-label">03 / Estado atual</p>
                <h4>Base implementada, com frentes em expansão</h4>
                <p>
                  Workspace Memory, Second Brain, Awareness explicável, Secure Provider System, Credential Vault, Typed IPC, Packaging Pipeline e CI Validation estão implementados {NOCTURNE_STUDIO_EVIDENCE.stateSummary}
                </p>
                <p className="studio-evidence-providers">
                  Providers documentados: {NOCTURNE_STUDIO_EVIDENCE.providers.join(", ")}.
                </p>
              </article>
            </div>
          </div>
        </Reveal>

        <section className="priority-secondary" aria-labelledby="sysmon-title">
          <SysmonDepthShowcase />
        </section>

        <section className="project-index" aria-labelledby="other-projects-title">
          <div className="index-heading">
            <h3 id="other-projects-title">Outros projetos</h3>
            <p>Índice técnico</p>
          </div>
          <SmokedGlassList>
            {secondaryProjects.map((project) => (
              <article className={`project-index-item${project.key === "control" ? " project-index-item--control" : ""}${project.key === "inspector" ? " project-index-item--inspector" : ""}`} data-smoked-glass-item="true" key={project.key}>
                {project.key === "control" ? (
                  <Image
                    className="project-index-evidence"
                    src="/nocturne-control/dashboard.png"
                    alt=""
                    aria-hidden="true"
                    width={1920}
                    height={959}
                    sizes="(max-width: 700px) calc(100vw - 32px), 1240px"
                    unoptimized
                    draggable={false}
                  />
                ) : null}
                {project.key === "inspector" ? (
                  <Image
                    className="project-index-evidence"
                    src="/nocturne-inspector/inspector.png"
                    alt=""
                    aria-hidden="true"
                    width={1294}
                    height={811}
                    sizes="(max-width: 700px) calc(100vw - 32px), 1240px"
                    unoptimized
                    draggable={false}
                  />
                ) : null}
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
          </SmokedGlassList>
        </section>
      </section>
    </ProjectExplorer>
  );
}
