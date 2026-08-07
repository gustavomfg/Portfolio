import { ArrowUpRight, Check, Code2 } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { ProjectExplorer, ProjectTrigger } from "@/components/sections/project-explorer";
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
            Construo aplicações para transformar estudo em experiência prática. Cada projeto abaixo deve ser lido como evidência do que estou aprendendo e da forma como penso software.
          </p>
        </header>

        <Reveal className="studio-feature" distance={18}>
          <div className="studio-feature-heading">
            <span>Projeto principal / evidência atual</span>
            <span>01 / {String(projects.length).padStart(2, "0")}</span>
          </div>
          <div className="studio-feature-grid" id="projeto-studio">
            <div className="studio-feature-copy">
              <p className="project-role">{studio.role}</p>
              <h3>{studio.name}</h3>
              <p className="studio-description">{studio.description}</p>
              <ProjectTrigger index={0} name={studio.name}>
                Abrir evidências disponíveis <ArrowUpRight size={16} aria-hidden="true" />
              </ProjectTrigger>
            </div>

            <dl className="studio-record">
              <div>
                <dt>Versão / estado</dt>
                <dd>{NOCTURNE_STUDIO_EVIDENCE.version} · beta</dd>
              </div>
              <div>
                <dt>Princípio central</dt>
                <dd>{NOCTURNE_STUDIO_EVIDENCE.principle}</dd>
              </div>
              <div>
                <dt>Problema técnico</dt>
                <dd>{studio.problem}</dd>
              </div>
              <div>
                <dt>Implementado</dt>
                <dd>
                  <ul>
                    {NOCTURNE_STUDIO_EVIDENCE.implemented.map((item) => (
                      <li key={item}><Check size={14} aria-hidden="true" />{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt>Review Mode</dt>
                <dd>
                  <p>{NOCTURNE_STUDIO_EVIDENCE.reviewMode.note}</p>
                  <strong>Dimensões:</strong>
                  <ul>
                    {NOCTURNE_STUDIO_EVIDENCE.reviewMode.dimensions.map((item) => (
                      <li key={item}><Check size={14} aria-hidden="true" />{item}</li>
                    ))}
                  </ul>
                  <strong>Campos das recomendações:</strong>
                  <ul>
                    {NOCTURNE_STUDIO_EVIDENCE.reviewMode.recommendationFields.map((item) => (
                      <li key={item}><Check size={14} aria-hidden="true" />{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt>Arquitetura / segurança</dt>
                <dd>
                  <ul>
                    {NOCTURNE_STUDIO_EVIDENCE.architecture.map((item) => (
                      <li key={item}><Check size={14} aria-hidden="true" />{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt>Providers documentados</dt>
                <dd>
                  <ul>
                    {NOCTURNE_STUDIO_EVIDENCE.providers.map((item) => (
                      <li key={item}><Check size={14} aria-hidden="true" />{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt>Em desenvolvimento</dt>
                <dd>
                  <ul>
                    {NOCTURNE_STUDIO_EVIDENCE.inDevelopment.map((item) => (
                      <li key={item}><Check size={14} aria-hidden="true" />{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt>Limitações honestas</dt>
                <dd>
                  <ul>
                    {NOCTURNE_STUDIO_EVIDENCE.limitations.map((item) => (
                      <li key={item}><Check size={14} aria-hidden="true" />{item}</li>
                    ))}
                  </ul>
                </dd>
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
            Screenshots, diagramas, métricas, benchmarks, cobertura de testes e demais artefatos visuais ainda não estão disponíveis nesta base. Eles serão adicionados somente quando houver fontes verificáveis.
          </p>
        </Reveal>

        <section className="priority-secondary" aria-labelledby="sysmon-title">
          <div className="priority-heading">
            <h3 id="sysmon-title">Segundo destaque prioritário</h3>
            <span>Evidência pendente</span>
          </div>
          <div className="sysmon-record">
            <div>
              <p className="project-role">Monitor de sistema</p>
              <h4>SysMon</h4>
              <p className="sysmon-stack">{SYSMON_EVIDENCE.stack.join(" · ")}</p>
            </div>
            <div className="sysmon-record-copy">
              <p>{SYSMON_EVIDENCE.definition}</p>
              <p><strong>Telemetria confirmada:</strong> {SYSMON_EVIDENCE.telemetry.join(", ")}.</p>
              <p><strong>Arquitetura de métricas:</strong> {SYSMON_EVIDENCE.architecture.join("; ")}.</p>
              <p><strong>Health Engine / System Pulse:</strong> {SYSMON_EVIDENCE.healthEngine}</p>
              <p className="evidence-gap">Repositório, screenshots, benchmarks, testes, cobertura, compatibilidade adicional e métricas de uso ainda não estão disponíveis nesta base.</p>
            </div>
          </div>
        </section>

        <section className="project-index" aria-labelledby="other-projects-title">
          <div className="index-heading">
            <h3 id="other-projects-title">Outros projetos</h3>
            <p>Registros compactos da minha evolução técnica.</p>
          </div>
          <div className="project-index-list">
            {secondaryProjects.map((project) => (
              <article className="project-index-item" key={project.key}>
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
          </div>
        </section>
      </section>
    </ProjectExplorer>
  );
}
