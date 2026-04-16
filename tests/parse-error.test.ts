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

  it("returns null for undefined error", () => {
    expect(parseError(undefined, instructions, accountKeys)).toBeNull();
  });

  describe("transaction-level string errors", () => {
    const txErrors = [
      "AccountInUse",
      "AccountLoadedTwice",
      "AccountNotFound",
      "InsufficientFundsForFee",
      "InvalidAccountForFee",
      "AlreadyProcessed",
      "BlockhashNotFound",
      "CallChainTooDeep",
      "MissingSignatureForFee",
      "InvalidAccountIndex",
      "SignatureFailure",
      "InvalidProgramForExecution",
      "SanitizeFailure",
      "ClusterMaintenance",
      "AccountBorrowOutstanding",
      "WouldExceedMaxBlockCostLimit",
      "UnsupportedVersion",
      "InvalidWritableAccount",
      "WouldExceedMaxAccountCostLimit",
      "WouldExceedAccountDataBlockLimit",
      "TooManyAccountLocks",
      "AddressLookupTableNotFound",
      "InvalidAddressLookupTableOwner",
      "InvalidAddressLookupTableData",
      "InvalidAddressLookupTableIndex",
      "InvalidRentPayingAccount",
      "WouldExceedMaxVoteCostLimit",
      "WouldExceedAccountDataTotalLimit",
      "MaxLoadedAccountsDataSizeExceeded",
      "InvalidLoadedAccountsDataSizeLimit",
      "ResanitizationNeeded",
      "UnbalancedTransaction",
      "ProgramAccountNotFound",
      "ProgramCacheHitMaxLimit",
    ];

    for (const errStr of txErrors) {
      it(`parses "${errStr}" as transaction error`, () => {
        const result = parseError(errStr, instructions, accountKeys);
        expect(result).toEqual({ type: "transaction", error: errStr });
      });
    }
  });

  describe("InstructionError with string variants", () => {
    const instructionErrors = [
      "GenericError",
      "InvalidArgument",
      "InvalidInstructionData",
      "InvalidAccountData",
      "AccountDataTooSmall",
      "InsufficientFunds",
      "IncorrectProgramId",
      "MissingRequiredSignature",
      "AccountAlreadyInitialized",
      "UninitializedAccount",
      "UnbalancedInstruction",
      "ModifiedProgramId",
      "ExternalAccountLamportSpend",
      "ExternalAccountDataModified",
      "ReadonlyLamportChange",
      "ReadonlyDataModified",
      "DuplicateAccountIndex",
      "ExecutableModified",
      "RentEpochModified",
      "NotEnoughAccountKeys",
      "AccountDataSizeChanged",
      "AccountNotExecutable",
      "AccountBorrowFailed",
      "AccountBorrowOutstanding",
      "DuplicateAccountOutOfSync",
      "InvalidError",
      "ExecutableDataModified",
      "ExecutableLamportChange",
      "ExecutableAccountNotRentExempt",
      "UnsupportedProgramId",
      "CallDepth",
      "MissingAccount",
      "ReentrancyNotAllowed",
      "MaxSeedLengthExceeded",
      "InvalidSeeds",
      "InvalidRealloc",
      "ComputationalBudgetExceeded",
      "PrivilegeEscalation",
      "ProgramEnvironmentSetupFailure",
      "ProgramFailedToComplete",
      "ProgramFailedToCompile",
      "Immutable",
      "IncorrectAuthority",
      "BorshIoError",
      "AccountNotRentExempt",
      "InvalidAccountOwner",
      "ArithmeticOverflow",
      "UnsupportedSysvar",
      "IllegalOwner",
      "MaxAccountsDataAllocationsExceeded",
      "MaxAccountsExceeded",
      "MaxInstructionTraceLengthExceeded",
      "BuiltinProgramsMustConsumeComputeUnits",
    ];

    for (const errStr of instructionErrors) {
      it(`parses InstructionError with "${errStr}"`, () => {
        const err = { InstructionError: [1, errStr] };
        const result = parseError(err, instructions, accountKeys);
        expect(result).not.toBeNull();
        if (result && result.type === "instruction") {
          expect(result.instructionIndex).toBe(1);
          expect(result.programId).toBe(accountKeys[1]);
          expect(result.rawError).toBe(errStr);
        }
      });
    }
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

  it("parses InstructionError with bigint instruction index", () => {
    const err = { InstructionError: [BigInt(2), { Custom: 5 }] };
    const result = parseError(err, instructions, accountKeys);
    expect(result).not.toBeNull();
    if (result && result.type === "instruction") {
      expect(result.instructionIndex).toBe(2);
      expect(result.programId).toBe(accountKeys[2]);
    }
  });

  it("parses InstructionError with bigint Custom code", () => {
    const err = { InstructionError: [0, { Custom: BigInt(6001) }] };
    const result = parseError(err, instructions, accountKeys);
    expect(result).not.toBeNull();
    if (result && result.type === "instruction") {
      expect(result.rawError).toEqual({ Custom: 6001 });
    }
  });

  it("handles out-of-bounds instruction index", () => {
    const err = { InstructionError: [99, { Custom: 1 }] };
    const result = parseError(err, instructions, accountKeys);
    expect(result).not.toBeNull();
    if (result && result.type === "instruction") {
      expect(result.programId).toBe("unknown");
    }
  });

  it("parses DuplicateInstruction error", () => {
    const err = { DuplicateInstruction: 2 };
    const result = parseError(err, instructions, accountKeys);
    expect(result).not.toBeNull();
    if (result && result.type === "instruction") {
      expect(result.instructionIndex).toBe(2);
      expect(result.programId).toBe(accountKeys[2]);
      expect(result.rawError).toBe("DuplicateInstruction");
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

  it("parses ProgramExecutionTemporarilyRestricted error", () => {
    const err = { ProgramExecutionTemporarilyRestricted: { account_index: 5 } };
    const result = parseError(err, instructions, accountKeys);
    expect(result).not.toBeNull();
    if (result && result.type === "transaction") {
      expect(result.error).toContain("ProgramExecutionTemporarilyRestricted");
      expect(result.error).toContain("5");
    }
  });

  it("falls back to JSON stringify for unknown error objects", () => {
    const err = { SomeFutureError: { data: 42 } };
    const result = parseError(err, instructions, accountKeys);
    expect(result?.type).toBe("transaction");
    if (result?.type === "transaction") {
      expect(result.error).toContain("SomeFutureError");
    }
  });

  it("handles empty object error", () => {
    const result = parseError({}, instructions, accountKeys);
    expect(result?.type).toBe("transaction");
  });
});
