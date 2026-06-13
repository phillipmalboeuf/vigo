<script lang="ts">
  import Page from '../../routes/[...page]/+page.svelte'
  import { setPageDialogContext } from '$lib/page-dialog/context'
  import { queueGalleryScroll } from '$lib/home-slider'
  import type { PageData } from '$lib/page-dialog/context'
  import type { PageData as RoutePageData } from '../../routes/[...page]/$types'
  import { fade } from 'svelte/transition'
  import { tick } from 'svelte'

  let { children, dialogPages }: { children: import('svelte').Snippet; dialogPages: Record<string, PageData> } = $props()

  let pageData = $state<PageData | null>(null)
  let pageHref = $state<string | null>(null)

  function refreshOpenPage() {
    if (!pageHref) return

    const fresh = dialogPages[pageHref]
    if (fresh) pageData = fresh
  }

  setPageDialogContext({
    open(href, data) {
      pageHref = href
      pageData = data
    },
    close(galleryId) {
      pageData = null
      pageHref = null

      if (galleryId) {
        tick().then(() => queueGalleryScroll(galleryId))
      }
    },
    isOpen: () => !!pageData,
    getHref: () => pageHref,
    getPageData: (href) => dialogPages[href],
    refreshOpenPage
  })

  $effect(() => {
    refreshOpenPage()
  })

  function pageParams(permalink: string) {
    return { page: permalink.replace(/^\//, '') }
  }
</script>

{@render children()}

{#if pageData}
  <dialog open class="page-dialog" transition:fade={{ duration: 666 }}>
    <Page data={pageData as RoutePageData} params={pageParams(pageData.page.permalink)} form={undefined} />
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
