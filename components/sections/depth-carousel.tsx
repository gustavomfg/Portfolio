"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import gsap from "gsap";
import { SYSMON_EVIDENCE } from "@/data/portfolio";

export interface SysmonCarouselItem {
  label: string;
  title: string;
  description: string;
  meta: string;
  image: string | null;
  alt: string;
}

interface DepthCarouselProps {
  items: readonly SysmonCarouselItem[];
  cardWidth?: number;
  cardHeight?: number;
  radius?: number;
  depth?: number;
  spread?: number;
  tilt?: number;
  perspective?: number;
  visibleCards?: number;
  falloff?: number;
  blur?: number;
  duration?: number;
  ease?: string;
  onChange?: (index: number) => void;
  className?: string;
}

interface CarouselConfig {
  count: number;
  depth: number;
  spread: number;
  tilt: number;
  visibleCards: number;
  falloff: number;
  blur: number;
  duration: number;
  ease: string;
  loop: boolean;
  cardWidth: number;
}

interface DragState {
  x: number;
  startPos: number;
  lastX: number;
  lastT: number;
  velocity: number;
  moved: boolean;
  pointerId: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const SYSMON_CAROUSEL_ITEMS: readonly SysmonCarouselItem[] = [
  {
    label: "01 / Telemetria",
    title: "Sinais reais da máquina",
    description: "Telemetria em tempo real de CPU, memória, GPU, rede, armazenamento, temperaturas e processos.",
    meta: "Rust · Ratatui · Crossterm · Linux",
    image: null,
    alt: "Screenshot real da telemetria do SysMon, aguardando fonte local",
  },
  {
    label: "02 / Metrics Architecture",
    title: "Coleta → interpretação → visualização",
    description: "Arquitetura de métricas com históricos limitados, inventário dinâmico de hardware e separação entre coleta, interpretação e visualização.",
    meta: "Bounded histories · dynamic hardware inventory",
    image: null,
    alt: "Screenshot real da arquitetura de métricas do SysMon, aguardando fonte local",
  },
  {
    label: "03 / Health Engine",
    title: "Atividade ≠ pressão",
    description: "O Health Engine diferencia atividade de pressão do sistema antes de alimentar o estado agregado.",
    meta: "Interpretação do estado da máquina",
    image: null,
    alt: "Screenshot real do Health Engine do SysMon, aguardando fonte local",
  },
  {
    label: "04 / System Pulse",
    title: "Estado agregado da máquina",
    description: "Representação procedural alimentada pelo estado agregado da máquina.",
    meta: "System Pulse · evidência visual pendente",
    image: null,
    alt: "Screenshot real do System Pulse do SysMon, aguardando fonte local",
  },
] as const;

function DepthCarousel({
  items,
  cardWidth = 820,
  cardHeight = 500,
  radius = 18,
  depth = 300,
  spread = 128,
  tilt = 7,
  perspective = 1680,
  visibleCards = 2.3,
  falloff = 0.16,
  blur = 2.5,
  duration = 720,
  ease = "power3.out",
  onChange,
  className = "",
}: DepthCarouselProps) {
  const data = useMemo(() => items.filter(Boolean), [items]);
  const count = data.length;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const overlayRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const positionRef = useRef(0);
  const focusRef = useRef(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const scaleRef = useRef(1);
  const reducedRef = useRef(false);
  const configRef = useRef<CarouselConfig>({} as CarouselConfig);
  const dragRef = useRef<DragState | null>(null);
  const pendingIndexRef = useRef(0);
  const [active, setActive] = useState(0);

  const config = useMemo<CarouselConfig>(
    () => ({
      count,
      depth,
      spread,
      tilt,
      visibleCards,
      falloff,
      blur,
      duration,
      ease,
      loop: true,
      cardWidth,
    }),
    [blur, cardWidth, count, depth, duration, ease, falloff, spread, tilt, visibleCards],
  );

  const layout = useCallback((position: number) => {
    const config = configRef.current;
    if (!config.count) return;

    const scale = scaleRef.current;
    for (let index = 0; index < config.count; index += 1) {
      const card = cardRefs.current[index];
      if (!card) continue;

      let distance = index - position;
      if (config.count > 1) {
        distance = ((distance % config.count) + config.count) % config.count;
        if (distance > config.count / 2) distance -= config.count;
      }

      const behind = Math.max(0, distance);
      const absoluteDistance = Math.abs(distance);
      const isActive = absoluteDistance < 0.5;
      const visible = absoluteDistance <= config.visibleCards + 0.5;
      const translateZ = -config.depth * distance;
      const translateX = config.spread * distance;
      const rotateY = config.tilt * clamp(distance, 0, 2);
      const opacity = visible ? (distance < 0 ? Math.max(0, 1 + distance) : 1) : 0;
      const cardScale = isActive ? 1.045 : clamp(1 - behind * 0.12, 0.72, 1);
      const brightness = Math.max(0.52, 1 - behind * config.falloff);
      const blurPx = config.blur > 0 ? Math.min(config.blur, (behind / Math.max(1, config.visibleCards)) * config.blur) : 0;

      card.style.transform = `translate(-50%, -50%) scale(${(scale * cardScale).toFixed(4)}) translateX(${translateX.toFixed(2)}px) translateZ(${translateZ.toFixed(2)}px) rotateY(${rotateY.toFixed(3)}deg)`;
      card.style.opacity = opacity.toFixed(3);
      card.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blurPx.toFixed(2)}px)`;
      card.style.zIndex = String(Math.round(2000 - distance * 20));
      card.style.pointerEvents = visible && opacity > 0.05 ? "auto" : "none";
      card.classList.toggle("is-active", isActive);
      card.classList.toggle("is-rear", distance >= 0.5);

      const overlay = overlayRefs.current[index];
      if (overlay) overlay.style.opacity = clamp(behind * config.falloff * 0.9, 0, 0.42).toFixed(3);
    }
  }, []);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  const tweenTo = useCallback(
    (target: number, animate: boolean) => {
      tweenRef.current?.kill();
      const config = configRef.current;
      const proxy = { position: positionRef.current };
      tweenRef.current = gsap.to(proxy, {
        position: target,
        duration: animate && !reducedRef.current ? config.duration / 1000 : 0,
        ease: config.ease,
        onUpdate: () => {
          positionRef.current = proxy.position;
          layout(proxy.position);
        },
        onComplete: () => {
          positionRef.current = ((positionRef.current % config.count) + config.count) % config.count;
          layout(positionRef.current);
          onChange?.(pendingIndexRef.current);
        },
      });
    },
    [layout, onChange],
  );

  const setFocus = useCallback(
    (rawIndex: number, animate = true) => {
      const config = configRef.current;
      if (!config.count) return;
      const index = ((rawIndex % config.count) + config.count) % config.count;
      let delta = index - positionRef.current;
      if (config.count > 1) {
        delta = ((delta % config.count) + config.count) % config.count;
        if (delta > config.count / 2) delta -= config.count;
      }
      if (index !== focusRef.current) {
        focusRef.current = index;
        pendingIndexRef.current = index;
        setActive(index);
      }
      tweenTo(positionRef.current + delta, animate);
    },
    [tweenTo],
  );

  const navigateBy = useCallback((step: number) => setFocus(focusRef.current + step), [setFocus]);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    layout(positionRef.current);
    return () => {
      tweenRef.current?.kill();
    };
  }, [layout]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const resizeObserver = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const config = configRef.current;
      const neededWidth = config.cardWidth + Math.abs(config.spread) * 2 + 120;
      scaleRef.current = clamp(width / neededWidth, 0.46, 1);
      layout(positionRef.current);
    });
    resizeObserver.observe(root);
    return () => resizeObserver.disconnect();
  }, [layout]);

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (configRef.current.count < 2) return;
    tweenRef.current?.kill();
    dragRef.current = {
      x: event.clientX,
      startPos: positionRef.current,
      lastX: event.clientX,
      lastT: performance.now(),
      velocity: 0,
      moved: false,
      pointerId: event.pointerId,
    };
  }, []);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag) return;
      const stepPixels = Math.max(configRef.current.cardWidth * 0.55 * scaleRef.current, 40);
      const distance = event.clientX - drag.x;
      if (!drag.moved && Math.abs(distance) > 4) {
        drag.moved = true;
        rootRef.current?.setPointerCapture(drag.pointerId);
      }
      if (!drag.moved) return;
      const now = performance.now();
      drag.velocity = (event.clientX - drag.lastX) / Math.max(now - drag.lastT, 1);
      drag.lastX = event.clientX;
      drag.lastT = now;
      positionRef.current = drag.startPos - distance / stepPixels;
      layout(positionRef.current);
    },
    [layout],
  );

  const onPointerEnd = useCallback(() => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    if (!drag.moved) return;
    const stepPixels = Math.max(configRef.current.cardWidth * 0.55 * scaleRef.current, 40);
    setFocus(Math.round(positionRef.current - (drag.velocity * 180) / stepPixels));
  }, [setFocus]);

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigateBy(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        navigateBy(1);
      }
    },
    [navigateBy],
  );

  return (
    <div className="depth-carousel-shell">
      <div
        ref={rootRef}
        className={`depth-carousel ${className}`.trim()}
        style={{ "--dc-perspective": `${perspective}px` } as CSSProperties}
        role="group"
        aria-roledescription="carousel"
        aria-label="Evidências visuais do SysMon"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onKeyDown={onKeyDown}
      >
        <div className="depth-carousel__stage">
          {data.map((item, index) => (
            <article
              key={item.label}
              className="depth-carousel__card"
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              style={{ width: cardWidth, height: cardHeight, borderRadius: radius }}
              aria-roledescription="slide"
              aria-label={`${item.label}: ${item.title}`}
              aria-hidden={active !== index}
              onClick={() => setFocus(index)}
            >
              {item.image ? (
                <img className="depth-carousel__img" src={item.image} alt={item.alt} draggable={false} />
              ) : (
                <div className="depth-carousel__pending">
                  <span className="depth-carousel__pending-kicker">{item.label}</span>
                  <strong>Screenshot real pendente</strong>
                  <span>{item.alt}</span>
                </div>
              )}
              <span
                className="depth-carousel__tint"
                ref={(element) => {
                  overlayRefs.current[index] = element;
                }}
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>

      {count > 1 ? (
        <div className="depth-carousel-controls" aria-label="Navegação das evidências">
          <button type="button" className="depth-carousel__arrow depth-carousel__arrow--prev" aria-label="Evidência anterior" onClick={() => navigateBy(-1)}>
            <span aria-hidden="true">←</span>
          </button>
          <span className="depth-carousel__position" aria-live="polite">
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <div className="depth-carousel__dots" role="tablist" aria-label="Evidências">
            {data.map((item, index) => (
              <button
                key={item.label}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-label={`Mostrar ${item.label}`}
                className={`depth-carousel__dot${active === index ? " is-active" : ""}`}
                onClick={() => setFocus(index)}
              />
            ))}
          </div>
          <button type="button" className="depth-carousel__arrow depth-carousel__arrow--next" aria-label="Próxima evidência" onClick={() => navigateBy(1)}>
            <span aria-hidden="true">→</span>
          </button>
          <span className="depth-carousel__hint">Arraste para explorar · setas do teclado</span>
        </div>
      ) : null}
    </div>
  );
}

export function SysmonDepthShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = SYSMON_CAROUSEL_ITEMS[activeIndex] ?? SYSMON_CAROUSEL_ITEMS[0];

  return (
    <div className="sysmon-showcase">
      <div className="sysmon-project-header">
        <div className="sysmon-project-identity">
          <p className="project-role">Monitor de sistema</p>
          <h3 id="sysmon-title">SysMon</h3>
          <p>Monitor de sistema em Rust para telemetria de CPU, memória, GPU, rede, armazenamento, temperaturas e processos. A arquitetura separa coleta, interpretação e visualização para preservar contexto.</p>
          <p className="sysmon-stack">{SYSMON_EVIDENCE.stack.join(" · ")}</p>
        </div>
        <div className="sysmon-active-context" key={activeItem.label} aria-live="polite">
          <p className="sysmon-active-label">{activeItem.label}</p>
          <h4>{activeItem.title}</h4>
          <p>{activeItem.description}</p>
          <span>{activeItem.meta}</span>
        </div>
      </div>
      <DepthCarousel items={SYSMON_CAROUSEL_ITEMS} className="sysmon-depth-carousel" onChange={setActiveIndex} />
    </div>
  );
}
