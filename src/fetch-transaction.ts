import { createSolanaRpc } from "@solana/rpc";
import type { Signature } from "@solana/keys";
import type { RpcConfig, DecodeOptions } from "./types.js";

export async function fetchTransaction(
  signature: Signature,
  rpcConfig: RpcConfig,
  options?: DecodeOptions,
) {
  const rpc = createSolanaRpc(rpcConfig.url);

  const response = await rpc
    .getTransaction(signature, {
      commitment: options?.commitment ?? "confirmed",
      maxSupportedTransactionVersion:
        options?.maxSupportedTransactionVersion as 0 | undefined,
      encoding: "json",
    })
    .send();

  return response;
}
