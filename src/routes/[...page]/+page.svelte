<script lang="ts">
  import PageBlocks from '$lib/components/blocks/page-blocks.svelte'
  import Logo from '$lib/components/logo.svelte'
  import { homeLink } from '$lib/actions/page-dialog'
  import { invalidateAll } from '$app/navigation'
  import { getLocale, setLocale, type Locale } from '$lib/paraglide/runtime'
  import { getPageDialogContext } from '$lib/page-dialog/context'
  import type { ResolvedPage } from '$lib/directus/pages'

  import type { PageProps } from './$types'

  let { data }: PageProps = $props()
  let activeLocale = $state(getLocale())
  let pageOverride = $state<ResolvedPage | null>(null)
  let page = $derived(pageOverride ?? data.page)

  const { refreshOpenPage, getPageData } = getPageDialogContext()

  $effect(() => {
    data.page.permalink
    pageOverride = null
  })

  async function swithLocale(locale: Locale) {
    await setLocale(locale, { reload: false })
    activeLocale = locale
    await invalidateAll()
    refreshOpenPage()

    const fresh = getPageData(data.page.permalink)
    if (fresh) pageOverride = fresh.page
  }
</script>

<svelte:head>
  <title>{page.title}</title>
</svelte:head>

<header class="padded--tight flex flex--gapped flex--middle flex--end">
  <div class="locale-switcher">
    <button class:active={activeLocale === 'en'} onclick={() => swithLocale('en')}>EN</button>
    <button class:active={activeLocale === 'fr'} onclick={() => swithLocale('fr')}>FR</button>
  </div>
  <a href="/" title="Home" use:homeLink>
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.41406 1.41406L24.4141 24.4141" stroke="currentColor" stroke-width="4"/>
    <path d="M24.4141 1.41406L1.41406 24.4141" stroke="currentColor" stroke-width="4"/>
    </svg>
  </a>
</header>

<article class="page page-{page.permalink.replace(/^\//, '-')}">
  <PageBlocks blocks={page.blocks} />
</article>

<footer>
  <Logo />
</footer>

<style lang="scss">
  .page {
    &.page--gallery {
      padding: $s7 $s7 12vw;

      :global(> div) {
        --gap: #{$s6};
      }
    }
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    pointer-events: none;

    a, button {
      pointer-events: auto;
    }
  }

  .locale-switcher {
    display: flex;
    padding: 0.3em;
    background: $noir;
    color: $blanc;
    border-radius: 3em;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: calc($s4 - 3px);
      height: calc($s4 - 3px);
      padding: 0;
      border-radius: 50%;
      line-height: 1;
      background: transparent;
      font-size: 0.9em;

      &.active {
        background: $blanc;
        color: $noir;
      }
    }
  }

  footer :global(svg) {
    position: fixed;
    bottom: -2.75vw;
    left: 0;
    width: 100%;
    height: auto;
    z-index: 10;

    color: $noir;
  }
</style>
