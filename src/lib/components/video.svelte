<script lang="ts">
  type Props = {
    src: string
    title?: string | null
    width?: number | null
    height?: number | null
    loop?: boolean
    muted?: boolean
    playsinline?: boolean
  }

  let {
    src,
    title = null,
    width = null,
    height = null,
    loop = true,
    muted = true,
    playsinline = true
  }: Props = $props()

  let ready = $state(false)
  let video = $state<HTMLVideoElement | null>(null)

  $effect(() => {
    const el = video
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  })
</script>

<video
  bind:this={video}
  onloadeddata={() => ready = true}
  class:ready={ready}
  {src}
  {loop}
  {muted}
  {playsinline}
  controls={!playsinline}
  width={width ?? undefined}
  height={height ?? undefined}
  aria-label={title ?? undefined}
></video>

<style lang="scss">
  video {
    transition: opacity 666ms;

    &:not(.ready) {
      opacity: 0;
    }
  }
</style>
