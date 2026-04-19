import { describe, it, expect } from "vitest";

describe("scaffold", () => {
  it("brand tokens are defined", () => {
    const tokens = {
      ink: "#0F1C3F",
      bg: "#FFF9E9",
      accent: "#3B5BFF",
      joy: "#FFC94A",
      good: "#2FBF71",
      soft: "#EEF1FF",
    };
    expect(Object.keys(tokens)).toHaveLength(6);
    Object.values(tokens).forEach((hex) => {
      expect(hex).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });
});
