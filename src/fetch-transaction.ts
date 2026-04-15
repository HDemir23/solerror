import { createSolanaRpc } from "@solana/rpc";
import type { Signature } from "@solana/keys";
import type { RpcConfig, DecodeOptions } from "./types.js";

export async function fetchTransaction(
  signature: Signature,
  rpcConfig: RpcConfig,
  options?: DecodeOptions,
) {
  const rpc = createSolanaRpc(rpcConfig.url);

  const params: Parameters<typeof rpc.getTransaction>[1] = {
    commitment: options?.commitment ?? "confirmed",
    maxSupportedTransactionVersion: 0,
    encoding: "json",
  };

  const response = await rpc.getTransaction(signature, params).send();

  return response;
}
