<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { Fingerprint } from '@fingerprint/vue'
import type { Fingerprint as FingerprintTypes } from '@fingerprint/vue'
import DemoCard from './DemoCard.vue'
import { withCache } from './config'

export default defineComponent({
  name: 'ScenarioCardOptions',
  components: { DemoCard },
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    startOptions: {
      type: Object as PropType<FingerprintTypes.StartOptions>,
      required: true,
    },
  },
  data() {
    return {
      result: undefined as
        | (Omit<FingerprintTypes.GetResult, 'sealed_result'> & { sealed_result: string | null })
        | undefined,
      isLoading: false,
      error: undefined as Error | undefined,
    }
  },
  computed: {
    effectiveStartOptions(): FingerprintTypes.StartOptions {
      return withCache(this.startOptions)
    },
  },
  methods: {
    async identify() {
      this.isLoading = true
      this.error = undefined

      try {
        const agent = Fingerprint.start(this.effectiveStartOptions)
        const raw = await agent.get()
        this.result = { ...raw, sealed_result: raw.sealed_result ? raw.sealed_result.base64() : null }
      } catch (error) {
        this.error = error instanceof Error ? error : new Error('Identification failed')
      } finally {
        this.isLoading = false
      }
    },
  },
})
</script>

<template>
  <DemoCard
    :title="`${title} · Options API`"
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
