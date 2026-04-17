<script lang="ts">
import { defineComponent } from 'vue'
import type { Fingerprint as FingerprintTypes } from '@fingerprint/vue'
import DemoCard from './DemoCard.vue'

type DisplayResult =
  | (Omit<FingerprintTypes.GetResult, 'sealed_result'> & {
      sealed_result: string | null
    })
  | undefined

export default defineComponent({
  name: 'ScenarioCardOptions',
  components: { DemoCard },
  data() {
    return {
      result: undefined as DisplayResult,
      isLoading: false,
      error: undefined as Error | undefined,
    }
  },
  methods: {
    async identify() {
      this.isLoading = true
      this.error = undefined

      try {
        const raw = await this.$fingerprint.getVisitorData()
        this.result = {
          ...raw,
          sealed_result: raw.sealed_result ? raw.sealed_result.base64() : null,
        }
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
    title="Options API"
    subtitle="this.$fingerprint.getVisitorData()"
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
