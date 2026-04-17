<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  subtitle?: string
  isLoading?: boolean
  error?: Error | null
  data?: unknown
  serverLoading?: boolean
  serverError?: Error | null
  serverData?: unknown
}>()

const format = (value: unknown): string => {
  if (value === undefined || value === null) return ''
  if (typeof value === 'string') return value
  return JSON.stringify(value, null, 2)
}

const formattedData = computed(() => format(props.data))
const formattedServerData = computed(() => format(props.serverData))
</script>

<template>
  <section class="card">
    <header>
      <h3>{{ title }}</h3>
      <small v-if="subtitle">{{ subtitle }}</small>
    </header>

    <slot name="actions" />

    <div class="result-block">
      <strong>Client result</strong>
      <p v-if="isLoading" class="status">Loading…</p>
      <p v-else-if="error" class="status error">{{ error.message }}</p>
      <pre v-else-if="formattedData" class="result">{{ formattedData }}</pre>
      <p v-else class="status muted">No data yet.</p>
    </div>

    <div class="result-block">
      <strong>Server result</strong>
      <p v-if="serverLoading" class="status">Loading…</p>
      <p v-else-if="serverError" class="status error">{{ serverError.message }}</p>
      <pre v-else-if="formattedServerData" class="result">{{ formattedServerData }}</pre>
      <p v-else class="status muted">No data yet.</p>
    </div>
  </section>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #fff;
  min-width: 0;
}
h3 {
  margin: 0;
  font-size: 14px;
}
small {
  color: #666;
  font-size: 11px;
}
.status {
  margin: 0;
  font-size: 12px;
}
.result-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.muted {
  color: #888;
}
.error {
  color: #b00020;
}
.result {
  margin: 0;
  font-size: 11px;
  background: #f7f7f8;
  padding: 8px;
  border-radius: 4px;
  overflow: auto;
  max-height: 220px;
  white-space: pre-wrap;
  word-break: break-all;
}
:slotted(.row) {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
:slotted(button) {
  font-size: 12px;
  padding: 4px 8px;
  cursor: pointer;
}
</style>
