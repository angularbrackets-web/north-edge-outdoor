<script lang="ts">
  import { onMount } from 'svelte';
  import BackgroundSelector from '@/backgrounds/BackgroundSelector.svelte';
  import { content } from '@/config/content';

  let sectionRef: HTMLElement;
  let headingRef: HTMLElement;
  let cards: HTMLElement[] = [];

  const testimonials = content.testimonials.items;

  onMount(() => {
    let ctx: any;

    import('@/lib/animations').then(({ scrollReveal, gsap }) => {
      ctx = gsap.context(() => {
        scrollReveal(headingRef, sectionRef, { y: 40 });
        scrollReveal(cards, sectionRef, { y: 50, stagger: 0.15, delay: 0.1 });
      }, sectionRef);
    });

    return () => ctx?.revert();
  });
</script>

<section
  bind:this={sectionRef}
  id="testimonials"
  class="testimonials section"
  aria-label="Customer Reviews"
>
  <BackgroundSelector section="testimonials" />
  <div class="container">
    <div bind:this={headingRef} class="testimonials-header">
      <span class="testimonials-label">{content.testimonials.label}</span>
      <h2 class="testimonials-title">{#each content.testimonials.title.split('\n') as line, i}{#if i > 0}<br />{/if}{line}{/each}</h2>
    </div>

    <div class="testimonials-grid">
      {#each testimonials as testimonial, i}
        <div class="testimonial-card" bind:this={cards[i]}>
          <div class="card-border-glow" aria-hidden="true"></div>
          <svg class="quote-icon" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
            <path d="M6 18h5.333c0 2.947-2.386 5.333-5.333 5.333V26c4.418 0 8-3.582 8-8V8H6v10ZM20 18h5.333c0 2.947-2.386 5.333-5.333 5.333V26c4.418 0 8-3.582 8-8V8H20v10Z"/>
          </svg>
          <blockquote class="testimonial-quote">
            {testimonial.quote}
          </blockquote>
          <div class="testimonial-attribution">
            <span class="testimonial-dash" aria-hidden="true"></span>
            <cite class="testimonial-author">{testimonial.author}</cite>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .testimonials {
    background-color: var(--color-bg-subtle);
    position: relative;
    overflow: hidden;
  }

  .testimonials-header {
    margin-bottom: var(--space-16);
  }

  .testimonials-label {
    display: block;
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    color: var(--color-brand);
    margin-bottom: var(--space-4);
  }

  .testimonials-title {
    margin: 0;
  }

  /* ── Grid ── */
  .testimonials-grid {
    display: grid;
    gap: var(--space-6);
  }

  @media (min-width: 768px) {
    .testimonials-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-8);
    }
  }

  /* ── Card ── */
  .testimonial-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    padding: var(--space-10);
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 2px;
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.1),
      0 10px 30px rgba(0, 0, 0, 0.18);
    transition:
      border-color var(--duration-normal) var(--ease-out-quart),
      box-shadow var(--duration-normal) var(--ease-out-quart),
      transform var(--duration-normal) var(--ease-out-quart);
  }

  .testimonial-card:hover {
    border-color: var(--color-brand);
    box-shadow:
      0 8px 16px rgba(0, 0, 0, 0.14),
      0 32px 56px rgba(0, 0, 0, 0.22);
    transform: translateY(-8px) scale(1.02);
  }

  /* ── Quote icon ── */
  .quote-icon {
    width: 2.5rem;
    height: 2.5rem;
    color: var(--color-brand);
    opacity: 0.3;
    transition: opacity var(--duration-normal) var(--ease-out-quart);
  }

  .testimonial-card:hover .quote-icon {
    opacity: 0.6;
  }

  /* ── Quote text ── */
  .testimonial-quote {
    font-family: var(--font-heading);
    font-size: var(--text-md);
    font-weight: 600;
    line-height: var(--leading-body);
    letter-spacing: var(--tracking-snug);
    color: var(--color-text);
    margin: 0;
    padding: 0;
    border: none;
  }

  @media (min-width: 768px) {
    .testimonial-quote {
      font-size: var(--text-lg);
    }
  }

  /* ── Attribution ── */
  .testimonial-attribution {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-top: auto;
  }

  .testimonial-dash {
    width: 24px;
    height: 2px;
    background-color: var(--color-brand);
    flex-shrink: 0;
    transition: width var(--duration-normal) var(--ease-out-quart);
  }

  .testimonial-card:hover .testimonial-dash {
    width: 36px;
  }

  .testimonial-author {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 500;
    font-style: normal;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    color: var(--color-text-muted);
  }

  /* ── Border Glow ── */
  .card-border-glow {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    overflow: hidden;
    z-index: 10;
    pointer-events: none;
    padding: 3px;
    opacity: 0;
    transition: opacity var(--duration-moderate) var(--ease-out-quart);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
  }

  .testimonial-card:hover .card-border-glow {
    opacity: 1;
  }

  .card-border-glow::before {
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
      transparent 15%,
      var(--color-brand) 30%,
      #fff 50%,
      var(--color-brand) 70%,
      transparent 85%,
      transparent 100%
    );
    animation: border-spin 2.5s linear infinite;
  }

  @keyframes border-spin {
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  /* ── Mobile ── */
  @media (max-width: 767px) {
    .testimonial-card {
      padding: var(--space-8);
    }
  }

  /* ── Reduced Motion ── */
  @media (prefers-reduced-motion: reduce) {
    .card-border-glow::before {
      animation: none !important;
    }
  }
</style>
