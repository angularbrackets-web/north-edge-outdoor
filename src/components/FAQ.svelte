<script lang="ts">
  import { onMount } from 'svelte';
  import BackgroundSelector from '@/backgrounds/BackgroundSelector.svelte';
  import { content } from '@/config/content';

  let sectionRef: HTMLElement;
  let headingRef: HTMLElement;
  let itemRefs: HTMLElement[] = [];
  let openIndex: number | null = $state(null);

  const faqs = content.faq.items;

  function open(index: number) {
    openIndex = index;
  }

  function close(index: number) {
    if (openIndex === index) openIndex = null;
  }

  onMount(() => {
    let ctx: any;

    import('@/lib/animations').then(({ scrollReveal, gsap }) => {
      ctx = gsap.context(() => {
        scrollReveal(headingRef, sectionRef, { y: 40 });
        scrollReveal(itemRefs, sectionRef, { y: 30, stagger: 0.06, delay: 0.1 });
      }, sectionRef);
    });

    return () => ctx?.revert();
  });
</script>

<section
  bind:this={sectionRef}
  id="faq"
  class="faq section"
  aria-label="Frequently Asked Questions"
>
  <BackgroundSelector section="faq" />
  <div class="container">
    <div class="faq-layout">
      <div bind:this={headingRef} class="faq-header">
        <span class="faq-label">{content.faq.label}</span>
        <h2 class="faq-title">{#each content.faq.title.split('\n') as line, i}{#if i > 0}<br />{/if}{line}{/each}</h2>
        <p class="faq-sub">
          {content.faq.subtitle}
        </p>
      </div>

      <div class="faq-list" role="list">
        {#each faqs as faq, i}
          <div
            class="faq-item"
            class:faq-item--open={openIndex === i}
            bind:this={itemRefs[i]}
            role="listitem"
            onmouseenter={() => open(i)}
            onmouseleave={() => close(i)}
          >
            <div
              class="faq-trigger"
              role="button"
              tabindex="0"
              onfocus={() => open(i)}
              onblur={() => close(i)}
              aria-expanded={openIndex === i}
              aria-controls="faq-panel-{i}"
            >
              <span class="faq-number">{String(i + 1).padStart(2, '0')}</span>
              <span class="faq-question">{faq.question}</span>
              <span class="faq-icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                  <line x1="3" y1="8" x2="13" y2="8" />
                  <line
                    x1="8" y1="3" x2="8" y2="13"
                    class="faq-icon-vertical"
                    class:faq-icon-vertical--hidden={openIndex === i}
                  />
                </svg>
              </span>
            </div>
            <div
              id="faq-panel-{i}"
              class="faq-panel"
              class:faq-panel--open={openIndex === i}
              role="region"
              aria-hidden={openIndex !== i}
            >
              <div class="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .faq {
    background-color: var(--color-bg);
    position: relative;
  }

  /* ── Layout ── */
  .faq-layout {
    display: grid;
    gap: var(--space-12);
  }

  @media (min-width: 1024px) {
    .faq-layout {
      grid-template-columns: 1fr 1.6fr;
      gap: var(--space-20);
      align-items: start;
    }
  }

  /* ── Header ── */
  .faq-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  @media (min-width: 1024px) {
    .faq-header {
      position: sticky;
      top: calc(var(--space-24));
    }
  }

  .faq-label {
    display: block;
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    color: var(--color-brand);
  }

  .faq-title {
    margin: 0;
  }

  .faq-sub {
    font-size: var(--text-md);
    line-height: var(--leading-body);
    color: var(--color-text-secondary);
    margin: 0;
  }

  /* ── FAQ List ── */
  .faq-list {
    display: flex;
    flex-direction: column;
  }

  .faq-item {
    border-bottom: 1px solid var(--color-border);
  }

  /* ── Trigger Button ── */
  .faq-trigger {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: var(--space-4);
    width: 100%;
    padding: var(--space-6) 0;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    font-family: inherit;
    transition: background-color var(--duration-normal) var(--ease-out-quart);
  }

  .faq-trigger:hover {
    background-color: var(--color-brand-muted);
    padding-inline: var(--space-4);
    margin-inline: calc(-1 * var(--space-4));
  }

  .faq-number {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 500;
    color: var(--color-brand);
    letter-spacing: var(--tracking-wide);
    min-width: 1.75em;
    transition: transform var(--duration-normal) var(--ease-out-quart);
  }

  .faq-item--open .faq-number {
    transform: scale(1.15);
  }

  .faq-question {
    font-family: var(--font-heading);
    font-size: var(--text-base);
    font-weight: 600;
    letter-spacing: var(--tracking-snug);
    color: var(--color-text);
    text-transform: uppercase;
    transition: color var(--duration-normal) var(--ease-out-quart);
  }

  .faq-item--open .faq-question {
    color: var(--color-brand);
  }

  .faq-trigger:hover .faq-question {
    color: var(--color-brand);
  }

  /* ── Plus/Minus Icon ── */
  .faq-icon {
    width: 1rem;
    height: 1rem;
    color: var(--color-text-muted);
    flex-shrink: 0;
    transition:
      color var(--duration-normal) var(--ease-out-quart),
      transform var(--duration-normal) var(--ease-out-quart);
  }

  .faq-item--open .faq-icon {
    color: var(--color-brand);
    transform: rotate(90deg);
  }

  .faq-icon svg {
    width: 100%;
    height: 100%;
  }

  .faq-icon-vertical {
    transition:
      opacity var(--duration-normal) var(--ease-out-quart),
      transform var(--duration-normal) var(--ease-out-quart);
  }

  .faq-icon-vertical--hidden {
    opacity: 0;
    transform: scaleY(0);
  }

  /* ── Panel ── */
  .faq-panel {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 400ms var(--ease-out-quart);
  }

  .faq-panel--open {
    grid-template-rows: 1fr;
  }

  .faq-answer {
    overflow: hidden;
  }

  .faq-answer p {
    padding: 0 0 var(--space-6) 0;
    margin: 0;
    margin-left: calc(1.75em + var(--space-4));
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    color: var(--color-text-secondary);
    max-width: var(--max-w-reading);
  }

  /* ── Mobile ── */
  @media (max-width: 767px) {
    .faq-trigger {
      padding: var(--space-5) 0;
    }

    .faq-question {
      font-size: var(--text-sm);
    }
  }
</style>
