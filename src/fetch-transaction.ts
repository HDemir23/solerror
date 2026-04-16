import { createSolanaRpc } from "@solana/rpc";
import type { Signature } from "@solana/keys";
import type { RpcConfig, DecodeOptions } from "./types.js";


const BASE58_REGEX = /^[1-9A-HJ-NP-Za-km-z]+$/;
const SIGNATURE_LENGTH = 88;

export async function fetchTransaction(
  signature: Signature,
  rpcConfig: RpcConfig,
  options?: DecodeOptions,
) {
  const sig = signature as unknown as string;

  if (sig.length !== SIGNATURE_LENGTH || !BASE58_REGEX.test(sig)) {
    throw new Error(
      `Invalid signature: must be exactly ${SIGNATURE_LENGTH} base58 characters (got ${sig.length})`,
    );
  }

  const rpc = createSolanaRpc(rpcConfig.url);

  const params: Parameters<typeof rpc.getTransaction>[1] = {
    commitment: options?.commitment ?? "confirmed",
    maxSupportedTransactionVersion: 0,
    encoding: "json",
  };

 
    const response = await Promise.race([
      rpc.getTransaction(signature, params).send(),
      new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`RPC request timed out after 10 seconds`));
        }, 10000);
      })
    ])

  return response;
}
