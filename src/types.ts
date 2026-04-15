import type { Address } from "@solana/addresses";
import type { Signature } from "@solana/keys";
import type { Commitment } from "@solana/rpc-types";

export interface ErrorMapEntry {
  code: number;
  name: string;
  explanation: string;
  fix: string;
  confidence: "high" | "medium" | "low";
}

export type ErrorMap = ReadonlyMap<number, ErrorMapEntry>;

export interface ParsedInstructionError {
  instructionIndex: number;
  programId: Address;
  rawError: string | { Custom: number };
}

export interface ParsedTransactionError {
  type: "transaction";
  error: string;
}

export interface ParsedInstructionErrorWrapper {
  type: "instruction";
  instructionIndex: number;
  programId: Address;
  rawError: string | { Custom: number };
}

export type ParsedError =
  | ParsedTransactionError
  | ParsedInstructionErrorWrapper;

export interface DecodedError {
  signature: Signature;
  slot: bigint;
  instructionIndex: number | null;
  programId: Address | null;
  error: ErrorMapEntry | null;
  rawError: string | { Custom: number };
  transactionError: string | null;
}

export interface DecodeOptions {
  commitment?: Commitment;
  maxSupportedTransactionVersion?: number;
}

export interface RpcConfig {
  url: string;
}
