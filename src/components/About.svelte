<script lang="ts">
  import { onMount } from 'svelte';

  let sectionRef: HTMLElement;
  let headingRef: HTMLElement;
  let storyRef: HTMLElement;
  let values: HTMLElement[] = [];

  const coreValues = [
    {
      title: 'Show Up',
      description: 'Every visit, on time, no excuses. Your property doesn\'t wait for the weekend — neither do we.',
    },
    {
      title: 'Do It Right',
      description: 'Clean edges, straight lines, clear walks. We take pride in work that speaks before we do.',
    },
    {
      title: 'Think Ahead',
      description: 'We prepare your property for next season while servicing this one. No gaps, no scramble.',
    },
    {
      title: 'Stay Local',
      description: 'Edmonton-owned, Edmonton-operated. We live on the same streets we service.',
    },
  ];

  onMount(() => {
    let ctx: any;

    import('@/lib/animations').then(({ scrollReveal, gsap }) => {
      ctx = gsap.context(() => {
        scrollReveal(headingRef, sectionRef, { y: 40 });
        scrollReveal(storyRef, sectionRef, { y: 30, delay: 0.1 });
        scrollReveal(values, sectionRef, { y: 40, stagger: 0.08, delay: 0.2 });
      }, sectionRef);
    });

    return () => ctx?.revert();
  });
</script>

<section
  bind:this={sectionRef}
  id="about"
  class="about section"
  aria-label="About North Edge"
>
  <div class="container">
    <div class="about-layout">
      <div class="about-content">
        <div bind:this={headingRef} class="about-header">
          <span class="about-label">About Us</span>
          <h2 class="about-title">Built for<br />Edmonton</h2>
        </div>

        <div bind:this={storyRef} class="about-story">
          <p>
            North Edge started with a truck, a mower, and the simple belief that property
            care shouldn't be complicated. Eight years later, we service over 500
            residential and commercial properties across Edmonton and surrounding areas.
          </p>
          <p>
            We built this company for Alberta's extremes — the long winters, the short
            growing seasons, the storms that don't check the forecast. One team handles
            your property year-round so you never have to coordinate between contractors
            or wonder who's showing up next.
          </p>
          <p>
            Every crew member lives locally, knows the climate, and takes ownership of
            the properties they maintain. That's the North Edge difference — we treat
            your property like it's ours.
          </p>
        </div>

        <div class="about-image">
          <img
            src="/media/general/Suburban_home_with_202603271712.jpeg"
            alt="Well-maintained Edmonton property with landscaping"
            loading="lazy"
          />
        </div>
      </div>

      <div class="about-values">
        {#each coreValues as value, i}
          <div class="value" bind:this={values[i]}>
            <span class="value-number">{String(i + 1).padStart(2, '0')}</span>
            <h3 class="value-title">{value.title}</h3>
            <p class="value-description">{value.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .about {
    background-color: var(--color-bg);
    position: relative;
  }

  .about-layout {
    display: grid;
    gap: var(--space-16);
  }

  @media (min-width: 1024px) {
    .about-layout {
      grid-template-columns: 1fr 1fr;
      gap: var(--space-24);
      align-items: start;
    }
  }

  /* ── Header ── */
  .about-header {
    margin-bottom: var(--space-10);
  }

  .about-label {
    display: block;
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    color: var(--color-brand);
    margin-bottom: var(--space-4);
  }

  .about-title {
    margin: 0;
  }

  /* ── Image ── */
  .about-image {
    margin-top: var(--space-10);
    overflow: hidden;
  }

  .about-image img {
    width: 100%;
    height: auto;
    object-fit: cover;
    aspect-ratio: 16 / 10;
  }

  /* ── Story ── */
  .about-story {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .about-story p {
    font-size: var(--text-base);
    line-height: var(--leading-body);
    color: var(--color-text-secondary);
    margin: 0;
  }

  .about-story p:first-child {
    font-size: var(--text-md);
    color: var(--color-text);
  }

  /* ── Values ── */
  .about-values {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-1);
  }

  .value {
    padding: var(--space-6);
    border-bottom: 1px solid var(--color-border);
  }

  .value:nth-child(even) {
    border-left: 1px solid var(--color-border);
    padding-left: var(--space-8);
  }

  .value:nth-last-child(-n+2) {
    border-bottom: none;
  }

  .value-number {
    display: block;
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 500;
    color: var(--color-brand);
    letter-spacing: var(--tracking-wide);
    margin-bottom: var(--space-3);
  }

  .value-title {
    font-size: var(--text-sm);
    letter-spacing: var(--tracking-wide);
    margin: 0 0 var(--space-2) 0;
  }

  .value-description {
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    color: var(--color-text-secondary);
    margin: 0;
  }

  /* ── Mobile ── */
  @media (max-width: 639px) {
    .about-values {
      grid-template-columns: 1fr;
    }

    .value {
      padding: var(--space-5) 0;
    }

    .value:nth-child(even) {
      border-left: none;
      padding-left: 0;
    }

    .value:last-child {
      border-bottom: none;
    }

    .value:nth-last-child(2) {
      border-bottom: 1px solid var(--color-border);
    }
  }
</style>
