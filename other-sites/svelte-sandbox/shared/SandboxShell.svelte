<script lang="ts">
  import ScenarioCard from './ScenarioCard.svelte'
  import {
    cacheDuration,
    cacheDurationOptions,
    commonLinkedId,
    commonTag,
    cacheEnabled,
    cacheStorage,
    cacheStorageOptions,
    DEFAULT_LINKED_ID,
    DEFAULT_TAG,
    getBootStartOptions,
    getCommonGetOptions,
    selectedScenarioKey,
    startOptionsScenarios,
  } from './config'

  export let appName: string

  let bootStartOptions = getBootStartOptions()
  $: $selectedScenarioKey, $cacheEnabled, $cacheStorage, $cacheDuration,
     bootStartOptions = getBootStartOptions()

  let commonGetOptions = getCommonGetOptions()
  $: $commonLinkedId, $commonTag,
     commonGetOptions = getCommonGetOptions()

  function reload() {
    if (typeof window !== 'undefined') window.location.reload()
  }

  function onScenarioChange(e: Event) {
    $selectedScenarioKey = (e.target as HTMLSelectElement).value as typeof $selectedScenarioKey
    reload()
  }

  function onCacheEnabledChange() {
    $cacheEnabled = !$cacheEnabled
    reload()
  }

  function onCacheStorageChange(e: Event) {
    $cacheStorage = (e.target as HTMLSelectElement).value as typeof $cacheStorage
    reload()
  }

  function onCacheDurationChange(e: Event) {
    $cacheDuration = (e.target as HTMLSelectElement).value as typeof $cacheDuration
    reload()
  }
</script>

<main>
  <h1>Fingerprint Svelte SDK — {appName}</h1>

  <p class="meta">
    <label class="field">
      Scenario:
      <select value={$selectedScenarioKey} on:change={onScenarioChange}>
        {#each startOptionsScenarios as scenario}
          <option value={scenario.key}>{scenario.title}</option>
        {/each}
      </select>
    </label>
    <label class="toggle">
      <input type="checkbox" checked={$cacheEnabled} on:change={onCacheEnabledChange} />
      Enable cache
    </label>
    <label class="field">
      storage:
      <select value={$cacheStorage} disabled={!$cacheEnabled} on:change={onCacheStorageChange}>
        {#each cacheStorageOptions as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </label>
    <label class="field">
      duration:
      <select value={$cacheDuration} disabled={!$cacheEnabled} on:change={onCacheDurationChange}>
        {#each cacheDurationOptions as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </label>
    <label class="field">
      linkedId:
      <input bind:value={$commonLinkedId} type="text" placeholder={DEFAULT_LINKED_ID} />
    </label>
    <label class="field">
      tag:
      <input bind:value={$commonTag} type="text" placeholder={DEFAULT_TAG} />
    </label>
  </p>

  <section class="start-options">
    <strong>Plugin StartOptions (installed at bootstrap)</strong>
    <pre>{JSON.stringify(bootStartOptions, null, 2)}</pre>
  </section>

  <section class="start-options">
    <strong>Common GetOptions (passed on every identify)</strong>
    <pre>{JSON.stringify(commonGetOptions, null, 2)}</pre>
  </section>

  <div class="grid">
    <ScenarioCard />
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    background: #f3f3f5;
    color: #111;
  }
  main { max-width: 1100px; margin: 0 auto; padding: 24px; }
  h1 { margin: 0 0 4px; font-size: 20px; }
  .meta {
    margin: 0 0 12px; color: #555; font-size: 12px;
    display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
  }
  .toggle { display: inline-flex; align-items: center; gap: 4px; cursor: pointer; }
  .field { display: inline-flex; align-items: center; gap: 4px; }
  .field select { font-size: 12px; }
  .field input { font-size: 12px; padding: 2px 6px; }
  .start-options { margin: 0 0 16px; font-size: 11px; }
  .start-options pre {
    margin: 4px 0 0; background: #f7f7f8; padding: 8px;
    border-radius: 4px; overflow: auto; white-space: pre-wrap; word-break: break-all;
  }
  .grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
</style>
