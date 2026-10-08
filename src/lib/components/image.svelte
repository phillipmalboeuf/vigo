<script lang="ts">
  import { dev } from '$app/environment'

  type Props = {
    src: string
    alt: string
    width?: number | null
    height?: number | null
    loading?: 'eager' | 'lazy'
    decoding?: 'auto' | 'async' | 'sync'
    sizes?: string
    widths?: number[]
  }

  let {
    src,
    alt,
    width = null,
    height = null,
    loading = 'lazy',
    decoding = 'async',
    sizes = '100vw',
    widths = [480, 768, 1024, 1440, 1920]
  }: Props = $props()

  let ready = $state(false)

  function withTransform(url: string, targetWidth: number): string {
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}width=${targetWidth}&format=webp&quality=50&fit=inside&withoutEnlargement=true`
  }

  const candidates = $derived(
    widths
      .filter((candidate) => candidate > 0 && (width === null || candidate <= width))
      .sort((a, b) => a - b)
  )

  const sourceSet = $derived(
    candidates.map((candidate) => `${withTransform(src, candidate)} ${candidate}w`).join(', ')
  )

  const fallbackSrc = $derived.by(() => {
    if (candidates.length === 0) return src
    const preferred = candidates.find((candidate) => candidate >= 1024) ?? candidates.at(-1)
    return preferred ? withTransform(src, preferred) : src
  })
</script>

<img
  onload={() => ready = true}
  oncontextmenu={dev ? undefined : (event) => event.preventDefault()}
  class:ready={ready}
  sizes={sourceSet ? sizes : undefined}
  srcset={sourceSet || undefined}
  src={fallbackSrc}
  {alt}
  {loading}
  {decoding}
  width={width ?? undefined}
  height={height ?? undefined}
/>

<style lang="scss">
  img {
    transition: opacity 666ms;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;

    &:not(.ready) {
      opacity: 0;
    }
  }
</style>
