import { describe, it, expect } from "vitest";
import { resolveError, registerErrorMap } from "../src/resolve-error.js";
import type { Address } from "@solana/addresses";
import type { ErrorMap } from "../src/types.js";

const SYSTEM_PROGRAM_ID = "11111111111111111111111111111111" as Address;
const TOKEN_PROGRAM_ID =
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" as Address;
const TOKEN_2022_PROGRAM_ID =
  "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb" as Address;
const STAKE_PROGRAM_ID =
  "Stake11111111111111111111111111111111111111" as Address;
const ATA_PROGRAM_ID =
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL" as Address;

describe("resolveError — System Program", () => {
  it("resolves code 0 to AccountAlreadyInUse", () => {
    expect(resolveError(SYSTEM_PROGRAM_ID, { Custom: 0 })?.name).toBe(
      "AccountAlreadyInUse",
    );
  });

  it("resolves code 1 to ResultWithNegativeLamports", () => {
    expect(resolveError(SYSTEM_PROGRAM_ID, { Custom: 1 })?.name).toBe(
      "ResultWithNegativeLamports",
    );
    expect(resolveError(SYSTEM_PROGRAM_ID, { Custom: 1 })?.code).toBe(1);
  });

  it("resolves code 8 to NonceUnexpectedBlockhashValue", () => {
    expect(resolveError(SYSTEM_PROGRAM_ID, { Custom: 8 })?.name).toBe(
      "NonceUnexpectedBlockhashValue",
    );
  });
});

describe("resolveError — SPL Token", () => {
  it("resolves code 1 to InsufficientFunds", () => {
    expect(resolveError(TOKEN_PROGRAM_ID, { Custom: 1 })?.name).toBe(
      "InsufficientFunds",
    );
  });

  it("resolves code 17 to AccountFrozen", () => {
    expect(resolveError(TOKEN_PROGRAM_ID, { Custom: 17 })?.name).toBe(
      "AccountFrozen",
    );
  });

  it("resolves code 19 to NonNativeNotSupported", () => {
    expect(resolveError(TOKEN_PROGRAM_ID, { Custom: 19 })?.name).toBe(
      "NonNativeNotSupported",
    );
  });

  it("Token-2022 shares the same error map", () => {
    expect(resolveError(TOKEN_2022_PROGRAM_ID, { Custom: 1 })?.name).toBe(
      "InsufficientFunds",
    );
    expect(resolveError(TOKEN_2022_PROGRAM_ID, { Custom: 17 })?.name).toBe(
      "AccountFrozen",
    );
  });
});

describe("resolveError — Stake Program", () => {
  it("resolves code 0 to InsufficientFunds", () => {
    expect(resolveError(STAKE_PROGRAM_ID, { Custom: 0 })?.name).toBe(
      "InsufficientFunds",
    );
  });

  it("resolves code 6 to MinimumDelegationNotMet", () => {
    expect(resolveError(STAKE_PROGRAM_ID, { Custom: 6 })?.name).toBe(
      "MinimumDelegationNotMet",
    );
  });

  it("resolves code 8 to LockupInForce", () => {
    expect(resolveError(STAKE_PROGRAM_ID, { Custom: 8 })?.name).toBe(
      "LockupInForce",
    );
  });
});

describe("resolveError — edge cases", () => {
  it("returns null for string errors (runtime errors, not custom)", () => {
    expect(resolveError(SYSTEM_PROGRAM_ID, "InvalidAccountData")).toBeNull();
  });

  it("returns null for unknown program", () => {
    expect(
      resolveError("UnknownProgram1111111111111111111111111" as Address, {
        Custom: 0,
      }),
    ).toBeNull();
  });

  it("returns null for unknown error code in known program", () => {
    expect(resolveError(TOKEN_PROGRAM_ID, { Custom: 9999 })).toBeNull();
  });

  it("returns null for ATA program (no custom errors defined)", () => {
    expect(resolveError(ATA_PROGRAM_ID, { Custom: 0 })).toBeNull();
  });
});

describe("resolveError — custom program registration", () => {
  it("supports custom program registration", () => {
    const customMap: ErrorMap = new Map([
      [
        0,
        {
          code: 0,
          name: "CustomError",
          explanation: "test",
          fix: "test",
          confidence: "high",
        },
      ],
    ]);
    const customProgramId = "CustomProgram1111111111111111111111111" as Address;
    registerErrorMap(customProgramId, customMap);
    expect(resolveError(customProgramId, { Custom: 0 })?.name).toBe(
      "CustomError",
    );
  });
});
