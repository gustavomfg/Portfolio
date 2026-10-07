import { describe, expect, it } from "vitest";
import { poseForPointer } from "@/components/interactive/batpet-companion";

describe("poseForPointer", () => {
  it("fecha os olhos quando o cursor chega muito perto", () => {
    expect(poseForPointer(20, 30)).toBe("shy");
  });

  it("olha para o lado em que o cursor está", () => {
    expect(poseForPointer(-200, 40)).toBe("lookLeft");
    expect(poseForPointer(200, 40)).toBe("lookRight");
  });

  it("descansa quando o cursor está alinhado ou distante", () => {
    expect(poseForPointer(10, 300)).toBe("rest");
    expect(poseForPointer(900, 0)).toBe("rest");
  });
});
