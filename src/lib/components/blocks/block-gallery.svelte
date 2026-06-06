<script lang="ts">
  import Image from '$lib/components/image.svelte'
  import type { ResolvedBlock } from '$lib/directus/pages'

  type Props = {
    block: Extract<ResolvedBlock, { type: 'block_gallery' }>
  }

  let { block }: Props = $props()
</script>

<section class="block block-gallery col col--6of12 {block.background}">
  <div class="flex flex--gapped">
  {#if block.images.length}
    <ul class="col col--6of12 col--mobile--12of12 grid flex flex--gapped">
      {#each block.images as image (image.id)}
        <li class="col col--12of12">
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

  {#if block.tagline || block.headline || block.text}
    <header class="header col col--6of12 col--mobile--12of12 flex flex--gapped flex--column">
      {#if block.tagline}
        <p class="tagline">{block.tagline}</p>
      {/if}
      {#if block.headline}
        <h2 class="h5"><span>◁◁</span><br>{block.headline}</h2>
      {/if}
      {#if block.text}
        <div class="richtext flex flex--gapped flex--column">{@html block.text}</div>
      {/if}
    </header>
  {/if}
  </div>
</section>

<style lang="scss">
  .block-gallery {
    // padding: $s2;
    // padding-right: 0;
    // padding-bottom: 0;

    &:nth-child(even) {
      // padding-right: $s2;
      // padding-left: 0;
    }

    &.dark {
      color: $blanc;
      background: $noir;
    }

    &:nth-child(4n),
    &:nth-child(4n + 3) {
      .header {
        order: -1;

        h2 span {
          display: inline-block;
          transform: scaleX(-1);
        }
      }
    }
  }

  .header {
    margin-bottom: $s1;

    .h5 {
      text-transform: uppercase;
    }
  }

  .tagline {
    font-size: $s-1;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: $s-2;
  }

  .richtext {
    max-width: 65ch;

    // :global(a) {
    //   text-decoration: none;
    //   display: inline-block;
    //   background: $noir;
    //   color: $blanc;
    //   padding: 2px $s-2;
    //   border-radius: calc($radius * 2);
    //   transition: background-color 333ms, color 333ms;

    //   &:hover,
    //   &:focus {
    //     background: $blanc;
    //     color: $noir;
    //   }
    // }
  }

  .grid {
    list-style: none;
    padding: 0;

    li:not(:first-child) {
      display: none;
    }
  }

  .grid :global(img) {
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    // border-radius: $radius;
  }
</style>
