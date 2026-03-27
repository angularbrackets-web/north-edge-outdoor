<script lang="ts">
  import { onMount } from 'svelte';

  let sectionRef: HTMLElement;
  let headingRef: HTMLElement;
  let subRef: HTMLElement;
  let cards: HTMLElement[] = [];
  let noteRef: HTMLElement;

  const plans = [
    {
      name: 'Lawn Care',
      price: '149',
      period: '/month',
      description: 'Reliable weekly service to keep your lawn clean and green all season.',
      features: [
        'Weekly mowing & edging',
        'Bi-weekly trimming',
        'Spring & fall cleanup',
        'Fertilization (2x/year)',
        'Leaf removal',
      ],
      cta: 'Get Started',
      featured: false,
    },
    {
      name: 'Year-Round',
      price: '299',
      period: '/month',
      description: 'One contract, every season — lawn care in summer, snow removal in winter.',
      features: [
        'Everything in Lawn Care',
        'Snow plowing & sanding',
        'Sidewalk clearing',
        '24-hour storm response',
        'Seasonal transition service',
        'Priority scheduling',
      ],
      cta: 'Best Value',
      featured: true,
    },
    {
      name: 'Commercial',
      price: 'Custom',
      period: '',
      description: 'Tailored property management for businesses, complexes, and HOAs.',
      features: [
        'Custom maintenance plans',
        'Multi-property discounts',
        'Dedicated account manager',
        '24/7 emergency snow response',
        'Liability insurance included',
        'Monthly reporting',
      ],
      cta: 'Get a Quote',
      featured: false,
    },
  ];

  onMount(() => {
    let ctx: any;

    import('@/lib/animations').then(({ scrollReveal, gsap }) => {
      ctx = gsap.context(() => {
        scrollReveal(headingRef, sectionRef, { y: 40 });
        scrollReveal(subRef, sectionRef, { y: 30, delay: 0.1 });
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
  <div class="container">
    <div class="pricing-header">
      <span bind:this={headingRef} class="pricing-heading-group">
        <span class="pricing-label">Pricing</span>
        <h2 class="pricing-title">Simple,<br />Honest Rates</h2>
      </span>
      <p bind:this={subRef} class="pricing-sub">
        No hidden fees, no surprise charges. Pick the plan that fits your
        property — upgrade or cancel anytime.
      </p>
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
      All residential prices based on standard lot sizes. Final pricing confirmed after property assessment.
    </p>
  </div>
</section>

<style>
  .pricing {
    background-color: var(--color-bg-subtle);
    position: relative;
  }

  .pricing-header {
    display: grid;
    gap: var(--space-6);
    margin-bottom: var(--space-16);
  }

  @media (min-width: 768px) {
    .pricing-header {
      grid-template-columns: 1fr 1fr;
      align-items: end;
      gap: var(--space-12);
    }
  }

  .pricing-heading-group {
    display: block;
  }

  .pricing-label {
    display: block;
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    color: var(--color-brand);
    margin-bottom: var(--space-4);
  }

  .pricing-title {
    margin: 0;
  }

  .pricing-sub {
    font-size: var(--text-md);
    line-height: var(--leading-body);
    color: var(--color-text-secondary);
    margin: 0;
  }

  /* ── Grid ── */
  .pricing-grid {
    display: grid;
    gap: var(--space-6);
  }

  @media (min-width: 768px) {
    .pricing-grid {
      grid-template-columns: repeat(3, 1fr);
      align-items: start;
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
    transition:
      border-color 300ms var(--ease-out-quart),
      background-color 300ms var(--ease-out-quart);
  }

  .pricing-card:hover {
    border-color: var(--color-brand);
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

  .plan-amount {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 700;
    letter-spacing: var(--tracking-tight);
    color: var(--color-text);
    text-transform: uppercase;
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
      background-color 200ms var(--ease-out-quart),
      border-color 200ms var(--ease-out-quart),
      color 200ms var(--ease-out-quart);
  }

  .plan-cta:hover {
    border-color: var(--color-brand);
    color: var(--color-brand);
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
