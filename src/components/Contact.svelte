<script lang="ts">
  import { onMount } from 'svelte';
  import BackgroundSelector from '@/backgrounds/BackgroundSelector.svelte';
  import { siteConfig } from '@/config/site';
  import { content } from '@/config/content';

  let sectionRef: HTMLElement;
  let headingRef: HTMLElement;
  let formRef: HTMLElement;
  let infoRef: HTMLElement;

  let formState: 'idle' | 'submitting' | 'success' | 'error' = $state('idle');
  let errorMessage = $state('');

  const phoneNumber = siteConfig.business.phone;
  const phoneHref = `tel:+1${phoneNumber.replace(/-/g, '')}`;
  const email = siteConfig.business.email;

  const { propertySizes, serviceOptions } = content.contact;

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    formState = 'submitting';
    errorMessage = '';

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    const payload = {
      name: data.get('name') as string,
      email: data.get('email') as string,
      phone: data.get('phone') as string || undefined,
      service: data.get('service') as string,
      message: data.get('message') as string || undefined,
      _hp: data.get('_hp') as string || undefined, // honeypot
    };

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || 'Something went wrong. Please try again.');
      }

      formState = 'success';
    } catch (err) {
      formState = 'error';
      errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
    }
  }

  onMount(() => {
    let ctx: any;

    import('@/lib/animations').then(({ scrollReveal, gsap }) => {
      ctx = gsap.context(() => {
        scrollReveal(headingRef, sectionRef, { y: 40 });
        scrollReveal(formRef, sectionRef, { y: 40, delay: 0.1 });
        scrollReveal(infoRef, sectionRef, { y: 40, delay: 0.15 });
      }, sectionRef);
    });

    return () => ctx?.revert();
  });
</script>

<section
  bind:this={sectionRef}
  id="contact"
  class="contact section"
  aria-label="Contact Us"
>
  <BackgroundSelector section="contact" />
  <div class="container">
    <div bind:this={headingRef} class="contact-header">
      <span class="contact-label">{content.contact.label}</span>
      <h2 class="contact-title">{#each content.contact.title.split('\n') as line, i}{#if i > 0}<br />{/if}{line}{/each}</h2>
      <p class="contact-sub">
        {content.contact.subtitle}
      </p>
    </div>

    <div class="contact-layout">
      <div bind:this={formRef} class="contact-form-wrap">
        {#if formState === 'success'}
          <div class="form-success">
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="success-icon">
              <circle cx="16" cy="16" r="12"/>
              <path d="M11 16.5l3.5 3.5 7-8"/>
            </svg>
            <h3 class="success-title">{content.contact.successMessage.title}</h3>
            <p class="success-text">
              {content.contact.successMessage.text}
            </p>
          </div>
        {:else}
          <form onsubmit={handleSubmit} class="contact-form">
            {#if formState === 'error'}
              <div class="form-error" role="alert">
                {errorMessage}
              </div>
            {/if}

            <!-- Honeypot: hidden from humans, bots fill it -->
            <div aria-hidden="true" style="position:absolute;left:-9999px;opacity:0;height:0;overflow:hidden;">
              <label for="_hp">Leave empty</label>
              <input type="text" id="_hp" name="_hp" tabindex="-1" autocomplete="off" />
            </div>

            <div class="form-row">
              <div class="form-field">
                <label for="name" class="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autocomplete="name"
                  class="form-input"
                  placeholder="Your name"
                />
              </div>
              <div class="form-field">
                <label for="phone" class="form-label">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autocomplete="tel"
                  class="form-input"
                  placeholder="780-000-0000"
                />
              </div>
            </div>

            <div class="form-field">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autocomplete="email"
                class="form-input"
                placeholder="you@example.com"
              />
            </div>

            <div class="form-row">
              <div class="form-field">
                <label for="service" class="form-label">Service Interested In</label>
                <select id="service" name="service" class="form-input form-select">
                  <option value="" disabled selected>Select a service</option>
                  {#each serviceOptions as option}
                    <option value={option}>{option}</option>
                  {/each}
                </select>
              </div>

              <div class="form-field">
                <label for="property-size" class="form-label">Property Size</label>
                <select id="property-size" name="property-size" class="form-input form-select">
                  <option value="" disabled selected>Select property size</option>
                  {#each propertySizes as size}
                    <option value={size}>{size}</option>
                  {/each}
                </select>
              </div>
            </div>

            <div class="form-field">
              <label for="message" class="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                class="form-input form-textarea"
                placeholder="Tell us about your property and what you need..."
              ></textarea>
            </div>

            <button
              type="submit"
              class="form-submit"
              disabled={formState === 'submitting'}
            >
              {formState === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        {/if}
      </div>

      <div bind:this={infoRef} class="contact-info">
        <div class="info-block">
          <span class="info-label">Call Us</span>
          <a href={phoneHref} class="info-phone">{phoneNumber}</a>
        </div>

        <div class="info-block">
          <span class="info-label">Email</span>
          <a href="mailto:{email}" class="info-link">{email}</a>
        </div>

        <div class="info-block">
          <span class="info-label">Service Area</span>
          <p class="info-text">{siteConfig.business.serviceArea}</p>
        </div>

        <div class="info-block">
          <span class="info-label">Office Hours</span>
          <p class="info-text">
            {#each siteConfig.business.officeHours as hours, i}
              {#if i > 0}<br />{/if}{hours.days}: {hours.hours}
            {/each}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .contact {
    background-color: var(--color-bg-subtle);
    position: relative;
  }

  .contact-header {
    margin-bottom: var(--space-16);
    max-width: 640px;
  }

  .contact-label {
    display: block;
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    color: var(--color-brand);
    margin-bottom: var(--space-4);
  }

  .contact-title {
    margin: 0 0 var(--space-6) 0;
  }

  .contact-sub {
    font-size: var(--text-md);
    line-height: var(--leading-body);
    color: var(--color-text-secondary);
    margin: 0;
  }

  /* ── Layout ── */
  .contact-layout {
    display: grid;
    gap: var(--space-16);
  }

  @media (min-width: 1024px) {
    .contact-layout {
      grid-template-columns: 1fr 380px;
      gap: var(--space-24);
      align-items: start;
    }
  }

  /* ── Form ── */
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-5);
  }

  @media (max-width: 639px) {
    .form-row {
      grid-template-columns: 1fr;
    }
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .form-label {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    color: var(--color-text-muted);
  }

  .form-input {
    padding: var(--space-3) var(--space-4);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    color: var(--color-text);
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    outline: none;
    transition:
      border-color 200ms var(--ease-out-quart),
      background-color 200ms var(--ease-out-quart);
  }

  .form-input::placeholder {
    color: var(--color-text-muted);
  }

  .form-input:focus {
    border-color: var(--color-brand);
    background-color: var(--color-surface);
  }

  .form-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' fill='none' stroke='%239C9890' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right var(--space-4) center;
    padding-right: var(--space-10);
    cursor: pointer;
  }

  .form-textarea {
    resize: vertical;
    min-height: 120px;
  }

  .form-submit {
    align-self: flex-start;
    padding: var(--space-3) var(--space-8);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    color: var(--color-brand-text);
    background-color: var(--color-brand);
    border: 1px solid var(--color-brand);
    cursor: pointer;
    transition:
      background-color var(--duration-normal) var(--ease-out-quart),
      border-color var(--duration-normal) var(--ease-out-quart),
      transform var(--duration-normal) var(--ease-out-quart),
      box-shadow var(--duration-normal) var(--ease-out-quart);
  }

  .form-submit:hover:not(:disabled) {
    background-color: var(--color-brand-hover);
    border-color: var(--color-brand-hover);
    transform: translateY(-3px) scale(1.04);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);
  }

  .form-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* ── Error ── */
  .form-error {
    padding: var(--space-3) var(--space-4);
    font-size: var(--text-sm);
    color: #b91c1c;
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 4px;
  }

  :global([data-theme='dark']) .form-error {
    color: #fca5a5;
    background-color: rgba(185, 28, 28, 0.15);
    border-color: rgba(185, 28, 28, 0.3);
  }

  /* ── Success ── */
  .form-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--space-16) var(--space-8);
  }

  .success-icon {
    width: 48px;
    height: 48px;
    color: var(--color-brand);
    margin-bottom: var(--space-6);
  }

  .success-title {
    font-size: var(--text-lg);
    margin: 0 0 var(--space-3) 0;
  }

  .success-text {
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    color: var(--color-text-secondary);
    margin: 0;
  }

  /* ── Info sidebar ── */
  .contact-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
    padding: var(--space-8);
    border: 1px solid var(--color-border);
    background-color: var(--color-surface);
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.1),
      0 10px 30px rgba(0, 0, 0, 0.18);
  }

  .info-block {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .info-label {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    color: var(--color-text-muted);
  }

  .info-phone {
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    font-weight: 700;
    letter-spacing: var(--tracking-tight);
    color: var(--color-brand);
    text-decoration: none;
    text-transform: uppercase;
    display: inline-block;
    transition:
      color var(--duration-normal) var(--ease-out-quart),
      transform var(--duration-normal) var(--ease-out-quart);
  }

  .info-phone:hover {
    color: var(--color-brand-hover);
    transform: scale(1.08);
  }

  .info-link {
    position: relative;
    font-size: var(--text-sm);
    color: var(--color-brand);
    text-decoration: none;
    display: inline-block;
    transition:
      color var(--duration-normal) var(--ease-out-quart),
      transform var(--duration-normal) var(--ease-out-quart);
  }

  .info-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1.5px;
    background-color: var(--color-brand-hover);
    transform: scaleX(0);
    transform-origin: right center;
    transition: transform var(--duration-normal) var(--ease-out-quart);
  }

  .info-link:hover {
    color: var(--color-brand-hover);
    transform: translateX(4px);
  }

  .info-link:hover::after {
    transform: scaleX(1);
    transform-origin: left center;
  }

  .info-text {
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    color: var(--color-text-secondary);
    margin: 0;
  }

  /* ── Mobile ── */
  @media (max-width: 1023px) {
    .contact-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-8);
    }
  }

  @media (max-width: 639px) {
    .contact-info {
      grid-template-columns: 1fr;
    }
  }
</style>
