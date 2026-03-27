<script lang="ts">
  import { onMount } from 'svelte';
  import ThemeToggle from './ThemeToggle.svelte';

  let scrolled = $state(false);
  let mobileOpen = $state(false);

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function toggleMobile() {
    mobileOpen = !mobileOpen;
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }

  function closeMobile() {
    mobileOpen = false;
    document.body.style.overflow = '';
  }

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const phoneNumber = '780-680-2936';
  const phoneHref = `tel:+1${phoneNumber.replace(/-/g, '')}`;
</script>

<header class="nav" class:scrolled>
  <nav class="nav-inner" aria-label="Main navigation">
    <a href="/" class="nav-logo">North Edge</a>

    <div class="nav-links" class:open={mobileOpen}>
      {#each navLinks as link}
        <a href={link.href} class="nav-link" onclick={closeMobile}>{link.label}</a>
      {/each}
      <a href={phoneHref} class="nav-cta" onclick={closeMobile}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        {phoneNumber}
      </a>
    </div>

    <div class="nav-actions">
      <ThemeToggle />
      <button
        class="nav-toggle"
        onclick={toggleMobile}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
      >
        <span class="toggle-line" class:open={mobileOpen}></span>
        <span class="toggle-line" class:open={mobileOpen}></span>
      </button>
    </div>
  </nav>
</header>

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: var(--space-4) var(--container-padding-mobile);
    transition: background-color 0.3s ease, backdrop-filter 0.3s ease, padding 0.3s ease;
  }

  @media (min-width: 768px) {
    .nav {
      padding: var(--space-4) var(--container-padding);
    }
  }

  .nav.scrolled {
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--glass-border);
    padding-top: var(--space-3);
    padding-bottom: var(--space-3);
  }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: var(--max-w-wide);
    margin: 0 auto;
  }

  .nav-logo {
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--color-text);
    text-decoration: none;
    letter-spacing: var(--tracking-tight);
    text-transform: uppercase;
  }

  .nav-logo:hover {
    color: var(--color-text);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: var(--space-8);
  }

  .nav-link {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--color-text-secondary);
    text-decoration: none;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    transition: color 0.2s ease;
  }

  .nav-link:hover {
    color: var(--color-text);
  }

  .nav-cta {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    height: 40px;
    padding: 0 var(--space-5);
    background-color: var(--color-brand);
    color: var(--color-brand-text);
    font-family: var(--font-body);
    font-weight: 500;
    font-size: var(--text-xs);
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    text-decoration: none;
    transition: background-color 0.2s ease;
  }

  .nav-cta:hover {
    background-color: var(--color-brand-hover);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .nav-toggle {
    display: none;
    flex-direction: column;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    z-index: 101;
  }

  .toggle-line {
    display: block;
    width: 24px;
    height: 2px;
    background-color: var(--color-text);
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .toggle-line.open:first-child {
    transform: translateY(4px) rotate(45deg);
  }

  .toggle-line.open:last-child {
    transform: translateY(-4px) rotate(-45deg);
  }

  @media (max-width: 768px) {
    .nav-links {
      position: fixed;
      inset: 0;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-8);
      background-color: var(--color-bg);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      z-index: 100;
    }

    .nav-links.open {
      opacity: 1;
      pointer-events: auto;
    }

    .nav-link {
      font-size: var(--text-lg);
    }

    .nav-toggle {
      display: flex;
    }
  }
</style>
