<script setup lang="ts">
import { computed } from 'vue'
import { useVisitorData } from '@fingerprint/vue'
import DemoCard from './DemoCard.vue'
import { toDisplayResult } from './config'

const { data, error, isLoading, getData } = useVisitorData({ immediate: false })
const displayedResult = computed(() => toDisplayResult(data.value))
const identify = () => getData().catch(() => {})
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
