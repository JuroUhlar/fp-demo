# Fingerprint Vue SDK sandbox

Two apps share two scenario card components (Composition + Options API) and use `@fingerprint/vue@2.0.0-rc.0`. Each app renders 6 boxes: every StartOptions config is shown twice, once per Vue API style.

## Coverage per app

| Scenario | StartOptions source | Composition API | Options API |
| --- | --- | --- | --- |
| Default | `defaultStartOptions` | ✓ | ✓ |
| Sealed result | `sealedResultsStartOptions` | ✓ | ✓ |
| Incremental identification | `incrementalIdentificationStartOptions` | ✓ | ✓ |

- SPA: Vite + Vue 3
- Nuxt: Nuxt 3 with `ClientOnly` around the browser-only cards
- Global cache options are configured once in `shared/config.ts` and reused by all three StartOptions presets.

## Run

```bash
pnpm install
pnpm run dev       # starts both apps
pnpm run dev:spa   # http://localhost:5175
pnpm run dev:nuxt  # http://localhost:3002
```

## Notes

- This sandbox intentionally follows the Vue SDK v2 surface area. Old v1 concepts such as `loadOptions`, `ignoreCache`, `extendedResult`, and `products` are not used.
- All Fingerprint credentials and scenario presets live in [`shared/config.ts`](./shared/config.ts). Public keys are stored there in plaintext.
- Server-only secrets are loaded from `other-sites/vue-sandbox/.env` via `FP_SECRET_API_KEY` and `FP_SEALED_RESULTS_SECRET_KEY`.
- Each card displays the exact `Fingerprint.StartOptions` object it uses.
- The default and incremental scenarios use the normal public API key. The sealed result scenario uses the sealed-results public API key.
- The default Fingerprint endpoint is used for localhost testing.

## Known SDK issue — sealed_result + persistent cache

With the `Sealed result` scenario and `cache.storage: localStorage` (or `sessionStorage`), a cache hit returns a `sealed_result` that is a plain object — the `BinaryOutput` methods (`base64()`, `byteArray()`, `blob()`) are gone. The agent serializes the cached value via `JSON.stringify`/`parse` and does not rehydrate `BinaryOutput` on read, so `sealed_result.base64()` throws `raw.sealed_result.base64 is not a function`.

- Symptom in the sandbox: Options API card shows the error; Mixin card gets stuck on `Loading…` because the computed throws during render; Composition API card fails the same way once clicked.
- Workaround: use `cache.storage: agent` (in-memory, keeps the live object) or clear cache between runs.
- Upstream: defect is in `@fingerprint/agent` cache read path, not in this sandbox.
