<script setup lang="ts">
import { useVisitorData } from '@fingerprint/vue'
import DemoCard from './DemoCard.vue'

const { data, error, isLoading, getData } = useVisitorData({ immediate: false })

async function identify() {
  try {
    await getData()
  } catch {
    // The composable exposes the error ref for rendering.
  }
}
</script>

<template>
  <DemoCard
    title="Basic · Composition API"
    subtitle="useVisitorData({ immediate: false })"
    :is-loading="isLoading"
    :error="error"
    :data="data"
  >
    <template #actions>
      <div class="row">
        <button @click="identify">Identify</button>
      </div>
    </template>
  </DemoCard>
</template>

<style scoped>
.row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
button {
  font-size: 12px;
  padding: 4px 8px;
  cursor: pointer;
}
</style>
