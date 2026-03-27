<script lang="ts">
  import { onMount } from 'svelte';
  import FlowingPaths from '@/backgrounds/FlowingPaths.svelte';

  let heroRef: HTMLElement;
  let brandRef: HTMLElement;
  let headlineRef: HTMLElement;
  let subRef: HTMLElement;
  let ctaRef: HTMLElement;
  let scrollLine: HTMLElement;

  const phoneNumber = '780-680-2936';
  const phoneHref = `tel:+1${phoneNumber.replace(/-/g, '')}`;

  onMount(() => {
    let ctx: any;

    import('@/lib/gsap').then(({ gsap }) => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReduced) {
        gsap.set([brandRef, headlineRef, subRef, ctaRef], { opacity: 1, y: 0 });
        gsap.set(scrollLine, { scaleY: 1 });
        return;
      }

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.fromTo(
          brandRef,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.3
        )
          .fromTo(
            headlineRef,
            { opacity: 0, y: 60, clipPath: 'inset(100% 0% 0% 0%)' },
            {
              opacity: 1,
              y: 0,
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1,
            },
            0.5
          )
          .fromTo(
            subRef,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7 },
            0.9
          )
          .fromTo(
            ctaRef,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            1.15
          )
          .to(
            scrollLine,
            { scaleY: 1, duration: 0.6, ease: 'power3.out' },
            1.4
          );
      }, heroRef);
    });

    return () => {
      ctx?.revert();
    };
  });
</script>

<section
  bind:this={heroRef}
  class="hero"
  id="hero"
  aria-label="North Edge Outdoor — Year-Round Property Services"
>
  <div class="hero-media" aria-hidden="true">
    <video
      class="hero-video"
      autoplay
      muted
      loop
      playsinline
      poster="/media/hero/An_ultra-high-resolution,_cinematic_202603271652.png"
    >
      <source src="/media/hero/Lawn_care_on_202603271642.mp4" type="video/mp4" />
    </video>
    <div class="hero-overlay"></div>
  </div>

  <FlowingPaths />

  <div class="hero-content">
    <span bind:this={brandRef} class="hero-brand">North Edge Outdoor</span>

    <h1 bind:this={headlineRef} class="hero-headline">
      Your Property,<br />Every Season
    </h1>

    <p bind:this={subRef} class="hero-sub">
      Year-round lawn care, landscaping, and snow removal in Edmonton.
      One company, no gaps, no excuses.
    </p>

    <div bind:this={ctaRef} class="hero-cta">
      <a href="#contact" class="cta-primary">Get a Free Estimate</a>
      <a href={phoneHref} class="cta-phone">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        {phoneNumber}
      </a>
    </div>
  </div>

  <div class="hero-scroll" aria-hidden="true">
    <div bind:this={scrollLine} class="scroll-line"></div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    background-color: var(--color-bg);
  }

  /* ── Video background ── */
  .hero-media {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .hero-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(250, 250, 248, 0.82) 0%,
      rgba(250, 250, 248, 0.7) 50%,
      rgba(250, 250, 248, 0.88) 100%
    );
  }

  :global(.dark) .hero-overlay {
    background: linear-gradient(
      to bottom,
      rgba(10, 15, 13, 0.82) 0%,
      rgba(10, 15, 13, 0.7) 50%,
      rgba(10, 15, 13, 0.88) 100%
    );
  }

  .hero-content {
    position: relative;
    z-index: 1;
    padding: 7rem var(--container-padding-mobile) 5rem;
    max-width: var(--max-w-wide);
    margin: 0 auto;
    width: 100%;
  }

  @media (min-width: 768px) {
    .hero-content {
      padding: 7rem var(--container-padding) 5rem;
    }
  }

  /* ── Brand label ── */
  .hero-brand {
    display: block;
    opacity: 0;
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    color: var(--color-brand);
    margin-bottom: var(--space-6);
  }

  /* ── Headline ── */
  .hero-headline {
    opacity: 0;
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: clamp(2.5rem, 7vw, 6rem);
    line-height: var(--leading-tight);
    letter-spacing: var(--tracking-tightest);
    text-transform: uppercase;
    color: var(--color-text);
    margin: 0;
    max-width: 14ch;
  }

  /* ── Subheadline ── */
  .hero-sub {
    opacity: 0;
    font-family: var(--font-body);
    font-size: var(--text-md);
    line-height: var(--leading-body);
    color: var(--color-text-secondary);
    margin-top: var(--space-6);
    max-width: var(--max-w-reading);
  }

  /* ── CTA ── */
  .hero-cta {
    opacity: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-4);
    margin-top: var(--space-10);
  }

  .cta-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 52px;
    padding: 0 var(--space-8);
    background-color: var(--color-brand);
    color: var(--color-brand-text);
    font-family: var(--font-body);
    font-weight: 500;
    font-size: var(--text-sm);
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    text-decoration: none;
    transition: background-color 200ms var(--ease-out-quart);
  }

  .cta-primary:hover {
    background-color: var(--color-brand-hover);
  }

  .cta-phone {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    height: 52px;
    padding: 0 var(--space-6);
    border: 1px solid var(--color-border-strong);
    background: transparent;
    color: var(--color-text);
    font-family: var(--font-body);
    font-weight: 500;
    font-size: var(--text-sm);
    letter-spacing: var(--tracking-wide);
    text-decoration: none;
    transition:
      border-color 200ms var(--ease-out-quart),
      background-color 200ms var(--ease-out-quart);
  }

  .cta-phone:hover {
    border-color: var(--color-text);
    background-color: var(--color-surface);
  }

  /* ── Scroll cue ── */
  .hero-scroll {
    position: absolute;
    bottom: var(--space-8);
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }

  .scroll-line {
    width: 1px;
    height: 40px;
    background-color: var(--color-brand);
    transform: scaleY(0);
    transform-origin: top center;
  }

  /* ── Mobile ── */
  @media (max-width: 767px) {
    .hero-headline {
      font-size: clamp(2rem, 10vw, 3.5rem);
      letter-spacing: var(--tracking-tight);
    }

    .hero-sub {
      font-size: var(--text-base);
    }

    .hero-cta {
      flex-direction: column;
      margin-top: var(--space-8);
    }

    .cta-primary,
    .cta-phone {
      width: 100%;
      justify-content: center;
      min-height: 48px;
    }

    .hero-scroll {
      bottom: var(--space-6);
    }

    .scroll-line {
      height: 32px;
    }
  }

  /* ── Reduced Motion ── */
  @media (prefers-reduced-motion: reduce) {
    .hero-brand,
    .hero-headline,
    .hero-sub,
    .hero-cta {
      opacity: 1 !important;
    }

    .scroll-line {
      transform: scaleY(1) !important;
    }
  }
</style>
