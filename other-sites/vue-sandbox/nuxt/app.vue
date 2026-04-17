<script setup lang="ts">
import SandboxShell from '@shared/SandboxShell.vue'
</script>

<template>
  <ClientOnly>
    <SandboxShell app-name="Nuxt" />
    <template #fallback>
      <p class="hydrating">Hydrating…</p>
    </template>
  </ClientOnly>
</template>

<style>
.hydrating {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
  color: #555;
  font-size: 12px;
}
</style>
