# AGENTS.md — vue-sandbox

## Main goal

Test the `@fingerprint/vue` SDK as close to the way a real user would use it as possible.

That means:

- Install `FingerprintPlugin` once at app bootstrap with a single `StartOptions` (same as an app user following the docs).
- Exercise the three public SDK entry points as a user would:
  - **Composition API** — `useVisitorData()` from `<script setup>`.
  - **Options API (plugin)** — `this.$fingerprint.getVisitorData()`.
  - **Mixin API** — `fingerprintGetVisitorDataMixin` + `this.$getVisitorData()`.
- Do **not** fake these by calling `Fingerprint.start()` directly behind the scenes, shadowing `$fingerprint`, or otherwise bypassing the plugin. If you add a new surface, it must be the real SDK surface.
- Config switching (scenario, cache) is handled by persisting the selection to `localStorage` and reloading the page, so the plugin re-installs with the new options — because that's how it would work in a real app.

## Port constraint

Dev-server ports must stay exactly as configured. Only specific ports are whitelisted in our environment; shifting to a fallback port (e.g. Vite picking 5176 when 5175 is busy) breaks tooling and must be treated as an error, not tolerated.

- SPA (Vite): **5175** — set in `spa/vite.config.ts` via `server.port`.
- Nuxt: **3002** — set in `nuxt/package.json` via `nuxt dev --port 3002`.

Rules for agents:

- Do not change these ports.
- Do not add `strictPort: false` or rely on Vite's automatic port fallback.
- If a dev server fails to bind because the port is already in use, stop and kill the stale process (`pkill -f vite` / `pkill -f nuxt`) rather than letting it drift to 5176/3003/etc.
- When verifying compiles via `curl`, always hit the fixed port. If `curl` hits a different port because Vite moved, that is a failure state to fix, not a result to interpret.

## Current structure

- Three scenario presets in `shared/config.ts` (`default`, `sealed-results`, `incremental-identification`). Only one is active per page load; the dropdown at the top switches the active one and reloads.
- Three cards in `shared/` (`ScenarioCardComposition.vue`, `ScenarioCardOptions.vue`, `ScenarioCardMixin.vue`), each using exactly one SDK surface.
- Cache controls (enable / storage / duration) also reload on change because they feed into the bootstrap `StartOptions`.
