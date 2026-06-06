<script lang="ts">
  import Page from '../../routes/[...page]/+page.svelte'
  import { page } from '$app/state'
  import { pushState } from '$app/navigation'
  import { setPageDialogContext } from '$lib/page-dialog/context'
  import { fade } from 'svelte/transition'

  let { children } = $props()

  const pageData = $derived(page.state.pageDialog ?? null)

  setPageDialogContext({
    open(href, data) {
      pushState(href, { pageDialog: data })
    },
    close() {
      history.back()
    },
    isOpen: () => !!page.state.pageDialog
  })

  function pageParams(permalink: string) {
    return { page: permalink.replace(/^\//, '') }
  }
</script>

{@render children()}

{#if pageData}
  <dialog open class="page-dialog" transition:fade={{ duration: 666 }}>
    <Page data={pageData} params={pageParams(pageData.page.permalink)} form={undefined} />
  </dialog>
{/if}

<style lang="scss">
  .page-dialog {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: $blanc;
    overflow: auto;
  }
</style>
