import { describe, expect, it } from "vitest";
import { CAPABILITIES, NAV_ITEMS, PROJECTS, STACK, TIMELINE } from "@/data/portfolio";

describe("portfolio data", () => {
  it("keeps project identifiers unique and complete", () => {
    expect(new Set(PROJECTS.map((project) => project.id)).size).toBe(PROJECTS.length);
    expect(new Set(PROJECTS.map((project) => project.key)).size).toBe(PROJECTS.length);

    for (const project of PROJECTS) {
      expect(project.name.trim()).not.toBe("");
      expect(project.description.trim()).not.toBe("");
      expect(project.tags.length).toBeGreaterThan(0);
      expect(project.highlights.length).toBeGreaterThan(0);
    }
  });

  it("keeps navigation targets unique", () => {
    expect(new Set(NAV_ITEMS.map((item) => item.href)).size).toBe(NAV_ITEMS.length);
  });

  it("keeps each public collection populated", () => {
    expect(CAPABILITIES.length).toBeGreaterThan(0);
    expect(STACK.length).toBeGreaterThan(0);
    expect(TIMELINE.length).toBeGreaterThan(0);
  });
});
