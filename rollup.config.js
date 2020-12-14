import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import babel from "@rollup/plugin-babel";

const packageJson = require("./package.json");

const getBabelConfig = (useESModulesParm) => ({
  // .babelrc
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: false,
        // Don't add polyfills automatically per file, and don't transform import "core-js" or import "@babel/polyfill" to individual polyfills.
        targets: "defaults",
      },
    ],
    // This preset always includes the following plugins:
    //    @babel/plugin-syntax-jsx
    //    @babel/plugin-transform-react-jsx
    //    @babel/plugin-transform-react-display-name
    "@babel/preset-react",
    // This preset is recommended if you use TypeScript, a typed superset of JavaScript. It includes the following plugins:
    // @babel/plugin-transform-typescript
    "@babel/preset-typescript",
  ],
  plugins: [
    "@emotion",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-optional-chaining",
    ["@babel/plugin-transform-runtime", { useESModules: useESModulesParm }],
    // Like:   export * as ns from 'mod';
    "@babel/plugin-proposal-export-namespace-from",
    // Stage 3
    "@babel/plugin-syntax-dynamic-import",
  ],
  // for rollup babel plugin
  // runtimeHelpers: true,
  babelHelpers: "runtime",
  exclude: [
    /@babel\/runtime/,
    /@babel\\runtime/,
    /regenerator-runtime/,
    "node_modules/**",
  ],
  extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
  babelrc: false,
});

export default {
  input: "src/index.ts",
  output: [
    // {
    //   file: packageJson.main,
    //   format: "cjs",
    //   sourcemap: true
    // },
    //  поскольку пакет для React - то можно оставить только es модули
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    peerDepsExternal({ includeDependencies: true }),
    commonjs(),
    // node must be in front of typescript. babel must behind typescript.
    typescript(),
    babel(getBabelConfig(true)),
    postcss(),
    //  если в пакете будут стили - то их надо скопировать
    copy({
      targets: [
        {
          src: "src/variables.scss",
          dest: "build",
          rename: "variables.scss",
        },
      ],
    }),
  ],
};
