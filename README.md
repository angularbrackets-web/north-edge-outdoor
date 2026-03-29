# Service Industry Website Template

Config-driven Astro + Svelte website for service industry businesses. All business identity, content, and visual effects are controlled through two config files — no hunting through component code.

## Quick Start

```bash
pnpm install
cp .env.example .env    # edit with your values
pnpm dev                # http://localhost:4321
```

## Configuration

Everything is controlled through two files:

### `src/config/site.ts`

Business identity, branding, colors, and feature flags.

| Section | What it controls |
|---------|-----------------|
| `business` | Name, phone, email, address, service area, office hours, social links |
| `brand` | Logo path, logo alt text, favicon path |
| `colors.light` / `colors.dark` | Full dual-theme color palette (brand, bg, text, surface, border, glass, overlay) |
| `fonts` | Heading and body font families with fallbacks |
| `seo` | Title template, meta description, OG image, locale |
| `features` | Feature flags (see below) |
| `backgrounds` | Per-section background effect assignment |

### `src/config/content.ts`

All section content: hero headlines, service categories, pricing packages, testimonials, FAQ items, about story, contact options, nav links, and footer text.

## Feature Flags

Controlled in `siteConfig.features`:

| Flag | Effect when `false` |
|------|-------------------|
| `enableAdmin` | Admin pages return 404, admin API routes disabled |
| `enableSupabase` | Supabase client throws descriptive error, submissions API returns 503 |
| `enableQuoting` | Reserved for future quote-builder functionality |

For a static marketing site with no backend, set all three to `false` — the contact form will show a graceful error message.

## Background Effects

Each section can have its own background effect, configured in `siteConfig.backgrounds`:

```typescript
{ type: 'none' }                                    // no effect
{ type: 'floatingShapes', variant: 'a' }            // variants a–e
{ type: 'flowingPaths' }                            // animated flowing lines
{ type: 'auroraGlow' }                              // aurora borealis effect
{ type: 'combo', shapes: 'a', paths: true }         // shapes + flowing paths
```

Sections: `services`, `whyUs`, `pricing`, `about`, `testimonials`, `faq`, `contact`.

## Supabase Setup

Required when `enableSupabase` is `true`:

1. Create a Supabase project
2. Create the `submissions` table (schema in `supabase/migrations/`)
3. Add your Supabase URL, anon key, and service role key to `.env`
4. Add your Resend API key to `.env` for email notifications
5. Set `ADMIN_NOTIFICATION_EMAIL` in `.env`

## Deployment

```bash
pnpm build             # outputs to dist/
```

Set the `SITE_URL` environment variable to your production domain. The site is a standard Astro SSR build — deploy to Vercel, Netlify, or any Node-compatible host.

## Project Structure

```
src/
  config/
    site.ts             # business identity, colors, features, backgrounds
    content.ts          # all section content
  backgrounds/          # BackgroundSelector + effect components
  components/           # section components (Hero, Nav, Services, etc.)
  layouts/              # Layout.astro (injects config as CSS vars), AdminLayout.astro
  pages/                # index.astro + admin/ + api/
  styles/
    tokens.css          # design token defaults (overridden by config)
    global.css          # global styles + Tailwind v4
```
