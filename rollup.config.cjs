const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const pkg = require('./package.json');

const external = Object.keys(pkg.peerDependencies || {});
const createTypescriptPlugin = (include) =>
  typescript({
    tsconfigOverride: {
      include,
    },
  });

module.exports = [
  {
    input: 'src/index.ts',
    external,
    output: [
      { file: 'dist/index.js', format: 'esm', sourcemap: true }
    ],
    plugins: [resolve(), commonjs(), createTypescriptPlugin(['src/index.ts', 'src/types/**/*'])],
  },
  {
    input: 'src/vue/index.ts',
    external,
    output: [
      { file: 'dist/vue/index.js', format: 'esm', sourcemap: true }
    ],
    plugins: [resolve(), commonjs(), createTypescriptPlugin(['src/vue/**/*', 'src/types/**/*'])],
  },
  {
    input: 'src/react/index.ts',
    external,
    output: [
      { file: 'dist/react/index.js', format: 'esm', sourcemap: true }
    ],
    plugins: [resolve(), commonjs(), createTypescriptPlugin(['src/react/**/*', 'src/types/**/*'])],
  },
];
