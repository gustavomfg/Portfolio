"use client";

import { useSyncExternalStore } from "react";

let cachedWebGLSupport: boolean | null = null;

export function useWebGLSupport() {
  return useSyncExternalStore(subscribeToStaticSnapshot, detectWebGLSupport, getServerSnapshot);
}

function subscribeToStaticSnapshot() {
  return () => undefined;
}

function detectWebGLSupport() {
  if (cachedWebGLSupport !== null) return cachedWebGLSupport;

  const canvas = document.createElement("canvas");

  try {
    const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    cachedWebGLSupport = context !== null;
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    cachedWebGLSupport = false;
  }

  canvas.width = 0;
  canvas.height = 0;
  return cachedWebGLSupport;
}

function getServerSnapshot() {
  return null;
}
