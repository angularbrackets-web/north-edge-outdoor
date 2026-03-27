<script lang="ts">
  import { onMount } from 'svelte';

  let sectionRef: HTMLElement;
  let headingRef: HTMLElement;
  let subRef: HTMLElement;
  let cards: HTMLElement[] = [];

  const services = [
    {
      icon: 'lawn',
      title: 'Lawn Care',
      description:
        'Weekly mowing, edging, fertilization, and aeration. We keep your lawn thick, green, and competition-worthy from spring thaw through fall.',
    },
    {
      icon: 'landscape',
      title: 'Landscaping',
      description:
        'Design and installation of beds, retaining walls, patios, and planting. Hardscape and softscape that fits Edmonton\'s climate.',
    },
    {
      icon: 'snow',
      title: 'Snow Removal',
      description:
        'Residential and commercial clearing with 24-hour response. Plowing, sanding, and sidewalk service — no storm is too early.',
    },
    {
      icon: 'seasonal',
      title: 'Seasonal Packages',
      description:
        'One contract covers every month. Spring cleanup, summer maintenance, fall prep, and winter clearing — seamless year-round care.',
    },
  ];

  onMount(() => {
    let ctx: any;

    import('@/lib/animations').then(({ scrollReveal, gsap }) => {
      ctx = gsap.context(() => {
        scrollReveal(headingRef, sectionRef, { y: 40, stagger: 0 });
        scrollReveal(subRef, sectionRef, { y: 30, delay: 0.1 });
        scrollReveal(cards, sectionRef, { y: 50, stagger: 0.1, delay: 0.15 });
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
  <div class="container">
    <div class="services-header">
      <span bind:this={headingRef} class="services-heading-group">
        <span class="services-label">What We Do</span>
        <h2 class="services-title">Built for<br />Every Season</h2>
      </span>
      <p bind:this={subRef} class="services-sub">
        Edmonton weather doesn't take days off — neither do we. From first mow
        to last plow, North Edge handles your property year-round.
      </p>
    </div>

    <div class="services-grid">
      {#each services as service, i}
        <div
          class="service-card"
          bind:this={cards[i]}
        >
          <div class="service-icon">
            {#if service.icon === 'lawn'}
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 28c2-6 6-10 12-10s10 4 12 10"/>
                <path d="M16 18V6"/>
                <path d="M12 10l4-4 4 4"/>
              </svg>
            {:else if service.icon === 'landscape'}
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 28l8-16 6 10 4-6 6 12"/>
                <circle cx="24" cy="8" r="3"/>
              </svg>
            {:else if service.icon === 'snow'}
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M16 4v24M4 16h24"/>
                <path d="M7.5 7.5l17 17M24.5 7.5l-17 17"/>
                <path d="M16 4l-2 3h4l-2-3zM16 28l-2-3h4l-2 3z"/>
              </svg>
            {:else}
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="16" cy="16" r="11"/>
                <path d="M16 8v8l5 3"/>
                <path d="M26 6l2-2M6 6L4 4"/>
              </svg>
            {/if}
          </div>
          <h3 class="service-title">{service.title}</h3>
          <p class="service-description">{service.description}</p>
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
    margin-bottom: var(--space-16);
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

  /* ── Grid ── */
  .services-grid {
    display: grid;
    gap: var(--space-6);
  }

  @media (min-width: 640px) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .services-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  /* ── Card ── */
  .service-card {
    padding: var(--space-8);
    border: 1px solid var(--color-border);
    background-color: var(--color-surface);
    transition:
      border-color 300ms var(--ease-out-quart),
      background-color 300ms var(--ease-out-quart);
  }

  .service-card:hover {
    border-color: var(--color-brand);
    background-color: var(--color-surface-raised);
  }

  .service-icon {
    width: 40px;
    height: 40px;
    color: var(--color-brand);
    margin-bottom: var(--space-6);
  }

  .service-icon svg {
    width: 100%;
    height: 100%;
  }

  .service-title {
    font-size: var(--text-sm);
    letter-spacing: var(--tracking-wide);
    margin: 0 0 var(--space-3) 0;
  }

  .service-description {
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    color: var(--color-text-secondary);
    margin: 0;
  }

  /* ── Mobile ── */
  @media (max-width: 639px) {
    .service-card {
      padding: var(--space-6);
    }
  }
</style>
