<script lang="ts">
import { defineComponent } from 'vue'
import type { Fingerprint } from '@fingerprint/vue'
import DemoCard from './DemoCard.vue'
import { summarizeVisitorData } from './config'

export default defineComponent({
  name: 'IncrementalOptions',
  components: { DemoCard },
  data() {
    return {
      currentAction: 'login',
      result: undefined as Fingerprint.GetResult | undefined,
      isLoading: false,
      error: undefined as Error | undefined,
    }
  },
  computed: {
    view(): unknown {
      if (!this.result) {
        return undefined
      }

      return {
        request: this.currentAction,
        ...summarizeVisitorData(this.result),
      }
    },
  },
  methods: {
    async identify(action: string) {
      this.currentAction = action
      this.isLoading = true
      this.error = undefined

      try {
        this.result = await this.$fingerprint.getVisitorData({
          linkedId: 'vue-sandbox-options',
          tag: {
            surface: 'options',
            action,
          },
        })
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
    title="Linking + Tagging · Options API"
    subtitle="this.$fingerprint.getVisitorData({ linkedId, tag })"
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
