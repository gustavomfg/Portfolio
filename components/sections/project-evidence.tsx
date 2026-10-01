import Image from "next/image";
import type { Project } from "@/types/portfolio";

interface ProjectEvidenceProps {
  project: Project;
  sizes?: string;
}

export function ProjectEvidence({
  project,
  sizes = "(max-width: 700px) 100vw, 60vw",
}: ProjectEvidenceProps) {
  if (project.key === "inspector") {
    return <InspectorEvidence />;
  }

  if (project.image) {
    return (
      <div className={`project-evidence project-evidence--${project.key}`}>
        <Image
          src={project.image}
          alt={project.imageAlt ?? `Registro visual de ${project.name}`}
          fill
          sizes={sizes}
          className="project-evidence-image"
        />
        {project.key === "control" ? (
          <span className="project-evidence-caption">FORMA PROCEDURAL / SOLARIS</span>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`project-evidence project-evidence--${project.key} project-evidence--fallback`} aria-hidden="true">
      <span>{project.id}</span>
      <strong>{project.name}</strong>
      <small>{project.role}</small>
    </div>
  );
}

function InspectorEvidence() {
  return (
    <div className="project-evidence project-evidence--inspector">
      <div className="inspector-preview-bar" aria-hidden="true">
        <span className="inspector-preview-mark">N</span>
        <span>NOCTURNE INSPECTOR</span>
        <span className="inspector-preview-mode">RELATÓRIO · SOMENTE LEITURA</span>
      </div>
      <div className="inspector-preview-content" aria-hidden="true">
        <aside className="inspector-preview-nav">
          <span className="is-active"><i>01</i> Visão geral</span>
          <span><i>02</i> Arquitetura</span>
          <span><i>03</i> Documentação</span>
        </aside>
        <div className="inspector-preview-report">
          <div className="inspector-preview-report-heading">
            <span>ANÁLISE DE ENGENHARIA</span>
            <span><i /> RESULTADO REPRODUZÍVEL</span>
          </div>
          <strong>Estrutura e documentação<br />em uma leitura só.</strong>
          <div className="inspector-preview-findings">
            <div><span>01</span><b>Arquitetura</b><i><em /></i><small>ANALISADA</small></div>
            <div><span>02</span><b>Documentação</b><i><em /></i><small>ANALISADA</small></div>
            <div><span>03</span><b>Projeto original</b><i><em /></i><small>INALTERADO</small></div>
          </div>
        </div>
      </div>
    </div>
  );
}
