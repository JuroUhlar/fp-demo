<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  subtitle?: string
  options?: unknown
  isLoading?: boolean
  error?: Error | null
  data?: unknown
}>()

const formattedOptions = computed(() => {
  if (props.options === undefined || props.options === null) {
    return ''
  }

  return JSON.stringify(props.options, null, 2)
})

const formattedData = computed(() => {
  if (props.data === undefined || props.data === null) {
    return ''
  }

  if (typeof props.data === 'string') {
    return props.data
  }

  return JSON.stringify(props.data, null, 2)
})
</script>

<template>
  <section class="card">
    <header>
      <h3>{{ title }}</h3>
      <small v-if="subtitle">{{ subtitle }}</small>
    </header>

    <slot name="actions" />

    <div v-if="formattedOptions" class="section">
      <strong>StartOptions</strong>
      <pre class="config">{{ formattedOptions }}</pre>
    </div>

    <p v-if="isLoading" class="status">Loading…</p>
    <p v-else-if="error" class="status error">{{ error.message }}</p>
    <div v-else-if="formattedData" class="section">
      <strong>Result</strong>
      <pre class="result">{{ formattedData }}</pre>
    </div>
    <p v-else class="status muted">No data yet.</p>

    <slot />
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
.section {
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
.config,
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
</style>
