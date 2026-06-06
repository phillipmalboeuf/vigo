<script lang="ts">
  import PageBlocks from '$lib/components/blocks/page-blocks.svelte'
  import Logo from '$lib/components/logo.svelte'
  import { homeLink } from '$lib/actions/page-dialog'
  import type { PageProps } from './$types'

  let { data }: PageProps = $props()
</script>

<svelte:head>
  <title>{data.page.title}</title>
</svelte:head>

<header class="padded flex flex--gapped flex--end">
  <a href="/" title="Home" use:homeLink>
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.41406 1.41406L24.4141 24.4141" stroke="currentColor" stroke-width="4"/>
    <path d="M24.4141 1.41406L1.41406 24.4141" stroke="currentColor" stroke-width="4"/>
    </svg>
  </a>
</header>

<article class="page page-{data.page.permalink.replace(/^\//, '-')}">
  <PageBlocks blocks={data.page.blocks} />
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

    a {
      pointer-events: auto;
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
