import { describe, it, expect } from "vitest";
import { resolveError, registerErrorMap } from "../src/resolve-error.js";
import type { Address } from "@solana/addresses";
import type { ErrorMap } from "../src/types.js";

const TOKEN_PROGRAM_ID =
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" as Address;
const SYSTEM_PROGRAM_ID = "11111111111111111111111111111111" as Address;

describe("resolveError", () => {
  it("resolves a known system error", () => {
    const result = resolveError(SYSTEM_PROGRAM_ID, { Custom: 1 });
    expect(result).not.toBeNull();
    expect(result?.name).toBe("ResultWithNegativeLamports");
    expect(result?.code).toBe(1);
  });

  it("resolves a known token error", () => {
    const result = resolveError(TOKEN_PROGRAM_ID, { Custom: 1 });
    expect(result).not.toBeNull();
    expect(result?.name).toBe("InsufficientFunds");
  });

  it("returns null for string errors (runtime errors, not custom)", () => {
    const result = resolveError(SYSTEM_PROGRAM_ID, "InvalidAccountData");
    expect(result).toBeNull();
  });

  it("returns null for unknown program", () => {
    const result = resolveError(
      "UnknownProgram1111111111111111111111111" as Address,
      { Custom: 0 },
    );
    expect(result).toBeNull();
  });

  it("returns null for unknown error code in known program", () => {
    const result = resolveError(TOKEN_PROGRAM_ID, { Custom: 9999 });
    expect(result).toBeNull();
  });

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
    const result = resolveError(customProgramId, { Custom: 0 });
    expect(result?.name).toBe("CustomError");
  });
});
