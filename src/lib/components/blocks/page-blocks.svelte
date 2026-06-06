<script lang="ts">
  import BlockHero from './block-hero.svelte'
  import BlockRichtext from './block-richtext.svelte'
  import BlockGallery from './block-gallery.svelte'
  import BlockForm from './block-form.svelte'
  import BlockPosts from './block-posts.svelte'
  import BlockPricing from './block-pricing.svelte'
  import type { ResolvedBlock } from '$lib/directus/pages'

  type Props = {
    blocks: ResolvedBlock[]
  }

  let { blocks }: Props = $props()
</script>

<div class="flex flex--gapped">
{#each blocks as block (block.id)}
  {#if block.type === 'block_hero'}
    <BlockHero {block} />
  {:else if block.type === 'block_richtext'}
    <BlockRichtext {block} />
  {:else if block.type === 'block_gallery'}
    <BlockGallery {block} />
  {:else if block.type === 'block_form'}
    <BlockForm {block} />
  {:else if block.type === 'block_posts'}
    <BlockPosts {block} />
  {:else if block.type === 'block_pricing'}
    <BlockPricing {block} />
  {/if}
{/each}
</div>
