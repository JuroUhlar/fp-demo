<script lang="ts">
import { defineComponent } from 'vue'
import type { Fingerprint } from '@fingerprint/vue'
import DemoCard from './DemoCard.vue'

export default defineComponent({
  name: 'BasicOptions',
  components: { DemoCard },
  data() {
    return {
      result: undefined as Fingerprint.GetResult | undefined,
      isLoading: false,
      error: undefined as Error | undefined,
    }
  },
  methods: {
    async identify() {
      this.isLoading = true
      this.error = undefined

      try {
        this.result = await this.$fingerprint.getVisitorData()
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
    title="Basic · Options API"
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
