<script lang="ts">
  import { homeLink } from '$lib/actions/page-dialog';
  import Image from '$lib/components/image.svelte'
  import type { ResolvedBlock } from '$lib/directus/pages'

  type Props = {
    block: Extract<ResolvedBlock, { type: 'block_gallery' }>
  }

  let { block }: Props = $props()
</script>

<section class="block block-gallery col col--6of12 {block.background}">
  <div class="flex layout">
  {#if block.images.length}
    <ul class="col col--6of12 col--mobile--12of12 grid">
      {#each block.images as image (image.id)}
        <li class="col col--12of12">
          <a href="/#{block.galleryId}" use:homeLink>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          </a>
        </li>
      {/each}
    </ul>
  {/if}

  {#if block.headline || block.text}
    <header class="header col col--6of12 col--mobile--12of12">
      <div class="flex flex--gapped flex--column">
        {#if block.headline}
          <h2 class="h6"><span>◁◁</span><br><a href="/#{block.galleryId}" use:homeLink>{block.headline}</a></h2>
        {/if}
        {#if block.text}
          <div class="richtext"><div class="flex flex--gapped flex--column">{@html block.text}</div></div>
        {/if}
      </div>
    </header>
  {/if}
  </div>
</section>

<style lang="scss">
  .block-gallery {
    --page-gutter: #{$s2 + $s-2};

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

    > .layout {
      --gap: var(--page-gutter);
    }
  }

  .header {
    @media (max-width: $mobile) {
      display: none;
    }

    @media (orientation: portrait) and (max-width: $tablet_portrait) {
      display: none;
    }

    h2 {
      text-transform: uppercase;
      margin-bottom: 0;
    }
  }

  .richtext {
    max-width: 65ch;
    font-size: 13px;
    line-height: 1.35;

    @media (max-width: $tablet_landscape) {
      font-size: 12px;
    }

    @media (max-width: $tablet_portrait) {
      font-size: 11px;
    }

    :global(p) {
      font-size: inherit;
      line-height: inherit;
    }
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
  }

  // @media (orientation: portrait) and (max-width: $tablet_portrait) {
  //   .block-gallery {
  //     width: 100% !important;

  //     .col {
  //       width: 100% !important;
  //     }
  //   }
  // }
</style>
