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

  function withWidthParam(url: string, targetWidth: number): string {
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}width=${targetWidth}`
  }

  const sourceSet = $derived.by(() => {
    const candidates = widths
      .filter((candidate) => candidate > 0 && (width === null || candidate <= width))
      .sort((a, b) => a - b)

    if (width !== null && !candidates.includes(width)) {
      candidates.push(width)
    }

    return candidates.map((candidate) => `${withWidthParam(src, candidate)} ${candidate}w`).join(', ')
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