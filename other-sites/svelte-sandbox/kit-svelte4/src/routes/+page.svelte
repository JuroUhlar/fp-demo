<script lang="ts">
  import { browser } from '$app/environment'
  import { FingerprintProvider } from '@fingerprint/svelte'
  import SandboxShell from '@shared/SandboxShell.svelte'
  import { getBootStartOptions } from '@shared/config'
</script>

{#if browser}
  <FingerprintProvider options={getBootStartOptions()}>
    <SandboxShell appName="SvelteKit (Svelte 4)" />
  </FingerprintProvider>
{:else}
  <p class="hydrating">Hydrating…</p>
{/if}

<style>
  .hydrating {
    max-width: 1100px;
    margin: 0 auto;
    padding: 24px;
    color: #555;
    font-size: 12px;
  }
</style>
