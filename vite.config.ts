import { defineConfig } from 'vite'
import pkg from './package.json' with { type: 'json' }

const external = Object.keys(pkg.peerDependencies ?? {})

export default defineConfig({
  build: {
    emptyOutDir: true,
    target: 'es2018',
    lib: {
      entry: {
        index: 'src/index.ts',
        'vue/index': 'src/vue/index.ts',
        'react/index': 'src/react/index.ts',
        'svelte/index': 'src/svelte/index.ts'
      },
      formats: ['es']
    },
    rollupOptions: {
      external,
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        exports: 'named'
      }
    },
    sourcemap: true
  }
})
