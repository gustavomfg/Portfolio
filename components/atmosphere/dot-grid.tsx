"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

interface DotPoint {
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
}

const GAP = 28;
const PROXIMITY = 158;
const MAX_OFFSET = 6.5;

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let dots: DotPoint[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrame = 0;
    let pointerX = -9999;
    let pointerY = -9999;
    let pointerSpeed = 0;
    let lastPointerX = pointerX;
    let lastPointerY = pointerY;
    let lastFrame = performance.now();

    const draw = (time = performance.now()) => {
      const delta = Math.min((time - lastFrame) / 1000, 0.05);
      lastFrame = time;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#a595d5";

      for (const dot of dots) {
        const dx = pointerX - dot.x;
        const dy = pointerY - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = reduceMotion ? 0 : Math.max(0, 1 - distance / PROXIMITY);
        const targetX = distance > 0 ? (dx / distance) * influence * MAX_OFFSET : 0;
        const targetY = distance > 0 ? (dy / distance) * influence * MAX_OFFSET : 0;
        const ease = Math.min(1, delta * (5 + Math.min(pointerSpeed / 120, 3)));
        dot.offsetX += (targetX - dot.offsetX) * ease;
        dot.offsetY += (targetY - dot.offsetY) * ease;

        const alpha = 0.28 + influence * 0.48;
        context.globalAlpha = alpha;
        context.beginPath();
        context.arc(dot.x + dot.offsetX, dot.y + dot.offsetY, influence > 0.2 ? 1.45 : 1, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
    };

    const schedule = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame((time) => {
        animationFrame = 0;
        draw(time);
        const hasMotion = dots.some((dot) => Math.abs(dot.offsetX) > 0.05 || Math.abs(dot.offsetY) > 0.05);
        if (!reduceMotion && hasMotion) schedule();
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      dots = [];
      for (let y = GAP / 2; y < height; y += GAP) {
        for (let x = GAP / 2; x < width; x += GAP) dots.push({ x, y, offsetX: 0, offsetY: 0 });
      }
      draw();
    };

    const pointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerSpeed = Math.hypot(pointerX - lastPointerX, pointerY - lastPointerY);
      lastPointerX = pointerX;
      lastPointerY = pointerY;
      schedule();
    };
    const pointerLeave = () => {
      pointerX = -9999;
      pointerY = -9999;
      pointerSpeed = 0;
      schedule();
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    if (!reduceMotion && !window.matchMedia("(pointer: coarse)").matches) {
      window.addEventListener("pointermove", pointerMove, { passive: true });
      window.addEventListener("blur", pointerLeave);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("blur", pointerLeave);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [reduceMotion]);

  return (
    <div className="dot-grid" aria-hidden="true">
      <canvas ref={canvasRef} className="dot-grid__canvas" />
    </div>
  );
}
