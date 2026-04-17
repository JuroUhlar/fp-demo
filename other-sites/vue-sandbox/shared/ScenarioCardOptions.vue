<script lang="ts">
import { defineComponent } from 'vue'
import type { Fingerprint } from '@fingerprint/vue'
import DemoCard from './DemoCard.vue'
import { getCommonGetOptions, toDisplayResult } from './config'
import { loadServerResultIfNew } from './serverClient'

export default defineComponent({
  name: 'ScenarioCardOptions',
  components: { DemoCard },
  data() {
    return {
      raw: null as Fingerprint.GetResult | null,
      isLoading: false,
      error: undefined as Error | undefined,
      serverData: undefined as unknown,
      serverError: null as Error | null,
      serverLoading: false,
    }
  },
  computed: {
    displayed(): ReturnType<typeof toDisplayResult> {
      return toDisplayResult(this.raw)
    },
  },
  watch: {
    raw(result: Fingerprint.GetResult | null) {
      loadServerResultIfNew(this, result)
    },
  },
  methods: {
    async identify() {
      this.isLoading = true
      this.error = undefined
      try {
        this.raw = await this.$fingerprint.getVisitorData(getCommonGetOptions())
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
    :data="displayed"
    :server-loading="serverLoading"
    :server-error="serverError"
    :server-data="serverData"
  >
    <template #actions>
      <div class="row">
        <button @click="identify">Identify</button>
      </div>
    </template>
  </DemoCard>
</template>
