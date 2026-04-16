<script lang="ts">
import { defineComponent } from 'vue'
import { fingerprintGetVisitorDataMixin } from '@fingerprint/vue'
import DemoCard from './DemoCard.vue'
import { summarizeVisitorData } from './config'

export default defineComponent({
  name: 'SealedOptions',
  components: { DemoCard },
  mixins: [fingerprintGetVisitorDataMixin],
  computed: {
    view(): unknown {
      return summarizeVisitorData(this.visitorData.data)
    },
  },
  methods: {
    async identify() {
      try {
        await this.$getVisitorData()
      } catch {
        // The mixin updates visitorData.error for rendering.
      }
    },
  },
})
</script>

<template>
  <DemoCard
    title="Result Fields · Options API + Mixin"
    subtitle="fingerprintGetVisitorDataMixin"
    :is-loading="visitorData.isLoading"
    :error="visitorData.error"
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
