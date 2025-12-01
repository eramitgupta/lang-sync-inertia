const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const typescript = require('rollup-plugin-typescript2')
const pkg = require('./package.json')

module.exports = {
    input: 'src/index.ts',
    external: [...Object.keys(pkg.peerDependencies || {})],
    output: [
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true
        },
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
            exports: 'named'
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        typescript({
            tsconfigOverride: { compilerOptions: { declaration: true } }
        })
    ]
}
