<script lang="ts">
  import { onMount } from 'svelte';
  import BackgroundSelector from '@/backgrounds/BackgroundSelector.svelte';
  import { siteConfig } from '@/config/site';
  import { content } from '@/config/content';

  let sectionRef: HTMLElement;
  let headingRef: HTMLElement;
  let items: HTMLElement[] = [];
  let statItems: HTMLElement[] = [];

  const { reasons, stats } = content.whyUs;

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
  aria-label="Why Choose {siteConfig.business.name}"
>
  <BackgroundSelector section="whyUs" />
  <div class="container">
    <div class="why-us-header" bind:this={headingRef}>
      <span class="why-us-label">{content.whyUs.label}</span>
      <h2 class="why-us-title">{#each content.whyUs.title.split('\n') as line, i}{#if i > 0}<br />{/if}{line}{/each}</h2>
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
    transition: background-color var(--duration-normal) var(--ease-out-quart);
  }

  .reason:hover {
    background-color: var(--color-brand-muted);
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
    transition: transform var(--duration-normal) var(--ease-out-quart);
  }

  .reason:hover .reason-number {
    transform: translateX(6px) scale(1.15);
  }

  .reason-title {
    font-size: var(--text-base);
    letter-spacing: var(--tracking-snug);
    margin: 0 0 var(--space-3) 0;
    transition: color var(--duration-normal) var(--ease-out-quart);
  }

  .reason:hover .reason-title {
    color: var(--color-brand);
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
    cursor: default;
    transition: transform var(--duration-normal) var(--ease-out-quart);
  }

  .stat:hover {
    transform: scale(1.08);
  }

  .stat-value {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 700;
    letter-spacing: var(--tracking-tight);
    color: var(--color-text);
    text-transform: uppercase;
    transition: color var(--duration-normal) var(--ease-out-quart);
  }

  .stat:hover .stat-value {
    color: var(--color-brand);
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
