<script lang="ts">
  import Slider from '$lib/components/slider.svelte'
  import Logo from '$lib/components/logo.svelte'
  import Image from '$lib/components/image.svelte'
  import Loading from '$lib/components/loading.svelte'

  import type { PageProps } from './$types';
  import { browser } from '$app/environment';
  import { onDestroy, onMount } from 'svelte';
  import { pageLink } from '$lib/actions/page-dialog';
  
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

<!-- <Loading /> -->

<header class="padded flex flex--gapped flex--middle flex--end">
  <a href="/about" title="About" use:pageLink>
    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5 0C7.40174 0 0 7.40174 0 16.5C0 25.5983 7.40174 33 16.5 33C25.5983 33 33 25.5983 33 16.5C33 7.40174 25.5983 0 16.5 0ZM16.5 30.7241C8.65672 30.7241 2.27586 24.3433 2.27586 16.5C2.27586 8.65672 8.65672 2.27586 16.5 2.27586C24.3433 2.27586 30.7241 8.65672 30.7241 16.5C30.7241 24.3433 24.3433 30.7241 16.5 30.7241Z" fill="white"/>
    <path d="M18.0173 13.9567C18.0173 13.1188 17.338 12.4395 16.5001 12.4395H11.3794V15.4739H14.9828V22.6808H11.3794V25.7153H21.6208V22.6808H18.0173V13.9567Z" fill="white"/>
    <path d="M14.3986 8.85523C14.4553 8.99191 14.5275 9.12452 14.6071 9.24602C14.6905 9.37122 14.7853 9.48865 14.8916 9.59125C15.3128 10.0158 15.9006 10.2588 16.5 10.2588C16.6478 10.2588 16.7996 10.2436 16.9437 10.2132C17.0915 10.1865 17.2319 10.141 17.3723 10.0843C17.509 10.0272 17.6416 9.95908 17.7631 9.87574C17.8883 9.79203 18.0057 9.6972 18.1083 9.59126C18.2143 9.48865 18.3091 9.37123 18.3928 9.24602C18.4725 9.12453 18.5443 8.99192 18.6014 8.85523C18.658 8.71484 18.7036 8.57445 18.7303 8.42666C18.7607 8.28256 18.7758 8.13069 18.7758 7.98289C18.7758 7.83473 18.7607 7.68693 18.7303 7.53913C18.7036 7.39096 18.658 7.25057 18.6014 7.11056C18.5443 6.97387 18.4725 6.84126 18.3928 6.71976C18.3091 6.59456 18.2143 6.47714 18.1083 6.37453C17.6872 5.94966 17.0993 5.70703 16.5 5.70703C15.9006 5.70703 15.3128 5.94966 14.8916 6.37453C14.7853 6.47714 14.6905 6.59456 14.6071 6.71976C14.5275 6.84126 14.4553 6.97387 14.3986 7.11056C14.3415 7.25057 14.296 7.39096 14.2697 7.53913C14.2393 7.68693 14.2241 7.83473 14.2241 7.98289C14.2241 8.13069 14.2393 8.28256 14.2697 8.42666C14.296 8.57445 14.3415 8.71484 14.3986 8.85523Z" fill="white"/>
    </svg>
  </a>
  <a href="/blog" title="Gallery" use:pageLink>
    <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 0H0V6.49958H7V0Z" fill="white"/>
    <path d="M17.5 0H10.5V6.49958H17.5V0Z" fill="white"/>
    <path d="M28 0H21V6.49958H28V0Z" fill="white"/>
    <path d="M7 9.73047H0V16.23H7V9.73047Z" fill="white"/>
    <path d="M17.5 9.73047H10.5V16.23H17.5V9.73047Z" fill="white"/>
    <path d="M28 9.73047H21V16.23H28V9.73047Z" fill="white"/>
    <path d="M7 19.5H0V25.9996H7V19.5Z" fill="white"/>
    <path d="M17.5 19.5H10.5V25.9996H17.5V19.5Z" fill="white"/>
    <path d="M28 19.5H21V25.9996H28V19.5Z" fill="white"/>
    </svg>
  </a>
</header>

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
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
  }

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
    
    color: $blanc;

    svg {
      position: absolute;
      bottom: $s2;
      right: $s2;
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