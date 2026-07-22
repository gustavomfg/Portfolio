"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useProjectDialog() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const openProject = useCallback((index: number, trigger: HTMLElement | null) => {
    if (trigger) {
      triggerRef.current = trigger;
      previousActiveElement.current = trigger;
    }
    setSelectedProject(index);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProject();
    };

    const isOpen = selectedProject !== null;

    window.addEventListener("keydown", handleKeyDown);
    document.body.classList.toggle("dialog-open", isOpen);

    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.getElementById("conteudo")?.setAttribute("inert", "");

      const dialog = dialogRef.current;
      let tabCleanup = () => {};
      if (dialog) {
        const focusableElements = dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleTab = (e: KeyboardEvent) => {
          if (e.key !== "Tab") return;
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        };

        dialog.addEventListener("keydown", handleTab);
        firstElement?.focus();

        tabCleanup = () => {
          dialog.removeEventListener("keydown", handleTab);
        };
      }

      return () => {
        tabCleanup();
        window.removeEventListener("keydown", handleKeyDown);
        document.body.classList.remove("dialog-open");
        document.getElementById("conteudo")?.removeAttribute("inert");
      };
    } else {
      document.getElementById("conteudo")?.removeAttribute("inert");
      const trigger = triggerRef.current ?? previousActiveElement.current;
      trigger?.focus();
      triggerRef.current = null;
      previousActiveElement.current = null;

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.classList.remove("dialog-open");
        document.getElementById("conteudo")?.removeAttribute("inert");
      };
    }
  }, [selectedProject, closeProject]);

  return {
    selectedProject,
    openProject,
    closeProject,
    dialogRef,
  };
}
