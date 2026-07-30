"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useHydrated } from "@/hooks/use-hydrated";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}

export function Reveal({ children, className = "", delay = 0, distance = 24 }: RevealProps) {
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();
  const shouldAnimate = hydrated && !reduceMotion;

  return (
    <motion.div
      key={shouldAnimate ? "animated" : "static"}
      className={className}
      initial={shouldAnimate ? { opacity: 0, y: distance } : false}
      whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
