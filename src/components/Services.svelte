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
      image: '/media/lawn-care/Suburban_lawn_meets_202603271702.jpeg',
      description:
        'Weekly mowing, edging, fertilization, and aeration. We keep your lawn thick, green, and competition-worthy from spring thaw through fall.',
    },
    {
      icon: 'landscape',
      title: 'Landscaping',
      image: '/media/landscaping/Construction_worker_building_202603271705.jpeg',
      description:
        'Design and installation of beds, retaining walls, patios, and planting. Hardscape and softscape that fits Edmonton\'s climate.',
    },
    {
      icon: 'snow',
      title: 'Snow Removal',
      image: '/media/Truck_pushing_snow_202603271709.jpeg',
      description:
        'Residential and commercial clearing with 24-hour response. Plowing, sanding, and sidewalk service — no storm is too early.',
    },
    {
      icon: 'seasonal',
      title: 'Seasonal Packages',
      image: '/media/cleanup/Workers_clearing_autumn_202603271710.jpeg',
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
          <div class="service-image">
            <img src={service.image} alt={service.title} loading="lazy" />
          </div>
          <div class="service-body">
            <h3 class="service-title">{service.title}</h3>
            <p class="service-description">{service.description}</p>
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
    border: 1px solid var(--color-border);
    background-color: var(--color-surface);
    overflow: hidden;
    transition:
      border-color 300ms var(--ease-out-quart),
      background-color 300ms var(--ease-out-quart);
  }

  .service-card:hover {
    border-color: var(--color-brand);
    background-color: var(--color-surface-raised);
  }

  .service-card:hover .service-image img {
    transform: scale(1.05);
  }

  .service-image {
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
  }

  .service-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 500ms var(--ease-out-quart);
  }

  .service-body {
    padding: var(--space-6) var(--space-6) var(--space-8);
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
</style>
