<script lang="ts">
  import type { ResolvedButton } from '$lib/directus/pages'

  type Props = {
    button: ResolvedButton
  }

  let { button }: Props = $props()

  const variantClass = $derived.by(() => {
    switch (button.variant) {
      case 'outline':
        return 'button--underline'
      case 'ghost':
        return 'button--muted'
      case 'link':
        return 'button--none'
      default:
        return 'button--accent'
    }
  })
</script>

<a class="button {variantClass}" href={button.href}>{button.label}</a>
