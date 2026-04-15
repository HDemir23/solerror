import { Command } from "commander";
import chalk from "chalk";
import { decodeError } from "./decode.js";

const CLUSTER_URLS: Record<string, string> = {
  mainnet: "https://api.mainnet-beta.solana.com",
  devnet: "https://api.devnet.solana.com",
  testnet: "https://api.testnet.solana.com",
};

function formatError(result: Awaited<ReturnType<typeof decodeError>>): string {
  const lines: string[] = [];

  lines.push(chalk.dim(`Signature: ${result.signature}`));
  lines.push(chalk.dim(`Slot:      ${result.slot}`));

  if (result.transactionError) {
    lines.push("");
    lines.push(chalk.red.bold(`✗ Transaction Error`));
    lines.push(chalk.red(`  ${result.transactionError}`));
    return lines.join("\n");
  }

  if (result.instructionIndex !== null) {
    lines.push(chalk.dim(`Instruction: ${result.instructionIndex}`));
  }

  if (result.programId) {
    lines.push(chalk.dim(`Program:     ${result.programId}`));
  }

  if (result.error) {
    lines.push("");
    lines.push(chalk.red.bold(`✗ ${result.error.name}`));
    lines.push(chalk.white(`  ${result.error.explanation}`));
    lines.push(chalk.green(`  → ${result.error.fix}`));
    lines.push(chalk.dim(`  Confidence: ${result.error.confidence}`));
  } else {
    lines.push("");
    const raw =
      typeof result.rawError === "object" && "Custom" in result.rawError
        ? `Custom(${result.rawError.Custom})`
        : String(result.rawError);
    lines.push(chalk.yellow.bold(`⚠ Unresolved Error`));
    lines.push(chalk.yellow(`  ${raw}`));
  }

  return lines.join("\n");
}

const program = new Command();

program
  .name("solerror")
  .description(
    "Decode failed Solana transactions into readable errors.\n\n" +
      "Usage:\n" +
      "  $ solerror 5zSQu...cyZWg              Decode a mainnet TX\n" +
      "  $ solerror 5zSQu...cyZWg -c devnet    Decode a devnet TX\n" +
      "  $ solerror 5zSQu...cyZWg -c https://my-rpc.com  Use custom RPC\n\n" +
      "Supported programs: System, SPL Token, Token-2022, ATA, Compute Budget, Stake",
  )
  .version("1.0.0")
  .argument("[signature]", "Transaction signature to decode")
  .option(
    "-c, --cluster <cluster>",
    "Cluster name (mainnet, devnet, testnet) or full RPC URL",
    "mainnet",
  )
  .action(async (signature: string | undefined) => {
    if (!signature) {
      program.help();
      return;
    }

    const opts = program.opts<{ cluster: string }>();
    const url = CLUSTER_URLS[opts.cluster] ?? opts.cluster;
    const label = CLUSTER_URLS[opts.cluster] ? opts.cluster : url;

    process.stdout.write(chalk.dim(`Fetching from ${label}...\n\n`));

    try {
      const result = await decodeError(signature as any, { url });

      if (
        result.error === null &&
        result.transactionError === null &&
        result.rawError === null
      ) {
        process.stdout.write(
          chalk.dim(
            `Signature: ${result.signature}\nSlot:      ${result.slot}\n\n`,
          ) + chalk.green.bold("✓ Transaction succeeded — no errors found.\n"),
        );
        return;
      }

      process.stdout.write(formatError(result) + "\n");
    } catch (err) {
      process.stderr.write(
        chalk.red(
          `Error: ${err instanceof Error ? err.message : String(err)}\n`,
        ),
      );
      process.exit(1);
    }
  });

program.parse();
