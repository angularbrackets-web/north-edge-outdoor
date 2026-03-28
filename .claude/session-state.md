# Session State — Service Starter Template Refactor

## Last Updated
2026-03-28

## Branch
main

## Overall Plan
9-phase refactor to make north-edge-outdoor4 config-driven, then create service-starter template.
Full plan: `~/.claude/plans/glittery-meandering-pike.md`

## Completed Phases

### Phase 1: Config Layer ✅ (commit b458694)
- Created `src/config/site.ts` — TypeScript interfaces + North Edge values for:
  - BusinessConfig (name, phone, email, address, serviceArea, officeHours, socialLinks)
  - BrandConfig (logoPath, logoAlt, faviconPath)
  - ColorPalette (17 tokens each for light + dark themes)
  - FontConfig (heading: Outfit, body: Inter)
  - SEOConfig (titleTemplate, defaultDescription, ogImagePath, locale)
  - FeaturesConfig (enableAdmin, enableQuoting, enableSupabase)
  - BackgroundEffect (discriminated union: none/floatingShapes/flowingPaths/auroraGlow/combo)
  - BackgroundsConfig (per-section effect assignment for 7 sections)
- Created `src/config/content.ts` — TypeScript interfaces + North Edge content for:
  - HeroContent (brandLabel, headline[], subheadline, ctaPrimary, videoSrc, videoPoster)
  - NavContent (links[])
  - ServicesContent (categories[] with subs[], extraServices[], iconPaths record)
  - WhyUsContent (reasons[], stats[])
  - PricingContent (title, note, packages[] with Package interface)
  - AboutContent (story[], pullQuote, image, values[], stats[] with animation data)
  - TestimonialsContent (items[] with quote + author)
  - FAQContent (items[] with question + answer)
  - ContactContent (serviceOptions[], propertySizes[], successMessage)
  - FooterContent (tagline, navLinks[])
- Updated `src/lib/packages.ts` → re-exports Package type + packages array from content.ts

### Phase 2: Background Effect System ✅ (commit d8f35b9)
- Created `src/backgrounds/BackgroundSelector.svelte` — dispatcher component
  - Props: `{ section: keyof typeof siteConfig.backgrounds }`
  - Reads `siteConfig.backgrounds[section]` → renders FloatingShapes / FlowingPaths / AuroraGlow / combo / nothing
  - Combo mode renders FloatingShapes + optionally FlowingPaths together
- Fixed `src/backgrounds/FlowingPaths.svelte` hardcoded colors
  - Replaced `rgba(26, 60, 42, 0.12)` with `var(--color-brand-muted)`
  - Removed redundant `.dark` override (CSS variable handles theme switching)

### Phase 3: CSS + Layout Integration ✅
- Modified `src/layouts/Layout.astro`:
  - Imported siteConfig, replaced hardcoded description/SEO/meta values with config
  - og:site_name, og:image, og:locale, theme-color all config-driven
  - Added `paletteToVars()` helper that maps ColorPalette → CSS custom properties
  - Injected dynamic `<style is:inline>` block that overrides `:root` and `.dark` tokens from siteConfig.colors + siteConfig.fonts
  - Dark theme-color in blocking script uses `define:vars` for config value
- Modified `src/layouts/AdminLayout.astro`:
  - Imported siteConfig, replaced "North Edge Admin" title with `{siteConfig.business.name} Admin`
  - Sidebar brand text reads from config
  - Accent color `#34d399` replaced with `var(--admin-accent)` set via inline style from `siteConfig.colors.dark.brand`

## Next Phase: Phase 4 — Refactor Components
Refactor all 11 components to import config and replace hardcoded strings:
1. Nav.svelte — navLinks, phone, logo
2. Footer.svelte — business name, phone, email, address, tagline, nav links, logo
3. Hero.svelte — brand label, headline, subheadline, CTA, phone, video paths
4. Services.svelte — categories, extraServices, iconPaths, header + BackgroundSelector
5. WhyUs.svelte — reasons, stats, header + BackgroundSelector
6. Pricing.svelte — header, pricing note + BackgroundSelector
7. About.svelte — values, stats, story, pullQuote, image, header + BackgroundSelector
8. Testimonials.svelte — testimonials, header + BackgroundSelector
9. FAQ.svelte — faqs, header, subtitle + BackgroundSelector
10. Contact.svelte — serviceOptions, propertySizes, header, subtitle + BackgroundSelector

## Remaining Phases
- Phase 5: Feature flags (admin, quoting, supabase gates)
- Phase 6: Server-side references (emails.ts, submissions API, astro.config)
- Phase 7: Template scaffolding (.env.example, README, comment cleanup)
- Phase 8: Create service-starter (copy + strip + verify)
- Phase 9: Create /new-client global skill

## Known Issues
- Pre-existing TS error in `src/pages/api/submissions.ts` (null vs undefined for phone/message) — not introduced by us
- Two different phone numbers in codebase: `587-306-6020` (main) vs `780-680-2936` (emails.ts line 40) — will be resolved in Phase 6
- Many pre-existing uncommitted changes in working tree (not related to config refactor)
