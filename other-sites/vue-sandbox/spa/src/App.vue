<script setup lang="ts">
import ScenarioCard from '@shared/ScenarioCard.vue'
import { globalCacheOptions, startOptionsScenarios } from '@shared/config'
</script>

<template>
  <main>
    <h1>Fingerprint Vue SDK — SPA</h1>
    <p class="meta">
      Global cache: <code>{{ JSON.stringify(globalCacheOptions) }}</code>
    </p>

    <div class="grid">
      <ScenarioCard
        v-for="scenario in startOptionsScenarios"
        :key="scenario.key"
        :title="scenario.title"
        :subtitle="scenario.subtitle"
        :start-options="scenario.startOptions"
      />
    </div>
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
}
code {
  background: #eee;
  padding: 1px 4px;
  border-radius: 3px;
}
</style>
