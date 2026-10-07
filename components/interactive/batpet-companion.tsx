"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useShortcutLabel } from "@/hooks/use-shortcut-label";
import { useBatPetHidden } from "@/lib/batpet-store";

/** Frame order in public/batpet/sprite.png, extracted from the BatPet pose sheet. */
const POSES = {
  rest: 0,
  lookLeft: 1,
  lookRight: 2,
  shy: 3,
  shrink: 4,
  peek: 5,
} as const;

type Pose = keyof typeof POSES;

const SHY_RADIUS = 72;
const ATTENTION_RADIUS = 560;
const LOOK_THRESHOLD = 26;
const IDLE_AFTER_MS = 2600;
const HINT_SESSION_KEY = "batpet:hint-shown";
const SHORTCUT_HINT = "shortcut-hint";
const HOVER_HINT = "BatPet · feito em Rust";

export function poseForPointer(dx: number, dy: number): Pose {
  const distance = Math.hypot(dx, dy);

  if (distance < SHY_RADIUS) return "shy";
  if (distance > ATTENTION_RADIUS) return "rest";
  if (dx < -LOOK_THRESHOLD) return "lookLeft";
  if (dx > LOOK_THRESHOLD) return "lookRight";
  return "rest";
}

/**
 * A live port of the BatPet desktop companion: it hangs from the header and
 * reacts to the cursor with the same poses as the Rust/Bevy version.
 * Purely decorative — hidden from assistive tech and from touch-first layouts.
 */
export function BatPetCompanion() {
  const hidden = useBatPetHidden();
  const shortcut = useShortcutLabel();
  const spriteRef = useRef<HTMLSpanElement>(null);
  const [pose, setPose] = useState<Pose>("rest");
  const [poked, setPoked] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const reactionRef = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (hidden) return;

    const sprite = spriteRef.current;
    if (!sprite) return;

    let frame = 0;
    let idleTimer = 0;
    let blinkTimer = 0;
    let lastPointer: PointerEvent | null = null;

    const applyPointer = () => {
      frame = 0;
      if (!lastPointer || reactionRef.current) return;

      const rect = sprite.getBoundingClientRect();
      const next = poseForPointer(
        lastPointer.clientX - (rect.left + rect.width / 2),
        lastPointer.clientY - (rect.top + rect.height * 0.6),
      );
      setPose(next);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      lastPointer = event;
      if (!frame) frame = window.requestAnimationFrame(applyPointer);

      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        if (!reactionRef.current) setPose("rest");
      }, IDLE_AFTER_MS);
    };

    const scheduleBlink = () => {
      blinkTimer = window.setTimeout(() => {
        if (!reactionRef.current) {
          setPose((current) => (current === "rest" ? "shy" : current));
          window.setTimeout(() => {
            setPose((current) => (current === "shy" && !reactionRef.current ? "rest" : current));
          }, 150);
        }
        scheduleBlink();
      }, 2800 + Math.random() * 3600);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    scheduleBlink();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.cancelAnimationFrame(frame);
      window.clearTimeout(idleTimer);
      window.clearTimeout(blinkTimer);
    };
  }, [hidden]);

  useEffect(() => {
    if (hidden) return;

    let alreadyShown = false;
    try {
      alreadyShown = window.sessionStorage.getItem(HINT_SESSION_KEY) === "1";
    } catch {
      alreadyShown = false;
    }
    if (alreadyShown) return;

    const showTimer = window.setTimeout(() => {
      setBubble(SHORTCUT_HINT);
      try {
        window.sessionStorage.setItem(HINT_SESSION_KEY, "1");
      } catch {
        // Without session storage the hint simply shows again on the next visit.
      }
    }, 3200);
    const hideTimer = window.setTimeout(() => setBubble(null), 8600);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [hidden]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((timer) => window.clearTimeout(timer));
  }, []);

  if (hidden) return null;

  const poke = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    reactionRef.current = true;
    setPoked(false);
    setPose("shrink");
    setBubble(null);
    window.requestAnimationFrame(() => setPoked(true));

    timers.current = [
      window.setTimeout(() => setPose("peek"), 520),
      window.setTimeout(() => {
        reactionRef.current = false;
        setPose("rest");
        setPoked(false);
      }, 1700),
    ];
  };

  return (
    <div className={`batpet${poked ? " is-poked" : ""}`} aria-hidden="true" data-pose={pose}>
      <span
        ref={spriteRef}
        className="batpet-sprite"
        style={{ "--batpet-frame": POSES[pose] } as CSSProperties}
        onClick={poke}
        onMouseEnter={() => setBubble((current) => current ?? HOVER_HINT)}
        onMouseLeave={() => setBubble((current) => (current === HOVER_HINT ? null : current))}
      />
      {bubble ? (
        <span className="batpet-bubble">{bubble === SHORTCUT_HINT ? `psst… ${shortcut}` : bubble}</span>
      ) : null}
    </div>
  );
}
