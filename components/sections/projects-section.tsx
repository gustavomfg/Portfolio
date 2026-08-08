import { ArrowUpRight, Check, Code2 } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { AccordionGallery } from "@/components/sections/accordion-gallery";
import { ProjectExplorer, ProjectTrigger } from "@/components/sections/project-explorer";
import { ScrollStack } from "@/components/sections/scroll-stack";
import { SpotlightList } from "@/components/sections/spotlight-list";
import { NOCTURNE_STUDIO_EVIDENCE, SYSMON_EVIDENCE } from "@/data/portfolio";
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
          </div>
          <div className="studio-feature-grid" id="projeto-studio">
            <div className="studio-feature-copy">
              <p className="project-role">{studio.role}</p>
              <h3>{studio.name}</h3>
              <p className="studio-description">{studio.description}</p>
              <AccordionGallery />
            </div>

            <dl className="studio-record">
              <div>
                <dt>Versão / estado</dt>
                <dd>{NOCTURNE_STUDIO_EVIDENCE.version} · beta</dd>
              </div>
              <div>
                <dt>Problema técnico</dt>
                <dd>{studio.problem}</dd>
              </div>
              <div>
                <dt>Evidência de engenharia</dt>
                <dd>
                  <ul>
                    {NOCTURNE_STUDIO_EVIDENCE.keyEvidence.map((item) => (
                      <li key={item}><Check size={14} aria-hidden="true" />{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt>Review Mode</dt>
                <dd>{NOCTURNE_STUDIO_EVIDENCE.reviewModeSummary}</dd>
              </div>
              <div>
                <dt>Arquitetura</dt>
                <dd>{NOCTURNE_STUDIO_EVIDENCE.architectureSummary}</dd>
              </div>
              <div>
                <dt>Providers documentados</dt>
                <dd>{NOCTURNE_STUDIO_EVIDENCE.providers.join(", ")}.</dd>
              </div>
              <div>
                <dt>Estado e limitações</dt>
                <dd>{NOCTURNE_STUDIO_EVIDENCE.stateSummary}</dd>
              </div>
              <div>
                <dt>Evidência pública</dt>
                <dd>
                  {studioSource ? (
                    <a href={studioSource.href} target="_blank" rel="noreferrer">
                      <Code2 size={15} aria-hidden="true" /> Ver código-fonte
                    </a>
                  ) : (
                    "Nenhum link público disponível."
                  )}
                </dd>
              </div>
            </dl>
          </div>
          <p className="evidence-gap">
            Screenshots, diagramas, benchmarks e cobertura de testes ainda não estão disponíveis nesta base. Serão adicionados somente quando houver fontes verificáveis.
          </p>
        </Reveal>

        <section className="priority-secondary" aria-labelledby="sysmon-title">
          <div className="priority-heading">
            <h3 id="sysmon-title">Segundo projeto em destaque</h3>
            <span>Base factual</span>
          </div>
          <div className="sysmon-record">
            <div>
              <p className="project-role">Monitor de sistema</p>
              <h4>SysMon</h4>
              <p className="sysmon-stack">{SYSMON_EVIDENCE.stack.join(" · ")}</p>
            </div>
            <div className="sysmon-record-copy">
              <ScrollStack
                items={[
                  {
                    eyebrow: "Telemetria confirmada",
                    title: "Leitura em tempo real",
                    text: `${SYSMON_EVIDENCE.telemetry.join(", ")}.`,
                  },
                  {
                    eyebrow: "Metrics architecture",
                    title: "Métricas com contexto",
                    text: SYSMON_EVIDENCE.architecture.join("; ") + ".",
                  },
                  {
                    eyebrow: "Health Engine",
                    title: "Atividade ou pressão",
                    text: "Diferencia atividade de pressão do sistema.",
                  },
                  {
                    eyebrow: "System Pulse",
                    title: "Estado agregado",
                    text: "Representação procedural que reage ao estado agregado da máquina.",
                  },
                ]}
              />
              <p className="evidence-gap">Repositório, screenshots, benchmarks, testes, cobertura, compatibilidade adicional e métricas de uso ainda não estão disponíveis nesta base.</p>
            </div>
          </div>
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
