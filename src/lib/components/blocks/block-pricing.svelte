<script lang="ts">
  import BlockButton from './block-button.svelte'
  import type { ResolvedBlock } from '$lib/directus/pages'

  type Props = {
    block: Extract<ResolvedBlock, { type: 'block_pricing' }>
  }

  let { block }: Props = $props()
</script>

<section class="block block-pricing padded {block.background}">
  {#if block.tagline}
    <p class="tagline">{block.tagline}</p>
  {/if}

  {#if block.headline}
    <h2 class="h2">{block.headline}</h2>
  {/if}

  {#if block.cards.length}
    <ul class="cards flex flex--gapped">
      {#each block.cards as card (card.id)}
        <li
          class="col col--6of12 col--mobile--12of12 card"
          class:highlighted={card.isHighlighted}
        >
          {#if card.badge}
            <span class="badge">{card.badge}</span>
          {/if}

          {#if card.title}
            <h3 class="h3">{card.title}</h3>
          {/if}

          {#if card.price}
            <p class="price">{card.price}</p>
          {/if}

          {#if card.description}
            <p class="description">{card.description}</p>
          {/if}

          {#if card.features.length}
            <ul class="features">
              {#each card.features as feature}
                <li>{feature}</li>
              {/each}
            </ul>
          {/if}

          {#if card.button}
            <BlockButton button={card.button} />
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style lang="scss">
  .block-pricing {
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

  .cards {
    list-style: none;
    padding: 0;
    margin-top: $s1;
  }

  .card {
    padding: $s1;
    border-radius: $radius;
    background: $gris-pale;
    border: 2px solid transparent;

    &.highlighted {
      border-color: $accent;
    }
  }

  .badge {
    display: inline-block;
    font-size: $s-1;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: $s-2;
  }

  .price {
    font-size: $s2;
    font-family: $heading_font;
    margin: $s-2 0;
  }

  .description {
    margin-bottom: $s0;
  }

  .features {
    margin: $s0 0 $s1;
    padding-left: 1.2em;
  }
</style>
