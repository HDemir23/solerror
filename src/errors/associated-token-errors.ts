import type { ErrorMap } from "../types.js";

export const associatedTokenErrorMap: ErrorMap = new Map([
  // ATA Program typically bubbles up Token Program errors (InsufficientFunds, etc.)
  // which are resolved via tokenErrorMap. ATA-specific custom errors are not defined
  // in the current program implementation.
]);
