import { describe, it, expect } from "vitest";
import { decodeError } from "../src/decode.js";

const MAINNET_RPC = { url: "https://api.mainnet-beta.solana.com" };

describe("decodeError — live mainnet", () => {
  it("throws for invalid signature length", async () => {
    await expect(decodeError("abc123" as any, MAINNET_RPC)).rejects.toThrow(
      "Invalid signature",
    );
  });

  it("throws for invalid signature length (87 chars)", async () => {
    await expect(
      decodeError("1".repeat(87) as any, MAINNET_RPC),
    ).rejects.toThrow("Invalid signature");
  });

  it("throws for non-existent transaction", async () => {
    await expect(
      decodeError("1".repeat(88) as any, MAINNET_RPC),
    ).rejects.toThrow();
  });

  it.skip("parses SPL Token InsufficientFunds (Custom 1)", async () => {
    const result = await decodeError(
      "Lv5g1y4Q2RY5E9vrdSKCmoYAXjb1qAL2aw7DXBPYj3YRDsc6YseHBC9bmK8Bx6fgUoAgLBBzupL8r7pSfM58xLd" as any,
      MAINNET_RPC,
    );
    expect(result.error).not.toBeNull();
    expect(result.error?.name).toBe("InsufficientFunds");
    expect(result.rawError).toEqual({ Custom: 1 });
  });

  it.skip("parses runtime ComputationalBudgetExceeded", async () => {
    const result = await decodeError(
      "2FovcAN4EnfJz9Lz9G7waR3YPYE9NYBwXz4qeyQH9Wvy7snXsvvxe9w2oSuxL3iY9Fv78kfXubWiEmp4USRaWWeu" as any,
      MAINNET_RPC,
    );
    expect(result.error).not.toBeNull();
    expect(result.error?.name).toBe("ComputationalBudgetExceeded");
    expect(result.rawError).toBe("ComputationalBudgetExceeded");
  });

  it.skip("parses runtime IllegalOwner", async () => {
    const result = await decodeError(
      "4dWV4ydu1v1aHS67EzEbE4D6uAdEtyusVb6oyB8YFk7ZYZhCBPFFWbcjwX9Fi2s1eNUJGsW6XthhVXTeHGVs9jVm" as any,
      MAINNET_RPC,
    );
    expect(result.error).not.toBeNull();
    expect(result.error?.name).toBe("IllegalOwner");
  });
});
