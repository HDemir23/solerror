# solerror

Decode Solana transaction errors into human-readable explanations with fix suggestions.

Takes a failed transaction signature, fetches it from RPC, parses the error, and returns a structured result with the error name, what it means, and how to fix it.

## Install

```bash
npm install solerror
```

## CLI

```bash
npx solerror <SIGNATURE>
npx solerror <SIGNATURE> --cluster devnet
npx solerror <SIGNATURE> --cluster https://my-rpc.com
```

## Usage

### Decode a failed transaction

```typescript
import { decodeError } from "solerror";

const result = await decodeError(
  "5zSQuTcWsPy2cVAshBXWuJJXLwMD1GbgMpz3iq4xgwiV1s6mxYRbYb7qBiRGZd1xvDcYhQQRBKoNcnW8eKtcyZWg" as any,
  { url: "https://api.mainnet-beta.solana.com" },
);

console.log(result.error?.name); // "InsufficientFunds"
console.log(result.error?.explanation); // what went wrong
console.log(result.error?.fix); // how to fix it
console.log(result.error?.confidence); // "high" | "medium" | "low"
```

### Resolve an error code directly

```typescript
import { resolveError } from "solerror";

const entry = resolveError("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA", {
  Custom: 1,
});

console.log(entry?.name); // "InsufficientFunds"
```

### Register custom program errors

```typescript
import { registerErrorMap } from "solerror";

const myProgramErrors = new Map([
  [
    0,
    {
      code: 0,
      name: "InvalidConfig",
      explanation: "Configuration is invalid",
      fix: "Check config parameters",
      confidence: "high",
    },
  ],
]);

registerErrorMap("MyProgram1111111111111111111111111111111", myProgramErrors);
```

### Return type

```typescript
interface DecodedError {
  signature: Signature;
  slot: bigint;
  instructionIndex: number | null;
  programId: Address | null;
  error: ErrorMapEntry | null; // decoded error details
  rawError: string | { Custom: number } | null;
  transactionError: string | null;
}
```

## Supported Programs

| Program                 | Error Codes                       |
| ----------------------- | --------------------------------- |
| System Program          | 0–8                               |
| SPL Token               | 0–19                              |
| Token-2022              | 0–19 (shared with SPL Token)      |
| Stake Program           | 0–15                              |
| Vote Program            | 0–19                              |
| Metaplex Token Metadata | 0–202                             |
| Associated Token        | — (uses Token Program errors)     |
| Compute Budget          | — (uses runtime InstructionError) |

Plus 44 runtime instruction errors and 33 transaction errors.

## API

### `decodeError(signature, rpcConfig, options?)`

Fetches a failed transaction from RPC and decodes the error.

**Parameters:**

- `signature` — Transaction signature (88-char base58 string)
- `rpcConfig` — `{ url: string }` RPC endpoint URL
- `options?` — `{ commitment?, maxSupportedTransactionVersion? }`

### `resolveError(programId, rawError)`

Looks up a custom error code in the built-in registry.

### `registerErrorMap(programId, errorMap)`

Registers a custom error map for a program. Useful for Anchor-based programs with known error codes.

## License

MIT
