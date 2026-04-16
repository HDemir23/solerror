# Failed Transactions — Test Cases

Use these signatures to test `solerror` CLI:

```bash
npx solerror <SIGNATURE>
npx solerror <SIGNATURE> --cluster mainnet-beta
```

> **Note:** Some older transactions may have been pruned from RPC nodes. If `solerror` throws "not found", the TX has been cleaned up — try a more recent one.

---

## 1. SPL Token — InsufficientFunds (code 1)

**Program:** `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA`
**Error:** `Custom(1)` → InsufficientFunds
**Description:** Token transfer failed because the source token account doesn't have enough tokens.

```
AnWPnSNszwWq22zMcvqZ1FwG5ds8KsSEQiGqEc6a4YPwTCrzFw2ibXgiaD7JApbyh9EmtkPcraAuVv7vaRDpukT
```

**CLI test:**

```bash
npx solerror AnWPnSNszwWq22zMcvqZ1FwG5ds8KsSEQiGqEc6a4YPwTCrzFw2ibXgiaD7JApbyh9EmtkPcraAuVv7vaRDpukT
```

---

## 2. Metaplex — MissingMasterEditionAccount (code 167 / 0xa7)

**Program:** `metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s`
**Error:** `Custom(167)` → MissingMasterEditionAccount
**Description:** Tried to create metadata but the master edition account was not provided.

**Source:** https://solana.stackexchange.com/questions/21477

Simulation logs confirm:

```
Program log: Missing master edition account
Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s failed: custom program error: 0xa7
```

(This was a simulation failure, no on-chain signature available — test via similar operations)

---

## 3. Metaplex — CreatorNotFound (code 40 / 0x28)

**Program:** `metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s`
**Error:** `Custom(40)` → CreatorNotFound
**Description:** Tried to sign metadata but the creator address was not found in the creators list.

**Source:** https://solana.stackexchange.com/questions/9920

Simulation logs:

```
Program log: This creator address was not found
Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s failed: custom program error: 0x28
```

(Simulation failure — no on-chain signature)

---

## 4. System Program — ResultWithNegativeLamports (code 1) via CPI

**Program:** `11111111111111111111111111111` (via CPI from custom program)
**Error:** `Custom(1)` → ResultWithNegativeLamports
**Description:** Transfer failed because the account doesn't have enough lamports.

```
AnWPnSNszwWq22zMcvqZ1FwG5ds8KsSEQiGqEc6a4YPwTCrzFw2ibXgiaD7JApbyh9EmtkPcraAuVv7vaRDpukT
```

Logs show:

```
Program 11111111111111111111111111111111 invoke [2]
Transfer: insufficient lamports 0, need 1677360
Program 11111111111111111111111111111111 failed: custom program error: 0x1
```

---

## 5. Metaplex — AlreadyInitialized (code 3 / 0x3)

**Program:** `metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s`
**Error:** `Custom(3)` → AlreadyInitialized
**Description:** Tried to create metadata for a mint that already has metadata.

**Source:** https://solana.stackexchange.com/questions/1260

Common scenario: running `createMetadataAccountV3` twice for the same mint.

---

## 6. Raydium AMM — InvalidUserToken (code 42 / 0x2a)

**Program:** `675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8` (Raydium AMM — no built-in map, shows raw error)
**Error:** `Custom(42)` → Not in our registry, should show raw code
**Description:** User provided wrong token account for the swap.

```
4UJPHEtrmksnNrX2DemwZHkyPDsYwtNgLvezzymzULjbuRB6QSEnFwig46rTD3j3kBUw1jFnaRRVi9FTUBG1UWiP
```

**CLI test:**

```bash
npx solerror 4UJPHEtrmksnNrX2DemwZHkyPDsYwtNgLvezzymzULjbuRB6QSEnFwig46rTD3j3kBUw1jFnaRRVi9FTUBG1UWiP
```

---

## 7. Metaplex — SymbolTooLong (code 12)

**Program:** `metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s`
**Error:** `Custom(12)` → SymbolTooLong
**Description:** NFT symbol exceeds the maximum allowed length.

**Source:** https://solana.stackexchange.com/questions/7204

---

## 8. Metaplex — NotRentExempt (code 2) via BorshIoError

**Program:** `metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s`
**Error:** BorshIoError (instruction failed before custom error)
**Description:** Account data deserialization failed — often caused by passing wrong account or uninitialized account.

**Source:** https://github.com/metaplex-foundation/metaplex/issues/2306

---

## 9. SPL Token — OwnerMismatch (code 4)

**Program:** `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA`
**Error:** `Custom(4)` → OwnerMismatch
**Description:** Tried to perform an operation on a token account that belongs to a different owner.

Common in scenarios where the wrong authority signs the transaction.

---

## 10. Anchor — AccountNotInitialized (code 3012)

**Program:** Anchor-based program
**Error:** `Custom(3012)` → Not in our built-in maps (Anchor framework error)
**Description:** The account expected to be initialized was not.

**Source:** https://solana.stackexchange.com/questions/450

Anchor errors range from 100-5999. Custom program errors start at 6000+. These can be registered via `registerErrorMap()`.

---

## How to Find More Failed Transactions

### Solscan

1. Go to https://solscan.io
2. Filter by failed transactions on any token or wallet
3. Copy the signature and test with `npx solerror <SIG>`

### Solana Explorer

1. https://explorer.solana.com/transactions?filter=failed
2. Browse recent failed transactions

### Solana Stack Exchange

Search for `"custom program error"` or `"InstructionError"`:

- https://solana.stackexchange.com/search?q=custom+program+error

### Common Error Patterns to Test

| Hex  | Decimal | Program  | Error Name                  |
| ---- | ------- | -------- | --------------------------- |
| 0x0  | 0       | Metaplex | InstructionUnpackError      |
| 0x1  | 1       | Token    | InsufficientFunds           |
| 0x1  | 1       | System   | ResultWithNegativeLamports  |
| 0x2  | 2       | Metaplex | NotRentExempt               |
| 0x3  | 3       | Metaplex | AlreadyInitialized          |
| 0x4  | 4       | Token    | OwnerMismatch               |
| 0xf  | 15      | Metaplex | MintMismatch                |
| 0x28 | 40      | Metaplex | CreatorNotFound             |
| 0x2b | 43      | Metaplex | OwnerMismatch               |
| 0x3b | 59      | Metaplex | DataIsImmutable             |
| 0x50 | 80      | Metaplex | CollectionNotFound          |
| 0x6d | 109     | Metaplex | NotAMasterEdition           |
| 0x7f | 127     | Metaplex | MustBeNonFungible           |
| 0x9b | 155     | Metaplex | LockedToken                 |
| 0xa7 | 167     | Metaplex | MissingMasterEditionAccount |
| 0xca | 202     | Metaplex | ConditionsForClosingNotMet  |
