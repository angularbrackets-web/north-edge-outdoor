<script lang="ts">
  import { onMount } from 'svelte';

  let svgRef: SVGSVGElement;

  onMount(() => {
    let ctx: any;

    import('@/lib/gsap').then(({ gsap }) => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReduced) return;

      ctx = gsap.context(() => {
        const paths = svgRef.querySelectorAll('.flow-path');

        paths.forEach((path, i) => {
          const el = path as SVGPathElement;
          const length = el.getTotalLength();

          gsap.set(el, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });

          gsap.to(el, {
            strokeDashoffset: 0,
            duration: 3 + i * 0.6,
            ease: 'power2.inOut',
            delay: 0.3 + i * 0.2,
          });

          // Gentle floating drift after draw-in
          gsap.to(el, {
            y: `${(i % 2 === 0 ? -1 : 1) * (8 + i * 3)}`,
            duration: 5 + i * 1.5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: 3 + i * 0.8,
          });
        });
      }, svgRef);
    });

    return () => {
      ctx?.revert();
    };
  });
</script>

<div class="flowing-paths" aria-hidden="true">
  <svg
    bind:this={svgRef}
    viewBox="0 0 1440 900"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <!-- Primary flowing curves -->
    <path
      class="flow-path path-1"
      d="M-100 650 C200 580, 400 720, 600 620 S900 500, 1100 580 S1300 680, 1540 600"
      stroke="var(--color-brand)"
      stroke-width="1.5"
      opacity="0.15"
    />
    <path
      class="flow-path path-2"
      d="M-50 700 C180 640, 350 760, 580 680 S850 560, 1050 640 S1250 740, 1540 660"
      stroke="var(--color-brand)"
      stroke-width="1"
      opacity="0.1"
    />
    <path
      class="flow-path path-3"
      d="M-80 750 C220 700, 420 800, 640 730 S880 620, 1080 700 S1280 790, 1540 720"
      stroke="var(--color-brand)"
      stroke-width="0.75"
      opacity="0.08"
    />

    <!-- Upper accent curves -->
    <path
      class="flow-path path-4"
      d="M-60 300 C250 250, 500 380, 720 280 S1000 200, 1200 300 S1400 360, 1540 290"
      stroke="var(--color-brand)"
      stroke-width="0.75"
      opacity="0.06"
    />
    <path
      class="flow-path path-5"
      d="M-40 400 C200 350, 450 460, 680 380 S960 300, 1160 380 S1360 440, 1540 380"
      stroke="var(--color-brand)"
      stroke-width="0.5"
      opacity="0.05"
    />
  </svg>
</div>

<style>
  .flowing-paths {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .flowing-paths svg {
    width: 100%;
    height: 100%;
  }

  .flow-path {
    fill: none;
    stroke-linecap: round;
  }
</style>
