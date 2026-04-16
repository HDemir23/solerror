import { describe, it, expect } from "vitest";
import { decodeError } from "../src/decode.js";

const MAINNET_RPC = { url: "https://api.mainnet-beta.solana.com" };

describe("decodeError — live mainnet", () => {
  it("returns null error for a successful transaction", async () => {
    const result = await decodeError(
      "vtHoUyCzRHacJeYfg2np4DjYwKCfTt9w2o25hZxcSbhfMGnEPd1V6AxhUyQvDeECtXmiQavcL89XDr2GDmpra4e" as any,
      MAINNET_RPC,
    );

    expect(result.error).toBeNull();
    expect(result.transactionError).toBeNull();
    expect(result.instructionIndex).toBeNull();
  });

  it.skip("parses a runtime InstructionError (string variant) from unknown program", async () => {
    const result = await decodeError(
      "4a6knVq2aDoyUbnR52DtVYNmaBe2khUfPcDNv4VX8oaoimgkUp3uTF7je18ca4iGgefEPKDN9vf4Q6ZiPHyagi5r" as any,
      MAINNET_RPC,
    );

    expect(result.instructionIndex).toBe(3);
    expect(result.programId).toBe(
      "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4",
    );
    expect(result.rawError).toBe("ProgramFailedToComplete");
    expect(result.error).not.toBeNull();
    expect(result.error?.name).toBe("ProgramFailedToComplete");
  });

  it.skip("parses a Custom error from unknown program (resolve returns null)", async () => {
    const result = await decodeError(
      "2QZEh6fdhCfX1gQDzFV9aHf2JrjxvamJ9QVyMJeUEzaebzmjx2WQB9Va14yPsfXx1Ay5o5XBUfTsk4WtEWgvyL1p" as any,
      MAINNET_RPC,
    );

    expect(result.instructionIndex).toBe(2);
    expect(result.programId).toBe(
      "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4",
    );
    expect(result.rawError).toEqual({ Custom: 6001 });
    expect(result.error).toBeNull();
  });

  it("throws for non-existent transaction", async () => {
    await expect(
      decodeError("1".repeat(88) as any, MAINNET_RPC),
    ).rejects.toThrow();
  });
});
