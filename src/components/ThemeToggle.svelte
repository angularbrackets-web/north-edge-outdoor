<script lang="ts">
  import { onMount } from 'svelte';
  import { getTheme, toggleTheme } from '@/lib/theme';

  let isDark = $state(false);

  onMount(() => {
    isDark = getTheme() === 'dark';
  });

  function handleToggle() {
    const next = toggleTheme();
    isDark = next === 'dark';
  }
</script>

<button
  onclick={handleToggle}
  class="theme-toggle"
  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
>
  {#if isDark}
    <!-- Sun icon -->
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  {:else}
    <!-- Moon icon -->
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  {/if}
</button>

<style>
  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    border: 1px solid var(--color-border);
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    color: var(--color-text);
    cursor: pointer;
    transition: border-color 0.2s ease, background-color 0.2s ease;
  }

  .theme-toggle:hover {
    border-color: var(--color-brand);
  }
</style>
