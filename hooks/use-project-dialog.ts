"use client";

import { useCallback, useEffect, useState } from "react";

export function useProjectDialog() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const closeProject = useCallback(() => setSelectedProject(null), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProject();
    };

    document.body.classList.toggle("dialog-open", selectedProject !== null);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("dialog-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeProject, selectedProject]);

  return {
    selectedProject,
    openProject: setSelectedProject,
    closeProject,
  };
}
