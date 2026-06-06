<script lang="ts">
  import Image from '$lib/components/image.svelte'
  import BlockButtonGroup from './block-button-group.svelte'
  import type { ResolvedBlock } from '$lib/directus/pages'

  type Props = {
    block: Extract<ResolvedBlock, { type: 'block_hero' }>
  }

  let { block }: Props = $props()
</script>

<section class="block block-hero padded {block.background}">
  <div class="flex flex--gapped flex--middle layout layout--{block.layout}">
    <div class="content col col--6of12 col--mobile--12of12">
      {#if block.tagline}
        <p class="tagline">{block.tagline}</p>
      {/if}

      {#if block.headline}
        <h1 class="h1">{block.headline}</h1>
      {/if}

      {#if block.description}
        <p class="description">{block.description}</p>
      {/if}

      <BlockButtonGroup buttons={block.buttons} />
    </div>

    {#if block.image}
      <figure class="media col col--6of12 col--mobile--12of12">
        <Image
          src={block.image.src}
          alt={block.image.alt}
          width={block.image.width}
          height={block.image.height}
        />
      </figure>
    {/if}
  </div>
</section>

<style lang="scss">
  .block-hero {
    &.dark {
      color: $blanc;
      background: $noir;
    }
  }

  .tagline {
    font-size: $s-1;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: $s-2;
  }

  .description {
    margin-top: $s1;
    max-width: 50ch;
  }

  .layout--image_left {
    flex-direction: row-reverse;
  }

  .layout--image_center {
    flex-direction: column;
    text-align: center;

    .content,
    .description {
      margin-inline: auto;
    }
  }

  .media :global(img) {
    width: 100%;
    height: auto;
    border-radius: $radius;
  }
</style>
