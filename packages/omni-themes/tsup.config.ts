import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm", "cjs"],
  sourcemap: true,
  clean: true,
  dts: true,
  splitting: false,
  treeshake: true,
  external: ["nanostores"],
  esbuildOptions(options) {
    options.alias = {
      "@": "./src",
    };
  },
});
