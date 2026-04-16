<script setup lang="ts">
import { Fingerprint } from '@fingerprint/vue'
import { computed, ref } from 'vue'
import type { Fingerprint as FingerprintTypes } from '@fingerprint/vue'
import DemoCard from './DemoCard.vue'
import { withCache } from './config'

const props = defineProps<{
  title: string
  subtitle: string
  startOptions: FingerprintTypes.StartOptions
}>()

const result = ref<Omit<FingerprintTypes.GetResult, 'sealed_result'> & { sealed_result: string | null }>()
const error = ref<Error>()
const isLoading = ref(false)

const effectiveStartOptions = computed(() => withCache(props.startOptions))

async function identify() {
  isLoading.value = true
  error.value = undefined

  try {
    const agent = Fingerprint.start(effectiveStartOptions.value)
    const raw = await agent.get()
    result.value = { ...raw, sealed_result: raw.sealed_result ? raw.sealed_result.base64() : null }
  } catch (nextError) {
    error.value = nextError instanceof Error ? nextError : new Error('Identification failed')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <DemoCard
    :title="`${title} · Composition API`"
    :subtitle="subtitle"
    :options="effectiveStartOptions"
    :is-loading="isLoading"
    :error="error"
    :data="result"
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
