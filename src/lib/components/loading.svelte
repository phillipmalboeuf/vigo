<script lang="ts">
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition';

  let ready = $state(false)
  let step = $state(0)
  let top = $state(false)
  let loaded = $state(false)

  onMount(() => {
    ready = true

    const interval = setInterval(() => {
      step = (step + 1) % 8
      top = step >= 4
    }, 666)

    setTimeout(() => {
      clearInterval(interval)
      loaded = true
    }, 666 * 8)
  })
</script>

{#if !loaded}
<aside transition:fade={{ duration: 1332 }}>
  {#if ready}
  <div class="flex flex--gapped flex--middle flex--column" transition:fade={{ duration: 1332 }}>
    <span class:active={top}>Swipe images</span>
    <svg width="115" height="74" viewBox="0 0 115 74" fill="none" xmlns="http://www.w3.org/2000/svg">

    <g id="bottom" class:active={step === 5 || step === 7}>
      <path d="M49.2495 56.1074L57.0345 63.8944L64.8194 56.1074" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <path d="M57.0347 63.8945V50.2031" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>    
      <path d="M41.5493 44.559V69.5391C41.5493 71.1959 42.8925 72.5391 44.5493 72.5391H69.5214C71.1783 72.5391 72.5214 71.1959 72.5214 69.5391V44.559C72.5214 42.9022 71.1783 41.559 69.5214 41.559H44.5493C42.8925 41.559 41.5493 42.9022 41.5493 44.559Z" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <g id="top" class:active={step === 4 || step === 6}>
      <path d="M64.8194 17.5565L57.0345 9.76953L49.2495 17.5565" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <path d="M57.0347 9.76953V23.4609" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <path d="M72.519 29.105V4.125C72.519 2.46815 71.1759 1.125 69.519 1.125L44.5469 1.125C42.8901 1.125 41.5469 2.46815 41.5469 4.125V29.105C41.5469 30.7619 42.8901 32.105 44.5469 32.105H69.519C71.1759 32.105 72.519 30.7619 72.519 29.105Z" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <g id="left" class:active={step === 0 || step === 2}>
      <path d="M17.556 48.8519L9.76904 56.6369L17.556 64.4219" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <path d="M9.76904 56.6367L23.4604 56.6367" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <path d="M29.105 41.1523L4.125 41.1523C2.46815 41.1523 1.125 42.4955 1.125 44.1523L1.125 69.1244C1.125 70.7813 2.46815 72.1244 4.125 72.1244L29.105 72.1244C30.7619 72.1244 32.105 70.7813 32.105 69.1244L32.105 44.1523C32.105 42.4955 30.7619 41.1523 29.105 41.1523Z" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    
    <g id="right" class:active={step === 1 || step === 3}>
      <path d="M96.694 64.3981L104.481 56.6131L96.694 48.8281" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <path d="M104.481 56.6133L90.7896 56.6133" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <path d="M85.145 72.0977L110.125 72.0977C111.782 72.0977 113.125 70.7545 113.125 69.0977L113.125 44.1256C113.125 42.4687 111.782 41.1256 110.125 41.1256L85.145 41.1256C83.4881 41.1256 82.145 42.4687 82.145 44.1256L82.145 69.0977C82.145 70.7545 83.4881 72.0977 85.145 72.0977Z" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    </svg>
    <span class:active={!top}>Swipe projects</span>
  </div>
  {/if}
</aside>
{/if}

<style lang="scss">
  aside {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: white;

    display: flex;
    align-items: center;

    span,
    g {
      transition: color 333ms;
      
      &:not(.active) {
        color: $gris;
      }
    }
  }
</style>