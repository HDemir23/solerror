import type { ErrorMap, ErrorMapEntry } from "../types.js";

const entries: ErrorMapEntry[] = [
  {
    code: 0,
    name: "Out of Compute Units",
    explanation: "The transaction ran out of compute units before completing.",
    fix: "Request more compute units using ComputeBudgetProgram.setComputeUnitLimit(). Simulate the transaction first to estimate actual CU usage.",
    confidence: "high",
  },
];

export const computeErrorMap: ErrorMap = new Map(
  entries.map((e) => [e.code, e]),
);
