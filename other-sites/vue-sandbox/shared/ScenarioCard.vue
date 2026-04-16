<script setup lang="ts">
import { Fingerprint } from '@fingerprint/vue'
import { computed, ref } from 'vue'
import type { Fingerprint as FingerprintTypes } from '@fingerprint/vue'
import DemoCard from './DemoCard.vue'
import { summarizeVisitorData } from './config'

const props = defineProps<{
  title: string
  subtitle: string
  startOptions: FingerprintTypes.StartOptions
}>()

const result = ref<FingerprintTypes.GetResult>()
const error = ref<Error>()
const isLoading = ref(false)

const view = computed(() => summarizeVisitorData(result.value))

async function identify() {
  isLoading.value = true
  error.value = undefined

  try {
    const agent = await Fingerprint.start(props.startOptions)
    result.value = await agent.get()
  } catch (nextError) {
    error.value = nextError instanceof Error ? nextError : new Error('Identification failed')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <DemoCard
    :title="title"
    :subtitle="subtitle"
    :options="startOptions"
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
