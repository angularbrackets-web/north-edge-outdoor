<script lang="ts">
  import { siteConfig } from '@/config/site';
  import { content } from '@/config/content';

  const currentYear = new Date().getFullYear();
  const phoneNumber = siteConfig.business.phone;
  const phoneHref = `tel:+1${phoneNumber.replace(/-/g, '')}`;

  const navLinks = content.footer.navLinks;
</script>

<footer class="footer" aria-label="Site footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <a href="/" class="footer-logo">
          <img src={siteConfig.brand.logoPath} alt={siteConfig.brand.logoAlt} class="footer-logo-img" />
        </a>
        <p class="footer-tagline">
          {#each content.footer.tagline.split('\n') as line, i}
            {#if i > 0}<br />{/if}{line}
          {/each}
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
        <a href="mailto:{siteConfig.business.email}" class="footer-email">{siteConfig.business.email}</a>
        <address class="footer-address">
          {#each siteConfig.business.address.display.split('\n') as line, i}
            {#if i > 0}<br />{/if}{line}
          {/each}
        </address>
      </div>
    </div>

    <div class="footer-bottom">
      <span class="footer-copy">
        &copy; {currentYear} {siteConfig.business.name}. All rights reserved.
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
    display: inline-block;
    text-decoration: none;
    margin-bottom: var(--space-4);
  }

  .footer-logo-img {
    height: 64px;
    width: auto;
    transition: transform 0.2s ease;
  }

  .footer-logo:hover .footer-logo-img {
    transform: scale(1.08);
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
    position: relative;
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    text-decoration: none;
    display: inline-block;
    transition:
      color var(--duration-normal) var(--ease-out-quart),
      transform var(--duration-normal) var(--ease-out-quart);
  }

  .footer-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--color-brand);
    transform: scaleX(0);
    transform-origin: right center;
    transition: transform var(--duration-normal) var(--ease-out-quart);
  }

  .footer-link:hover {
    color: var(--color-brand);
    transform: translateX(4px);
  }

  .footer-link:hover::after {
    transform: scaleX(1);
    transform-origin: left center;
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
    display: inline-block;
    transition:
      color var(--duration-normal) var(--ease-out-quart),
      transform var(--duration-normal) var(--ease-out-quart);
  }

  .footer-phone:hover {
    color: var(--color-brand-hover);
    transform: scale(1.06);
  }

  .footer-email {
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    text-decoration: none;
    transition:
      color var(--duration-normal) var(--ease-out-quart);
  }

  .footer-email:hover {
    color: var(--color-brand);
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

    .footer-logo-img {
      height: 56px;
    }
  }
</style>
