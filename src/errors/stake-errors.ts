import type { ErrorMap, ErrorMapEntry } from "../types.js";

const entries: ErrorMapEntry[] = [
  {
    code: 0,
    name: "InsufficientFunds",
    explanation: "Stake account has insufficient lamports for this operation",
    fix: "Ensure the stake account has enough SOL to cover the operation and remain rent-exempt",
    confidence: "high",
  },
  {
    code: 1,
    name: "InvalidOwner",
    explanation: "The stake account owner (staker or withdrawer) is invalid",
    fix: "Ensure the correct authority signs the transaction",
    confidence: "high",
  },
  {
    code: 2,
    name: "AlreadyDeactivated",
    explanation: "The stake account is already deactivated",
    fix: "No action needed — the stake is already being withdrawn or has been deactivated",
    confidence: "high",
  },
  {
    code: 3,
    name: "NotDelegated",
    explanation: "The stake account is not currently delegated to a validator",
    fix: "Delegate the stake to a validator before performing this operation",
    confidence: "high",
  },
  {
    code: 4,
    name: "TooSoonToDeactivate",
    explanation:
      "Cannot deactivate the stake — it was recently activated and the cooldown has not elapsed",
    fix: "Wait for the stake warmup period to complete before deactivating",
    confidence: "high",
  },
  {
    code: 5,
    name: "InvalidState",
    explanation: "The stake account is in an invalid state for this operation",
    fix: "Check the stake account state — it must be in the correct state (e.g. initialized, delegated, etc.)",
    confidence: "medium",
  },
  {
    code: 6,
    name: "MinimumDelegationNotMet",
    explanation:
      "The stake delegation is below the minimum required amount (0.001 SOL)",
    fix: "Delegate at least the minimum required amount of SOL",
    confidence: "high",
  },
  {
    code: 7,
    name: "RentExemptReserve",
    explanation:
      "The operation would leave the stake account below the rent-exempt reserve",
    fix: "Leave enough SOL to keep the stake account rent-exempt, or withdraw all and close it",
    confidence: "high",
  },
  {
    code: 8,
    name: "LockupInForce",
    explanation: "The stake lockup has not expired yet",
    fix: "Wait for the lockup period to end before performing this operation",
    confidence: "high",
  },
  {
    code: 9,
    name: "InvalidWithdrawAuthority",
    explanation: "The withdraw authority is invalid or has not signed",
    fix: "Ensure the correct withdraw authority signs the transaction",
    confidence: "high",
  },
  {
    code: 10,
    name: "NoUpgradeableStake",
    explanation: "No upgradeable stake found in this account",
    fix: "Check if the stake account contains stake that can be upgraded",
    confidence: "medium",
  },
];

export const stakeErrorMap: ErrorMap = new Map(entries.map((e) => [e.code, e]));
