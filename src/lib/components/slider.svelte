<script lang="ts">
  import useEmblaCarousel from 'embla-carousel-svelte'
  import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
  import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
  import { onDestroy } from 'svelte'
  import type { Snippet } from 'svelte'
  import { browser } from '$app/environment';

  type Props = {
    options?: EmblaOptionsType
    children: Snippet
    emblaApi?: EmblaCarouselType | undefined
  }

  let {
    options,
    children,
    emblaApi = $bindable()
  }: Props = $props()

  function onEmblaInit(event: CustomEvent<EmblaCarouselType>) {
    emblaApi = event.detail
    browser && window.addEventListener('keydown', onKeydown)
  }

  onDestroy(() => {
    browser && window.removeEventListener('keydown', onKeydown)
    emblaApi?.destroy()
  })

  function scrollAxis(): 'x' | 'y' {
    return emblaApi?.internalEngine().options.axis ?? options?.axis ?? 'x'
  }

  function onKeydown(event: KeyboardEvent) {
    if (!emblaApi) return

    const axis = scrollAxis()
    const prevKey = axis === 'y' ? 'ArrowUp' : 'ArrowLeft'
    const nextKey = axis === 'y' ? 'ArrowDown' : 'ArrowRight'

    if (event.key === prevKey) {
      emblaApi.scrollPrev()
      event.preventDefault()
      // event.stopPropagation()
    } else if (event.key === nextKey) {
      emblaApi.scrollNext()
      event.preventDefault()
      // event.stopPropagation()
    }
  }
</script>

<div class="slider">
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div
    class="viewport"
    aria-roledescription="carousel"
    tabindex="0"
    onemblaInit={onEmblaInit}
    use:useEmblaCarousel={{
      options: {
        ...options,
        breakpoints: {
          '(orientation: portrait)': {
            axis: options?.axis === 'y' ? 'x' : options?.axis === 'x' ? 'y' : undefined
          }
        }
      },
      plugins: [WheelGesturesPlugin({
        forceWheelAxis: options?.axis === 'y' ? 'y' : options?.axis === 'x' ? 'x' : undefined
      })]
    }}
  >
    <div class="container" class:vertical={options?.axis === 'y'} class:horizontal={options?.axis === 'x'}>
      {@render children()}
    </div>
  </div>

  <!-- <button class="embla__prev">Scroll to prev</button>
  <button class="embla__next">Scroll to next</button> -->
</div>

<style lang="scss">
  .viewport {
    overflow: hidden;
    width: 100vw;
    outline: none;

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  }

  .container {
    display: flex;
    // touch-action: pan-y pinch-zoom;

    &.horizontal {
      @media (orientation: portrait) {
        height: 100lvh;
        flex-direction: column;
      }
    }

    &.vertical {
      height: 100lvh;
      flex-direction: column;
      // touch-action: pan-x pinch-zoom;

      @media (orientation: portrait) {
        height: auto;
        flex-direction: row;
      }
    }
  }

  .container :global(.slide) {
    flex: 0 0 auto;
    min-width: 0;
    height: 100lvh;
    background: $noir;
    // background: linear-gradient(to bottom right, white, black);

    @media (orientation: portrait) {
      height: auto;
      width: 100vw;
    }
  }
</style>
