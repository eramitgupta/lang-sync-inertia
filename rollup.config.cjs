const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const pkg = require('./package.json');

const externalDeps = [...Object.keys(pkg.peerDependencies || {})];

module.exports = [
  {
    input: 'src/index.ts',
    external: externalDeps,
    output: [{ file: 'dist/index.js', format: 'esm', sourcemap: true }],
    plugins: [resolve(), commonjs(), typescript()],
  },

  {
    input: 'src/vue/index.ts',
    external: externalDeps,
    output: [{ file: 'dist/vue/index.js', format: 'esm', sourcemap: true }],
    plugins: [resolve(), commonjs(), typescript()],
  },

  {
    input: 'src/react/index.ts',
    external: externalDeps,
    output: [{ file: 'dist/react/index.js', format: 'esm', sourcemap: true }],
    plugins: [resolve(), commonjs(), typescript()],
  },
];
