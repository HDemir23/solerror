import type { Signature } from "@solana/keys";
import { resolveError } from "./resolve-error.js";
import { fetchTransaction } from "./fetch-transaction.js";
import { parseError } from "./parse-error.js";
import {
  instructionErrorMap,
  transactionErrorMap,
} from "./errors/runtime-errors.js";
import type {
  DecodedError,
  DecodeOptions,
  RpcConfig,
  ErrorMapEntry,
} from "./types.js";

export async function decodeError(
  signature: Signature,
  rpcConfig: RpcConfig,
  options?: DecodeOptions,
): Promise<DecodedError> {
  const response = await fetchTransaction(signature, rpcConfig, options);

  if (!response) {
    throw new Error(`Transaction not found: ${signature}`);
  }

  if (!response.meta) {
    throw new Error(`Transaction metadata is missing: ${signature}`);
  }

  const baseResult: DecodedError = {
    signature,
    slot: response.slot,
    instructionIndex: null,
    programId: null,
    error: null,
    rawError: response.meta.err as string | { Custom: number },
    transactionError: null,
  };

  if (response.meta.err === null) {
    return baseResult;
  }

  const message = response.transaction.message;
  const accountKeys =
    message.accountKeys as unknown as readonly import("@solana/addresses").Address[];
  const instructions = message.instructions;

  const parsed = parseError(response.meta.err, instructions, accountKeys);

  if (!parsed) {
    return baseResult;
  }

  if (parsed.type === "transaction") {
    const runtimeEntry = transactionErrorMap.get(parsed.error);
    const error: ErrorMapEntry | null = runtimeEntry
      ? { code: -1, ...runtimeEntry }
      : null;
    return {
      ...baseResult,
      error,
      rawError: parsed.error,
      transactionError: parsed.error,
    };
  }

  let resolved = resolveError(parsed.programId, parsed.rawError);

  if (!resolved && typeof parsed.rawError === "string") {
    const runtimeEntry = instructionErrorMap.get(parsed.rawError);
    if (runtimeEntry) {
      resolved = { code: -1, ...runtimeEntry };
    }
  }

  return {
    ...baseResult,
    instructionIndex: parsed.instructionIndex,
    programId: parsed.programId,
    error: resolved,
    rawError: parsed.rawError,
    transactionError: null,
  };
}
