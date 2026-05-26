import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

const sharedDir = fileURLToPath(new URL('../shared', import.meta.url))

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: 5178,
    strictPort: true,
    fs: {
      allow: [fileURLToPath(new URL('.', import.meta.url)), sharedDir],
    },
  },
  ssr: {
    noExternal: ['@fingerprint/svelte', '@fingerprint/agent'],
  },
})
