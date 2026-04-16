import type { Address } from "@solana/addresses";
import type { ErrorMapEntry, ErrorMap } from "./types.js";
import { systemErrorMap } from "./errors/system-errors.js";
import { tokenErrorMap } from "./errors/token-errors.js";
//import { associatedTokenErrorMap } from "./errors/associated-token-errors.js";
//import { computeBudgetErrorMap } from "./errors/compute-errors.js";
import { stakeErrorMap } from "./errors/stake-errors.js";
import { voteErrorMap } from "./errors/vote-errors.js";
import { metaplexErrorMap } from "./errors/metaplex-errors.js";

const SYSTEM_PROGRAM_ID = "11111111111111111111111111111111";
const TOKEN_PROGRAM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
const TOKEN_2022_PROGRAM_ID = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
//const ATA_PROGRAM_ID = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
//const COMPUTE_BUDGET_PROGRAM_ID = "ComputeBudget111111111111111111111111111111";
const STAKE_PROGRAM_ID = "Stake11111111111111111111111111111111111111";
const VOTE_PROGRAM_ID = "Vote111111111111111111111111111111111111111";
const METAPLEX_PROGRAM_ID = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";

const registry = new Map<string, ErrorMap>([
  [SYSTEM_PROGRAM_ID, systemErrorMap],
  [TOKEN_PROGRAM_ID, tokenErrorMap],
  [TOKEN_2022_PROGRAM_ID, tokenErrorMap],
  //[ATA_PROGRAM_ID, associatedTokenErrorMap],
  //[COMPUTE_BUDGET_PROGRAM_ID, computeBudgetErrorMap],
  [STAKE_PROGRAM_ID, stakeErrorMap],
  [VOTE_PROGRAM_ID, voteErrorMap],
  [METAPLEX_PROGRAM_ID, metaplexErrorMap],
]);

export function resolveError(
  programId: Address,
  rawError: string | { Custom: number },
): ErrorMapEntry | null {
  if (typeof rawError === "string") return null;

  const errorMap = registry.get(programId);
  if (!errorMap) return null;

  return errorMap.get(rawError.Custom) ?? null;
}

export function registerErrorMap(programId: string, errorMap: ErrorMap): void {
  registry.set(programId, errorMap);
}
