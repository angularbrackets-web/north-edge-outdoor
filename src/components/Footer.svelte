<script lang="ts">
  const currentYear = new Date().getFullYear();
  const phoneNumber = '780-680-2936';
  const phoneHref = `tel:+1${phoneNumber.replace(/-/g, '')}`;

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];
</script>

<footer class="footer" aria-label="Site footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <a href="/" class="footer-logo">North Edge<br />Outdoor</a>
        <p class="footer-tagline">
          Year-round property services<br />for Edmonton and area.
        </p>
      </div>

      <nav class="footer-nav" aria-label="Footer navigation">
        <span class="footer-nav-label">Navigation</span>
        {#each navLinks as link}
          <a href={link.href} class="footer-link">{link.label}</a>
        {/each}
      </nav>

      <div class="footer-contact">
        <span class="footer-nav-label">Get in Touch</span>
        <a href={phoneHref} class="footer-phone">{phoneNumber}</a>
        <address class="footer-address">
          Edmonton, Alberta<br />
          Canada
        </address>
      </div>
    </div>

    <div class="footer-bottom">
      <span class="footer-copy">
        &copy; {currentYear} North Edge Outdoor. All rights reserved.
      </span>
    </div>
  </div>
</footer>

<style>
  .footer {
    background-color: var(--color-surface);
    border-top: 1px solid var(--color-border);
    padding-block: var(--space-16);
  }

  .footer-top {
    display: grid;
    gap: var(--space-12);
    padding-bottom: var(--space-12);
    border-bottom: 1px solid var(--color-border);
  }

  @media (min-width: 768px) {
    .footer-top {
      grid-template-columns: 2fr 1fr 1fr;
      gap: var(--space-16);
    }
  }

  /* ── Brand ── */
  .footer-logo {
    display: block;
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: var(--text-lg);
    line-height: var(--leading-heading);
    letter-spacing: var(--tracking-tight);
    text-transform: uppercase;
    color: var(--color-text);
    text-decoration: none;
    margin-bottom: var(--space-4);
  }

  .footer-logo:hover {
    color: var(--color-brand);
  }

  .footer-tagline {
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    color: var(--color-text-secondary);
    margin: 0;
  }

  /* ── Nav column ── */
  .footer-nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .footer-nav-label {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    color: var(--color-text-muted);
    margin-bottom: var(--space-2);
  }

  .footer-link {
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 200ms var(--ease-out-quart);
  }

  .footer-link:hover {
    color: var(--color-text);
  }

  /* ── Contact column ── */
  .footer-contact {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .footer-phone {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--color-brand);
    text-decoration: none;
    transition: color 200ms var(--ease-out-quart);
  }

  .footer-phone:hover {
    color: var(--color-brand-hover);
  }

  .footer-address {
    font-style: normal;
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    color: var(--color-text-secondary);
  }

  /* ── Bottom ── */
  .footer-bottom {
    padding-top: var(--space-8);
  }

  .footer-copy {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
    letter-spacing: var(--tracking-wide);
  }

  /* ── Mobile ── */
  @media (max-width: 767px) {
    .footer {
      padding-block: var(--space-12);
    }

    .footer-logo {
      font-size: var(--text-base);
    }
  }
</style>
