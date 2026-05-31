<script lang="ts">
  import Slider from '$lib/components/slider.svelte'
  import Logo from '$lib/components/logo.svelte'
  import Image from '$lib/components/image.svelte'
  import Loading from '$lib/components/loading.svelte'

  import type { PageProps } from './$types';
  import { browser } from '$app/environment';
  import { onDestroy, onMount } from 'svelte';
  
  let { data }: PageProps = $props();

  let left = $state(false)
  let right = $state(false)
  let top = $state(false)
  let bottom = $state(false)

  onMount(() => {
    browser && window.addEventListener('keydown', onKeydown)
    browser && window.addEventListener('keyup', onKeyup)
  })

  onDestroy(() => {
    browser && window.removeEventListener('keydown', onKeydown)
    browser && window.removeEventListener('keyup', onKeyup)
  })

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') { left = true }
    if (event.key === 'ArrowRight') { right = true }
    if (event.key === 'ArrowUp') { top = true }
    if (event.key === 'ArrowDown') { bottom = true }
  }

  function onKeyup(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') { left = false }
    if (event.key === 'ArrowRight') { right = false }
    if (event.key === 'ArrowUp') { top = false }
    if (event.key === 'ArrowDown') { bottom = false }
  }
</script>

<Loading />

<!-- <Slider options={{
  loop: true,
  axis: 'y',
  align: 'center',
  dragFree: false,
  skipSnaps: true
}}>
  <div class="slide">Slide 1</div>
  <div class="slide">Slide 2</div>
  <div class="slide">Slide 3</div>
  <div class="slide">Slide 4</div>
  <div class="slide">Slide 5</div>
  <div class="slide">Slide 6</div>
</Slider> -->
<Slider options={{
  loop: true,
  axis: 'y',
  align: 'start',
  dragFree: false,
  skipSnaps: true
}}>
{#each data.galleries as gallery}
    <Slider options={{
      loop: true,
      axis: 'x',
      align: 'center',
      dragFree: true,
      skipSnaps: true
    }}>
    {#each gallery.images as image}
      <div class="slide">
        <Image src={image.src} alt={image.title ?? ''} width={image.width} height={image.height} />
      </div>
    {/each}
    {#each gallery.images as image}
      <div class="slide">
        <Image src={image.src} alt={image.title ?? ''} width={image.width} height={image.height} />
      </div>
    {/each}
    {#each gallery.images as image}
      <div class="slide">
        <Image src={image.src} alt={image.title ?? ''} width={image.width} height={image.height} />
      </div>
    {/each}
    </Slider>
  {/each}
  
</Slider>

<figure class="logo">
  <Logo />

  <svg width="115" height="74" viewBox="0 0 115 74" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="bottom" class:down={bottom}>
      <path d="M49.2495 56.1074L57.0345 63.8944L64.8194 56.1074" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <path d="M57.0347 63.8945V50.2031" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>    
      <path d="M41.5493 44.559V69.5391C41.5493 71.1959 42.8925 72.5391 44.5493 72.5391H69.5214C71.1783 72.5391 72.5214 71.1959 72.5214 69.5391V44.559C72.5214 42.9022 71.1783 41.559 69.5214 41.559H44.5493C42.8925 41.559 41.5493 42.9022 41.5493 44.559Z" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <g id="top" class:down={top}>
      <path d="M64.8194 17.5565L57.0345 9.76953L49.2495 17.5565" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <path d="M57.0347 9.76953V23.4609" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <path d="M72.519 29.105V4.125C72.519 2.46815 71.1759 1.125 69.519 1.125L44.5469 1.125C42.8901 1.125 41.5469 2.46815 41.5469 4.125V29.105C41.5469 30.7619 42.8901 32.105 44.5469 32.105H69.519C71.1759 32.105 72.519 30.7619 72.519 29.105Z" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <g id="left" class:down={left}>
      <path d="M17.556 48.8519L9.76904 56.6369L17.556 64.4219" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <path d="M9.76904 56.6367L23.4604 56.6367" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <path d="M29.105 41.1523L4.125 41.1523C2.46815 41.1523 1.125 42.4955 1.125 44.1523L1.125 69.1244C1.125 70.7813 2.46815 72.1244 4.125 72.1244L29.105 72.1244C30.7619 72.1244 32.105 70.7813 32.105 69.1244L32.105 44.1523C32.105 42.4955 30.7619 41.1523 29.105 41.1523Z" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    
    <g id="right" class:down={right}>
      <path d="M96.694 64.3981L104.481 56.6131L96.694 48.8281" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <path d="M104.481 56.6133L90.7896 56.6133" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <path d="M85.145 72.0977L110.125 72.0977C111.782 72.0977 113.125 70.7545 113.125 69.0977L113.125 44.1256C113.125 42.4687 111.782 41.1256 110.125 41.1256L85.145 41.1256C83.4881 41.1256 82.145 42.4687 82.145 44.1256L82.145 69.0977C82.145 70.7545 83.4881 72.0977 85.145 72.0977Z" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    </svg>
</figure>

<style lang="scss">
  .logo {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      position: absolute;
      bottom: $s2;
      right: $s2;
      color: $blanc;
      overflow: visible;

      g {
        transition: transform 333ms;
        // transform-origin: 50% 50%;

        &.down {
          transform: translateY(0.2rem);
        }
      }
    }
  }

  .slide :global(img) {
    width: auto;
    max-width: 100vw;
    height: 100%;
    object-fit: cover;
  }
</style>