import type { Address } from "@solana/addresses";
import type { ParsedError } from "./types.js";

export function parseError(
  rawErr: unknown,
  instructions: readonly { programIdIndex: number }[],
  accountKeys: readonly Address[],
): ParsedError | null {
  if (!rawErr || rawErr === null) return null;

  if (typeof rawErr === "string") {
    return { type: "transaction", error: rawErr };
  }

  if (typeof rawErr === "object" && rawErr !== null) {
    const errObj = rawErr as Record<string, unknown>;

    if (
      "InstructionError" in errObj &&
      Array.isArray(errObj.InstructionError)
    ) {
      const [instructionIndex, detail] = errObj.InstructionError as [
        number,
        unknown,
      ];

      const instruction = instructions[instructionIndex];
      const programId = instruction
        ? accountKeys[instruction.programIdIndex]
        : ("unknown" as Address);

      let rawError: string | { Custom: number };
      if (typeof detail === "string") {
        rawError = detail;
      } else if (
        typeof detail === "object" &&
        detail !== null &&
        "Custom" in (detail as object)
      ) {
        rawError = { Custom: (detail as { Custom: number }).Custom };
      } else {
        rawError = JSON.stringify(detail);
      }

      return {
        type: "instruction",
        instructionIndex,
        programId,
        rawError,
      };
    }

    if ("DuplicateInstruction" in errObj) {
      const index = (errObj as { DuplicateInstruction: number })
        .DuplicateInstruction;
      const instruction = instructions[index];
      const programId = instruction
        ? accountKeys[instruction.programIdIndex]
        : ("unknown" as Address);
      return {
        type: "instruction",
        instructionIndex: index,
        programId,
        rawError: "DuplicateInstruction",
      };
    }

    if ("InsufficientFundsForRent" in errObj) {
      return {
        type: "transaction",
        error: "InsufficientFundsForRent",
      };
    }
  }

  return { type: "transaction", error: JSON.stringify(rawErr) };
}
