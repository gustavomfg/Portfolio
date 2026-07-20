"use client";

import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { IntroPhase } from "@/lib/intro-timeline";

interface IntroOverlayProps {
  phase: IntroPhase;
  onSkip: () => void;
}

const PHASE_ORDER: Record<IntroPhase, number> = {
  core: 0,
  orbit: 1,
  identity: 2,
  initialized: 3,
  settle: 4,
  collapse: 5,
  "text-exit": 6,
  veil: 7,
  reveal: 8,
  complete: 9,
};

export function IntroOverlay({ phase, onSkip }: IntroOverlayProps) {
  const showIdentity = PHASE_ORDER[phase] >= PHASE_ORDER.identity;
  const showInitialized = PHASE_ORDER[phase] >= PHASE_ORDER.initialized;
  const exiting = PHASE_ORDER[phase] >= PHASE_ORDER["text-exit"];

  return (
    <div className="intro-overlay">
      <div className="intro-identity" aria-live="polite">
        <AnimatePresence>
          {showIdentity && !exiting && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4, transition: { duration: 0.16 } }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <p>ECOSYSTEM CORE</p>
              <h1>NOCTURNE</h1>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showInitialized && !exiting && (
            <motion.p
              className="intro-initialized"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.14 } }}
              transition={{ duration: 0.55 }}
            >
              <span />SYSTEM INITIALIZED
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {!exiting && (
        <button className="intro-skip" type="button" onClick={onSkip}>
          Pular introdução <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
