<script lang="ts">
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

  const isVertical = $derived(width !== null && height !== null && height > width)

  function withTransformParam(url: string, targetSize: number, dimension: 'width' | 'height'): string {
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}${dimension}=${targetSize}&format=webp`
  }

  const sourceSet = $derived.by(() => {
    const maxSize = isVertical ? height : width
    const candidates = widths
      .filter((candidate) => candidate > 0 && (maxSize === null || candidate <= maxSize))
      .sort((a, b) => a - b)

    if (maxSize !== null && !candidates.includes(maxSize)) {
      candidates.push(maxSize)
    }

    const dimension = isVertical ? 'height' : 'width'
    const descriptor = isVertical ? 'h' : 'w'

    return candidates
      .map((candidate) => `${withTransformParam(src, candidate, dimension)} ${candidate}${descriptor}`)
      .join(', ')
  })
</script>

<img
  onload={() => ready = true}
  class:ready={ready}
  src={src}
  srcset={sourceSet || undefined}
  sizes={sourceSet ? sizes : undefined}
  {alt}
  {loading}
  {decoding}
  width={width ?? undefined}
  height={height ?? undefined}
/>

<style lang="scss">
  img {
    transition: opacity 666ms;
    
    &:not(.ready) {
      opacity: 0;
    }
  }
</style>