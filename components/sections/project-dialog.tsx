"use client";

import { Check, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Project } from "@/types/portfolio";

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-dialog-backdrop"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            className={`project-dialog project-${project.accent}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.99 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <DialogContent project={project} onClose={onClose} />
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DialogContent({ project, onClose }: { project: Project; onClose: () => void }) {
  const Icon = project.icon;

  return (
    <>
      <div className="dialog-topbar">
        <span>PROJECT / {project.id}</span>
        <button type="button" onClick={onClose} aria-label="Fechar detalhes do projeto" autoFocus>
          <X size={18} />
        </button>
      </div>
      <div className="dialog-heading">
        <span className="dialog-project-icon"><Icon size={27} /></span>
        <div>
          <p>{project.role}</p>
          <h2 id="project-dialog-title">{project.name}</h2>
        </div>
      </div>
      <div className="dialog-status"><span /><strong>{project.status}</strong></div>
      <div className="dialog-content">
        <div>
          <small>O QUE O PROJETO RESOLVE</small>
          <p>{project.problem}</p>
        </div>
        <div>
          <small>DESTAQUES TÉCNICOS</small>
          <ul>
            {project.highlights.map((highlight) => (
              <li key={highlight}><Check size={15} />{highlight}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="dialog-footer">
        <div className="dialog-tags">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <span className="dialog-note">Mais informações e links em breve.</span>
      </div>
    </>
  );
}
