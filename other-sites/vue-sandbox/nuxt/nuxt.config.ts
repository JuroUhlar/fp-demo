import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  ssr: true,
  typescript: { strict: true },
  alias: {
    '@shared': fileURLToPath(new URL('../shared', import.meta.url)),
  },
  vite: {
    server: {
      fs: {
        allow: [
          fileURLToPath(new URL('.', import.meta.url)),
          fileURLToPath(new URL('../shared', import.meta.url)),
        ],
      },
    },
  },
})
