import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"], // Build for commonJS ("cjs") and ESmodules ("esm")
  dts: true, // Generate declaration file (.d.ts)
  target:"ES2020",
  splitting: false,
  sourcemap: true,
  clean: true,
});
