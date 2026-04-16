import type { ErrorMap, ErrorMapEntry } from "../types.js";

const entries: ErrorMapEntry[] = [
  {
    code: 0,
    name: "NoCreditsToRedeem",
    explanation: "Stake account has no credits available to redeem",
    fix: "Wait for the validator to produce more credits before redeeming",
    confidence: "high",
  },
  {
    code: 1,
    name: "LockupInForce",
    explanation: "Stake lockup period has not expired yet",
    fix: "Wait for the lockup period to end before performing this operation",
    confidence: "high",
  },
  {
    code: 2,
    name: "AlreadyDeactivated",
    explanation: "Stake account is already deactivated",
    fix: "No action needed — the stake is already being withdrawn",
    confidence: "high",
  },
  {
    code: 3,
    name: "TooSoonToRedelegate",
    explanation: "Only one re-delegation is permitted per epoch",
    fix: "Wait until the next epoch before re-delegating",
    confidence: "high",
  },
  {
    code: 4,
    name: "InsufficientStake",
    explanation: "Split amount exceeds the staked balance",
    fix: "Reduce the split amount to be within the staked balance",
    confidence: "high",
  },
  {
    code: 5,
    name: "MergeTransientStake",
    explanation: "Cannot merge a stake account with transient stake",
    fix: "Wait for the transient stake to finish activating or deactivating",
    confidence: "medium",
  },
  {
    code: 6,
    name: "MergeMismatch",
    explanation:
      "Stake accounts cannot be merged due to different authority, lockups, or state",
    fix: "Ensure both accounts have identical authorities, lockups, and compatible states",
    confidence: "high",
  },
  {
    code: 7,
    name: "CustodianMissing",
    explanation: "Required custodian address is not present in the instruction",
    fix: "Include the custodian account in the transaction",
    confidence: "high",
  },
  {
    code: 8,
    name: "CustodianSignatureMissing",
    explanation: "Custodian has not signed the transaction",
    fix: "Ensure the custodian signs the transaction",
    confidence: "high",
  },
  {
    code: 9,
    name: "InsufficientReferenceVotes",
    explanation: "Not enough voting activity in the reference vote account",
    fix: "Use a vote account that has voted at least once in the required epochs",
    confidence: "medium",
  },
  {
    code: 10,
    name: "VoteAddressMismatch",
    explanation: "Stake account is not delegated to the provided vote account",
    fix: "Provide the correct vote account the stake is delegated to",
    confidence: "high",
  },
  {
    code: 11,
    name: "MinimumDelinquentEpochsForDeactivationNotMet",
    explanation:
      "Validator has not been delinquent for the minimum required epochs",
    fix: "Wait until the validator has been delinquent for enough epochs",
    confidence: "medium",
  },
  {
    code: 12,
    name: "InsufficientDelegation",
    explanation: "Delegation amount is below the minimum required",
    fix: "Delegate at least the minimum required amount of SOL",
    confidence: "high",
  },
  {
    code: 13,
    name: "RedelegateTransientOrInactiveStake",
    explanation: "Cannot redelegate transient or inactive stake",
    fix: "Wait for the stake to be fully activated before redelegating",
    confidence: "medium",
  },
  {
    code: 14,
    name: "RedelegateToSameVoteAccount",
    explanation: "Redelegation to the same vote account is not allowed",
    fix: "Choose a different vote account for redelegation",
    confidence: "high",
  },
  {
    code: 15,
    name: "RedelegatedStakeMustFullyActivateBeforeDeactivation",
    explanation:
      "Redelegated stake must fully activate before it can be deactivated",
    fix: "Wait for the redelegated stake to complete activation",
    confidence: "medium",
  },
];

export const stakeErrorMap: ErrorMap = new Map(entries.map((e) => [e.code, e]));
