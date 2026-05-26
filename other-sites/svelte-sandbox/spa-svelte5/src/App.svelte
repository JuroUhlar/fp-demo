<script lang="ts">
  import { FingerprintProvider } from '@fingerprint/svelte'
  import SandboxShell from '@shared/SandboxShell.svelte'
  import { getBootStartOptions } from '@shared/config'
</script>

<FingerprintProvider options={getBootStartOptions()}>
  <SandboxShell appName="SPA (Svelte 5)" />
</FingerprintProvider>
