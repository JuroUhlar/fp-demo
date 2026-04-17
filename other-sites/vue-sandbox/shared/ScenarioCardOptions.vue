<script lang="ts">
import { defineComponent } from 'vue'
import DemoCard from './DemoCard.vue'
import { toDisplayResult } from './config'

export default defineComponent({
  name: 'ScenarioCardOptions',
  components: { DemoCard },
  data() {
    return {
      result: undefined as ReturnType<typeof toDisplayResult>,
      isLoading: false,
      error: undefined as Error | undefined,
    }
  },
  methods: {
    async identify() {
      this.isLoading = true
      this.error = undefined
      try {
        this.result = toDisplayResult(await this.$fingerprint.getVisitorData())
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
