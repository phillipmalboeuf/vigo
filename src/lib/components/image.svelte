<script lang="ts">
  import { dev } from '$app/environment'
  import { decode } from 'blurhash'

  type Props = {
    src: string
    alt: string
    width?: number | null
    height?: number | null
    loading?: 'eager' | 'lazy'
    decoding?: 'auto' | 'async' | 'sync'
    sizes?: string
    widths?: number[]
    blurhash?: string | null
  }

  const PLACEHOLDER_WIDTH = 32

  let {
    src,
    alt,
    width = null,
    height = null,
    loading = 'lazy',
    decoding = 'async',
    sizes = '100vw',
    widths = [480, 768, 1024, 1440, 1920],
    blurhash = null
  }: Props = $props()

  let ready = $state(false)
  let canvas = $state<HTMLCanvasElement | null>(null)

  function withTransform(url: string, targetWidth: number): string {
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}width=${targetWidth}&format=webp&fit=inside&withoutEnlargement=true`
  }

  function placeholderSize(imageWidth: number | null, imageHeight: number | null) {
    if (!imageWidth || !imageHeight || imageWidth < 1 || imageHeight < 1) {
      return { width: PLACEHOLDER_WIDTH, height: PLACEHOLDER_WIDTH }
    }

    return {
      width: PLACEHOLDER_WIDTH,
      height: Math.max(1, Math.round((PLACEHOLDER_WIDTH * imageHeight) / imageWidth))
    }
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

  const aspectRatio = $derived(
    width && height && width > 0 && height > 0 ? `${width} / ${height}` : undefined
  )

  $effect(() => {
    const node = canvas
    const hash = blurhash
    if (!node || !hash) return

    const size = placeholderSize(width, height)
    node.width = size.width
    node.height = size.height

    try {
      const pixels = decode(hash, size.width, size.height)
      const context = node.getContext('2d')
      if (!context) return
      const imageData = context.createImageData(size.width, size.height)
      imageData.data.set(pixels)
      context.putImageData(imageData, 0, 0)
    } catch {
      // An invalid hash leaves the canvas empty until the photo loads.
    }
  })
</script>

<span class="image-frame" style:--image-ratio={aspectRatio}>
  {#if blurhash}
    <canvas bind:this={canvas} class="placeholder" aria-hidden="true"></canvas>
  {/if}
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
</span>

<style lang="scss">
  .image-frame {
    display: block;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    aspect-ratio: var(--image-ratio);
  }

  .placeholder {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  img {
    position: relative;
    z-index: 1;
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: opacity 666ms;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;

    &:not(.ready) {
      opacity: 0;
    }
  }
</style>
