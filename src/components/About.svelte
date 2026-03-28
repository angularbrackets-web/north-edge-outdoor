<script lang="ts">
  import { onMount } from 'svelte';
  import BackgroundSelector from '@/backgrounds/BackgroundSelector.svelte';
  import { siteConfig } from '@/config/site';
  import { content } from '@/config/content';

  let sectionRef: HTMLElement;
  let headingRef: HTMLElement;
  let storyParagraphs: HTMLElement[] = [];
  let imageRef: HTMLElement;
  let statementRef: HTMLElement;
  let accentRef: HTMLElement;
  let pullQuoteRef: HTMLElement;
  let proofItems: HTMLElement[] = [];
  let valuesRef: HTMLElement;
  let values: HTMLElement[] = [];

  const { values: coreValues, stats, story, pullQuote, image: aboutImage, imageAlt } = content.about;

  onMount(() => {
    let ctx: any;

    import('@/lib/animations').then(({ scrollReveal, gsap }) => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      ctx = gsap.context(() => {
        // ── Header ──
        scrollReveal(headingRef, sectionRef, { y: 40 });

        // ── Story paragraphs ──
        scrollReveal(storyParagraphs, sectionRef, { y: 30, stagger: 0.1, delay: 0.1 });

        // ── Image clip-path reveal ──
        if (!prefersReduced) {
          gsap.set(imageRef, {
            clipPath: 'inset(12% 12% 12% 12%)',
            scale: 1.08,
          });
          gsap.to(imageRef, {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageRef,
              start: 'top 80%',
            },
          });
        }

        // ── Statement accent line ──
        if (!prefersReduced) {
          gsap.set(accentRef, { scaleY: 0, transformOrigin: 'top center' });
          gsap.to(accentRef, {
            scaleY: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statementRef,
              start: 'top 80%',
            },
          });
        }

        // ── Pull quote ──
        scrollReveal(pullQuoteRef, statementRef, { y: 40, delay: 0.1 });

        // ── Proof stats reveal ──
        scrollReveal(proofItems, statementRef, { y: 25, stagger: 0.1, delay: 0.2 });

        // ── Counter animations ──
        if (!prefersReduced) {
          proofItems.forEach((item, i) => {
            const valueEl = item.querySelector('.proof-value');
            if (!valueEl) return;
            const target = parseFloat(valueEl.getAttribute('data-value') || '0');
            const isDecimal = valueEl.getAttribute('data-decimal') === 'true';
            const suffix = valueEl.getAttribute('data-suffix') || '';

            valueEl.textContent = '0' + suffix;

            const counter = { val: 0 };
            gsap.to(counter, {
              val: target,
              duration: 2,
              ease: 'power2.out',
              delay: 0.4 + i * 0.15,
              scrollTrigger: {
                trigger: statementRef,
                start: 'top 80%',
              },
              onUpdate() {
                valueEl.textContent = (isDecimal ? counter.val.toFixed(1) : Math.round(counter.val).toString()) + suffix;
              },
            });
          });
        }

        // ── Values reveal with accent lines ──
        values.forEach((val, i) => {
          const line = val.querySelector('.value-accent');
          scrollReveal(val, valuesRef, { y: 35, delay: i * 0.08 });
          if (line && !prefersReduced) {
            gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
            gsap.to(line, {
              scaleX: 1,
              duration: 0.8,
              ease: 'power3.out',
              delay: i * 0.08 + 0.4,
              scrollTrigger: {
                trigger: valuesRef,
                start: 'top 85%',
              },
            });
          }
        });
      }, sectionRef);
    });

    return () => ctx?.revert();
  });
</script>

<section
  bind:this={sectionRef}
  id="about"
  class="about section"
  aria-label="About {siteConfig.business.name}"
>
  <BackgroundSelector section="about" />
  <div class="container">
    <div bind:this={headingRef} class="about-header">
      <span class="about-label">{content.about.label}</span>
      <h2 class="about-title">{#each content.about.title.split('\n') as line, i}{#if i > 0}<br />{/if}{line}{/each}</h2>
    </div>

    <div class="about-top">
      <div class="about-story">
        {#each story as paragraph, i}
          <p bind:this={storyParagraphs[i]} class:lead={i === 0}>{paragraph}</p>
        {/each}
      </div>

      <div bind:this={imageRef} class="about-image">
        <img
          src={aboutImage}
          alt={imageAlt}
          loading="lazy"
        />
      </div>
    </div>

    <div bind:this={statementRef} class="about-statement">
      <div bind:this={accentRef} class="statement-accent" aria-hidden="true"></div>
      <blockquote bind:this={pullQuoteRef} class="about-pullquote">
        {pullQuote}
      </blockquote>
      <div class="statement-proof">
        {#each stats as stat, i}
          <div class="proof-stat" bind:this={proofItems[i]}>
            <span
              class="proof-value"
              data-value={stat.value}
              data-suffix={stat.suffix}
              data-decimal={stat.decimal}
            >
              {stat.value}{stat.suffix}
            </span>
            <span class="proof-label">{stat.label}</span>
          </div>
        {/each}
      </div>
    </div>

    <div bind:this={valuesRef} class="about-values">
      {#each coreValues as value, i}
        <div class="value" bind:this={values[i]}>
          <span class="value-number">{String(i + 1).padStart(2, '0')}</span>
          <div class="value-accent" aria-hidden="true"></div>
          <div class="value-content">
            <h3 class="value-title">{value.title}</h3>
            <p class="value-description">{value.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .about {
    background-color: var(--color-bg);
    position: relative;
  }

  /* ── Header ── */
  .about-header {
    margin-bottom: var(--space-16);
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

  /* ── Top: Story + Image ── */
  .about-top {
    display: grid;
    gap: var(--space-10);
  }

  @media (min-width: 1024px) {
    .about-top {
      grid-template-columns: 1fr 1.2fr;
      gap: var(--space-16);
      align-items: start;
    }
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

  .about-story .lead {
    font-size: var(--text-md);
    color: var(--color-text);
  }

  /* ── Image ── */
  .about-image {
    overflow: hidden;
  }

  .about-image img {
    width: 100%;
    height: auto;
    object-fit: cover;
    aspect-ratio: 4 / 5;
  }

  /* ── Statement: Quote + Proof ── */
  .about-statement {
    position: relative;
    margin: var(--space-20) 0;
    padding-left: var(--space-10);
  }

  .statement-accent {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: var(--color-brand);
  }

  .about-pullquote {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 700;
    letter-spacing: var(--tracking-tight);
    line-height: var(--leading-heading);
    color: var(--color-text);
    margin: 0 0 var(--space-10) 0;
    padding: 0;
    border: none;
    max-width: 20ch;
  }

  .statement-proof {
    display: flex;
    gap: var(--space-10);
  }

  .proof-stat {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .proof-value {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 700;
    letter-spacing: var(--tracking-tighter);
    color: var(--color-brand);
    line-height: 1;
  }

  .proof-label {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    color: var(--color-text-muted);
  }

  @media (min-width: 768px) {
    .about-statement {
      padding-left: var(--space-16);
    }

    .about-pullquote {
      font-size: var(--text-2xl);
    }
  }

  @media (min-width: 1024px) {
    .about-pullquote {
      font-size: var(--text-3xl);
    }

    .proof-value {
      font-size: var(--text-3xl);
    }
  }

  /* ── Values ── */
  .about-values {
    display: flex;
    flex-direction: column;
  }

  .value {
    display: grid;
    grid-template-columns: auto auto 1fr;
    align-items: start;
    gap: var(--space-6);
    padding: var(--space-8) 0;
    border-bottom: 1px solid var(--color-border);
  }

  .value:last-child {
    border-bottom: none;
  }

  .value-number {
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--color-brand);
    letter-spacing: var(--tracking-tight);
    line-height: 1;
    padding-top: 0.15em;
    transition: transform var(--duration-normal) var(--ease-out-quart);
  }

  .value:hover .value-number {
    transform: scale(1.15);
  }

  .value-accent {
    width: 40px;
    height: 2px;
    background-color: var(--color-brand);
    margin-top: 0.65em;
    flex-shrink: 0;
  }

  .value-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .value-title {
    font-size: var(--text-base);
    letter-spacing: var(--tracking-snug);
    margin: 0;
    transition: color var(--duration-normal) var(--ease-out-quart);
  }

  .value:hover .value-title {
    color: var(--color-brand);
  }

  .value-description {
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    color: var(--color-text-secondary);
    margin: 0;
    max-width: var(--max-w-reading);
  }

  /* ── Mobile ── */
  @media (max-width: 639px) {
    .about-statement {
      padding-left: var(--space-8);
    }

    .statement-proof {
      gap: var(--space-6);
    }

    .proof-value {
      font-size: var(--text-xl);
    }

    .value {
      grid-template-columns: auto 1fr;
      gap: var(--space-4);
      padding: var(--space-6) 0;
    }

    .value-accent {
      display: none;
    }

    .value-number {
      font-size: var(--text-md);
    }
  }
</style>
