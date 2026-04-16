<script setup lang="ts">
import ScenarioCardComposition from '@shared/ScenarioCardComposition.vue'
import ScenarioCardOptions from '@shared/ScenarioCardOptions.vue'
import {
  cacheDuration,
  cacheDurationOptions,
  cacheEnabled,
  cacheStorage,
  cacheStorageOptions,
  startOptionsScenarios,
} from '@shared/config'
</script>

<template>
  <main>
    <h1>Fingerprint Vue SDK — Nuxt</h1>

    <ClientOnly>
      <p class="meta">
        <label class="toggle">
          <input type="checkbox" v-model="cacheEnabled" />
          Enable cache
        </label>
        <label class="field">
          storage:
          <select v-model="cacheStorage" :disabled="!cacheEnabled">
            <option v-for="option in cacheStorageOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </label>
        <label class="field">
          duration:
          <select v-model="cacheDuration" :disabled="!cacheEnabled">
            <option v-for="option in cacheDurationOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </label>
      </p>
      <div class="grid">
        <ScenarioCardComposition
          v-for="scenario in startOptionsScenarios"
          :key="`composition-${scenario.key}`"
          :title="scenario.title"
          :subtitle="scenario.subtitle"
          :start-options="scenario.startOptions"
        />
        <ScenarioCardOptions
          v-for="scenario in startOptionsScenarios"
          :key="`options-${scenario.key}`"
          :title="scenario.title"
          :subtitle="scenario.subtitle"
          :start-options="scenario.startOptions"
        />
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
  display: flex;
  align-items: center;
  gap: 8px;
}
.toggle {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}
.field {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.field select {
  font-size: 12px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
code {
  background: #eee;
  padding: 1px 4px;
  border-radius: 3px;
}
</style>
