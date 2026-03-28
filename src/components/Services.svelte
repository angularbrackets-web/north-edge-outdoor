<script lang="ts">
  import { onMount } from 'svelte';
  import BackgroundSelector from '@/backgrounds/BackgroundSelector.svelte';
  import { content } from '@/config/content';

  let sectionRef: HTMLElement;
  let headingRef: HTMLElement;
  let subRef: HTMLElement;
  let categoryRefs: HTMLElement[] = [];
  let bottomCards: HTMLElement[] = [];

  const { categories, extraServices, iconPaths } = content.services;

  onMount(() => {
    let ctx: any;

    import('@/lib/animations').then(({ scrollReveal, gsap }) => {
      ctx = gsap.context(() => {
        scrollReveal(headingRef, sectionRef, { y: 40, stagger: 0 });
        scrollReveal(subRef, sectionRef, { y: 30, delay: 0.1 });

        categoryRefs.forEach((catRef) => {
          if (!catRef) return;
          const image = catRef.querySelector('.cat-image-wrap');
          const text = catRef.querySelector('.cat-text');
          const subs = catRef.querySelectorAll('.sub-card');

          if (image) scrollReveal(image, catRef, { y: 60, delay: 0 });
          if (text) scrollReveal(text, catRef, { y: 40, delay: 0.1 });
          if (subs.length) scrollReveal(subs, catRef, { y: 40, stagger: 0.1, delay: 0.2 });
        });

        if (bottomCards.length) {
          scrollReveal(bottomCards, sectionRef, { y: 50, stagger: 0.12, delay: 0.15 });
        }
      }, sectionRef);
    });

    return () => ctx?.revert();
  });
</script>

<section
  bind:this={sectionRef}
  id="services"
  class="services section"
  aria-label="Our Services"
>
  <BackgroundSelector section="services" />
  <div class="container">
    <div class="services-header">
      <span bind:this={headingRef} class="services-heading-group">
        <span class="services-label">{content.services.label}</span>
        <h2 class="services-title">{#each content.services.title.split('\n') as line, i}{#if i > 0}<br />{/if}{line}{/each}</h2>
      </span>
      <p bind:this={subRef} class="services-sub">
        {content.services.subtitle}
      </p>
    </div>

    <!-- Category Sections -->
    {#each categories as category, i}
      <div
        class="category"
        class:category--reversed={i % 2 === 1}
        bind:this={categoryRefs[i]}
      >
        <div class="cat-image-wrap">
          <div class="card-border-glow" aria-hidden="true"></div>
          <img
            class="cat-image"
            src={category.image}
            alt={category.title}
            loading="lazy"
          />
          <div class="cat-image-overlay"></div>
        </div>

        <div class="cat-body">
          <div class="cat-text">
            <span class="cat-number">0{i + 1}</span>
            <h3 class="cat-title">{category.title}</h3>
            <p class="cat-description">{category.description}</p>
          </div>

          <div class="sub-grid">
            {#each category.subs as sub}
              <div class="sub-card">
                <div class="sub-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d={iconPaths[sub.icon]} />
                  </svg>
                </div>
                <h4 class="sub-title">{sub.title}</h4>
                <p class="sub-description">{sub.description}</p>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/each}

    <!-- Snow Removal + Seasonal Packages -->
    <div class="extra-grid">
      {#each extraServices as service, i}
        <div class="extra-card" bind:this={bottomCards[i]}>
          <div class="card-border-glow" aria-hidden="true"></div>
          <img
            class="extra-bg"
            src={service.image}
            alt={service.title}
            loading="lazy"
          />
          <div class="extra-overlay"></div>
          <div class="extra-content">
            <span class="extra-season">{service.season}</span>
            <h3 class="extra-title">{service.title}</h3>
            <p class="extra-description">{service.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .services {
    background-color: var(--color-bg);
    position: relative;
  }

  .services-header {
    display: grid;
    gap: var(--space-6);
    margin-bottom: var(--space-20);
  }

  @media (min-width: 768px) {
    .services-header {
      grid-template-columns: 1fr 1fr;
      align-items: end;
      gap: var(--space-12);
    }
  }

  .services-heading-group {
    display: block;
  }

  .services-label {
    display: block;
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    color: var(--color-brand);
    margin-bottom: var(--space-4);
  }

  .services-title {
    margin: 0;
  }

  .services-sub {
    font-size: var(--text-md);
    line-height: var(--leading-body);
    color: var(--color-text-secondary);
    margin: 0;
  }

  /* ══════════════════════════════════════
     Category Block
     ══════════════════════════════════════ */
  .category {
    display: grid;
    gap: var(--space-8);
    margin-bottom: var(--space-24);
  }

  @media (min-width: 768px) {
    .category {
      grid-template-columns: 1fr 1fr;
      gap: var(--space-12);
      align-items: start;
    }

    .category--reversed {
      direction: rtl;
    }

    .category--reversed > * {
      direction: ltr;
    }
  }

  /* ── Category Image ── */
  .cat-image-wrap {
    position: relative;
    overflow: hidden;
    border-radius: 2px;
    aspect-ratio: 4 / 3;
    box-shadow:
      0 6px 12px rgba(0, 0, 0, 0.15),
      0 16px 40px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 768px) {
    .cat-image-wrap {
      aspect-ratio: 3 / 4;
      position: sticky;
      top: calc(var(--space-24));
    }
  }

  .cat-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: img-zoom 4s ease-in-out infinite alternate;
  }

  @keyframes img-zoom {
    0% { transform: scale(1); }
    100% { transform: scale(1.06); }
  }

  .cat-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0) 40%
    );
    pointer-events: none;
  }

  /* ── Category Text ── */
  .cat-body {
    display: flex;
    flex-direction: column;
    gap: var(--space-10);
  }

  .cat-text {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .cat-number {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    color: var(--color-brand);
    text-transform: uppercase;
  }

  .cat-title {
    font-size: var(--text-lg);
    letter-spacing: var(--tracking-snug);
    margin: 0;
    text-transform: uppercase;
  }

  .cat-description {
    font-family: var(--font-body);
    font-size: var(--text-base);
    line-height: var(--leading-body);
    color: var(--color-text-secondary);
    margin: 0;
    max-width: var(--max-w-reading);
  }

  /* ══════════════════════════════════════
     Sub-Service Cards
     ══════════════════════════════════════ */
  .sub-grid {
    display: grid;
    gap: var(--space-4);
  }

  .sub-card {
    padding: var(--space-6);
    background: var(--color-surface);
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

  .sub-card:hover {
    border-color: var(--color-brand);
    box-shadow:
      0 8px 16px rgba(0, 0, 0, 0.14),
      0 32px 56px rgba(0, 0, 0, 0.22);
    transform: translateY(-8px) scale(1.03);
  }

  .sub-icon {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand);
    margin-bottom: var(--space-4);
    transition:
      transform var(--duration-normal) var(--ease-out-quart),
      color var(--duration-normal) var(--ease-out-quart);
  }

  .sub-card:hover .sub-icon {
    transform: scale(1.35) rotate(-8deg);
  }

  .sub-icon svg {
    width: 100%;
    height: 100%;
  }

  .sub-title {
    font-size: var(--text-sm);
    font-weight: 600;
    letter-spacing: var(--tracking-snug);
    text-transform: uppercase;
    margin: 0 0 var(--space-2) 0;
    transition: color var(--duration-normal) var(--ease-out-quart);
  }

  .sub-card:hover .sub-title {
    color: var(--color-brand);
  }

  .sub-description {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    line-height: var(--leading-body);
    color: var(--color-text-secondary);
    margin: 0;
  }

  /* ══════════════════════════════════════
     Extra Services (Snow + Seasonal)
     ══════════════════════════════════════ */
  .extra-grid {
    display: grid;
    gap: var(--space-4);
    margin-top: var(--space-4);
  }

  @media (min-width: 768px) {
    .extra-grid {
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: 340px;
    }
  }

  .extra-card {
    position: relative;
    overflow: hidden;
    min-height: 280px;
    border-radius: 2px;
    box-shadow:
      0 6px 12px rgba(0, 0, 0, 0.15),
      0 16px 40px rgba(0, 0, 0, 0.2);
    transition: box-shadow var(--duration-normal) var(--ease-out-quart);
  }

  .extra-card:hover {
    box-shadow:
      0 12px 24px rgba(0, 0, 0, 0.18),
      0 36px 64px rgba(0, 0, 0, 0.28);
  }

  .extra-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: img-zoom 4s ease-in-out infinite alternate;
    transition: transform var(--duration-moderate) var(--ease-out-quart);
  }

  .extra-card:hover .extra-bg {
    transform: scale(1.1);
  }

  .extra-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.72) 0%,
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.04) 100%
    );
    transition: background 500ms var(--ease-out-quart);
  }

  .extra-card:hover .extra-overlay {
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.35) 55%,
      rgba(0, 0, 0, 0.08) 100%
    );
  }

  .extra-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--space-8);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }

  .extra-season {
    display: inline-block;
    padding: var(--space-1) var(--space-4);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 100px;
    font-family: var(--font-body);
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.9);
    transition:
      background var(--duration-normal) var(--ease-out-quart),
      border-color var(--duration-normal) var(--ease-out-quart);
  }

  .extra-card:hover .extra-season {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.35);
  }

  .extra-title {
    font-size: var(--text-lg);
    letter-spacing: var(--tracking-snug);
    color: #fff;
    margin: 0;
    text-transform: uppercase;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }

  .extra-description {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    color: rgba(255, 255, 255, 0.88);
    margin: 0;
    max-width: 50ch;
  }

  @media (hover: hover) {
    .extra-description {
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition:
        max-height 500ms var(--ease-out-quart),
        opacity 400ms var(--ease-out-quart);
    }

    .extra-card:hover .extra-description {
      max-height: 8em;
      opacity: 1;
    }
  }

  /* ══════════════════════════════════════
     Spinning Border Glow (hover-activated)
     ══════════════════════════════════════ */
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

  .cat-image-wrap:hover .card-border-glow,
  .extra-card:hover .card-border-glow {
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
    .category {
      margin-bottom: var(--space-16);
    }

    .extra-card {
      min-height: 260px;
    }

    .extra-content {
      padding: var(--space-6);
    }

    .extra-title {
      font-size: var(--text-base);
    }
  }

  /* ── Reduced Motion ── */
  @media (prefers-reduced-motion: reduce) {
    .cat-image,
    .extra-bg {
      animation: none !important;
    }

    .extra-overlay {
      transition: none !important;
    }

    .card-border-glow::before {
      animation: none !important;
    }
  }
</style>
