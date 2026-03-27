type Theme = 'light' | 'dark';

const STORAGE_KEY = 'neo-theme';

export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function setTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.add('theme-transitioning');
  root.classList.toggle('dark', theme === 'dark');
  localStorage.setItem(STORAGE_KEY, theme);

  // Update meta theme-color for mobile browsers
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', theme === 'dark' ? '#0a0f0d' : '#FAFAF8');
  }

  // Remove transition class after animation completes
  setTimeout(() => root.classList.remove('theme-transitioning'), 350);
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}
