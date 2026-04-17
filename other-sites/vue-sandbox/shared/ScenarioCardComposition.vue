<script setup lang="ts">
import { computed } from 'vue'
import { useVisitorData } from '@fingerprint/vue'
import DemoCard from './DemoCard.vue'

const { data, error, isLoading, getData } = useVisitorData({ immediate: false })

const displayedResult = computed(() => {
  if (!data.value) return undefined
  return {
    ...data.value,
    sealed_result: data.value.sealed_result ? data.value.sealed_result.base64() : null,
  }
})

async function identify() {
  try {
    await getData()
  } catch {
    // useVisitorData exposes the error ref.
  }
}
</script>

<template>
  <DemoCard
    title="Composition API"
    subtitle="useVisitorData({ immediate: false })"
    :is-loading="isLoading"
    :error="error"
    :data="displayedResult"
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
