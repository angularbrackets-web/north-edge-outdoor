<script lang="ts">
  import { onMount } from 'svelte';
  import BackgroundSelector from '@/backgrounds/BackgroundSelector.svelte';
  import { content } from '@/config/content';
  import { packages as plans } from '@/lib/packages';

  let sectionRef: HTMLElement;
  let headingRef: HTMLElement;
  let cards: HTMLElement[] = [];
  let noteRef: HTMLElement;

  onMount(() => {
    let ctx: any;

    import('@/lib/animations').then(({ scrollReveal, gsap }) => {
      ctx = gsap.context(() => {
        scrollReveal(headingRef, sectionRef, { y: 40 });
        scrollReveal(cards, sectionRef, { y: 50, stagger: 0.1, delay: 0.15 });
        scrollReveal(noteRef, sectionRef, { y: 20, delay: 0.4 });
      }, sectionRef);
    });

    return () => ctx?.revert();
  });
</script>

<section
  bind:this={sectionRef}
  id="pricing"
  class="pricing section"
  aria-label="Pricing"
>
  <BackgroundSelector section="pricing" />
  <div class="container">
    <div class="pricing-header">
      <span bind:this={headingRef} class="pricing-heading-group">
        <h2 class="pricing-title">{content.pricing.title}</h2>
      </span>
    </div>

    <div class="pricing-grid">
      {#each plans as plan, i}
        <div
          class="pricing-card"
          class:pricing-card--featured={plan.featured}
          bind:this={cards[i]}
        >
          {#if plan.featured}
            <span class="pricing-badge">Most Popular</span>
          {/if}
          <div class="pricing-card-header">
            <h3 class="plan-name">{plan.name}</h3>
            <div class="plan-price">
              <span class="plan-currency">$</span>
              <span class="plan-amount">{plan.price}</span>
              {#if plan.period}
                <span class="plan-period">{plan.period}</span>
              {/if}
            </div>
            <p class="plan-description">{plan.description}</p>
          </div>
          <ul class="plan-features">
            {#each plan.features as feature}
              <li class="plan-feature">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="check-icon">
                  <path d="M3.5 8.5l3 3 6-7"/>
                </svg>
                {feature}
              </li>
            {/each}
          </ul>
          <a
            href="#contact"
            class="plan-cta"
            class:plan-cta--featured={plan.featured}
          >
            {plan.cta}
          </a>
        </div>
      {/each}
    </div>

    <p bind:this={noteRef} class="pricing-note">
      {content.pricing.note}
    </p>
  </div>
</section>

<style>
  .pricing {
    background-color: var(--color-bg-subtle);
    position: relative;
  }

  .pricing-header {
    text-align: center;
    margin-bottom: var(--space-16);
  }

  .pricing-heading-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
  }

  .pricing-title {
    margin: 0;
  }

  /* ── Grid ── */
  .pricing-grid {
    display: grid;
    gap: var(--space-6);
  }

  @media (min-width: 768px) {
    .pricing-grid {
      grid-template-columns: repeat(2, 1fr);
      align-items: start;
    }
  }

  @media (min-width: 1024px) {
    .pricing-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  /* ── Card ── */
  .pricing-card {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--space-8);
    border: 1px solid var(--color-border);
    background-color: var(--color-surface);
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.1),
      0 10px 30px rgba(0, 0, 0, 0.18);
    transition:
      border-color var(--duration-normal) var(--ease-out-quart),
      background-color var(--duration-normal) var(--ease-out-quart),
      transform var(--duration-normal) var(--ease-out-quart),
      box-shadow var(--duration-normal) var(--ease-out-quart);
  }

  .pricing-card:hover {
    border-color: var(--color-brand);
    transform: translateY(-10px) scale(1.03);
    box-shadow:
      0 8px 16px rgba(0, 0, 0, 0.14),
      0 32px 56px rgba(0, 0, 0, 0.22);
  }

  .pricing-card--featured {
    border-color: var(--color-brand);
    background-color: var(--color-surface-raised);
  }

  .pricing-badge {
    position: absolute;
    top: 0;
    right: var(--space-8);
    transform: translateY(-50%);
    padding: var(--space-1) var(--space-4);
    background-color: var(--color-brand);
    color: var(--color-brand-text);
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
  }

  .pricing-card-header {
    padding-bottom: var(--space-6);
    border-bottom: 1px solid var(--color-border);
    margin-bottom: var(--space-6);
  }

  .plan-name {
    font-size: var(--text-sm);
    letter-spacing: var(--tracking-wide);
    margin: 0 0 var(--space-4) 0;
  }

  .plan-price {
    display: flex;
    align-items: baseline;
    gap: var(--space-1);
    margin-bottom: var(--space-3);
  }

  .plan-currency {
    font-family: var(--font-heading);
    font-size: var(--text-md);
    font-weight: 600;
    color: var(--color-brand);
  }

  .plan-amount {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 700;
    letter-spacing: var(--tracking-tight);
    color: var(--color-text);
    display: inline-block;
    transition:
      transform var(--duration-normal) var(--ease-out-quart),
      color var(--duration-normal) var(--ease-out-quart);
  }

  .pricing-card:hover .plan-amount {
    transform: scale(1.12);
    color: var(--color-brand);
  }

  .plan-period {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-text-muted);
  }

  .plan-description {
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    color: var(--color-text-secondary);
    margin: 0;
  }

  /* ── Features ── */
  .plan-features {
    list-style: none;
    padding: 0;
    margin: 0 0 var(--space-8) 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    flex: 1;
  }

  .plan-feature {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    color: var(--color-text-secondary);
  }

  .check-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--color-brand);
    margin-top: 2px;
    transition: transform var(--duration-normal) var(--ease-out-quart);
  }

  .pricing-card:hover .check-icon {
    transform: scale(1.3);
  }

  /* ── CTA ── */
  .plan-cta {
    display: block;
    text-align: center;
    padding: var(--space-3) var(--space-6);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    border: 1px solid var(--color-border-strong);
    color: var(--color-text);
    background-color: transparent;
    transition:
      background-color var(--duration-normal) var(--ease-out-quart),
      border-color var(--duration-normal) var(--ease-out-quart),
      color var(--duration-normal) var(--ease-out-quart),
      transform var(--duration-normal) var(--ease-out-quart),
      box-shadow var(--duration-normal) var(--ease-out-quart);
  }

  .plan-cta:hover {
    border-color: var(--color-brand);
    background-color: var(--color-brand);
    color: var(--color-brand-text);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  .plan-cta--featured {
    background-color: var(--color-brand);
    border-color: var(--color-brand);
    color: var(--color-brand-text);
  }

  .plan-cta--featured:hover {
    background-color: var(--color-brand-hover);
    border-color: var(--color-brand-hover);
    color: var(--color-brand-text);
  }

  /* ── Note ── */
  .pricing-note {
    margin-top: var(--space-10);
    font-size: var(--text-xs);
    color: var(--color-text-muted);
    letter-spacing: var(--tracking-wide);
    text-align: center;
  }

  /* ── Mobile ── */
  @media (max-width: 767px) {
    .pricing-card {
      padding: var(--space-6);
    }

    .plan-amount {
      font-size: var(--text-lg);
    }
  }
</style>
