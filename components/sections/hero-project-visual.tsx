"use client";

import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type CSSProperties } from "react";
import { BrandMark } from "@/components/ui/brand-mark";
import { ProjectIcon } from "@/components/ui/project-icon";
import { useHydrated } from "@/hooks/use-hydrated";
import { usePointerGlow } from "@/hooks/use-pointer-glow";
import type { Project } from "@/types/portfolio";

interface HeroProjectVisualProps {
  projects: readonly Project[];
}

function getNodePosition(index: number, total: number) {
  const angle = -3 * Math.PI / 4 + (2 * Math.PI * index) / total;

  return {
    x: 50 + Math.cos(angle) * 30,
    y: 50 + Math.sin(angle) * 32,
  };
}

export function HeroProjectVisual({ projects }: HeroProjectVisualProps) {
  const [activeProject, setActiveProject] = useState(0);
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();
  const shouldAnimate = hydrated && !reduceMotion;
  const updatePointerGlow = usePointerGlow();
  const selectedProject = projects[activeProject];
  const nodePositions = projects.map((_, index) => getNodePosition(index, projects.length));

  if (!selectedProject) return null;

  return (
    <>
      <motion.div
        key={shouldAnimate ? "animated-visual" : "static-visual"}
        className="system-visual"
        initial={shouldAnimate ? { opacity: 0, scale: 0.95 } : false}
        whileInView={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ delay: 0.18, duration: 0.9 }}
        role="group"
        aria-label="Fluxo do ecossistema Nocturne"
        onPointerMove={updatePointerGlow}
      >
        <div className="pointer-glow" aria-hidden="true" />
        <div className="visual-grid" aria-hidden="true" />
        <div className="visual-orbit orbit-one" aria-hidden="true" />
        <div className="visual-orbit orbit-two" aria-hidden="true" />
        <div className="core-mark"><BrandMark /></div>
        <span className="core-caption">NOCTURNE / CORE</span>
        <svg
          className="map-connections"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {nodePositions.map(({ x, y }, index) => (
            <path
              className="connection-base"
              d={`M50 50 L${x} ${y}`}
              key={`base-${projects[index]?.key ?? index}`}
            />
          ))}
          {nodePositions.map(({ x, y }, index) => (
            <path
              className="connection-flow"
              pathLength="1"
              d={`M50 50 L${x} ${y}`}
              key={`flow-${projects[index]?.key ?? index}`}
              style={{ animationDelay: `${index * -1.2}s` }}
            />
          ))}
        </svg>
        {projects.map((project, index) => {
          const position = nodePositions[index];

          if (!position) return null;

          return (
            <button
              className={`system-node ${activeProject === index ? "is-active" : ""}`}
              key={project.key}
              type="button"
              style={{
                "--node-x": `${position.x}%`,
                "--node-y": `${position.y}%`,
              } as CSSProperties}
              onClick={() => setActiveProject(index)}
              aria-label={`Destacar ${project.name}`}
              aria-pressed={activeProject === index}
            >
              <span className="node-icon"><ProjectIcon icon={project.icon} size={18} /></span>
              <span><small>0{index + 1}</small>{project.name.replace("Nocturne ", "")}</span>
            </button>
          );
        })}
        <div className="system-status"><span /> SYSTEMS CONNECTED</div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="active-readout"
            key={selectedProject.key}
            initial={reduceMotion ? false : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.24 }}
          >
            <small>ACTIVE / {selectedProject.id}</small>
            <strong>{selectedProject.name}</strong>
            <span>{selectedProject.role}</span>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="featured-rail" aria-label="Projetos em destaque">
        {projects.map((project, index) => (
          <button
            type="button"
            key={project.key}
            className={`featured-mini ${activeProject === index ? "is-active" : ""}`}
            onClick={() => setActiveProject(index)}
            aria-pressed={activeProject === index}
          >
            <span className="featured-number">{project.id}</span>
            <ProjectIcon icon={project.icon} size={19} />
            <span><small>{project.role}</small><strong>{project.name}</strong></span>
            <ChevronRight className="featured-arrow" size={18} />
          </button>
        ))}
      </div>
    </>
  );
}
