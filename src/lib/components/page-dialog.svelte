<script lang="ts">
  import Page from '../../routes/[...page]/+page.svelte'
  import { setPageDialogContext, type PageData } from '$lib/page-dialog/context'
  import { fade } from 'svelte/transition'

  let { children } = $props()

  let open = $state(false)
  let pageData = $state<PageData | null>(null)

  setPageDialogContext({
    open(data: PageData) {
      pageData = data
      open = true
    },
    close() {
      open = false
      pageData = null
    },
    isOpen: () => open
  })

  function pageParams(permalink: string) {
    return { page: permalink.replace(/^\//, '') }
  }
</script>

{@render children()}

{#if open && pageData}
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
