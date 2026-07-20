"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { INTRO_SESSION_KEY } from "@/lib/intro-timeline";

type IntroSessionState = "checking" | "play" | "skip";

export function useIntroSession() {
  const [completed, setCompleted] = useState(false);
  const storedState = useSyncExternalStore(
    subscribeToStaticSnapshot,
    getIntroSessionSnapshot,
    getServerIntroSnapshot,
  );
  const sessionState: IntroSessionState = completed ? "skip" : storedState;

  const completeIntro = useCallback(() => {
    try {
      window.sessionStorage.setItem(INTRO_SESSION_KEY, "true");
    } catch {
      // The intro still closes when storage is unavailable.
    }

    document.documentElement.dataset.nocturneIntro = "skip";
    setCompleted(true);
  }, []);

  return { sessionState, completeIntro };
}

function subscribeToStaticSnapshot() {
  return () => undefined;
}

function getIntroSessionSnapshot(): IntroSessionState {
  return document.documentElement.dataset.nocturneIntro === "skip" ? "skip" : "play";
}

function getServerIntroSnapshot(): IntroSessionState {
  return "checking";
}
