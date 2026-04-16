# Fingerprint Vue SDK sandbox

Two apps share six `.vue` demo components and use `@fingerprint/vue@2.0.0-rc.0`.

## Coverage per app

| Scenario | Composition API | Options API |
| --- | --- | --- |
| Basic identification | `BasicComposition.vue` | `BasicOptions.vue` |
| Result field summary | `SealedComposition.vue` | `SealedOptions.vue` |
| Linking and tagging | `IncrementalComposition.vue` | `IncrementalOptions.vue` |

- SPA: Vite + Vue 3, `FingerprintPlugin`, cache storage `localStorage`, duration `1800`.
- Nuxt: Nuxt 3 with a `.client` plugin, `FingerprintPlugin`, cache storage `sessionStorage`, duration `1800`.

`SealedOptions.vue` uses `fingerprintGetVisitorDataMixin` to keep one mixin-based example in the sandbox. The other Options API cards use the injected `$fingerprint` client directly.

## Run

```bash
pnpm install
pnpm run dev:spa   # http://localhost:5175
pnpm run dev:nuxt  # http://localhost:3002
```

## Notes

- This sandbox intentionally follows the Vue SDK v2 surface area. Old v1 concepts such as `loadOptions`, `ignoreCache`, `extendedResult`, and `products` are not used.
- All demos use the main subscription from [`shared/config.ts`](./shared/config.ts): API key `2UZgp3skqLzfJpFUGUrw`, region `eu`.
- The default Fingerprint endpoint is used for localhost testing. The custom subdomain is intentionally omitted because it blocks localhost origins.
- Result field summaries use the v4 snake_case field names: `event_id`, `visitor_id`, `sealed_result`, `suspect_score`, and `cache_hit`.
