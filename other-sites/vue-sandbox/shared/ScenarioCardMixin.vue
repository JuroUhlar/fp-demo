<script lang="ts">
import { defineComponent } from 'vue'
import { fingerprintGetVisitorDataMixin } from '@fingerprint/vue'
import DemoCard from './DemoCard.vue'

export default defineComponent({
  name: 'ScenarioCardMixin',
  components: { DemoCard },
  mixins: [fingerprintGetVisitorDataMixin],
  computed: {
    displayedResult(): unknown {
      const data = this.visitorData.data
      if (!data) return undefined
      return {
        ...data,
        sealed_result: data.sealed_result ? data.sealed_result.base64() : null,
      }
    },
  },
  methods: {
    async identify() {
      try {
        await this.$getVisitorData()
      } catch {
        // The mixin exposes the error on visitorData.error.
      }
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
