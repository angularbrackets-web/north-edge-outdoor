<script lang="ts">
  import { onMount } from 'svelte';

  let sectionRef: HTMLElement;
  let headingRef: HTMLElement;
  let items: HTMLElement[] = [];
  let statItems: HTMLElement[] = [];

  const reasons = [
    {
      number: '01',
      title: 'One Company, Every Season',
      description:
        'No juggling contractors. Lawn care in summer, snow removal in winter — one team, one invoice, zero gaps between seasons.',
    },
    {
      number: '02',
      title: '24-Hour Snow Response',
      description:
        'When the storm hits at 3 AM, we\'re already deploying. Commercial and residential properties cleared before your morning starts.',
    },
    {
      number: '03',
      title: 'Edmonton-Built',
      description:
        'We don\'t guess at what works here — we live it. Our methods, equipment, and timing are built for Alberta\'s extremes.',
    },
    {
      number: '04',
      title: 'No Contracts Required',
      description:
        'We earn your business every visit. Seasonal packages available, but you\'re never locked in. Stay because the work speaks.',
    },
  ];

  const stats = [
    { value: '8+', label: 'Years in Edmonton' },
    { value: '500+', label: 'Properties Served' },
    { value: '24hr', label: 'Snow Response' },
    { value: '4.9', label: 'Google Rating' },
  ];

  onMount(() => {
    let ctx: any;

    import('@/lib/animations').then(({ scrollReveal, gsap }) => {
      ctx = gsap.context(() => {
        scrollReveal(headingRef, sectionRef, { y: 40 });
        scrollReveal(items, sectionRef, { y: 50, stagger: 0.08, delay: 0.1 });
        scrollReveal(statItems, sectionRef, { y: 30, stagger: 0.06, delay: 0.2 });
      }, sectionRef);
    });

    return () => ctx?.revert();
  });
</script>

<section
  bind:this={sectionRef}
  id="why-us"
  class="why-us section"
  aria-label="Why Choose North Edge"
>
  <div class="container">
    <div class="why-us-header" bind:this={headingRef}>
      <span class="why-us-label">Why North Edge</span>
      <h2 class="why-us-title">The Difference<br />Is in the Details</h2>
    </div>

    <div class="why-us-grid">
      {#each reasons as reason, i}
        <div class="reason" bind:this={items[i]}>
          <span class="reason-number">{reason.number}</span>
          <h3 class="reason-title">{reason.title}</h3>
          <p class="reason-description">{reason.description}</p>
        </div>
      {/each}
    </div>

    <div class="stats-bar">
      {#each stats as stat, i}
        <div class="stat" bind:this={statItems[i]}>
          <span class="stat-value">{stat.value}</span>
          <span class="stat-label">{stat.label}</span>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .why-us {
    background-color: var(--color-bg-subtle);
    position: relative;
  }

  .why-us-header {
    margin-bottom: var(--space-16);
  }

  .why-us-label {
    display: block;
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    color: var(--color-brand);
    margin-bottom: var(--space-4);
  }

  .why-us-title {
    margin: 0;
  }

  /* ── Reasons Grid ── */
  .why-us-grid {
    display: grid;
    gap: var(--space-1);
  }

  @media (min-width: 768px) {
    .why-us-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .reason {
    padding: var(--space-8);
    border-bottom: 1px solid var(--color-border);
  }

  @media (min-width: 768px) {
    .reason {
      border-bottom: none;
      border-left: 1px solid var(--color-border);
      padding: var(--space-8) var(--space-10);
    }

    .reason:nth-child(odd) {
      border-left: none;
      padding-left: 0;
    }

    .reason:nth-child(1),
    .reason:nth-child(2) {
      padding-top: 0;
    }

    .reason:nth-child(3),
    .reason:nth-child(4) {
      border-top: 1px solid var(--color-border);
      padding-top: var(--space-8);
    }
  }

  .reason-number {
    display: block;
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 500;
    color: var(--color-brand);
    letter-spacing: var(--tracking-wide);
    margin-bottom: var(--space-4);
  }

  .reason-title {
    font-size: var(--text-base);
    letter-spacing: var(--tracking-snug);
    margin: 0 0 var(--space-3) 0;
  }

  .reason-description {
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    color: var(--color-text-secondary);
    margin: 0;
  }

  /* ── Stats Bar ── */
  .stats-bar {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
    margin-top: var(--space-16);
    padding-top: var(--space-12);
    border-top: 1px solid var(--color-border);
  }

  @media (min-width: 768px) {
    .stats-bar {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .stat-value {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 700;
    letter-spacing: var(--tracking-tight);
    color: var(--color-text);
    text-transform: uppercase;
  }

  .stat-label {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    color: var(--color-text-muted);
  }

  /* ── Mobile ── */
  @media (max-width: 767px) {
    .reason {
      padding: var(--space-6) 0;
    }

    .stat-value {
      font-size: var(--text-lg);
    }
  }
</style>
