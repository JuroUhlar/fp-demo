<script lang="ts">
import { defineComponent } from 'vue'
import { fingerprintGetVisitorDataMixin } from '@fingerprint/vue'
import DemoCard from './DemoCard.vue'
import { toDisplayResult } from './config'

export default defineComponent({
  name: 'ScenarioCardMixin',
  components: { DemoCard },
  mixins: [fingerprintGetVisitorDataMixin],
  computed: {
    displayedResult(): ReturnType<typeof toDisplayResult> {
      return toDisplayResult(this.visitorData.data)
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
    :data="displayedResult"
  >
    <template #actions>
      <div class="row">
        <button @click="identify">Identify</button>
      </div>
    </template>
  </DemoCard>
</template>
