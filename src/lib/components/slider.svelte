<script lang="ts">
  import useEmblaCarousel from 'embla-carousel-svelte'
  import type { EmblaOptionsType } from 'embla-carousel'
  import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
  import type { Snippet } from 'svelte'

  type Props = {
    options?: EmblaOptionsType
    children: Snippet
  }

  let {
    options,
    children
  }: Props = $props()
</script>

<div class="slider">
  <div class="viewport" use:useEmblaCarousel={{
    options: {
      ...options,
      breakpoints: {
        '(orientation: portrait)': {
          axis: options?.axis === 'y' ? 'x' : options?.axis === 'x' ? 'y' : undefined
        }
      }
    },
    plugins: [WheelGesturesPlugin()]
  }}>
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
    flex: 0 0 100%;
    min-width: 0;
    height: 100lvh;
    background: linear-gradient(to bottom right, white, black);
  }
</style>
