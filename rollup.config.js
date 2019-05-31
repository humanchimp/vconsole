import ts from "@wessberg/rollup-plugin-ts";
import multiEntry from "rollup-plugin-multi-entry";
import packageJson from "./package.json";

export default {
  input: "src/**.ts",
  output: [
    {
      format: "cjs",
      file: packageJson.main,
      sourcemap: true,
    },
    {
      format: "esm",
      file: packageJson.module,
      sourcemap: true,
    },
    {
      format: "iife",
      file: packageJson.browser,
      sourcemap: true,
      name: "hatch"
    },
  ],
  plugins: [ts(), multiEntry()]
};
