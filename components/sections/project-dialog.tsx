"use client";

import { ArrowUpRight, Code2, ExternalLink, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { createPortal } from "react-dom";
import type { Ref } from "react";
import { ProjectEvidence } from "@/components/sections/project-evidence";
import type { Project } from "@/types/portfolio";
import type { ProjectDialogOrigin } from "@/hooks/use-project-dialog";

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
  dialogRef: Ref<HTMLDivElement>;
  origin?: ProjectDialogOrigin | null;
}

export function ProjectDialog({ project, onClose, dialogRef, origin }: ProjectDialogProps) {
  const reduceMotion = useReducedMotion();
  const originPoint = origin ? `${origin.x}px ${origin.y}px` : "50% 50%";

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-dialog-backdrop"
          initial={reduceMotion ? false : { opacity: 0, clipPath: `circle(0% at ${originPoint})` }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, clipPath: `circle(150% at ${originPoint})` }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: `circle(0% at ${originPoint})` }}
          transition={{ duration: reduceMotion ? 0.15 : 0.62, ease: [0.16, 1, 0.3, 1] }}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            ref={dialogRef}
            className={`project-dialog project-${project.accent}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            aria-describedby="project-dialog-description"
            initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.965 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.56, delay: reduceMotion ? 0 : 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="dialog-scroll-viewport">
              <DialogContent project={project} onClose={onClose} />
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function DialogContent({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <>
      <div className="dialog-topbar">
        <span>PROJETO {project.id} <i aria-hidden="true">/</i> ESTUDO DE CASO</span>
        <button type="button" onClick={onClose} aria-label="Fechar detalhes do projeto" autoFocus>
          <span>Fechar</span>
          <X size={17} aria-hidden="true" />
        </button>
      </div>

      <div className="dialog-case-study">
        <header className="dialog-hero">
          <div className="dialog-hero-copy">
            <p className="dialog-eyebrow">{project.role}</p>
            <h2 id="project-dialog-title">{project.name}</h2>
            <p className="dialog-lede" id="project-dialog-description">{project.description}</p>
          </div>
          <aside className="dialog-hero-stack" aria-label={`Tecnologias de ${project.name}`}>
            <span className="dialog-hero-stack-label">Feito com</span>
            <div>
              {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </aside>
        </header>

        <div className="dialog-visual" data-project-key={project.key}>
          <ProjectEvidence project={project} sizes="(max-width: 700px) calc(100vw - 58px), (max-width: 1100px) 88vw, 1100px" />
        </div>

        <div className="dialog-editorial">
          <article className="dialog-editorial-section dialog-purpose">
            <span className="dialog-section-index">01 <i>/</i></span>
            <div>
              <p className="dialog-section-label">O desafio</p>
              <h3>{project.problem}</h3>
            </div>
          </article>

          <article className="dialog-editorial-section dialog-engineering">
            <span className="dialog-section-index">02 <i>/</i></span>
            <div>
              <p className="dialog-section-label">Como foi construído</p>
              <h3>Decisões que definem o projeto.</h3>
              <ul className="dialog-highlight-list">
                {project.highlights.map((highlight, index) => (
                  <li key={highlight}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{highlight}</p>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>

        <footer className="dialog-actions">
          <div className="dialog-actions-copy">
            <p>Explore o projeto</p>
            <span>{project.key.toUpperCase()} <i aria-hidden="true">/</i> {project.id}</span>
          </div>
          {project.links?.length ? (
            <div className="dialog-links">
              {project.links.map((link) => (
                <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
                  {link.type === "source" ? <Code2 size={15} aria-hidden="true" /> : <ExternalLink size={15} aria-hidden="true" />}
                  <span>{link.label}</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          ) : (
            <span className="dialog-note">Links serão publicados quando estiverem prontos.</span>
          )}
        </footer>
      </div>
    </>
  );
}
