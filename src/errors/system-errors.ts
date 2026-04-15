import type { ErrorMap, ErrorMapEntry } from "../types.js";

const entries: ErrorMapEntry[] = [
  {
    code: 0,
    name: "AccountAlreadyInUse",
    explanation: "An account with the same address already exists",
    fix: "Use a different account address or check if the existing account should be closed first",
    confidence: "high",
  },
  {
    code: 1,
    name: "ResultWithNegativeLamports",
    explanation: "Account does not have enough SOL to perform the operation",
    fix: "Fund the account with more SOL before retrying",
    confidence: "high",
  },
  {
    code: 2,
    name: "InvalidProgramId",
    explanation: "Cannot assign account to this program ID",
    fix: "Verify the program ID is valid and matches the expected owner",
    confidence: "high",
  },
  {
    code: 3,
    name: "InvalidAccountDataLength",
    explanation:
      "Cannot allocate account data of this length (exceeds 10 MiB max)",
    fix: "Reduce the data size to within MAX_PERMITTED_DATA_LENGTH (10,485,760 bytes)",
    confidence: "high",
  },
  {
    code: 4,
    name: "MaxSeedLengthExceeded",
    explanation: "Length of the requested PDA seed is too long",
    fix: "Use shorter seeds (max 32 bytes per seed)",
    confidence: "high",
  },
  {
    code: 5,
    name: "AddressWithSeedMismatch",
    explanation:
      "Provided address does not match the address derived from seed",
    fix: "Verify PDA derivation uses the correct base, seed, and program ID",
    confidence: "high",
  },
  {
    code: 6,
    name: "NonceNoRecentBlockhashes",
    explanation:
      "Advancing stored nonce requires a populated RecentBlockhashes sysvar",
    fix: "Include the RecentBlockhashes sysvar account in the transaction",
    confidence: "high",
  },
  {
    code: 7,
    name: "NonceBlockhashNotExpired",
    explanation:
      "Stored nonce is still in recent_blockhashes — cannot advance twice in same slot",
    fix: "Wait for the next slot before advancing the nonce again",
    confidence: "high",
  },
  {
    code: 8,
    name: "NonceUnexpectedBlockhashValue",
    explanation: "Specified nonce does not match the stored nonce value",
    fix: "Verify the correct nonce account and value are being used",
    confidence: "high",
  },
];

export const systemErrorMap: ErrorMap = new Map(
  entries.map((e) => [e.code, e]),
);
