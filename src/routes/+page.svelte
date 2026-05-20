<script lang="ts">
  import Slider from '$lib/components/slider.svelte'
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
  <Slider options={{
    loop: true,
    axis: 'x',
    align: 'center',
    dragFree: true,
    skipSnaps: true
  }}>
    <div class="slide">Slide 1.1</div>
    <div class="slide">Slide 1.2</div>
    <div class="slide">Slide 1.3</div>
    <div class="slide">Slide 1.4</div>
    <div class="slide">Slide 1.5</div>
    <div class="slide">Slide 1.6</div>
  </Slider>
  <Slider options={{
    loop: true,
    axis: 'x',
    align: 'center',
    dragFree: true,
    skipSnaps: true
  }}>
    <div class="slide">Slide 2.1</div>
    <div class="slide">Slide 2.2</div>
    <div class="slide">Slide 2.3</div>
    <div class="slide">Slide 2.4</div>
    <div class="slide">Slide 2.5</div>
    <div class="slide">Slide 2.6</div>
  </Slider>
  <Slider options={{
    loop: true,
    axis: 'x',
    align: 'center',
    dragFree: true,
    skipSnaps: true
  }}>
    <div class="slide">Slide 3.1</div>
    <div class="slide">Slide 3.2</div>
    <div class="slide">Slide 3.3</div>
    <div class="slide">Slide 3.4</div>
    <div class="slide">Slide 3.5</div>
    <div class="slide">Slide 3.6</div>
  </Slider>
  <Slider options={{
    loop: true,
    axis: 'x',
    align: 'center',
    dragFree: true,
    skipSnaps: true
  }}>
    <div class="slide">Slide 4.1</div>
    <div class="slide">Slide 4.2</div>
    <div class="slide">Slide 4.3</div>
    <div class="slide">Slide 4.4</div>
    <div class="slide">Slide 4.5</div>
    <div class="slide">Slide 4.6</div>
  </Slider>
  <Slider options={{
    loop: true,
    axis: 'x',
    align: 'center',
    dragFree: true,
    skipSnaps: true
  }}>
    <div class="slide">Slide 5.1</div>
    <div class="slide">Slide 5.2</div>
    <div class="slide">Slide 5.3</div>
    <div class="slide">Slide 5.4</div>
    <div class="slide">Slide 5.5</div>
    <div class="slide">Slide 5.6</div>
  </Slider>
  <Slider options={{
    loop: true,
    axis: 'x',
    align: 'center',
    dragFree: true,
    skipSnaps: true
  }}>
    <div class="slide">Slide 6.1</div>
    <div class="slide">Slide 6.2</div>
    <div class="slide">Slide 6.3</div>
    <div class="slide">Slide 6.4</div>
    <div class="slide">Slide 6.5</div>
    <div class="slide">Slide 6.6</div>
  </Slider>
</Slider>
