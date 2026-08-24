<script lang="ts">
  const LONG_VIDEO_SECONDS = 8
  const CONTROLS_IDLE_MS = 2500

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
  let isLong = $state(false)
  let inView = $state(false)
  let playing = $state(false)
  let isMuted = $state(true)
  let progress = $state(0)
  let duration = $state(0)
  let scrubbing = $state(false)
  let controlsVisible = $state(true)
  let hideControlsTimer: ReturnType<typeof setTimeout> | null = null

  $effect(() => {
    if (!isLong) isMuted = muted
  })

  $effect(() => {
    const el = video
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (entry.isIntersecting) {
          el.play().catch(() => {})
          revealControls()
        } else {
          el.pause()
          clearHideControlsTimer()
          controlsVisible = false
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      clearHideControlsTimer()
    }
  })

  $effect(() => {
    if (!isLong || !inView) return

    if (scrubbing || !playing) {
      clearHideControlsTimer()
      controlsVisible = true
      return
    }

    scheduleHideControls()
  })

  function clearHideControlsTimer() {
    if (hideControlsTimer === null) return
    clearTimeout(hideControlsTimer)
    hideControlsTimer = null
  }

  function scheduleHideControls() {
    clearHideControlsTimer()
    if (scrubbing || !playing) return

    hideControlsTimer = setTimeout(() => {
      if (!scrubbing && playing) controlsVisible = false
    }, CONTROLS_IDLE_MS)
  }

  function revealControls() {
    controlsVisible = true
    scheduleHideControls()
  }

  function onLoadedMetadata() {
    const el = video
    if (!el) return

    duration = el.duration
    const long = Number.isFinite(el.duration) && el.duration >= LONG_VIDEO_SECONDS
    isLong = long

    if (long) {
      el.loop = false
    }
  }

  function onTimeUpdate() {
    const el = video
    if (!el || scrubbing || !el.duration) return
    progress = el.currentTime / el.duration
  }

  function togglePlay() {
    const el = video
    if (!el) return

    if (el.paused) {
      el.play().catch(() => {})
    } else {
      el.pause()
    }
    revealControls()
  }

  function toggleMute() {
    const el = video
    if (!el) return

    el.muted = !el.muted
    isMuted = el.muted
    revealControls()
  }

  function seekFromEvent(event: PointerEvent, track: HTMLElement) {
    const el = video
    if (!el || !el.duration) return

    const rect = track.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
    el.currentTime = ratio * el.duration
    progress = ratio
  }

  function onTrackPointerDown(event: PointerEvent) {
    const track = event.currentTarget as HTMLElement
    scrubbing = true
    controlsVisible = true
    clearHideControlsTimer()
    track.setPointerCapture(event.pointerId)
    seekFromEvent(event, track)
  }

  function onTrackPointerMove(event: PointerEvent) {
    if (!scrubbing) return
    seekFromEvent(event, event.currentTarget as HTMLElement)
  }

  function onTrackPointerUp(event: PointerEvent) {
    if (!scrubbing) return
    scrubbing = false
    const track = event.currentTarget as HTMLElement
    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId)
    }
    revealControls()
  }

  const shouldMute = $derived(isLong ? isMuted : muted)
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="video"
  class:long={isLong}
  class:ready={ready}
  onpointermove={isLong ? revealControls : undefined}
  onpointerdown={isLong ? revealControls : undefined}
>
  <video
    bind:this={video}
    onloadeddata={() => ready = true}
    onloadedmetadata={onLoadedMetadata}
    ontimeupdate={onTimeUpdate}
    onplay={() => playing = true}
    onpause={() => playing = false}
    {src}
    loop={true}
    muted={shouldMute}
    {playsinline}
    controls={!playsinline}
    width={width ?? undefined}
    height={height ?? undefined}
    aria-label={title ?? undefined}
  ></video>

  {#if isLong && inView}
    <div
      class="controls"
      class:visible={controlsVisible}
      role="group"
      aria-label="Video controls"
    >
      <button type="button" class="control-btn" aria-label={playing ? 'Pause' : 'Play'} onclick={togglePlay}>
        {#if playing}
          <svg width="20" height="23" viewBox="67.9854 552.852 19.6745 22.781" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M71.5987 575.633C69.6027 575.633 67.9854 574.016 67.9854 572.02V556.465C67.9854 554.469 69.6027 552.852 71.5987 552.852C73.5947 552.852 75.212 554.469 75.212 556.465V572.02C75.212 574.016 73.5947 575.633 71.5987 575.633Z" fill="currentColor"/>
            <path d="M84.0359 575.633C82.0345 575.633 80.4119 574.011 80.4119 572.009V556.476C80.4119 554.475 82.0345 552.852 84.0359 552.852C86.0372 552.852 87.6599 554.475 87.6599 556.476V572.009C87.6599 574.011 86.0372 575.633 84.0359 575.633Z" fill="currentColor"/>
          </svg>
        {:else}
          <svg width="20" height="23" viewBox="64.8791 475.189 27.9586 33.136" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M64.8791 478.424V505.091C64.8791 506.877 66.3271 508.325 68.1137 508.325C68.7071 508.325 69.2897 508.163 69.7964 507.853L91.2844 494.773C92.2497 494.187 92.8377 493.139 92.8377 492.011V491.504C92.8377 490.375 92.2497 489.328 91.2844 488.741L69.7964 475.661C69.2897 475.352 68.7071 475.189 68.1137 475.189C66.3271 475.189 64.8791 476.637 64.8791 478.424Z" fill="currentColor"/>
          </svg>
        {/if}
      </button>

      <div
        class="timeline"
        role="slider"
        tabindex="0"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={Math.round(duration) || 0}
        aria-valuenow={Math.round(progress * duration) || 0}
        onpointerdown={onTrackPointerDown}
        onpointermove={onTrackPointerMove}
        onpointerup={onTrackPointerUp}
        onpointercancel={onTrackPointerUp}
      >
        <svg class="timeline-track" viewBox="108.371 489.757 593.344 3.682" preserveAspectRatio="none" aria-hidden="true">
          <path d="M108.371 493.439H701.715V489.757H108.371V493.439Z" fill="currentColor"/>
        </svg>
        <svg
          class="timeline-pill"
          style="left: {progress * 100}%"
          width="7.248"
          height="22.781"
          viewBox="209.85 552.852 7.248 22.781"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M213.474 575.633C211.473 575.633 209.85 574.011 209.85 572.009V556.476C209.85 554.475 211.473 552.852 213.474 552.852C215.475 552.852 217.098 554.475 217.098 556.476V572.009C217.098 574.011 215.475 575.633 213.474 575.633Z" fill="currentColor"/>
        </svg>
      </div>

      <button type="button" class="control-btn" aria-label={isMuted ? 'Unmute' : 'Mute'} onclick={toggleMute}>
        <svg width="35" height="33" viewBox="717.248 475.189 35.206 33.136" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M735.886 478.632V504.882C735.886 506.784 734.345 508.325 732.444 508.325C731.353 508.325 730.326 507.808 729.677 506.93L724.578 500.041H720.69C718.789 500.041 717.248 498.5 717.248 496.598V486.916C717.248 485.014 718.789 483.473 720.69 483.473H724.496L729.676 476.566C730.326 475.7 731.346 475.189 732.43 475.189H732.444C734.345 475.189 735.886 476.73 735.886 478.632Z" fill="currentColor"/>
          {#if !isMuted}
            <path d="M738.993 482.565V487.137C740.477 488.137 741.453 489.833 741.453 491.757C741.453 493.681 740.477 495.377 738.993 496.376V500.949C742.829 499.652 745.595 496.031 745.595 491.757C745.595 487.483 742.829 483.861 738.993 482.565Z" fill="currentColor"/>
            <path d="M738.993 475.484V479.723C744.353 481.102 748.313 485.967 748.313 491.758C748.313 497.547 744.353 502.412 738.993 503.792V508.03C746.658 506.576 752.454 499.846 752.454 491.758C752.454 483.67 746.658 476.939 738.993 475.484Z" fill="currentColor"/>
          {/if}
        </svg>
      </button>
    </div>
  {/if}
</div>

<style lang="scss">
  .video {
    position: relative;
    width: 100%;
    height: 100%;
    transition: opacity 666ms;

    &:not(.ready) {
      opacity: 0;
    }
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  .controls {
    position: absolute;
    z-index: 11;
    left: max($s2, env(safe-area-inset-left, 0px));
    right: calc(#{$s2} + env(safe-area-inset-right, 0px));
    bottom: max($s2, env(safe-area-inset-bottom, 0px));
    display: flex;
    align-items: center;
    gap: $s0;
    color: #ffffff;
    opacity: 0;
    pointer-events: none;
    transition: opacity 333ms ease;

    &.visible {
      opacity: 1;
      pointer-events: auto;
    }

    @media (max-width: $tablet_portrait) {
      left: max($s0, env(safe-area-inset-left, 0px));
      right: max($s0, env(safe-area-inset-right, 0px));
      bottom: calc(#{$s0} + env(safe-area-inset-bottom, 0px));
    }
  }

  .control-btn {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    min-height: 33px;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    line-height: 0;

    &:focus-visible {
      outline: 2px solid #ffffff;
      outline-offset: 2px;
    }

    svg {
      display: block;
    }
  }

  .timeline {
    position: relative;
    flex: 1 1 auto;
    min-width: 0;
    height: 22px;
    display: flex;
    align-items: center;
    cursor: pointer;
    touch-action: none;

    &:focus-visible {
      outline: 2px solid #ffffff;
      outline-offset: 2px;
    }
  }

  .timeline-track {
    display: block;
    width: 100%;
    height: 4px;
    color: inherit;
  }

  .timeline-pill {
    position: absolute;
    top: 50%;
    display: block;
    pointer-events: none;
    transform: translate(-50%, -50%);
  }
</style>
