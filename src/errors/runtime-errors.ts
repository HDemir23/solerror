import type { ErrorMapEntry } from "../types.js";

type RuntimeErrorEntry = Omit<ErrorMapEntry, "code">;

export const instructionErrorMap: ReadonlyMap<string, RuntimeErrorEntry> =
  new Map<string, RuntimeErrorEntry>([
    [
      "GenericError",
      {
        name: "GenericError",
        explanation: "Generic program error with no specific cause",
        fix: "Check the program logs for more details",
        confidence: "low",
      },
    ],
    [
      "InvalidArgument",
      {
        name: "InvalidArgument",
        explanation: "Invalid argument passed to the instruction",
        fix: "Verify all instruction arguments are correctly formatted",
        confidence: "high",
      },
    ],
    [
      "InvalidInstructionData",
      {
        name: "InvalidInstructionData",
        explanation: "Instruction data could not be parsed by the program",
        fix: "Ensure the instruction data matches the expected format",
        confidence: "high",
      },
    ],
    [
      "InvalidAccountData",
      {
        name: "InvalidAccountData",
        explanation: "Account data is invalid or does not match expected state",
        fix: "Verify the account is in the correct state for this operation",
        confidence: "high",
      },
    ],
    [
      "AccountDataTooSmall",
      {
        name: "AccountDataTooSmall",
        explanation: "Account data is too small for the requested operation",
        fix: "Allocate more space when creating the account",
        confidence: "high",
      },
    ],
    [
      "InsufficientFunds",
      {
        name: "InsufficientFunds",
        explanation: "Not enough lamports or tokens to perform the operation",
        fix: "Fund the account with enough SOL or tokens",
        confidence: "high",
      },
    ],
    [
      "IncorrectProgramId",
      {
        name: "IncorrectProgramId",
        explanation: "Account is not owned by the expected program",
        fix: "Use an account owned by the correct program",
        confidence: "high",
      },
    ],
    [
      "MissingRequiredSignature",
      {
        name: "MissingRequiredSignature",
        explanation: "Required signer did not sign the transaction",
        fix: "Ensure all required signers sign the transaction",
        confidence: "high",
      },
    ],
    [
      "AccountAlreadyInitialized",
      {
        name: "AccountAlreadyInitialized",
        explanation: "Account has already been initialized",
        fix: "Use a new uninitialized account or skip initialization",
        confidence: "high",
      },
    ],
    [
      "UninitializedAccount",
      {
        name: "UninitializedAccount",
        explanation: "Account has not been initialized yet",
        fix: "Initialize the account before using it",
        confidence: "high",
      },
    ],
    [
      "UnbalancedInstruction",
      {
        name: "UnbalancedInstruction",
        explanation:
          "Instruction spent lamports without matching on both sides",
        fix: "Ensure total lamports in equals total lamports out",
        confidence: "medium",
      },
    ],
    [
      "ModifiedProgramId",
      {
        name: "ModifiedProgramId",
        explanation: "Program tried to modify the program ID of an account",
        fix: "Program IDs are immutable — remove the modification",
        confidence: "medium",
      },
    ],
    [
      "ExternalAccountLamportSpend",
      {
        name: "ExternalAccountLamportSpend",
        explanation:
          "Program tried to spend lamports from an account it does not own",
        fix: "Only debit from accounts owned by the program",
        confidence: "medium",
      },
    ],
    [
      "ExternalAccountDataModified",
      {
        name: "ExternalAccountDataModified",
        explanation:
          "Program tried to modify data of an account it does not own",
        fix: "Only modify accounts owned by the program",
        confidence: "medium",
      },
    ],
    [
      "ReadonlyLamportChange",
      {
        name: "ReadonlyLamportChange",
        explanation: "Tried to change lamports on a read-only account",
        fix: "Mark the account as writable if it needs lamport changes",
        confidence: "high",
      },
    ],
    [
      "ReadonlyDataModified",
      {
        name: "ReadonlyDataModified",
        explanation: "Tried to modify data on a read-only account",
        fix: "Mark the account as writable if it needs data changes",
        confidence: "high",
      },
    ],
    [
      "DuplicateAccountIndex",
      {
        name: "DuplicateAccountIndex",
        explanation: "Same account passed twice in the instruction",
        fix: "Pass each account only once",
        confidence: "high",
      },
    ],
    [
      "ExecutableModified",
      {
        name: "ExecutableModified",
        explanation: "Tried to change the executable flag of an account",
        fix: "The executable flag is set at creation and cannot be changed",
        confidence: "medium",
      },
    ],
    [
      "RentEpochModified",
      {
        name: "RentEpochModified",
        explanation: "Program tried to modify the rent epoch of an account",
        fix: "Rent epoch is managed by the runtime and is read-only",
        confidence: "medium",
      },
    ],
    [
      "NotEnoughAccountKeys",
      {
        name: "NotEnoughAccountKeys",
        explanation: "Instruction references more accounts than provided",
        fix: "Provide all accounts required by the instruction",
        confidence: "high",
      },
    ],
    [
      "AccountDataSizeChanged",
      {
        name: "AccountDataSizeChanged",
        explanation:
          "Program tried to change the data size of an account without realloc",
        fix: "Use realloc to change account data size",
        confidence: "medium",
      },
    ],
    [
      "AccountNotExecutable",
      {
        name: "AccountNotExecutable",
        explanation:
          "Account is not marked as executable but was invoked as a program",
        fix: "Only invoke accounts that are executable programs",
        confidence: "high",
      },
    ],
    [
      "AccountBorrowFailed",
      {
        name: "AccountBorrowFailed",
        explanation:
          "Account was already borrowed and cannot be borrowed again",
        fix: "Avoid concurrent borrows of the same account",
        confidence: "low",
      },
    ],
    [
      "AccountBorrowOutstanding",
      {
        name: "AccountBorrowOutstanding",
        explanation: "Account reference remained at end of instruction",
        fix: "Ensure all account references are properly released",
        confidence: "low",
      },
    ],
    [
      "DuplicateAccountOutOfSync",
      {
        name: "DuplicateAccountOutOfSync",
        explanation: "Duplicate accounts have mismatched data or lamports",
        fix: "Ensure duplicate account references match exactly",
        confidence: "medium",
      },
    ],
    [
      "InvalidError",
      {
        name: "InvalidError",
        explanation:
          "Program returned an error code that does not map to a known error",
        fix: "Check the program's error definitions",
        confidence: "low",
      },
    ],
    [
      "ExecutableDataModified",
      {
        name: "ExecutableDataModified",
        explanation: "Tried to modify data of an executable account",
        fix: "Executable (program) accounts are immutable",
        confidence: "medium",
      },
    ],
    [
      "ExecutableLamportChange",
      {
        name: "ExecutableLamportChange",
        explanation: "Tried to change lamports on an executable account",
        fix: "Program accounts cannot receive lamport changes via instructions",
        confidence: "medium",
      },
    ],
    [
      "ExecutableAccountNotRentExempt",
      {
        name: "ExecutableAccountNotRentExempt",
        explanation:
          "Executable account balance fell below rent-exempt threshold",
        fix: "Ensure program accounts maintain rent-exempt balance",
        confidence: "medium",
      },
    ],
    [
      "UnsupportedProgramId",
      {
        name: "UnsupportedProgramId",
        explanation: "Program ID is not supported for this operation",
        fix: "Use a supported program for this instruction",
        confidence: "medium",
      },
    ],
    [
      "CallDepth",
      {
        name: "CallDepth",
        explanation: "Maximum call depth exceeded (too many nested CPI calls)",
        fix: "Reduce the depth of cross-program invocations",
        confidence: "high",
      },
    ],
    [
      "MissingAccount",
      {
        name: "MissingAccount",
        explanation: "Required account is missing from the instruction",
        fix: "Provide all required accounts for the instruction",
        confidence: "high",
      },
    ],
    [
      "ReentrancyNotAllowed",
      {
        name: "ReentrancyNotAllowed",
        explanation: "Program tried to call itself recursively",
        fix: "Refactor to avoid recursive program calls",
        confidence: "high",
      },
    ],
    [
      "MaxSeedLengthExceeded",
      {
        name: "MaxSeedLengthExceeded",
        explanation: "PDA seed exceeds the maximum allowed length",
        fix: "Shorten the seed to 32 bytes or fewer",
        confidence: "high",
      },
    ],
    [
      "InvalidSeeds",
      {
        name: "InvalidSeeds",
        explanation: "Invalid seeds provided for PDA derivation",
        fix: "Ensure seeds produce a valid PDA off-curve address",
        confidence: "high",
      },
    ],
    [
      "InvalidRealloc",
      {
        name: "InvalidRealloc",
        explanation:
          "Invalid account reallocation — tried to increase by more than allowed",
        fix: "Reduce the realloc size or use zero-init bytes",
        confidence: "medium",
      },
    ],
    [
      "ComputationalBudgetExceeded",
      {
        name: "ComputationalBudgetExceeded",
        explanation: "Transaction consumed more compute units than allowed",
        fix: "Request more compute units via ComputeBudget program or optimize the instruction",
        confidence: "high",
      },
    ],
    [
      "PrivilegeEscalation",
      {
        name: "PrivilegeEscalation",
        explanation:
          "Program tried to escalate privileges beyond what was granted",
        fix: "Ensure the instruction does not require more permissions than provided",
        confidence: "medium",
      },
    ],
    [
      "ProgramEnvironmentSetupFailure",
      {
        name: "ProgramEnvironmentSetupFailure",
        explanation:
          "Runtime failed to set up the program execution environment",
        fix: "This is usually a transient issue — retry the transaction",
        confidence: "low",
      },
    ],
    [
      "ProgramFailedToComplete",
      {
        name: "ProgramFailedToComplete",
        explanation:
          "Program started executing but failed before completion — often due to a panic, overflow, or assertion failure",
        fix: "Check program logs — common causes: slippage exceeded, insufficient liquidity, assertion failure, or compute budget exceeded",
        confidence: "high",
      },
    ],
    [
      "ProgramFailedToCompile",
      {
        name: "ProgramFailedToCompile",
        explanation: "Program bytecode failed to compile (SBF loader error)",
        fix: "This is typically a program deployment issue — contact the program developer",
        confidence: "low",
      },
    ],
    [
      "Immutable",
      {
        name: "Immutable",
        explanation: "Account is immutable and cannot be modified",
        fix: "Do not attempt to write to immutable accounts",
        confidence: "high",
      },
    ],
    [
      "IncorrectAuthority",
      {
        name: "IncorrectAuthority",
        explanation: "Wrong authority signed the transaction",
        fix: "Sign with the correct authority for this operation",
        confidence: "high",
      },
    ],
    [
      "BorshIoError",
      {
        name: "BorshIoError",
        explanation: "Borsh serialization or deserialization failed",
        fix: "Ensure account data matches the expected struct layout",
        confidence: "medium",
      },
    ],
    [
      "AccountNotRentExempt",
      {
        name: "AccountNotRentExempt",
        explanation: "Account balance is below the rent-exempt minimum",
        fix: "Fund the account with enough SOL to be rent-exempt",
        confidence: "high",
      },
    ],
    [
      "InvalidAccountOwner",
      {
        name: "InvalidAccountOwner",
        explanation: "Account is not owned by the expected program",
        fix: "Use an account owned by the correct program",
        confidence: "high",
      },
    ],
    [
      "ArithmeticOverflow",
      {
        name: "ArithmeticOverflow",
        explanation: "Arithmetic overflow occurred during computation",
        fix: "Reduce amounts or use checked arithmetic",
        confidence: "medium",
      },
    ],
    [
      "UnsupportedSysvar",
      {
        name: "UnsupportedSysvar",
        explanation: "Program tried to use an unsupported sysvar",
        fix: "Only use supported sysvars in the instruction",
        confidence: "medium",
      },
    ],
    [
      "IllegalOwner",
      {
        name: "IllegalOwner",
        explanation:
          "Account is owned by a program that is not allowed for this operation",
        fix: "Use an account with the correct owner",
        confidence: "high",
      },
    ],
    [
      "MaxAccountsDataAllocationsExceeded",
      {
        name: "MaxAccountsDataAllocationsExceeded",
        explanation: "Total account data allocations exceeded the limit",
        fix: "Reduce the number or size of account data allocations",
        confidence: "medium",
      },
    ],
    [
      "MaxAccountsExceeded",
      {
        name: "MaxAccountsExceeded",
        explanation: "Too many accounts referenced in the transaction",
        fix: "Reduce the number of accounts in the transaction",
        confidence: "medium",
      },
    ],
    [
      "MaxInstructionTraceLengthExceeded",
      {
        name: "MaxInstructionTraceLengthExceeded",
        explanation:
          "Instruction trace is too long (too many instructions or CPIs)",
        fix: "Simplify the transaction or break it into multiple transactions",
        confidence: "medium",
      },
    ],
    [
      "BuiltinProgramsMustConsumeComputeUnits",
      {
        name: "BuiltinProgramsMustConsumeComputeUnits",
        explanation:
          "Built-in program instruction did not consume any compute units",
        fix: "This is an internal runtime error — not actionable by users",
        confidence: "low",
      },
    ],
  ]);

export const transactionErrorMap: ReadonlyMap<string, RuntimeErrorEntry> =
  new Map<string, RuntimeErrorEntry>([
    [
      "AccountInUse",
      {
        name: "AccountInUse",
        explanation:
          "Account is already being used by another transaction in the current block",
        fix: "Retry the transaction — this is a transient contention error",
        confidence: "high",
      },
    ],
    [
      "AccountLoadedTwice",
      {
        name: "AccountLoadedTwice",
        explanation:
          "Same account was loaded more than once with different permissions",
        fix: "Ensure each account appears only once in the transaction",
        confidence: "high",
      },
    ],
    [
      "AccountNotFound",
      {
        name: "AccountNotFound",
        explanation: "Referenced account does not exist on chain",
        fix: "Create the account first or verify the address is correct",
        confidence: "high",
      },
    ],
    [
      "InsufficientFundsForFee",
      {
        name: "InsufficientFundsForFee",
        explanation:
          "Fee payer does not have enough SOL to cover the transaction fee",
        fix: "Fund the fee payer account with more SOL",
        confidence: "high",
      },
    ],
    [
      "InvalidAccountForFee",
      {
        name: "InvalidAccountForFee",
        explanation: "Fee payer account is invalid or not a signer",
        fix: "Ensure the fee payer is a valid signer account",
        confidence: "high",
      },
    ],
    [
      "AlreadyProcessed",
      {
        name: "AlreadyProcessed",
        explanation:
          "Transaction with this signature has already been processed",
        fix: "No action needed — transaction already confirmed",
        confidence: "high",
      },
    ],
    [
      "BlockhashNotFound",
      {
        name: "BlockhashNotFound",
        explanation: "Transaction blockhash has expired (too old or not found)",
        fix: "Get a fresh blockhash and resubmit the transaction",
        confidence: "high",
      },
    ],
    [
      "CallChainTooDeep",
      {
        name: "CallChainTooDeep",
        explanation: "Cross-program invocation chain is too deep",
        fix: "Reduce the number of nested CPI calls",
        confidence: "medium",
      },
    ],
    [
      "MissingSignatureForFee",
      {
        name: "MissingSignatureForFee",
        explanation: "Fee payer signature is missing from the transaction",
        fix: "Sign the transaction with the fee payer",
        confidence: "high",
      },
    ],
    [
      "InvalidAccountIndex",
      {
        name: "InvalidAccountIndex",
        explanation:
          "Instruction references an account index that does not exist",
        fix: "Verify all account indices are within bounds",
        confidence: "high",
      },
    ],
    [
      "SignatureFailure",
      {
        name: "SignatureFailure",
        explanation: "Signature verification failed",
        fix: "Ensure all required signers have signed correctly",
        confidence: "high",
      },
    ],
    [
      "InvalidProgramForExecution",
      {
        name: "InvalidProgramForExecution",
        explanation: "Invoked program is not executable",
        fix: "Only invoke deployed, executable programs",
        confidence: "high",
      },
    ],
    [
      "SanitizeFailure",
      {
        name: "SanitizeFailure",
        explanation: "Transaction failed sanitization checks",
        fix: "Ensure the transaction is well-formed — check account duplicates, signers, and format",
        confidence: "medium",
      },
    ],
    [
      "ClusterMaintenance",
      {
        name: "ClusterMaintenance",
        explanation: "Cluster is currently under maintenance",
        fix: "Wait and retry later",
        confidence: "low",
      },
    ],
    [
      "AccountBorrowOutstanding",
      {
        name: "AccountBorrowOutstanding",
        explanation:
          "Account reference remained outstanding at transaction end",
        fix: "Internal runtime error — retry the transaction",
        confidence: "low",
      },
    ],
    [
      "WouldExceedMaxBlockCostLimit",
      {
        name: "WouldExceedMaxBlockCostLimit",
        explanation: "Transaction would exceed the block compute unit limit",
        fix: "Reduce compute usage or wait for a less congested block",
        confidence: "high",
      },
    ],
    [
      "UnsupportedVersion",
      {
        name: "UnsupportedVersion",
        explanation: "Transaction version is not supported",
        fix: "Use a supported transaction version (legacy or 0)",
        confidence: "high",
      },
    ],
    [
      "InvalidWritableAccount",
      {
        name: "InvalidWritableAccount",
        explanation: "Account marked as writable should be read-only",
        fix: "Correct the writable flag on the account",
        confidence: "high",
      },
    ],
    [
      "WouldExceedMaxAccountCostLimit",
      {
        name: "WouldExceedMaxAccountCostLimit",
        explanation:
          "Transaction would exceed the max account cost limit for the block",
        fix: "Reduce the number of writable accounts",
        confidence: "medium",
      },
    ],
    [
      "WouldExceedAccountDataBlockLimit",
      {
        name: "WouldExceedAccountDataBlockLimit",
        explanation:
          "Transaction would exceed the account data limit for the block",
        fix: "Reduce the data size changes in the transaction",
        confidence: "medium",
      },
    ],
    [
      "TooManyAccountLocks",
      {
        name: "TooManyAccountLocks",
        explanation: "Transaction locks too many accounts",
        fix: "Reduce the number of accounts in the transaction",
        confidence: "medium",
      },
    ],
    [
      "AddressLookupTableNotFound",
      {
        name: "AddressLookupTableNotFound",
        explanation: "Referenced address lookup table does not exist",
        fix: "Verify the lookup table address is correct and activated",
        confidence: "high",
      },
    ],
    [
      "InvalidAddressLookupTableOwner",
      {
        name: "InvalidAddressLookupTableOwner",
        explanation: "Address lookup table has an invalid owner",
        fix: "Use a lookup table owned by the Address Lookup Table program",
        confidence: "high",
      },
    ],
    [
      "InvalidAddressLookupTableData",
      {
        name: "InvalidAddressLookupTableData",
        explanation: "Address lookup table data is invalid",
        fix: "Verify the lookup table is properly initialized",
        confidence: "medium",
      },
    ],
    [
      "InvalidAddressLookupTableIndex",
      {
        name: "InvalidAddressLookupTableIndex",
        explanation: "Address lookup table index is out of bounds",
        fix: "Use a valid index within the lookup table",
        confidence: "high",
      },
    ],
    [
      "InvalidRentPayingAccount",
      {
        name: "InvalidRentPayingAccount",
        explanation: "Account that should be rent-exempt is not",
        fix: "Fund the account to meet the rent-exempt minimum",
        confidence: "high",
      },
    ],
    [
      "WouldExceedMaxVoteCostLimit",
      {
        name: "WouldExceedMaxVoteCostLimit",
        explanation: "Vote transaction would exceed the max vote cost limit",
        fix: "Simplify the vote transaction",
        confidence: "low",
      },
    ],
    [
      "WouldExceedAccountDataTotalLimit",
      {
        name: "WouldExceedAccountDataTotalLimit",
        explanation: "Total account data changes would exceed the block limit",
        fix: "Reduce account data modifications",
        confidence: "medium",
      },
    ],
    [
      "MaxLoadedAccountsDataSizeExceeded",
      {
        name: "MaxLoadedAccountsDataSizeExceeded",
        explanation: "Total loaded account data exceeds the limit",
        fix: "Reduce the number or size of accounts loaded",
        confidence: "medium",
      },
    ],
    [
      "InvalidLoadedAccountsDataSizeLimit",
      {
        name: "InvalidLoadedAccountsDataSizeLimit",
        explanation: "Requested loaded accounts data size limit is invalid",
        fix: "Use a valid compute budget instruction for the data size limit",
        confidence: "medium",
      },
    ],
    [
      "ResanitizationNeeded",
      {
        name: "ResanitizationNeeded",
        explanation:
          "Transaction needs to be re-sanitized after fee calculation",
        fix: "Internal runtime error — retry the transaction",
        confidence: "low",
      },
    ],
    [
      "UnbalancedTransaction",
      {
        name: "UnbalancedTransaction",
        explanation:
          "Transaction debits do not match credits after fee deduction",
        fix: "Ensure total lamports in equals total lamports out plus fees",
        confidence: "high",
      },
    ],
    [
      "ProgramAccountNotFound",
      {
        name: "ProgramAccountNotFound",
        explanation:
          "Program account for the invoked instruction was not found",
        fix: "Verify the program ID is a deployed, executable program",
        confidence: "high",
      },
    ],
    [
      "ProgramCacheHitMaxLimit",
      {
        name: "ProgramCacheHitMaxLimit",
        explanation: "Program cache exceeded its limit",
        fix: "This is a cluster capacity issue — retry later",
        confidence: "low",
      },
    ],
  ]);
