<script setup lang="ts">
import { computed } from 'vue'
import ScenarioCardComposition from '@shared/ScenarioCardComposition.vue'
import ScenarioCardMixin from '@shared/ScenarioCardMixin.vue'
import ScenarioCardOptions from '@shared/ScenarioCardOptions.vue'
import {
  cacheDuration,
  cacheDurationOptions,
  cacheEnabled,
  cacheStorage,
  cacheStorageOptions,
  getBootStartOptions,
  selectedScenarioKey,
  startOptionsScenarios,
} from '@shared/config'

const bootStartOptions = computed(() => getBootStartOptions())

function reload() {
  if (typeof window !== 'undefined') {
    window.location.reload()
  }
}
</script>

<template>
  <main>
    <h1>Fingerprint Vue SDK — Nuxt</h1>

    <ClientOnly>
      <p class="meta">
        <label class="field">
          Scenario:
          <select v-model="selectedScenarioKey" @change="reload">
            <option v-for="scenario in startOptionsScenarios" :key="scenario.key" :value="scenario.key">
              {{ scenario.title }}
            </option>
          </select>
        </label>
        <label class="toggle">
          <input type="checkbox" v-model="cacheEnabled" @change="reload" />
          Enable cache
        </label>
        <label class="field">
          storage:
          <select v-model="cacheStorage" :disabled="!cacheEnabled" @change="reload">
            <option v-for="option in cacheStorageOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </label>
        <label class="field">
          duration:
          <select v-model="cacheDuration" :disabled="!cacheEnabled" @change="reload">
            <option v-for="option in cacheDurationOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </label>
      </p>

      <section class="start-options">
        <strong>Plugin StartOptions (installed at bootstrap)</strong>
        <pre>{{ JSON.stringify(bootStartOptions, null, 2) }}</pre>
      </section>

      <div class="grid">
        <ScenarioCardComposition />
        <ScenarioCardOptions />
        <ScenarioCardMixin />
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
  margin: 0 0 12px;
  color: #555;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
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
.start-options {
  margin: 0 0 16px;
  font-size: 11px;
}
.start-options pre {
  margin: 4px 0 0;
  background: #f7f7f8;
  padding: 8px;
  border-radius: 4px;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-all;
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
