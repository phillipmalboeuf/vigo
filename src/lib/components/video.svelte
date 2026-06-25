<script lang="ts">
  type Props = {
    src: string
    title?: string | null
    width?: number | null
    height?: number | null
    autoplay?: boolean
    loop?: boolean
    muted?: boolean
    playsinline?: boolean
  }

  let {
    src,
    title = null,
    width = null,
    height = null,
    autoplay = false,
    loop = true,
    muted = true,
    playsinline = true
  }: Props = $props()

  let ready = $state(false)
</script>

<video
  onloadeddata={() => ready = true}
  class:ready={ready}
  {src}
  {autoplay}
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
