<script lang="ts">
  import { useVisitorData } from '@fingerprint/svelte'
  import DemoCard from './DemoCard.svelte'
  import { getCommonGetOptions, toDisplayResult } from './config'
  import {
    fetchServerResult,
    serverResultDisabled,
    serverResultDisabledNote,
  } from './serverClient'

  const { data, error, isFetched, isLoading, getData } = useVisitorData({ immediate: false })

  let serverData: unknown = undefined
  let serverError: Error | null = null
  let serverLoading = false

  $: displayedResult = toDisplayResult($data)

  $: loadServerResultIfNew($data)

  function loadServerResultIfNew(result: typeof $data) {
    if (serverResultDisabled || !result) return
    const lastEventId = (serverData as { event_id?: string } | undefined)?.event_id
    if (lastEventId === result.event_id) return
    void loadResult(result)
  }

  async function loadResult(result: NonNullable<typeof $data>) {
    serverLoading = true
    serverError = null
    try {
      serverData = await fetchServerResult(result)
    } catch (e) {
      serverError = e instanceof Error ? e : new Error(String(e))
      serverData = undefined
    } finally {
      serverLoading = false
    }
  }

  function identify() {
    getData(getCommonGetOptions()).catch(() => {})
  }
</script>

<DemoCard
  title="useVisitorData"
  subtitle={"useVisitorData({ immediate: false })"}
  isFetched={$isFetched}
  isLoading={$isLoading}
  error={$error}
  data={displayedResult}
  serverNote={serverResultDisabled ? serverResultDisabledNote : undefined}
  {serverLoading}
  {serverError}
  {serverData}
>
  <div slot="actions" class="row">
    <button on:click={identify}>Identify</button>
  </div>
</DemoCard>
