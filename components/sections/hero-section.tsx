"use client";

import dynamic from "next/dynamic";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { BrandMark } from "@/components/ui/brand-mark";
import { SplitText } from "@/components/animations/split-text";
import { Reveal } from "@/components/animations/reveal";

const HeroLanyardScene = dynamic<{ active: boolean }>(
  () => import("@/components/sections/hero-lanyard").then(({ HeroLanyard }) => HeroLanyard),
  {
    ssr: false,
    loading: () => <HeroLanyardFallback />,
  },
);

function useDeferredHeroScene(rootRef: RefObject<HTMLElement | null>) {
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const sceneLoadedRef = useRef(false);
  const [sceneVisible, setSceneVisible] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const requestIdleCallback = typeof window.requestIdleCallback === "function"
      ? window.requestIdleCallback.bind(window)
      : undefined;
    const cancelIdleCallback = typeof window.cancelIdleCallback === "function"
      ? window.cancelIdleCallback.bind(window)
      : undefined;
    let visible = false;
    let scheduled = false;
    let idleHandle: number | null = null;
    let timeoutHandle: number | null = null;

    const loadScene = () => {
      scheduled = false;
      idleHandle = null;
      timeoutHandle = null;
      if (!visible || document.hidden || sceneLoadedRef.current) return;
      sceneLoadedRef.current = true;
      setSceneLoaded(true);
    };

    const scheduleLoad = () => {
      if (scheduled || sceneLoadedRef.current) return;
      scheduled = true;

      if (requestIdleCallback) {
        idleHandle = requestIdleCallback(loadScene, { timeout: 1800 });
      } else {
        timeoutHandle = window.setTimeout(loadScene, 1200);
      }
    };

    const handleVisibility = (entries: IntersectionObserverEntry[]) => {
      visible = entries[0]?.isIntersecting ?? false;
      setSceneVisible(visible);

      if (visible && !sceneLoadedRef.current) scheduleLoad();
    };

    const handleDocumentVisibility = () => {
      if (!document.hidden && visible && !sceneLoadedRef.current) scheduleLoad();
    };

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(handleVisibility, { rootMargin: "0px", threshold: 0 })
      : null;

    if (observer) {
      observer.observe(root);
    } else {
      visible = true;
      setSceneVisible(true);
      scheduleLoad();
    }

    const loadOnInteraction = () => loadScene();
    root.addEventListener("pointerenter", loadOnInteraction, { once: true, passive: true });
    root.addEventListener("focusin", loadOnInteraction, { once: true });
    document.addEventListener("visibilitychange", handleDocumentVisibility);

    return () => {
      observer?.disconnect();
      root.removeEventListener("pointerenter", loadOnInteraction);
      root.removeEventListener("focusin", loadOnInteraction);
      document.removeEventListener("visibilitychange", handleDocumentVisibility);
      if (idleHandle !== null) cancelIdleCallback?.(idleHandle);
      if (timeoutHandle !== null) window.clearTimeout(timeoutHandle);
    };
  }, [rootRef]);

  return { sceneLoaded, sceneVisible };
}

function HeroLanyardFallback() {
  return (
    <div
      className="hero-lanyard"
      role="img"
      aria-label="Identidade visual de Gustavo Maquias, desenvolvedor Full Stack em início de carreira"
    >
      <span className="sr-only">
        Gustavo Maquias, desenvolvedor Full Stack em início de carreira. Identidade visual em formato de crachá técnico.
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
          <BrandMark />
        </div>
        <div className="lanyard-name">GUSTAVO MAQUIAS</div>
        <div className="lanyard-role">FULL STACK DEVELOPER</div>
        <div className="lanyard-rule" />
        <div className="lanyard-note">BUILD · DOCUMENT · EVOLVE</div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const heroVisualRef = useRef<HTMLDivElement>(null);
  const { sceneLoaded, sceneVisible } = useDeferredHeroScene(heroVisualRef);

  return (
    <section className="hero section-shell" id="inicio">
      <div className="hero-grid">
        <div className="hero-copy">
          <h1>
            <SplitText text="Gustavo Maquias" />
            <span>Desenvolvedor Full Stack</span>
          </h1>
          <p className="hero-intro">
            Estudante de ADS construindo aplicações web e desktop, com foco em arquitetura, backend e engenharia de software
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projeto-studio">
              Ver projeto principal <ArrowDown size={17} aria-hidden="true" />
            </a>
            <a className="button button-ghost" href="#contato">
              Entrar em contato <Mail size={17} aria-hidden="true" />
            </a>
          </div>
          <nav className="hero-links" aria-label="Links profissionais">
            <a href="https://github.com/gustavomfg" target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/gustavomfg" target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a href="/curriculo-gustavo-maquias.pdf" target="_blank" rel="noreferrer" download="curriculo-gustavo-maquias.pdf">
              Currículo <small>PDF</small> <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </nav>
        </div>

        <Reveal className="hero-lanyard-entry" delay={0.08} distance={12}>
          <div
            ref={heroVisualRef}
            style={{ width: "100%" }}
          >
            {sceneLoaded ? (
              <HeroLanyardScene active={sceneVisible} />
            ) : (
              <HeroLanyardFallback />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
