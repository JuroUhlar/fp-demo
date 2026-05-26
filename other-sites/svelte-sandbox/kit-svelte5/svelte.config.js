import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath } from 'node:url'

export default {
  preprocess: vitePreprocess(),
  compilerOptions: {
    compatibility: {
      componentApi: 4,
    },
  },
  kit: {
    adapter: adapter(),
    alias: {
      '@shared': fileURLToPath(new URL('../shared', import.meta.url)),
    },
  },
}
