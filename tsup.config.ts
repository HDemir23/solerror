import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    minify: false,
    splitting: false,
  },
  {
    entry: ["src/cli.ts"],
    format: ["esm"],
    sourcemap: true,
    minify: false,
    banner: { js: "#!/usr/bin/env node" },
  },
]);
