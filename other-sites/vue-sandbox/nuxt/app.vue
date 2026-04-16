<script setup lang="ts">
import BasicComposition from '@shared/BasicComposition.vue'
import BasicOptions from '@shared/BasicOptions.vue'
import SealedComposition from '@shared/SealedComposition.vue'
import SealedOptions from '@shared/SealedOptions.vue'
import IncrementalComposition from '@shared/IncrementalComposition.vue'
import IncrementalOptions from '@shared/IncrementalOptions.vue'
</script>

<template>
  <main>
    <h1>Fingerprint Vue SDK — Nuxt</h1>
    <p class="meta">
      Plugin: <code>FingerprintPlugin</code> (client-only) · cache.storage:
      <code>sessionStorage</code> · cache.duration: <code>1800</code>
    </p>

    <ClientOnly>
      <div class="grid">
        <BasicComposition />
        <BasicOptions />
        <SealedComposition />
        <SealedOptions />
        <IncrementalComposition />
        <IncrementalOptions />
      </div>
      <template #fallback>
        <p class="meta">Hydrating…</p>
      </template>
    </ClientOnly>
  </main>
</template>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  background: #f3f3f5;
  color: #111;
}
main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
}
h1 {
  margin: 0 0 4px;
  font-size: 20px;
}
.meta {
  margin: 0 0 16px;
  color: #555;
  font-size: 12px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
code {
  background: #eee;
  padding: 1px 4px;
  border-radius: 3px;
}
</style>
