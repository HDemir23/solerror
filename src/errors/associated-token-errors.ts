import type { ErrorMap, ErrorMapEntry } from "../types.js";

const entries: ErrorMapEntry[] = [
  {
    code: 0,
    name: "ATA Already Exists",
    explanation:
      "The Associated Token Account already exists for this wallet and mint.",
    fix: "Skip creation and use the existing ATA, or call getOrCreateAssociatedTokenAccount.",
    confidence: "high",
  },
  {
    code: 1,
    name: "Invalid Owner",
    explanation: "The ATA owner does not match the expected wallet address.",
    fix: "Verify you are using the correct wallet address as the ATA owner.",
    confidence: "high",
  },
  {
    code: 2,
    name: "Invalid Mint",
    explanation: "The mint provided is not a valid SPL Token mint account.",
    fix: "Verify the mint address is correct and the account exists.",
    confidence: "high",
  },
];

export const associatedTokenErrorMap: ErrorMap = new Map(
  entries.map((e) => [e.code, e]),
);
