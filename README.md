# solerror

Decode Solana transaction errors into human-readable explanations with fix suggestions.

## Install

```bash
npm install solerror
```

## CLI

```bash
npx solerror <SIGNATURE>
npx solerror <SIGNATURE> --cluster devnet
```

## Usage

```typescript
import { decodeError } from "solerror";

const result = await decodeError(
  "5zSQuTcWsPy2cVAshBXWuJJXLwMD1GbgMpz3iq4xgwiV1s6mxYRbYb7qBiRGZd1xvDcYhQQRBKoNcnW8eKtcyZWg" as any,
  { url: "https://api.mainnet-beta.solana.com" },
);

console.log(result.error?.name);
console.log(result.error?.explanation);
console.log(result.error?.fix);
```

## Register Custom Program Errors

```typescript
import { registerErrorMap } from "solerror";

const myProgramErrors = new Map([
  [
    0,
    {
      code: 0,
      name: "InvalidConfig",
      explanation: "...",
      fix: "...",
      confidence: "high",
    },
  ],
]);

registerErrorMap("MyProgram1111111111111111111111111111111", myProgramErrors);
```

## Supported Programs

| Program          | Error Codes                       |
| ---------------- | --------------------------------- |
| System Program   | 0–8                               |
| SPL Token        | 0–19                              |
| Token-2022       | 0–19 (shared with SPL Token)      |
| Stake Program    | 0–10                              |
| Associated Token | — (uses Token Program errors)     |
| Compute Budget   | — (uses runtime InstructionError) |

## API

### `decodeError(signature, rpcConfig, options?)`

Fetches a failed transaction from RPC and decodes the error.

### `resolveError(programId, rawError)`

Looks up a custom error code in the built-in registry.

### `registerErrorMap(programId, errorMap)`

Registers a custom error map for a program.

## License

MIT
