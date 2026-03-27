<script lang="ts">
  import { onMount } from 'svelte';

  let sectionRef: HTMLElement;
  let headingRef: HTMLElement;
  let formRef: HTMLElement;
  let infoRef: HTMLElement;

  let formState: 'idle' | 'submitting' | 'success' | 'error' = $state('idle');

  const phoneNumber = '780-680-2936';
  const phoneHref = `tel:+1${phoneNumber.replace(/-/g, '')}`;
  const email = 'info@northedgeoutdoor.ca';

  const serviceOptions = [
    'Lawn Care',
    'Landscaping',
    'Snow Removal',
    'Seasonal Package',
    'Commercial Services',
    'Other',
  ];

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    formState = 'submitting';

    // Simulate form submission — replace with real endpoint
    setTimeout(() => {
      formState = 'success';
    }, 1200);
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
  <div class="container">
    <div bind:this={headingRef} class="contact-header">
      <span class="contact-label">Get in Touch</span>
      <h2 class="contact-title">Free<br />Estimate</h2>
      <p class="contact-sub">
        Tell us about your property and we'll get back to you within 24 hours
        with a no-obligation quote.
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
            <h3 class="success-title">Message Sent</h3>
            <p class="success-text">
              Thanks for reaching out. We'll get back to you within 24 hours.
            </p>
          </div>
        {:else}
          <form onsubmit={handleSubmit} class="contact-form">
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
          <p class="info-text">
            Edmonton, St. Albert, Sherwood Park,<br />
            Spruce Grove, and surrounding areas
          </p>
        </div>

        <div class="info-block">
          <span class="info-label">Hours</span>
          <p class="info-text">
            Monday – Friday: 7 AM – 6 PM<br />
            Saturday: 8 AM – 4 PM<br />
            Snow removal: 24/7
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
      background-color 200ms var(--ease-out-quart),
      border-color 200ms var(--ease-out-quart);
  }

  .form-submit:hover:not(:disabled) {
    background-color: var(--color-brand-hover);
    border-color: var(--color-brand-hover);
  }

  .form-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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
    transition: color 200ms var(--ease-out-quart);
  }

  .info-phone:hover {
    color: var(--color-brand-hover);
  }

  .info-link {
    font-size: var(--text-sm);
    color: var(--color-brand);
    text-decoration: none;
    transition: color 200ms var(--ease-out-quart);
  }

  .info-link:hover {
    color: var(--color-brand-hover);
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
