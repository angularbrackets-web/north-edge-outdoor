# North Edge Outdoor v4 — Build Progress

## Session 1: Project Scaffold + Design Tokens (2026-03-27)

### Completed
- [x] Installed pnpm (v10.33.0)
- [x] Created `package.json` with all Phase 1 deps
- [x] Created `astro.config.mjs` (static output, Svelte + Tailwind v4 vite plugin)
- [x] Created `tsconfig.json` (strict, `@/*` path alias)
- [x] Created `.gitignore`
- [x] Created `src/env.d.ts`
- [x] Created full directory structure (`src/`, `public/media/*`)
- [x] Ran `pnpm install` — all deps installed successfully
- [x] Created `src/styles/tokens.css` — full dual-theme token system (light + dark)
- [x] Created `src/styles/global.css` — Tailwind v4 @theme bridge, @font-face, base styles

### Dependency Versions Installed
- astro: 6.1.1
- @astrojs/svelte: 8.0.4
- svelte: 5.55.0
- gsap: 3.14.2
- lenis: 1.3.21
- tailwindcss: 4.2.2
- @tailwindcss/vite: 4.2.2
- lucide-svelte: 0.469.0

## Session 2: Lib + Layout + Components (2026-03-27)

### Completed
- [x] `src/lib/utils.ts` — cn() utility (clsx + tailwind-merge)
- [x] `src/lib/gsap.ts` — GSAP + ScrollTrigger registration, ease presets
- [x] `src/lib/lenis.ts` — smooth scroll init (adapted from v3)
- [x] `src/lib/theme.ts` — theme detection, toggle, localStorage persistence, meta theme-color sync
- [x] `src/lib/animations.ts` — scrollReveal (set/to pattern) + heroEntrance (clip-path stagger)
- [x] `src/components/ThemeToggle.svelte` — Sun/Moon toggle with inline SVG (lucide-svelte had SSR issues)
- [x] `src/layouts/Layout.astro` — base HTML shell with inline theme blocking script, font preloads, Lenis init
- [x] `src/pages/index.astro` — minimal verification page with ThemeToggle
- [x] `pnpm build` — passes clean (867ms, 1 page)
- [x] `pnpm dev` — starts clean on localhost:4321

### Decisions Made
- **Dropped lucide-svelte for ThemeToggle**: SSR module resolution error at build time. Using inline SVG instead. Will reassess lucide-svelte for client-only components in Session 3.
- **Theme blocking script**: Inline `is:inline` script in `<head>` prevents flash of wrong theme on load
- **heroEntrance animation**: Uses clip-path reveal (inset) + translateY + stagger — no SplitText needed

## Session 3: Nav + Hero + Background (2026-03-27)

### Completed
- [x] `src/backgrounds/FlowingPaths.svelte` — SVG flowing paths with GSAP draw-in + floating drift, theme-aware via `--color-brand`
- [x] `src/components/Nav.svelte` — fixed nav with glassmorphism on scroll, mobile fullscreen menu, ThemeToggle, phone CTA (780-680-2936)
- [x] `src/components/Hero.svelte` — full-viewport hero with FlowingPaths bg, staggered GSAP entrance (brand → headline → sub → CTA → scroll cue), dual CTAs (estimate + phone)
- [x] Updated `src/pages/index.astro` — assembles Nav + Hero with `client:load`
- [x] `public/favicon.svg` — dark green "N" badge
- [x] `public/robots.txt` — allows all, points to sitemap
- [x] Added favicon link to `Layout.astro`
- [x] `pnpm build` — passes clean (1.04s, 1 page)
- [x] `pnpm dev` — starts clean on localhost:4321

### Decisions Made
- **No video background in v4 hero**: Replaced v3's video cycling + green layers with SVG FlowingPaths for a cleaner, lighter approach
- **Phone CTA prominent**: Phone number appears in both Nav and Hero CTAs
- **FlowingPaths animation**: 5 SVG paths with staggered draw-in via strokeDasharray/offset, then gentle sine-wave floating drift
- **Nav glassmorphism**: Uses `--glass-bg` + `--glass-border` tokens — adapts automatically for light/dark

### Phase 1 Complete ✓
All 3 sessions done. The hero experience is functional with Nav + Hero + FlowingPaths + theme toggle.

## Phase 2: Page Sections

### Session 4: Services + Why Us + Footer (2026-03-27)

### Completed
- [x] `src/components/Services.svelte` — 4-card grid (Lawn Care, Landscaping, Snow Removal, Seasonal Packages) with inline SVG icons, scroll-reveal via scrollReveal()
- [x] `src/components/WhyUs.svelte` — 4 numbered differentiators (2x2 grid on desktop) + stats bar (8+ years, 500+ properties, 24hr snow, 4.9 rating), scroll-reveal
- [x] `src/components/Footer.svelte` — 3-column layout (brand/tagline, nav links, contact/address), copyright
- [x] Updated `src/pages/index.astro` — added Services (`client:visible`), WhyUs (`client:visible`), Footer (static)
- [x] `pnpm build` — passes clean (1.09s, 1 page)

### Decisions Made
- **Services uses `client:visible`**: Lazy-hydrates only when scrolled into view — keeps initial JS bundle small
- **Footer is static**: No JS needed, rendered server-side only
- **Stats are hardcoded**: Will be easy to update later if needed (no CMS yet)
- **Inline SVG icons**: Consistent with the lucide-svelte SSR workaround from Phase 1

## Session 5: Pricing + About + Contact (2026-03-27)

### Completed
- [x] `src/components/Pricing.svelte` — 3-tier card grid (Lawn Care $149/mo, Year-Round $299/mo, Commercial custom), feature lists, CTAs linking to #contact, scroll-reveal
- [x] `src/components/About.svelte` — split layout: company story (left) + 4 core values in 2x2 grid (right), scroll-reveal
- [x] `src/components/Contact.svelte` — contact form (name, phone, email, service select, message) + info sidebar (phone, email, service area, hours), success state, scroll-reveal
- [x] Updated `src/pages/index.astro` — added Pricing, About, Contact (`client:visible`) before Footer
- [x] `pnpm build` — passes clean (1.18s, 1 page)

### Decisions Made
- **Pricing tiers**: Residential Lawn Care, Year-Round (featured), Commercial (custom quote) — covers the main service bundles
- **Contact form**: Simulated submission with setTimeout — replace with real endpoint when ready
- **About values**: 4 numbered values matching the WhyUs grid pattern
- **All sections use `client:visible`**: Consistent lazy-hydration for below-fold content

### Full Single-Page Layout Complete ✓
All page sections built: Nav → Hero → Services → WhyUs → Pricing → About → Contact → Footer

### Next: Polish & Deploy
- Add real form backend (Formspree, Netlify Forms, etc.)
- Add real images/media to public/media/
- Performance audit & SEO pass
- Deploy
