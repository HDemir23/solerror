import { describe, it, expect } from "vitest";
import { systemErrorMap } from "../src/errors/system-errors.js";
import { tokenErrorMap } from "../src/errors/token-errors.js";

describe("systemErrorMap", () => {
  it("has 9 entries (codes 0-8)", () => {
    expect(systemErrorMap.size).toBe(9);
  });

  it("maps code 1 to ResultWithNegativeLamports", () => {
    const entry = systemErrorMap.get(1);
    expect(entry?.name).toBe("ResultWithNegativeLamports");
  });

  it("maps code 0 to AccountAlreadyInUse", () => {
    const entry = systemErrorMap.get(0);
    expect(entry?.name).toBe("AccountAlreadyInUse");
  });

  it("all entries have required fields", () => {
    for (const [code, entry] of systemErrorMap) {
      expect(entry.code).toBe(code);
      expect(entry.name.length).toBeGreaterThan(0);
      expect(entry.explanation.length).toBeGreaterThan(0);
      expect(entry.fix.length).toBeGreaterThan(0);
      expect(["high", "medium", "low"]).toContain(entry.confidence);
    }
  });
});

describe("tokenErrorMap", () => {
  it("has 20 entries (codes 0-19)", () => {
    expect(tokenErrorMap.size).toBe(20);
  });

  it("maps code 1 to InsufficientFunds", () => {
    const entry = tokenErrorMap.get(1);
    expect(entry?.name).toBe("InsufficientFunds");
  });

  it("maps code 17 to AccountFrozen", () => {
    const entry = tokenErrorMap.get(17);
    expect(entry?.name).toBe("AccountFrozen");
  });

  it("all entries have required fields", () => {
    for (const [code, entry] of tokenErrorMap) {
      expect(entry.code).toBe(code);
      expect(entry.name.length).toBeGreaterThan(0);
      expect(entry.explanation.length).toBeGreaterThan(0);
      expect(entry.fix.length).toBeGreaterThan(0);
      expect(["high", "medium", "low"]).toContain(entry.confidence);
    }
  });
});
