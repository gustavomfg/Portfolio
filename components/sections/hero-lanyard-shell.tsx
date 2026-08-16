"use client";

import { useCallback, useEffect, useState, type ComponentType } from "react";
import Image from "next/image";

interface HeroLanyardSceneProps {
  active: boolean;
  onReady?: () => void;
  onContextLost?: () => void;
}

type HeroLanyardSceneComponent = ComponentType<HeroLanyardSceneProps>;

function useHeroSceneVisibility(root: HTMLElement | null) {
  const [sceneVisible, setSceneVisible] = useState(true);

  useEffect(() => {
    if (!root) return;

    const isInViewport = () => {
      const bounds = root.getBoundingClientRect();
      return bounds.bottom > 0 && bounds.top < window.innerHeight;
    };

    const handleVisibility = (entries: IntersectionObserverEntry[]) => {
      setSceneVisible(entries[0]?.isIntersecting ?? false);
    };

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(handleVisibility, { rootMargin: "0px", threshold: 0 })
      : null;

    if (observer) {
      observer.observe(root);
    }

    const visibilityFrame = window.requestAnimationFrame(() => setSceneVisible(isInViewport()));

    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(visibilityFrame);
    };
  }, [root]);

  return sceneVisible;
}

function HeroLanyardFallback({ visible }: { visible: boolean }) {
  return (
    <div
      className="hero-lanyard"
      data-lanyard-state={visible ? "fallback" : "loading"}
      role="img"
      aria-hidden={!visible}
      aria-label="Identidade visual de Gustavo Maquias, desenvolvedor Full Stack"
    >
      <span className="sr-only">
        Gustavo Maquias, desenvolvedor Full Stack. Identidade visual em formato de crachá técnico.
      </span>
      <div className="lanyard-cord" aria-hidden="true">
        <span />
      </div>
      <div className="lanyard-badge" aria-hidden="true">
        <div className="lanyard-clip" />
        <div className="lanyard-header">
          <span>CADERNO TÉCNICO / 01</span>
          <span>PORTFÓLIO</span>
        </div>
        <div className="lanyard-mark">
          <Image className="lanyard-photo" src="/profile/eu.jpeg" alt="" aria-hidden="true" width={54} height={54} unoptimized draggable={false} />
        </div>
        <div className="lanyard-name">GUSTAVO MAQUIAS</div>
        <div className="lanyard-role">FULL STACK DEVELOPER</div>
        <div className="lanyard-rule" />
        <div className="lanyard-note">BUILD · DOCUMENT · EVOLVE</div>
      </div>
    </div>
  );
}

export function HeroLanyardShell() {
  const [heroVisualRoot, setHeroVisualRoot] = useState<HTMLDivElement | null>(null);
  const [sceneComponent, setSceneComponent] = useState<HeroLanyardSceneComponent | null>(null);
  const [sceneCanvasReady, setSceneCanvasReady] = useState(false);
  const [sceneLoadFailed, setSceneLoadFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sceneVisible = useHeroSceneVisibility(heroVisualRoot);

  useEffect(() => {
    if (!heroVisualRoot) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = window.requestAnimationFrame(() => setReducedMotion(true));
      return () => window.cancelAnimationFrame(frame);
    }

    performance.mark("hero-lanyard-scene-request");
    let cancelled = false;
    void import("@/components/sections/hero-lanyard")
      .then(({ HeroLanyard }) => {
        if (!cancelled) {
          performance.mark("hero-lanyard-scene-chunk-ready");
          setSceneComponent(() => HeroLanyard);
        }
      })
      .catch(() => {
        if (!cancelled) setSceneLoadFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [heroVisualRoot]);

  const handleSceneReady = useCallback(() => {
    performance.mark("hero-lanyard-canvas-ready");
    setSceneCanvasReady(true);
  }, []);
  const handleSceneContextLost = useCallback(() => setSceneCanvasReady(false), []);
  const SceneComponent = sceneComponent;
  const fallbackVisible = reducedMotion || sceneLoadFailed;
  const sceneState = fallbackVisible
    ? "fallback"
    : SceneComponent && sceneCanvasReady
      ? "ready"
      : "loading";

  return (
    <div ref={setHeroVisualRoot} className="hero-lanyard-stage" data-lanyard-state={sceneState}>
      <span className="lanyard-anchor" aria-hidden="true" />
      {!SceneComponent ? (
        <HeroLanyardFallback visible={fallbackVisible} />
      ) : (
        <>
          {!sceneCanvasReady && (
            <div className="hero-lanyard-fallback-layer" aria-hidden="true">
              <HeroLanyardFallback visible={false} />
            </div>
          )}
          <SceneComponent
            active={sceneVisible}
            onReady={handleSceneReady}
            onContextLost={handleSceneContextLost}
          />
        </>
      )}
    </div>
  );
}
