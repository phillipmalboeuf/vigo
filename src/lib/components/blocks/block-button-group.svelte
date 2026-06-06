<script lang="ts">
  import BlockButton from './block-button.svelte'
  import type { ResolvedButton } from '$lib/directus/pages'

  type Props = {
    buttons: ResolvedButton[]
  }

  let { buttons }: Props = $props()
</script>

{#if buttons.length}
  <div class="button-group flex flex--gapped">
    {#each buttons as button (button.id)}
      <BlockButton {button} />
    {/each}
  </div>
{/if}

<style lang="scss">
  .button-group {
    margin-top: $s1;
  }
</style>
