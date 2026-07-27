import { describe, expect, it } from "vitest";
import { getNocturneJourneyFrame } from "@/lib/nocturne-director";
import { clamp, easeInOutCubic, mapRange } from "@/lib/nocturne-journey";

describe("journey math", () => {
  it("clamps values to the expected interval", () => {
    expect(clamp(-1)).toBe(0);
    expect(clamp(0.5)).toBe(0.5);
    expect(clamp(2)).toBe(1);
  });

  it("maps and clamps values between ranges", () => {
    expect(mapRange(-1, 0, 10, 20, 40)).toBe(20);
    expect(mapRange(5, 0, 10, 20, 40)).toBe(30);
    expect(mapRange(12, 0, 10, 20, 40)).toBe(40);
  });

  it("keeps easing results bounded", () => {
    for (const value of [-1, 0, 0.25, 0.5, 0.75, 1, 2]) {
      expect(easeInOutCubic(value)).toBeGreaterThanOrEqual(0);
      expect(easeInOutCubic(value)).toBeLessThanOrEqual(1);
    }
  });
});

describe("journey director", () => {
  it("produces finite, bounded opacity values throughout the journey", () => {
    for (let step = 0; step <= 100; step += 1) {
      const frame = getNocturneJourneyFrame(step / 100);
      const opacities = [
        frame.welcomeOpacity,
        frame.eclipseOpacity,
        frame.orbitOpacity,
        frame.identityOpacity,
        frame.journeyBridgeOpacity,
      ];

      for (const opacity of opacities) {
        expect(Number.isFinite(opacity)).toBe(true);
        expect(opacity).toBeGreaterThanOrEqual(0);
        expect(opacity).toBeLessThanOrEqual(1);
      }
    }
  });

  it("starts with the welcome visible and ends with the eclipse hidden", () => {
    expect(getNocturneJourneyFrame(0).welcomeOpacity).toBe(1);
    expect(getNocturneJourneyFrame(1).eclipseOpacity).toBe(0);
  });
});
