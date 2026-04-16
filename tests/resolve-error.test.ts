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
const VOTE_PROGRAM_ID =
  "Vote111111111111111111111111111111111111111" as Address;
const METAPLEX_PROGRAM_ID =
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s" as Address;
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
  it("resolves code 0 to NoCreditsToRedeem", () => {
    expect(resolveError(STAKE_PROGRAM_ID, { Custom: 0 })?.name).toBe(
      "NoCreditsToRedeem",
    );
  });

  it("resolves code 1 to LockupInForce", () => {
    expect(resolveError(STAKE_PROGRAM_ID, { Custom: 1 })?.name).toBe(
      "LockupInForce",
    );
  });

  it("resolves code 6 to MergeMismatch", () => {
    expect(resolveError(STAKE_PROGRAM_ID, { Custom: 6 })?.name).toBe(
      "MergeMismatch",
    );
  });

  it("resolves code 14 to RedelegateToSameVoteAccount", () => {
    expect(resolveError(STAKE_PROGRAM_ID, { Custom: 14 })?.name).toBe(
      "RedelegateToSameVoteAccount",
    );
  });
});

describe("resolveError — Vote Program", () => {
  it("resolves code 0 to VoteTooOld", () => {
    expect(resolveError(VOTE_PROGRAM_ID, { Custom: 0 })?.name).toBe(
      "VoteTooOld",
    );
  });

  it("resolves code 5 to TooSoonToReauthorize", () => {
    expect(resolveError(VOTE_PROGRAM_ID, { Custom: 5 })?.name).toBe(
      "TooSoonToReauthorize",
    );
  });

  it("resolves code 18 to ActiveVoteAccountClose", () => {
    expect(resolveError(VOTE_PROGRAM_ID, { Custom: 18 })?.name).toBe(
      "ActiveVoteAccountClose",
    );
  });

  it("resolves code 19 to CommissionUpdateTooLate", () => {
    expect(resolveError(VOTE_PROGRAM_ID, { Custom: 19 })?.name).toBe(
      "CommissionUpdateTooLate",
    );
  });
});

describe("resolveError — Metaplex Token Metadata", () => {
  it("resolves code 2 to NotRentExempt", () => {
    expect(resolveError(METAPLEX_PROGRAM_ID, { Custom: 2 })?.name).toBe(
      "NotRentExempt",
    );
  });

  it("resolves code 15 to MintMismatch", () => {
    expect(resolveError(METAPLEX_PROGRAM_ID, { Custom: 15 })?.name).toBe(
      "MintMismatch",
    );
  });

  it("resolves code 80 to CollectionNotFound", () => {
    expect(resolveError(METAPLEX_PROGRAM_ID, { Custom: 80 })?.name).toBe(
      "CollectionNotFound",
    );
  });

  it("resolves code 127 to MustBeNonFungible", () => {
    expect(resolveError(METAPLEX_PROGRAM_ID, { Custom: 127 })?.name).toBe(
      "MustBeNonFungible",
    );
  });

  it("resolves code 202 to ConditionsForClosingNotMet", () => {
    expect(resolveError(METAPLEX_PROGRAM_ID, { Custom: 202 })?.name).toBe(
      "ConditionsForClosingNotMet",
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
