<script lang="ts">
  import Image from '$lib/components/image.svelte'
  import type { ResolvedBlock } from '$lib/directus/pages'

  type Props = {
    block: Extract<ResolvedBlock, { type: 'block_richtext' }>
  }

  let { block }: Props = $props()
</script>

<section class="block block-richtext {block.background} align-{block.alignment}">
  <div class="inner flex">
    {#if block.image}
      <figure class="media col col--6of12">
        <Image
          src={block.image.src}
          alt={block.image.alt}
          width={block.image.width}
          height={block.image.height}
        />
      </figure>
    {/if}

    <div
      class="content col"
      class:col--6of12={!!block.image}
      class:col--12of12={!block.image}
    >
      <div class="flex flex--gapped flex--column">
      {#if block.headline}
        <h1>{block.headline}</h1>
      {/if}

      {#if block.content}
        <div class="richtext flex flex--gapped flex--column">{@html block.content}</div>
        {/if}
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  .block-richtext {
    --page-gutter: #{$s2};
    width: 100%;
    padding: var(--page-gutter);
    padding-top: calc(var(--page-gutter) + env(safe-area-inset-top, 0px));

    @media (max-width: $mobile) {
      --page-gutter: #{$s0};
      padding-top: calc(#{$s2} + env(safe-area-inset-top, 0px));
    }

    .inner {
      width: 100%;
      --gap: var(--page-gutter);
    }

    &.dark {
      color: $blanc;
      background: $noir;

      .richtext :global(a) {
        background: $blanc;
        color: $noir;

        &:hover,
        &:focus {
          background: $noir;
          color: $blanc;
          box-shadow: inset 0 0 0 1px $blanc;
        }
      }
    }

    &.beige {
      color: $noir;
      background: $beige;
    }

    &.align-center {
      .content {
        text-align: center;
      }
    }

    &.align-left {
      .content {
        order: -1;
      }
    }

    .content {
      padding: $s4 ($s2 - $s2);

      @media (max-width: $mobile) {
        padding: 16vw 0;
      }
    }
  }

  h1 {
    display: none;
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

    :global(a) {
      text-decoration: none;
      display: inline-block;
      background: $noir;
      color: $blanc;
      padding: 3px $s-1;
      border-radius: 1em;
      transition: background-color 333ms, color 333ms;

      &:hover,
      &:focus {
        background: $blanc;
        color: $noir;
      }
    }
  }

  .media {
    position: sticky;
    top: var(--page-gutter);

    @media (min-width: $tablet_portrait) {
      top: var(--page-gutter);
    }
  }

  .media :global(img) {
    width: 100%;
    height: calc(100dvh - (var(--page-gutter) * 2));
    object-fit: cover;
  }

  // Tablet portrait + mobile: stack like mobile (image on top, text below)
  @media (orientation: portrait) and (max-width: $tablet_portrait) {
    .block-richtext {
      .media,
      .content {
        width: 100% !important;
        order: initial;
      }

      .media {
        position: relative;
        top: 0;
      }

      .content {
        order: 1;
        padding: 16vw 0;
      }

      &.align-left .content {
        order: 1;
      }

      .media :global(img) {
        height: calc(50dvh - 14vw);
        border-top-right-radius: $s2;
        border-top-left-radius: $s2;
      }
    }
  }

  @media (max-width: $mobile) {
    .block-richtext {
      .media,
      .content {
        width: 100% !important;
      }

      .media {
        position: relative;
        top: 0;
      }

      .media :global(img) {
        height: calc(50dvh - 14vw);
        border-top-right-radius: $s2;
        border-top-left-radius: $s2;
      }
    }
  }
</style>
