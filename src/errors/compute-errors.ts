import type { ErrorMap } from "../types.js";

export const computeBudgetErrorMap: ErrorMap = new Map([
  // Compute Budget Program does not define Custom errors.
  // "ComputationalBudgetExceeded" appears as InstructionError code 37,
  // not as a Custom(n) — handled by parseError as a runtime string variant.
]);
