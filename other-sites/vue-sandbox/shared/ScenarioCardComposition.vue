<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { useVisitorData } from '@fingerprint/vue'
import DemoCard from './DemoCard.vue'
import { toDisplayResult } from './config'
import { loadServerResult, type ServerState } from './serverClient'

const { data, error, isLoading, getData } = useVisitorData({ immediate: false })
const displayedResult = computed(() => toDisplayResult(data.value))

const server = reactive<ServerState>({
  serverData: undefined,
  serverError: null,
  serverLoading: false,
})
watch(data, (result) => loadServerResult(server, result))

const identify = () => getData().catch(() => {})
</script>

<template>
  <DemoCard
    title="Composition API"
    subtitle="useVisitorData({ immediate: false })"
    :is-loading="isLoading"
    :error="error"
    :data="displayedResult"
    :server-loading="server.serverLoading"
    :server-error="server.serverError"
    :server-data="server.serverData"
  >
    <template #actions>
      <div class="row">
        <button @click="identify">Identify</button>
      </div>
    </template>
  </DemoCard>
</template>
