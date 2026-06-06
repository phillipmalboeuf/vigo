<script lang="ts">
  import Image from '$lib/components/image.svelte'
  import type { ResolvedBlock } from '$lib/directus/pages'

  type Props = {
    block: Extract<ResolvedBlock, { type: 'block_gallery' }>
  }

  let { block }: Props = $props()
</script>

<section class="block block-gallery padded {block.background}">
  {#if block.tagline || block.headline}
    <header class="header">
      {#if block.tagline}
        <p class="tagline">{block.tagline}</p>
      {/if}
      {#if block.headline}
        <h2 class="h2">{block.headline}</h2>
      {/if}
    </header>
  {/if}

  {#if block.images.length}
    <ul class="grid flex flex--gapped">
      {#each block.images as image (image.id)}
        <li class="col col--4of12 col--tablet--6of12 col--mobile--12of12">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
          />
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style lang="scss">
  .block-gallery {
    &.dark {
      color: $blanc;
      background: $noir;
    }
  }

  .header {
    margin-bottom: $s1;
  }

  .tagline {
    font-size: $s-1;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: $s-2;
  }

  .grid {
    list-style: none;
    padding: 0;
  }

  .grid :global(img) {
    width: 100%;
    height: auto;
    border-radius: $radius;
  }
</style>
