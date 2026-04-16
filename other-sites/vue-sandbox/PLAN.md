# Vue Sandbox Plan

Reimplement the sandbox against `@fingerprint/vue` v2 instead of the older `@fingerprintjs/fingerprintjs-pro-vue-v3` package.

## Goals

- Keep the shared SPA and Nuxt setup.
- Register `FingerprintPlugin` with v2-style start options.
- Replace removed v1 concepts with demos that exist in v2.
- Keep TypeScript clean across both apps.

## Demo matrix

| Scenario | Composition API | Options API |
| --- | --- | --- |
| Basic identification | `BasicComposition.vue` | `BasicOptions.vue` |
| Result field summary | `SealedComposition.vue` | `SealedOptions.vue` |
| Linking and tagging | `IncrementalComposition.vue` | `IncrementalOptions.vue` |

Notes:

- `SealedOptions.vue` uses `fingerprintGetVisitorDataMixin`.
- `BasicOptions.vue` and `IncrementalOptions.vue` use the injected `$fingerprint` client.
- Result cards surface the v4 snake_case fields: `event_id`, `visitor_id`, `sealed_result`, `suspect_score`, `cache_hit`.

## Migration rules

- Replace `fpjsPlugin` with `FingerprintPlugin`.
- Replace nested `loadOptions` with direct plugin options.
- Replace `fpjsGetVisitorDataMixin` with `fingerprintGetVisitorDataMixin`.
- Remove `fpjsGetVisitorDataExtendedMixin`, `extendedResult`, `ignoreCache`, `clearCache`, and `products`.
- Use plugin-level caching via `cache.storage` and `cache.duration`.

## App setup

- SPA: `FingerprintPlugin` with `cache.storage = 'localStorage'`, `cache.duration = 1800`.
- Nuxt: client-only `FingerprintPlugin` with `cache.storage = 'sessionStorage'`, `cache.duration = 1800`.
- Subscription: main API key only, using the default Fingerprint endpoint for localhost compatibility.
