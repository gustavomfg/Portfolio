"use client";

import {
  createContext,
  useContext,
  type MouseEvent,
  type ReactNode,
} from "react";
import { ProjectDialog } from "@/components/sections/project-dialog";
import { useProjectDialog } from "@/hooks/use-project-dialog";
import { usePointerGlow } from "@/hooks/use-pointer-glow";
import type { Project } from "@/types/portfolio";

const ProjectExplorerContext = createContext<ReturnType<typeof useProjectDialog>["openProject"] | null>(null);

interface ProjectExplorerProps {
  children: ReactNode;
  projects: readonly Project[];
}

export function ProjectExplorer({ children, projects }: ProjectExplorerProps) {
  const projectDialog = useProjectDialog();
  const selectedProject = projectDialog.selectedProject === null
    ? null
    : projects[projectDialog.selectedProject] ?? null;

  return (
    <ProjectExplorerContext value={projectDialog.openProject}>
      {children}
      <ProjectDialog
        project={selectedProject}
        onClose={projectDialog.closeProject}
        dialogRef={projectDialog.dialogRef}
      />
    </ProjectExplorerContext>
  );
}

interface ProjectCardProps {
  accent: Project["accent"];
  children: ReactNode;
  projectKey: string;
}

export function ProjectCard({ accent, children, projectKey }: ProjectCardProps) {
  const updatePointerGlow = usePointerGlow();

  return (
    <article
      className={`project-card project-${accent}`}
      id={projectKey}
      onPointerMove={updatePointerGlow}
    >
      {children}
    </article>
  );
}

interface ProjectTriggerProps {
  index: number;
  name: string;
}

export function ProjectTrigger({ index, name }: ProjectTriggerProps) {
  const openProject = useContext(ProjectExplorerContext);

  if (!openProject) {
    throw new Error("ProjectTrigger must be rendered inside ProjectExplorer.");
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    openProject(index, event.currentTarget);
  };

  return (
    <button
      className="project-card-trigger"
      type="button"
      aria-label={`Abrir detalhes de ${name}`}
      aria-haspopup="dialog"
      onClick={handleClick}
    />
  );
}
