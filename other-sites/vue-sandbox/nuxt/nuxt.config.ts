import { fileURLToPath } from 'node:url'

const sharedDir = fileURLToPath(new URL('../shared', import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  ssr: true,
  typescript: { strict: true },
  alias: {
    '@shared': sharedDir,
  },
  nitro: {
    alias: {
      '@shared': sharedDir,
    },
  },
  vite: {
    server: {
      fs: {
        allow: [fileURLToPath(new URL('.', import.meta.url)), sharedDir],
      },
    },
  },
})
