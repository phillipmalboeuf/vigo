<script lang="ts">
  import Slider from '$lib/components/slider.svelte'
  import Logo from '$lib/components/logo.svelte'
  import type { PageProps } from './$types';
  
  let { data }: PageProps = $props();
</script>

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
        <img src={image.src} alt={image.title} />
      </div>
    {/each}
    {#each gallery.images as image}
      <div class="slide">
        <img src={image.src} alt={image.title} />
      </div>
    {/each}
    {#each gallery.images as image}
      <div class="slide">
        <img src={image.src} alt={image.title} />
      </div>
    {/each}
    </Slider>
  {/each}
  
</Slider>

<figure class="logo">
  <Logo />
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
  }

  img {
    width: auto;
    height: 100%;
    object-fit: cover;
  }
</style>