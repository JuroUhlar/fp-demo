<script setup lang="ts">
import { computed } from 'vue'
import { useVisitorData } from '@fingerprint/vue'
import DemoCard from './DemoCard.vue'
import { summarizeVisitorData } from './config'

const { data, error, isLoading, getData } = useVisitorData({ immediate: false })

const view = computed(() => summarizeVisitorData(data.value))

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
    title="Result Fields · Composition API"
    subtitle="event_id / visitor_id / sealed_result / suspect_score / cache_hit"
    :is-loading="isLoading"
    :error="error"
    :data="view"
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
