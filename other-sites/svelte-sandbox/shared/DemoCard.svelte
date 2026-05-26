<script lang="ts">
  export let title: string
  export let subtitle: string | undefined = undefined
  export let isFetched: boolean = false
  export let isLoading: boolean = false
  export let error: Error | null | undefined = undefined
  export let data: unknown = undefined
  export let serverNote: string | undefined = undefined
  export let serverLoading: boolean = false
  export let serverError: Error | null | undefined = undefined
  export let serverData: unknown = undefined

  function format(value: unknown): string {
    if (value === undefined || value === null) return ''
    if (typeof value === 'string') return value
    return JSON.stringify(value, null, 2)
  }

  $: formattedData = format(data)
  $: formattedServerData = format(serverData)
</script>

<section class="card">
  <header>
    <h3>{title}</h3>
    {#if subtitle}
      <small>{subtitle}</small>
    {/if}
  </header>

  <slot name="actions" />

  <div class="result-block">
    <strong>Client result</strong>
    <p class="status muted">isFetched: {isFetched ? 'true' : 'false'}</p>
    {#if isLoading}
      <p class="status">Loading…</p>
    {:else if error}
      <p class="status error">{error.message}</p>
    {:else if formattedData}
      <pre class="result">{formattedData}</pre>
    {:else}
      <p class="status muted">No data yet.</p>
    {/if}
  </div>

  <div class="result-block">
    <strong>Server result</strong>
    {#if serverNote}
      <p class="status muted">{serverNote}</p>
    {:else if serverLoading}
      <p class="status">Loading…</p>
    {:else if serverError}
      <p class="status error">{serverError.message}</p>
    {:else if formattedServerData}
      <pre class="result">{formattedServerData}</pre>
    {:else}
      <p class="status muted">No data yet.</p>
    {/if}
  </div>
</section>

<style>
  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: #fff;
    min-width: 0;
  }
  h3 { margin: 0; font-size: 14px; }
  small { color: #666; font-size: 11px; }
  .status { margin: 0; font-size: 12px; }
  .result-block { display: flex; flex-direction: column; gap: 4px; }
  .muted { color: #888; }
  .error { color: #b00020; }
  .result {
    margin: 0; font-size: 11px; background: #f7f7f8; padding: 8px;
    border-radius: 4px; overflow: auto; max-height: 220px;
    white-space: pre-wrap; word-break: break-all;
  }
  :global(.card .row) { display: flex; gap: 6px; flex-wrap: wrap; }
  :global(.card button) { font-size: 12px; padding: 4px 8px; cursor: pointer; }
</style>
