<script lang="ts">
  import { onMount } from 'svelte';

  let canvasRef: HTMLCanvasElement;

  onMount(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = canvasRef.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let w: number;
    let h: number;

    const ribbons = Array.from({ length: 5 }, (_, i) => ({
      yBase: 0.2 + i * 0.15,
      amplitude: 30 + i * 12,
      frequency: 0.002 + i * 0.0004,
      speed: 0.0003 + i * 0.00008,
      phase: i * 1.2,
      thickness: 80 + i * 20,
      opacity: 0.07 - i * 0.008,
    }));

function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvasRef.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvasRef.width = w * dpr;
      canvasRef.height = h * dpr;
      ctx!.scale(dpr, dpr);
    }

    function getColors(): { brand: string; brandLight: string } {
      const style = getComputedStyle(document.documentElement);
      const brand = style.getPropertyValue('--color-brand').trim() || '#1a3c2a';
      const brandHover = style.getPropertyValue('--color-brand-hover').trim() || '#2d5a3d';
      return { brand, brandLight: brandHover };
    }

    function hexToRgb(hex: string): [number, number, number] {
      hex = hex.replace('#', '');
      return [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16),
      ];
    }

    let time = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const { brand, brandLight } = getColors();
      const [br, bg, bb] = hexToRgb(brand);
      const [lr, lg, lb] = hexToRgb(brandLight);

      const colorPalette = [
        [br, bg, bb],
        [lr, lg, lb],
        [Math.min(br + 40, 255), Math.min(bg + 60, 255), Math.min(bb + 30, 255)],
        [Math.min(lr + 20, 255), Math.min(lg + 40, 255), Math.min(lb + 50, 255)],
        [br, Math.min(bg + 30, 255), bb],
      ];

      // Draw aurora ribbons
      for (let ri = 0; ri < ribbons.length; ri++) {
        const r = ribbons[ri];
        const [cr, cg, cb] = colorPalette[ri % colorPalette.length];
        const baseY = r.yBase * h;

        ctx.beginPath();
        ctx.moveTo(0, baseY);

        for (let x = 0; x <= w; x += 4) {
          const wave1 = Math.sin(x * r.frequency + time * r.speed * 1000 + r.phase) * r.amplitude;
          const wave2 = Math.sin(x * r.frequency * 1.8 + time * r.speed * 700 + r.phase * 0.7) * r.amplitude * 0.5;
          const y = baseY + wave1 + wave2;
          ctx.lineTo(x, y);
        }

        // Close at bottom of ribbon
        for (let x = w; x >= 0; x -= 4) {
          const wave1 = Math.sin(x * r.frequency + time * r.speed * 1000 + r.phase) * r.amplitude;
          const wave2 = Math.sin(x * r.frequency * 1.8 + time * r.speed * 700 + r.phase * 0.7) * r.amplitude * 0.5;
          const y = baseY + wave1 + wave2 + r.thickness;
          ctx.lineTo(x, y);
        }

        ctx.closePath();

        const grad = ctx.createLinearGradient(0, baseY - r.amplitude, 0, baseY + r.thickness + r.amplitude);
        grad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, 0)`);
        grad.addColorStop(0.3, `rgba(${cr}, ${cg}, ${cb}, ${r.opacity})`);
        grad.addColorStop(0.5, `rgba(${cr}, ${cg}, ${cb}, ${r.opacity * 1.4})`);
        grad.addColorStop(0.7, `rgba(${cr}, ${cg}, ${cb}, ${r.opacity})`);
        grad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

        ctx.fillStyle = grad;
        ctx.fill();
      }

      time += 0.016;
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  });
</script>

<div class="aurora-glow" aria-hidden="true">
  <canvas bind:this={canvasRef}></canvas>
</div>

<style>
  .aurora-glow {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
  }

  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
