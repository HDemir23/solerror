import type { Signature } from "@solana/keys";
import { resolveError } from "./resolve-error.js";
import { fetchTransaction } from "./fetch-transaction.js";
import { parseError } from "./parse-error.js";
import type { DecodedError, DecodeOptions, RpcConfig } from "./types.js";

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
    return {
      ...baseResult,
      rawError: parsed.error,
      transactionError: parsed.error,
    };
  }

  const resolved = resolveError(parsed.programId, parsed.rawError);

  return {
    ...baseResult,
    instructionIndex: parsed.instructionIndex,
    programId: parsed.programId,
    error: resolved,
    rawError: parsed.rawError,
    transactionError: null,
  };
}
