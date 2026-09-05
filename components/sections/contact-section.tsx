"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/animations/reveal";

const CONTACT_CHANNELS = [
  {
    index: "01",
    label: "Email",
    value: "gustavomfgdev@gmail.com",
    breakAfter: "@",
    href: "mailto:gustavomfgdev@gmail.com",
  },
  {
    index: "02",
    label: "LinkedIn",
    value: "linkedin.com/in/gustavomfg",
    breakAfter: "/in/",
    href: "https://www.linkedin.com/in/gustavomfg",
  },
  {
    index: "03",
    label: "GitHub",
    value: "github.com/gustavomfg",
    breakAfter: undefined,
    href: "https://github.com/gustavomfg",
  },
] as const;

export function ContactSection() {
  const linksRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const surface = linksRef.current;

    if (!surface) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = {
      currentX: 50,
      currentY: 22,
      targetX: 50,
      targetY: 22,
      frame: 0,
    };

    const applyPosition = () => {
      surface.style.setProperty("--contact-light-x", `${pointer.currentX}%`);
      surface.style.setProperty("--contact-light-y", `${pointer.currentY}%`);
      surface.style.setProperty("--contact-shift-x", `${(pointer.currentX - 50) * 0.14}px`);
      surface.style.setProperty("--contact-shift-y", `${(pointer.currentY - 22) * 0.08}px`);
    };

    const settle = () => {
      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.16;
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.16;
      applyPosition();

      const settled = Math.abs(pointer.targetX - pointer.currentX) < 0.08 && Math.abs(pointer.targetY - pointer.currentY) < 0.08;

      if (settled) {
        pointer.currentX = pointer.targetX;
        pointer.currentY = pointer.targetY;
        applyPosition();
        pointer.frame = 0;
        return;
      }

      pointer.frame = requestAnimationFrame(settle);
    };

    const schedule = () => {
      if (reduceMotion.matches) {
        pointer.currentX = pointer.targetX;
        pointer.currentY = pointer.targetY;
        applyPosition();
        return;
      }

      if (!pointer.frame) pointer.frame = requestAnimationFrame(settle);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const bounds = surface.getBoundingClientRect();
      pointer.targetX = Math.min(100, Math.max(0, ((event.clientX - bounds.left) / bounds.width) * 100));
      pointer.targetY = Math.min(100, Math.max(0, ((event.clientY - bounds.top) / bounds.height) * 100));
      schedule();
    };

    const handlePointerLeave = () => {
      pointer.targetX = 50;
      pointer.targetY = 22;
      schedule();
    };

    applyPosition();
    surface.addEventListener("pointermove", handlePointerMove, { passive: true });
    surface.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      surface.removeEventListener("pointermove", handlePointerMove);
      surface.removeEventListener("pointerleave", handlePointerLeave);
      if (pointer.frame) cancelAnimationFrame(pointer.frame);
    };
  }, []);

  return (
    <section className="contact section-shell" id="contato">
      <div className="contact-stage">
        <Reveal className="contact-layout" distance={18}>
          <div className="contact-intro">

            <h2>
              Vamos conversar sobre uma <em>oportunidade?</em>
            </h2>
            <p className="contact-copy">
              Busco uma primeira oportunidade para colaborar em software real e continuar evoluindo.
            </p>
            <div className="contact-signature" aria-label="Identidade do contato">
              <span>GUSTAVO MAQUIAS</span>
              <span>DESENVOLVEDOR FULL STACK</span>
            </div>
          </div>

          <nav ref={linksRef} className="contact-links" aria-label="Canais de contato">
            {CONTACT_CHANNELS.map((channel, index) => {
              const isPrimary = index === 0;

              return (
                <a
                  className={`contact-channel${isPrimary ? " is-primary" : ""}`}
                  href={channel.href}
                  key={channel.label}
                  rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                >
                  <span className="contact-channel-index" aria-hidden="true">
                    {channel.index}
                  </span>
                  <span className="contact-channel-copy">
                    <span className="contact-channel-label">{channel.label}</span>
                    <span className="contact-channel-value">
                      {channel.breakAfter ? (
                        <>
                          {channel.value.slice(0, channel.value.indexOf(channel.breakAfter) + channel.breakAfter.length)}
                          <wbr />
                          {channel.value.slice(channel.value.indexOf(channel.breakAfter) + channel.breakAfter.length)}
                        </>
                      ) : channel.value}
                    </span>
                  </span>
                  <ArrowUpRight className="contact-channel-arrow" size={20} aria-hidden="true" />
                </a>
              );
            })}
          </nav>
        </Reveal>

      </div>
    </section>
  );
}
