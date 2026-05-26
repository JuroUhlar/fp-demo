import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath } from 'node:url'
import { sandboxApi } from '../shared/vitePlugin'

const sharedDir = fileURLToPath(new URL('../shared', import.meta.url))

export default defineConfig({
  plugins: [svelte(), sandboxApi()],
  resolve: {
    alias: {
      '@shared': sharedDir,
    },
  },
  server: {
    port: 5176,
    strictPort: true,
    fs: {
      allow: [fileURLToPath(new URL('.', import.meta.url)), sharedDir],
    },
  },
})
