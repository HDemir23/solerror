# Failed Transactions — Test Cases

Use these signatures to test `solerror` CLI:

```bash
npx solerror <SIGNATURE>
```

These are **live mainnet transactions** from slot ~413600142–413600205 (April 16, 2026).

---

## 1. SPL Token — InsufficientFunds (Custom 1) ✅ decoded

```bash
npx solerror Lv5g1y4Q2RY5E9vrdSKCmoYAXjb1qAL2aw7DXBPYj3YRDsc6YseHBC9bmK8Bx6fgUoAgLBBzupL8r7pSfM58xLd
```

---

## 2. Runtime — InsufficientFunds (string) ✅ decoded

```bash
npx solerror 5V7njVPzZFC4M9ZAKtWHutmpbhGrwMJ1mZNyZDcDQBy7fk1ot7msLTLNhF3keCphoiVuAxZUqFWcpo4KdkgCLZ8d
```

---

## 3. Runtime — IllegalOwner ✅ decoded

```bash
npx solerror 4dWV4ydu1v1aHS67EzEbE4D6uAdEtyusVb6oyB8YFk7ZYZhCBPFFWbcjwX9Fi2s1eNUJGsW6XthhVXTeHGVs9jVm
```

---

## 4. Runtime — InvalidInstructionData ✅ decoded

```bash
npx solerror 3PakkohmLSVpRoY9jVJkqSkrNPE6b5DvH2vGg7cGstgCfkrdRHasHHkZQ6EsarMUsKF2jwBBHT5f3wwMEdKW4w78
```

---

## 5. Runtime — ComputationalBudgetExceeded ✅ decoded

```bash
npx solerror 2FovcAN4EnfJz9Lz9G7waR3YPYE9NYBwXz4qeyQH9Wvy7snXsvvxe9w2oSuxL3iY9Fv78kfXubWiEmp4USRaWWeu
```

---

## 6. Jupiter — Custom 6001 (Anchor error, raw)

```bash
npx solerror 4BaBnM73hJuKDbiHw8vFiKtt2V872CewuresnnmYLF8nNY8ogq9cfBVgS2GQDkbZ6gxLZHR9T2xjjb4g8qfZpSz6
```

---

## 7. Jupiter — Custom 6001 (another)

```bash
npx solerror 5moGiaZ8Tor7kao1yXgA2VmBnMJ5EvsuoHWZkoxf6DCq6SEMgNmztVvzKJGSAvmHKRXArVG8ufF9ocLeGJSTUNSk
```

---

## 8. Raydium CPAMM — Custom 6002 (Anchor error, raw)

```bash
npx solerror 2QBnof2osvA2vcvn7jAHxRZWp4xwAaXMwRtnc3LBF3m3ZCWgZVMMfVBeWhEAmua3BuXdKqM6MEPpb6sRpeYWdvY3
```

---

## 9. Pump.fun — Custom 1 (raw)

```bash
npx solerror 34wErrFXahkfxCCKa8xdeGraqVZjUaoqVuvwTvevYvmWQytSTfFWuVrnrxn9JxuDVCQY4Y6Tvb8REtxUt5Ce15DJ
```

---

## 10. Meteora — Custom 57005 / 0xDEAD (raw)

```bash
npx solerror 3j3TBVd1cNjC1A6dC3Q1P1P9JKT1Qyb8CunaM76vftMcsGWhSWTWmfaB1nDnZ35NnHU4xy6nVirY6ZVGPcgexzgZ
```

---

## 11. Raydium — Custom 28 (raw)

```bash
npx solerror 5L4GXoPn77V8gTtBTRTrMfQbcq4NFxvm9VUoQhCoLKYXqopyKYdA3zBDiCx5ep2YUBiinJZxgVY6Qoo3APhuLXf4
```

---

## Summary

| #   | Error                              | Type                 |
| --- | ---------------------------------- | -------------------- |
| 1   | Token InsufficientFunds (Custom 1) | SPL Token ✅ decoded |
| 2   | InsufficientFunds                  | Runtime ✅ decoded   |
| 3   | IllegalOwner                       | Runtime ✅ decoded   |
| 4   | InvalidInstructionData             | Runtime ✅ decoded   |
| 5   | ComputationalBudgetExceeded        | Runtime ✅ decoded   |
| 6-7 | Jupiter Custom 6001                | Anchor — raw code    |
| 8   | Raydium CPAMM Custom 6002          | Anchor — raw code    |
| 9   | Pump.fun Custom 1                  | Unknown — raw code   |
| 10  | Meteora Custom 57005               | Unknown — raw code   |
| 11  | Raydium Custom 28                  | Unknown — raw code   |

> **Note:** These transactions are from slot ~413600142–413600205 (April 16, 2026). They may eventually be pruned from RPC nodes.
