import { describe, it, expect } from "vitest";
import { parseError } from "../src/parse-error.js";
import type { Address } from "@solana/addresses";

describe("parseError", () => {
  const accountKeys = [
    "11111111111111111111111111111111" as Address,
    "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" as Address,
    "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL" as Address,
  ];
  const instructions = [
    { programIdIndex: 0 },
    { programIdIndex: 1 },
    { programIdIndex: 2 },
  ];

  it("returns null for null error", () => {
    expect(parseError(null, instructions, accountKeys)).toBeNull();
  });

  it("parses a transaction-level string error", () => {
    const result = parseError(
      "InsufficientFundsForFee",
      instructions,
      accountKeys,
    );
    expect(result).toEqual({
      type: "transaction",
      error: "InsufficientFundsForFee",
    });
  });

  it("parses InstructionError with Custom code", () => {
    const err = { InstructionError: [1, { Custom: 1 }] };
    const result = parseError(err, instructions, accountKeys);
    expect(result).not.toBeNull();
    if (result && result.type === "instruction") {
      expect(result.instructionIndex).toBe(1);
      expect(result.programId).toBe(accountKeys[1]);
      expect(result.rawError).toEqual({ Custom: 1 });
    }
  });

  it("parses InstructionError with string detail", () => {
    const err = { InstructionError: [0, "InvalidAccountData"] };
    const result = parseError(err, instructions, accountKeys);
    expect(result).not.toBeNull();
    if (result && result.type === "instruction") {
      expect(result.instructionIndex).toBe(0);
      expect(result.programId).toBe(accountKeys[0]);
      expect(result.rawError).toBe("InvalidAccountData");
    }
  });

  it("parses DuplicateInstruction error", () => {
    const err = { DuplicateInstruction: 2 };
    const result = parseError(err, instructions, accountKeys);
    expect(result).not.toBeNull();
    if (result && result.type === "instruction") {
      expect(result.instructionIndex).toBe(2);
      expect(result.programId).toBe(accountKeys[2]);
    }
  });

  it("parses InsufficientFundsForRent error", () => {
    const err = { InsufficientFundsForRent: { account_index: 0 } };
    const result = parseError(err, instructions, accountKeys);
    expect(result).toEqual({
      type: "transaction",
      error: "InsufficientFundsForRent",
    });
  });

  it("falls back to JSON stringify for unknown error objects", () => {
    const err = { SomeNewError: { data: 42 } };
    const result = parseError(err, instructions, accountKeys);
    expect(result?.type).toBe("transaction");
    if (result?.type === "transaction") {
      expect(result.error).toContain("SomeNewError");
    }
  });
});
