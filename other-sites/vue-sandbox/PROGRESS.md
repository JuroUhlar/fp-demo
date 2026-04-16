# Progress

- [x] PLAN.md + PROGRESS.md
- [x] shared/config.ts — main API key + region `eu`
- [x] shared/DemoCard.vue
- [x] shared/BasicComposition.vue, BasicOptions.vue
- [x] shared/SealedComposition.vue, SealedOptions.vue
- [x] shared/IncrementalComposition.vue, IncrementalOptions.vue
- [x] Migrated dependencies to `@fingerprint/vue@2.0.0-rc.0`
- [x] Replaced old plugin registration with `FingerprintPlugin`
- [x] Removed v1-only concepts: `loadOptions`, `ignoreCache`, `extendedResult`, `products`
- [x] SPA cache config updated to `localStorage` + `1800`
- [x] Nuxt cache config updated to `sessionStorage` + `1800`
- [x] Root workspace install refreshed
- [x] `vue-tsc --noEmit` clean on both apps
- [x] `vite build` and `nuxt build` both green

## Verification

- `pnpm install`
- `pnpm run typecheck`
- `pnpm --filter vue-sandbox-spa build`
- `pnpm --filter vue-sandbox-nuxt build`

## Current status

Done for code-level migration and build verification. Browser runtime behavior has not been re-checked after the v2 rewrite.
