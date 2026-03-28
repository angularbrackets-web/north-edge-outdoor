<script lang="ts">
  import { onMount } from 'svelte';
  import { siteConfig } from '@/config/site';
  import { content } from '@/config/content';

  let heroRef: HTMLElement;
  let brandRef: HTMLElement;
  let headlineRef: HTMLElement;
  let subRef: HTMLElement;
  let ctaRef: HTMLElement;
  let scrollLine: HTMLElement;

  const phoneNumber = siteConfig.business.phone;
  const phoneHref = `tel:+1${phoneNumber.replace(/-/g, '')}`;

  onMount(() => {
    let ctx: any;

    import('@/lib/gsap').then(({ gsap }) => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReduced) {
        const letters = headlineRef.querySelectorAll('.hero-letter');
        gsap.set([brandRef, subRef, ctaRef], { opacity: 1, y: 0 });
        gsap.set(letters, { opacity: 1, y: 0 });
        gsap.set(scrollLine, { scaleY: 1 });
        return;
      }

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
        const letters = headlineRef.querySelectorAll('.hero-letter');

        tl.fromTo(
          brandRef,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.3
        )
          .fromTo(
            letters,
            { opacity: 0, y: 50, filter: 'blur(6px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              stagger: 0.03,
              duration: 0.6,
              ease: 'back.out(1.5)',
            },
            0.5
          )
          .fromTo(
            subRef,
            { opacity: 0, y: 30, filter: 'blur(4px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7 },
            1.3
          )
          .fromTo(
            ctaRef,
            { opacity: 0, y: 20, filter: 'blur(4px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6 },
            1.6
          )
          .to(
            scrollLine,
            { scaleY: 1, duration: 0.6, ease: 'power3.out' },
            1.9
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
  aria-label="{siteConfig.business.name} — {siteConfig.business.tagline}"
>
  <div class="hero-media" aria-hidden="true">
    <video
      class="hero-video"
      autoplay
      muted
      loop
      playsinline
      poster={content.hero.videoPoster}
    >
      <source src={content.hero.videoSrc} type="video/mp4" />
    </video>
  </div>

  <div class="hero-content">
    <div class="hero-card">
      <div class="hero-card-border" aria-hidden="true"></div>
      <span bind:this={brandRef} class="hero-brand">{content.hero.brandLabel}</span>

      <h1 bind:this={headlineRef} class="hero-headline">
        {#each content.hero.headline as line}
          <span class="hero-line">
            {#each line.split(' ') as word, wi}
              {#if wi > 0}<span class="hero-letter">&nbsp;</span>{/if}
              <span class="hero-word">{#each word.split('') as ch}<span class="hero-letter">{ch}</span>{/each}</span>
            {/each}
          </span>
        {/each}
      </h1>

      <p bind:this={subRef} class="hero-sub">
        {content.hero.subheadline}
      </p>

      <div bind:this={ctaRef} class="hero-cta">
        <a href={content.hero.ctaPrimary.href} class="cta-primary">{content.hero.ctaPrimary.text}</a>
        <a href={phoneHref} class="cta-phone">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          {phoneNumber}
        </a>
      </div>
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

  /* ── Glass card ── */
  .hero-card {
    position: relative;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.55) 100%);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 1rem;
    padding: var(--space-10) var(--space-8);
    max-width: 640px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  }

  /* Border-only mask — rotating gradient only visible in the 3px border frame */
  .hero-card-border {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    overflow: hidden;
    z-index: 10;
    pointer-events: none;
    padding: 3px;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
  }

  /* The actual spinning gradient, contained within the masked frame */
  .hero-card-border::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 250%;
    height: 250%;
    transform: translate(-50%, -50%);
    background: conic-gradient(
      from 0deg,
      transparent 0%,
      transparent 20%,
      rgba(255, 255, 255, 0.5) 35%,
      rgba(255, 255, 255, 0.95) 47%,
      #fff 52%,
      rgba(255, 255, 255, 0.95) 57%,
      rgba(255, 255, 255, 0.5) 70%,
      transparent 80%,
      transparent 100%
    );
    animation: card-border-spin 3s linear infinite;
  }

  @keyframes card-border-spin {
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  :global(.dark) .hero-card {
    background: linear-gradient(to bottom, rgba(10, 15, 13, 0.2) 0%, rgba(10, 15, 13, 0.55) 100%);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  :global(.dark) .hero-headline {
    color: #fff;
  }

  :global(.dark) .hero-sub {
    color: rgba(232, 228, 220, 0.85);
  }

  @media (min-width: 768px) {
    .hero-card {
      padding: var(--space-12) var(--space-10);
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
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: clamp(2.5rem, 7vw, 6rem);
    line-height: var(--leading-tight);
    letter-spacing: var(--tracking-tightest);
    text-transform: uppercase;
    color: var(--color-text);
    margin: 0;
  }

  .hero-line {
    display: block;
  }

  .hero-word {
    display: inline-block;
    white-space: nowrap;
  }

  .hero-letter {
    display: inline-block;
    opacity: 0;
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
    position: relative;
    overflow: hidden;
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
    transition:
      background-color var(--duration-normal) var(--ease-out-quart),
      transform var(--duration-normal) var(--ease-out-quart),
      box-shadow var(--duration-normal) var(--ease-out-quart);
  }

  .cta-primary::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -100%;
    width: 50%;
    height: 200%;
    background: linear-gradient(
      105deg,
      transparent 35%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 65%
    );
    animation: cta-shimmer 2s ease-in-out infinite;
    animation-delay: 2s;
  }

  @keyframes cta-shimmer {
    0% { left: -100%; }
    60% { left: 150%; }
    100% { left: 150%; }
  }

  .cta-primary:hover {
    background-color: var(--color-brand-hover);
    transform: translateY(-4px) scale(1.04);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  }

  .cta-phone {
    position: relative;
    overflow: hidden;
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
      border-color var(--duration-normal) var(--ease-out-quart),
      background-color var(--duration-normal) var(--ease-out-quart),
      transform var(--duration-normal) var(--ease-out-quart),
      box-shadow var(--duration-normal) var(--ease-out-quart);
  }

  .cta-phone::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -100%;
    width: 50%;
    height: 200%;
    background: linear-gradient(
      105deg,
      transparent 35%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 65%
    );
    animation: cta-phone-shimmer 2.5s ease-in-out infinite;
    animation-delay: 3s;
  }

  @keyframes cta-phone-shimmer {
    0% { left: -100%; }
    60% { left: 150%; }
    100% { left: 150%; }
  }

  .cta-phone:hover {
    border-color: var(--color-text);
    background-color: var(--color-surface);
    transform: translateY(-4px) scale(1.04);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }

  .cta-phone:hover::after {
    animation: none;
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
    .hero-letter,
    .hero-sub,
    .hero-cta {
      opacity: 1 !important;
      filter: none !important;
    }

    .scroll-line {
      transform: scaleY(1) !important;
    }

    .hero-card-border::before,
    .cta-primary::after,
    .cta-phone::after {
      animation: none !important;
    }
  }
</style>
