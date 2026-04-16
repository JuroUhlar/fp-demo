<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { Fingerprint } from '@fingerprint/vue'
import type { Fingerprint as FingerprintTypes } from '@fingerprint/vue'
import DemoCard from './DemoCard.vue'
import { summarizeVisitorData } from './config'

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
      result: undefined as FingerprintTypes.GetResult | undefined,
      isLoading: false,
      error: undefined as Error | undefined,
    }
  },
  computed: {
    view(): unknown {
      return summarizeVisitorData(this.result)
    },
  },
  methods: {
    async identify() {
      this.isLoading = true
      this.error = undefined

      try {
        const agent = Fingerprint.start(this.startOptions)
        this.result = await agent.get()
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
