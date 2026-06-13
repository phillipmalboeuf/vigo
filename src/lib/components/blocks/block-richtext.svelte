<script lang="ts">
  import Image from '$lib/components/image.svelte'
  import type { ResolvedBlock } from '$lib/directus/pages'

  type Props = {
    block: Extract<ResolvedBlock, { type: 'block_richtext' }>
  }

  let { block }: Props = $props()
</script>

<section class="block block-richtext padded {block.background} align-{block.alignment}">
  <div class="flex flex--gapped">
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

    <div
      class="content padded--thick col col--mobile--12of12 flex flex--gapped flex--column"
      class:col--6of12={!!block.image}
      class:col--12of12={!block.image}
    >
      {#if block.tagline}
        <p class="tagline">{block.tagline}</p>
      {/if}

      {#if block.headline}
        <h1>{block.headline}</h1>
      {/if}

      {#if block.content}
        <div class="richtext flex flex--gapped flex--column">{@html block.content}</div>
      {/if}
    </div>
  </div>
</section>

<style lang="scss">
  .block-richtext {
    width: 100%;

    > div {
      width: 100%;
    }

    &.dark {
      color: $blanc;
      background: $noir;
    }

    &.beige {
      color: $noir;
      background: $beige;
    }

    &.align-center {
      .content {
        // margin-inline: auto;
        text-align: center;
      }
    }

    &.align-left {
      .content {
        order: -1;
        // margin-left: auto;
        // text-align: right;
      }
    }
  }

  h1 {
    display: none;
  }

  .tagline {
    font-size: $s-1;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: $s-2;
  }

  .richtext {
    // margin-top: $s1;
    max-width: 65ch;

    :global(a) {
      text-decoration: none;
      display: inline-block;
      background: $noir;
      color: $blanc;
      padding: 2px $s-2;
      border-radius: calc($radius * 2);
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
    top: $s0;

    @media (min-width: $tablet_portrait) {
      top: $s2;
    }

    @media (max-width: $tablet_portrait) {
      top: $s-2;
    }
  }

  .media :global(img) {
    width: 100%;
    height: calc(100lvh - ($s0 * 2));
    object-fit: cover;

    @media (min-width: $tablet_portrait) {
      height: calc(100lvh - ($s2 * 2));
    }

    @media (max-width: $tablet_portrait) {
      height: calc(100lvh - ($s-2 * 2));
    }
  }
</style>
