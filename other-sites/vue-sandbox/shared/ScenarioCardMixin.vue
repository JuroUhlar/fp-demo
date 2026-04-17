<script lang="ts">
import { defineComponent } from 'vue'
import { fingerprintGetVisitorDataMixin } from '@fingerprint/vue'
import type { Fingerprint } from '@fingerprint/vue'
import DemoCard from './DemoCard.vue'
import { getCommonGetOptions, toDisplayResult } from './config'
import { loadServerResultIfNew } from './serverClient'

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
      loadServerResultIfNew(this, result)
    },
  },
  methods: {
    async identify() {
      await this.$getVisitorData(getCommonGetOptions()).catch(() => {})
    },
  },
})
</script>

<template>
  <DemoCard
    title="Mixin API"
    subtitle="fingerprintGetVisitorDataMixin"
    :is-fetched="visitorData.isFetched"
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
