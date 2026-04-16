import { describe, it, expect } from "vitest";
import { systemErrorMap } from "../src/errors/system-errors.js";
import { tokenErrorMap } from "../src/errors/token-errors.js";
import { stakeErrorMap } from "../src/errors/stake-errors.js";
import { voteErrorMap } from "../src/errors/vote-errors.js";
import { metaplexErrorMap } from "../src/errors/metaplex-errors.js";
import { associatedTokenErrorMap } from "../src/errors/associated-token-errors.js";
import { computeBudgetErrorMap } from "../src/errors/compute-errors.js";

function validateEntries(
  map: ReadonlyMap<
    number,
    {
      code: number;
      name: string;
      explanation: string;
      fix: string;
      confidence: string;
    }
  >,
) {
  for (const [code, entry] of map) {
    expect(entry.code).toBe(code);
    expect(entry.name.length).toBeGreaterThan(0);
    expect(entry.explanation.length).toBeGreaterThan(0);
    expect(entry.fix.length).toBeGreaterThan(0);
    expect(["high", "medium", "low"]).toContain(entry.confidence);
  }
}

describe("systemErrorMap", () => {
  it("has 9 entries (codes 0-8)", () => {
    expect(systemErrorMap.size).toBe(9);
  });

  it("has sequential codes 0-8", () => {
    for (let i = 0; i <= 8; i++) {
      expect(systemErrorMap.has(i), `Missing code ${i}`).toBe(true);
    }
  });

  it("maps specific codes to correct names", () => {
    expect(systemErrorMap.get(0)?.name).toBe("AccountAlreadyInUse");
    expect(systemErrorMap.get(1)?.name).toBe("ResultWithNegativeLamports");
    expect(systemErrorMap.get(2)?.name).toBe("InvalidProgramId");
    expect(systemErrorMap.get(3)?.name).toBe("InvalidAccountDataLength");
    expect(systemErrorMap.get(4)?.name).toBe("MaxSeedLengthExceeded");
    expect(systemErrorMap.get(5)?.name).toBe("AddressWithSeedMismatch");
    expect(systemErrorMap.get(6)?.name).toBe("NonceNoRecentBlockhashes");
    expect(systemErrorMap.get(7)?.name).toBe("NonceBlockhashNotExpired");
    expect(systemErrorMap.get(8)?.name).toBe("NonceUnexpectedBlockhashValue");
  });

  it("all entries have required fields", () => {
    validateEntries(systemErrorMap);
  });
});

describe("tokenErrorMap", () => {
  it("has 20 entries (codes 0-19)", () => {
    expect(tokenErrorMap.size).toBe(20);
  });

  it("has sequential codes 0-19", () => {
    for (let i = 0; i <= 19; i++) {
      expect(tokenErrorMap.has(i), `Missing code ${i}`).toBe(true);
    }
  });

  it("maps specific codes to correct names", () => {
    expect(tokenErrorMap.get(0)?.name).toBe("NotRentExempt");
    expect(tokenErrorMap.get(1)?.name).toBe("InsufficientFunds");
    expect(tokenErrorMap.get(2)?.name).toBe("InvalidMint");
    expect(tokenErrorMap.get(3)?.name).toBe("MintMismatch");
    expect(tokenErrorMap.get(4)?.name).toBe("OwnerMismatch");
    expect(tokenErrorMap.get(5)?.name).toBe("FixedSupply");
    expect(tokenErrorMap.get(6)?.name).toBe("AlreadyInUse");
    expect(tokenErrorMap.get(12)?.name).toBe("InvalidInstruction");
    expect(tokenErrorMap.get(14)?.name).toBe("Overflow");
    expect(tokenErrorMap.get(17)?.name).toBe("AccountFrozen");
    expect(tokenErrorMap.get(19)?.name).toBe("NonNativeNotSupported");
  });

  it("all entries have required fields", () => {
    validateEntries(tokenErrorMap);
  });
});

describe("stakeErrorMap", () => {
  it("has 16 entries (codes 0-15)", () => {
    expect(stakeErrorMap.size).toBe(16);
  });

  it("maps specific codes to correct names from Rust source", () => {
    expect(stakeErrorMap.get(0)?.name).toBe("NoCreditsToRedeem");
    expect(stakeErrorMap.get(1)?.name).toBe("LockupInForce");
    expect(stakeErrorMap.get(2)?.name).toBe("AlreadyDeactivated");
    expect(stakeErrorMap.get(3)?.name).toBe("TooSoonToRedelegate");
    expect(stakeErrorMap.get(4)?.name).toBe("InsufficientStake");
    expect(stakeErrorMap.get(5)?.name).toBe("MergeTransientStake");
    expect(stakeErrorMap.get(6)?.name).toBe("MergeMismatch");
    expect(stakeErrorMap.get(7)?.name).toBe("CustodianMissing");
    expect(stakeErrorMap.get(8)?.name).toBe("CustodianSignatureMissing");
    expect(stakeErrorMap.get(9)?.name).toBe("InsufficientReferenceVotes");
    expect(stakeErrorMap.get(10)?.name).toBe("VoteAddressMismatch");
    expect(stakeErrorMap.get(11)?.name).toBe(
      "MinimumDelinquentEpochsForDeactivationNotMet",
    );
    expect(stakeErrorMap.get(12)?.name).toBe("InsufficientDelegation");
    expect(stakeErrorMap.get(13)?.name).toBe(
      "RedelegateTransientOrInactiveStake",
    );
    expect(stakeErrorMap.get(14)?.name).toBe("RedelegateToSameVoteAccount");
  });

  it("all entries have required fields", () => {
    validateEntries(stakeErrorMap);
  });
});

describe("voteErrorMap", () => {
  it("has 20 entries (codes 0-19)", () => {
    expect(voteErrorMap.size).toBe(20);
  });

  it("maps specific codes to correct names from Rust source", () => {
    expect(voteErrorMap.get(0)?.name).toBe("VoteTooOld");
    expect(voteErrorMap.get(1)?.name).toBe("SlotsMismatch");
    expect(voteErrorMap.get(2)?.name).toBe("SlotHashMismatch");
    expect(voteErrorMap.get(3)?.name).toBe("EmptySlots");
    expect(voteErrorMap.get(4)?.name).toBe("TimestampTooOld");
    expect(voteErrorMap.get(5)?.name).toBe("TooSoonToReauthorize");
    expect(voteErrorMap.get(6)?.name).toBe("LockoutConflict");
    expect(voteErrorMap.get(7)?.name).toBe("NewVoteStateLockoutMismatch");
    expect(voteErrorMap.get(8)?.name).toBe("SlotsNotOrdered");
    expect(voteErrorMap.get(9)?.name).toBe("ConfirmationsNotOrdered");
    expect(voteErrorMap.get(10)?.name).toBe("ZeroConfirmations");
    expect(voteErrorMap.get(11)?.name).toBe("ConfirmationTooLarge");
    expect(voteErrorMap.get(12)?.name).toBe("RootRollBack");
    expect(voteErrorMap.get(13)?.name).toBe("ConfirmationRollBack");
    expect(voteErrorMap.get(14)?.name).toBe("SlotSmallerThanRoot");
    expect(voteErrorMap.get(15)?.name).toBe("TooManyVotes");
    expect(voteErrorMap.get(16)?.name).toBe("VotesTooOldAllFiltered");
    expect(voteErrorMap.get(17)?.name).toBe("RootOnDifferentFork");
    expect(voteErrorMap.get(18)?.name).toBe("ActiveVoteAccountClose");
    expect(voteErrorMap.get(19)?.name).toBe("CommissionUpdateTooLate");
  });

  it("all entries have required fields", () => {
    validateEntries(voteErrorMap);
  });
});

describe("metaplexErrorMap", () => {
  it("has 203 entries (codes 0-202)", () => {
    expect(metaplexErrorMap.size).toBe(203);
  });

  it("has sequential codes 0-202", () => {
    for (let i = 0; i <= 202; i++) {
      expect(metaplexErrorMap.has(i), `Missing code ${i}`).toBe(true);
    }
  });

  it("maps specific codes to correct names", () => {
    expect(metaplexErrorMap.get(0)?.name).toBe("InstructionUnpackError");
    expect(metaplexErrorMap.get(2)?.name).toBe("NotRentExempt");
    expect(metaplexErrorMap.get(7)?.name).toBe("UpdateAuthorityIncorrect");
    expect(metaplexErrorMap.get(15)?.name).toBe("MintMismatch");
    expect(metaplexErrorMap.get(43)?.name).toBe("OwnerMismatch");
    expect(metaplexErrorMap.get(59)?.name).toBe("DataIsImmutable");
    expect(metaplexErrorMap.get(80)?.name).toBe("CollectionNotFound");
    expect(metaplexErrorMap.get(109)?.name).toBe("NotAMasterEdition");
    expect(metaplexErrorMap.get(127)?.name).toBe("MustBeNonFungible");
    expect(metaplexErrorMap.get(155)?.name).toBe("LockedToken");
    expect(metaplexErrorMap.get(202)?.name).toBe("ConditionsForClosingNotMet");
  });

  it("all entries have required fields", () => {
    validateEntries(metaplexErrorMap);
  });
});

describe("associatedTokenErrorMap", () => {
  it("is empty (ATA uses Token Program errors)", () => {
    expect(associatedTokenErrorMap.size).toBe(0);
  });
});

describe("computeBudgetErrorMap", () => {
  it("is empty (Compute Budget uses runtime InstructionError)", () => {
    expect(computeBudgetErrorMap.size).toBe(0);
  });
});
