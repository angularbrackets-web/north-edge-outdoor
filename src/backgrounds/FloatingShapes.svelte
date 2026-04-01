<script lang="ts">
  import { onMount } from 'svelte';

  let { variant = 'a' }: { variant?: string } = $props();
  let containerRef: HTMLDivElement;

  interface Shape {
    left: string;
    top: string;
    width: number;
    height: number;
    rotate: number;
    duration: number;
    delay: number;
    distance: number;
    opacity: number;
    blur: number;
  }

  const presets: Record<string, Shape[]> = {
    a: [
      { left: '-5%', top: '10%', width: 500, height: 150, rotate: 15, duration: 16, delay: 0, distance: 25, opacity: 0.12, blur: 50 },
      { left: '65%', top: '55%', width: 450, height: 130, rotate: -12, duration: 20, delay: 3, distance: 20, opacity: 0.1, blur: 45 },
      { left: '25%', top: '80%', width: 350, height: 90, rotate: -5, duration: 18, delay: 6, distance: 18, opacity: 0.08, blur: 40 },
    ],
    b: [
      { left: '70%', top: '5%', width: 480, height: 140, rotate: -18, duration: 19, delay: 0, distance: 22, opacity: 0.12, blur: 50 },
      { left: '-5%', top: '45%', width: 420, height: 110, rotate: 10, duration: 15, delay: 2, distance: 28, opacity: 0.1, blur: 45 },
      { left: '40%', top: '75%', width: 380, height: 100, rotate: 20, duration: 22, delay: 5, distance: 15, opacity: 0.08, blur: 40 },
    ],
    c: [
      { left: '45%', top: '-5%', width: 550, height: 160, rotate: 8, duration: 21, delay: 1, distance: 20, opacity: 0.12, blur: 55 },
      { left: '-8%', top: '35%', width: 400, height: 120, rotate: -20, duration: 17, delay: 4, distance: 25, opacity: 0.1, blur: 45 },
      { left: '60%', top: '65%', width: 320, height: 85, rotate: 14, duration: 14, delay: 0, distance: 22, opacity: 0.08, blur: 40 },
    ],
    d: [
      { left: '10%', top: '8%', width: 520, height: 145, rotate: -10, duration: 18, delay: 2, distance: 18, opacity: 0.12, blur: 50 },
      { left: '55%', top: '40%', width: 440, height: 125, rotate: 22, duration: 16, delay: 0, distance: 24, opacity: 0.1, blur: 45 },
      { left: '30%', top: '75%', width: 360, height: 95, rotate: -15, duration: 20, delay: 4, distance: 20, opacity: 0.08, blur: 40 },
    ],
    e: [
      { left: '75%', top: '10%', width: 470, height: 135, rotate: 12, duration: 17, delay: 1, distance: 22, opacity: 0.12, blur: 50 },
      { left: '0%', top: '55%', width: 430, height: 115, rotate: -8, duration: 21, delay: 3, distance: 18, opacity: 0.1, blur: 45 },
      { left: '40%', top: '85%', width: 340, height: 88, rotate: 18, duration: 15, delay: 0, distance: 26, opacity: 0.08, blur: 40 },
    ],
  };

  const shapes = presets[variant] ?? presets.a;

  onMount(() => {
    let ctx: any;

    import('@/lib/gsap').then(({ gsap }) => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReduced) return;

      ctx = gsap.context(() => {
        containerRef.querySelectorAll('.floating-shape').forEach((shape, i) => {
          const s = shapes[i];
          if (!s) return;

          gsap.to(shape, {
            y: s.distance,
            duration: s.duration,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: s.delay,
          });
        });
      }, containerRef);
    });

    return () => {
      ctx?.revert();
    };
  });
</script>

<div bind:this={containerRef} class="section-bg" aria-hidden="true">
  {#each shapes as shape}
    <div
      class="floating-shape"
      style="
        left: {shape.left};
        top: {shape.top};
        width: {shape.width}px;
        height: {shape.height}px;
        opacity: {shape.opacity};
        filter: blur({shape.blur}px);
        transform: rotate({shape.rotate}deg);
      "
    ></div>
  {/each}
</div>

<style>
  .section-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .floating-shape {
    position: absolute;
    border-radius: 50%;
    background: var(--color-brand);
  }
</style>
