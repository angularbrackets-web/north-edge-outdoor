<script lang="ts">
  import { onMount } from 'svelte';

  let svgRef: SVGSVGElement;

  const pathCount = 30;

  function generatePaths() {
    return Array.from({ length: pathCount }, (_, idx) => {
      const t = idx / (pathCount - 1);
      // Sweeping S-curves from top-left to bottom-right
      const startX = -100 + t * 150;
      const startY = -50 + t * 200;
      const endX = 550 + t * 150;
      const endY = 250 + t * 200;
      // S-curve: first control goes up-right, second goes down-right
      const cp1x = 100 + t * 100;
      const cp1y = startY - 100 - Math.sin(t * Math.PI) * 80;
      const cp2x = 400 + t * 100;
      const cp2y = endY + 100 + Math.sin(t * Math.PI) * 80;

      return {
        d: `M${startX} ${startY} C${cp1x} ${cp1y} ${cp2x} ${cp2y} ${endX} ${endY}`,
        width: 2 + Math.sin(t * Math.PI) * 2.5,
      };
    });
  }

  const paths = generatePaths();

  onMount(() => {
    let ctx: any;

    import('@/lib/gsap').then(({ gsap }) => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReduced) {
        svgRef.querySelectorAll('.bg-path').forEach((path, i) => {
          (path as SVGPathElement).style.opacity = String(0.15 + Math.sin((i / pathCount) * Math.PI) * 0.15);
        });
        return;
      }

      ctx = gsap.context(() => {
        const els = svgRef.querySelectorAll('.bg-path');

        els.forEach((path, i) => {
          const el = path as SVGPathElement;
          const len = el.getTotalLength();
          const segLen = len * 0.35;
          const peakOpacity = 0.35 + Math.sin((i / pathCount) * Math.PI) * 0.35;
          const duration = 8 + (i % 8) * 1.5;
          const delay = (i * 0.4) % 6;

          gsap.set(el, {
            strokeDasharray: `${segLen} ${len}`,
            strokeDashoffset: len + segLen,
            opacity: peakOpacity,
          });

          gsap.to(el, {
            strokeDashoffset: -(len + segLen),
            duration,
            ease: 'none',
            repeat: -1,
            delay,
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
    viewBox="0 0 700 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    {#each paths as path}
      <path
        class="bg-path"
        d={path.d}
        stroke="var(--flowing-path-color)"
        stroke-width={path.width}
      />
    {/each}
  </svg>
</div>

<style>
  .flowing-paths {
    --flowing-path-color: var(--color-brand-muted);
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

  .bg-path {
    fill: none;
    stroke-linecap: round;
  }
</style>
