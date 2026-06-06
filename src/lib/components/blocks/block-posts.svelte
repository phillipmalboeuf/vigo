<script lang="ts">
  import Image from '$lib/components/image.svelte'
  import type { ResolvedBlock } from '$lib/directus/pages'

  type Props = {
    block: Extract<ResolvedBlock, { type: 'block_posts' }>
  }

  let { block }: Props = $props()
</script>

<section class="block block-posts padded {block.background}">
  {#if block.tagline}
    <p class="tagline">{block.tagline}</p>
  {/if}

  {#if block.headline}
    <h2 class="h2">{block.headline}</h2>
  {/if}

  {#if block.posts.length}
    <ul class="posts flex flex--gapped">
      {#each block.posts as post (post.id)}
        <li class="col col--4of12 col--tablet--6of12 col--mobile--12of12">
          <a class="card" href={post.href}>
            {#if post.image}
              <Image
                src={post.image.src}
                alt={post.image.alt}
                width={post.image.width}
                height={post.image.height}
              />
            {/if}

            <div class="card-body">
              <h3 class="h4">{post.title}</h3>
              {#if post.description}
                <p>{post.description}</p>
              {/if}
            </div>
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="empty">No posts yet.</p>
  {/if}
</section>

<style lang="scss">
  .block-posts {
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

  .posts {
    list-style: none;
    padding: 0;
    margin-top: $s1;
  }

  .card {
    display: block;
    height: 100%;
    border-radius: $radius;
    overflow: hidden;
    background: $gris-pale;
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }

  .card :global(img) {
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  .card-body {
    padding: $s0;
  }

  .empty {
    margin-top: $s1;
    opacity: 0.6;
  }
</style>
