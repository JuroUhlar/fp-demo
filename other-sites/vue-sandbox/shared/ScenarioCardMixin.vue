<script lang="ts">
import { defineComponent } from 'vue'
import { fingerprintGetVisitorDataMixin } from '@fingerprint/vue'
import type { Fingerprint } from '@fingerprint/vue'
import DemoCard from './DemoCard.vue'
import { toDisplayResult } from './config'
import { loadServerResult } from './serverClient'

export default defineComponent({
  name: 'ScenarioCardMixin',
  components: { DemoCard },
  mixins: [fingerprintGetVisitorDataMixin],
  data() {
    return {
      serverData: undefined as unknown,
      serverError: null as Error | null,
      serverLoading: false,
    }
  },
  computed: {
    displayed(): ReturnType<typeof toDisplayResult> {
      return toDisplayResult(this.visitorData.data)
    },
  },
  watch: {
    'visitorData.data'(result: Fingerprint.GetResult | null | undefined) {
      return loadServerResult(this, result)
    },
  },
  methods: {
    async identify() {
      await this.$getVisitorData().catch(() => {})
    },
  },
})
</script>

<template>
  <DemoCard
    title="Mixin API"
    subtitle="fingerprintGetVisitorDataMixin"
    :is-loading="visitorData.isLoading"
    :error="visitorData.error"
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
