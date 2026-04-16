<script setup lang="ts">
import { computed, ref } from 'vue'
import { useVisitorData } from '@fingerprint/vue'
import DemoCard from './DemoCard.vue'
import { summarizeVisitorData } from './config'

const { data, error, isLoading, getData } = useVisitorData({ immediate: false })
const currentAction = ref('login')

const view = computed(() => {
  if (!data.value) return undefined
  return {
    request: currentAction.value,
    ...summarizeVisitorData(data.value),
  }
})

async function identify(nextAction: string) {
  currentAction.value = nextAction

  try {
    await getData({
      linkedId: 'vue-sandbox-composition',
      tag: {
        surface: 'composition',
        action: nextAction,
      },
    })
  } catch {
    // The composable exposes the error ref for rendering.
  }
}
</script>

<template>
  <DemoCard
    title="Linking + Tagging · Composition API"
    subtitle="getData({ linkedId, tag })"
    :is-loading="isLoading"
    :error="error"
    :data="view"
  >
    <template #actions>
      <div class="row">
        <button @click="identify('login')">login</button>
        <button @click="identify('checkout')">checkout</button>
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
