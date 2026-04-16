import { describe, it, expect } from "vitest";
import { systemErrorMap } from "../src/errors/system-errors.js";
import { tokenErrorMap } from "../src/errors/token-errors.js";
import { stakeErrorMap } from "../src/errors/stake-errors.js";
import { associatedTokenErrorMap } from "../src/errors/associated-token-errors.js";
import { computeBudgetErrorMap as computeBudgetErrorMap } from "../src/errors/compute-errors.js";

function validateEntries(
  map: ReadonlyMap<
    number,
    {
      code: number;
      name: string;
      explanation: string;
      fix: string;
      confidence: string;
    }
  >,
) {
  for (const [code, entry] of map) {
    expect(entry.code).toBe(code);
    expect(entry.name.length).toBeGreaterThan(0);
    expect(entry.explanation.length).toBeGreaterThan(0);
    expect(entry.fix.length).toBeGreaterThan(0);
    expect(["high", "medium", "low"]).toContain(entry.confidence);
  }
}

describe("systemErrorMap", () => {
  it("has 9 entries (codes 0-8)", () => {
    expect(systemErrorMap.size).toBe(9);
  });

  it("has sequential codes 0-8", () => {
    for (let i = 0; i <= 8; i++) {
      expect(systemErrorMap.has(i), `Missing code ${i}`).toBe(true);
    }
  });

  it("maps specific codes to correct names", () => {
    expect(systemErrorMap.get(0)?.name).toBe("AccountAlreadyInUse");
    expect(systemErrorMap.get(1)?.name).toBe("ResultWithNegativeLamports");
    expect(systemErrorMap.get(2)?.name).toBe("InvalidProgramId");
    expect(systemErrorMap.get(3)?.name).toBe("InvalidAccountDataLength");
    expect(systemErrorMap.get(4)?.name).toBe("MaxSeedLengthExceeded");
    expect(systemErrorMap.get(5)?.name).toBe("AddressWithSeedMismatch");
    expect(systemErrorMap.get(6)?.name).toBe("NonceNoRecentBlockhashes");
    expect(systemErrorMap.get(7)?.name).toBe("NonceBlockhashNotExpired");
    expect(systemErrorMap.get(8)?.name).toBe("NonceUnexpectedBlockhashValue");
  });

  it("all entries have required fields", () => {
    validateEntries(systemErrorMap);
  });
});

describe("tokenErrorMap", () => {
  it("has 20 entries (codes 0-19)", () => {
    expect(tokenErrorMap.size).toBe(20);
  });

  it("has sequential codes 0-19", () => {
    for (let i = 0; i <= 19; i++) {
      expect(tokenErrorMap.has(i), `Missing code ${i}`).toBe(true);
    }
  });

  it("maps specific codes to correct names", () => {
    expect(tokenErrorMap.get(0)?.name).toBe("NotRentExempt");
    expect(tokenErrorMap.get(1)?.name).toBe("InsufficientFunds");
    expect(tokenErrorMap.get(2)?.name).toBe("InvalidMint");
    expect(tokenErrorMap.get(3)?.name).toBe("MintMismatch");
    expect(tokenErrorMap.get(4)?.name).toBe("OwnerMismatch");
    expect(tokenErrorMap.get(5)?.name).toBe("FixedSupply");
    expect(tokenErrorMap.get(6)?.name).toBe("AlreadyInUse");
    expect(tokenErrorMap.get(12)?.name).toBe("InvalidInstruction");
    expect(tokenErrorMap.get(14)?.name).toBe("Overflow");
    expect(tokenErrorMap.get(17)?.name).toBe("AccountFrozen");
    expect(tokenErrorMap.get(19)?.name).toBe("NonNativeNotSupported");
  });

  it("all entries have required fields", () => {
    validateEntries(tokenErrorMap);
  });
});

describe("stakeErrorMap", () => {
  it("has 11 entries (codes 0-10)", () => {
    expect(stakeErrorMap.size).toBe(11);
  });

  it("maps specific codes to correct names", () => {
    expect(stakeErrorMap.get(0)?.name).toBe("InsufficientFunds");
    expect(stakeErrorMap.get(1)?.name).toBe("InvalidOwner");
    expect(stakeErrorMap.get(2)?.name).toBe("AlreadyDeactivated");
    expect(stakeErrorMap.get(6)?.name).toBe("MinimumDelegationNotMet");
    expect(stakeErrorMap.get(8)?.name).toBe("LockupInForce");
  });

  it("all entries have required fields", () => {
    validateEntries(stakeErrorMap);
  });
});

describe("associatedTokenErrorMap", () => {
  it("is empty (ATA uses Token Program errors)", () => {
    expect(associatedTokenErrorMap.size).toBe(0);
  });
});

describe("computeBudgetErrorMap", () => {
  it("is empty (Compute Budget uses runtime InstructionError)", () => {
    expect(computeBudgetErrorMap.size).toBe(0);
  });
});
