// ─── Type Definitions ───────────────────────────────────────

export interface BusinessConfig {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: {
    city: string;
    region: string;
    country: string;
    display: string;
  };
  serviceArea: string;
  officeHours: { days: string; hours: string }[];
  socialLinks: { platform: string; url: string; label: string }[];
}

export interface BrandConfig {
  logoPath: string;
  logoAlt: string;
  faviconPath: string;
}

export interface ColorPalette {
  brand: string;
  brandHover: string;
  brandMuted: string;
  brandText: string;
  bg: string;
  bgSubtle: string;
  surface: string;
  surfaceRaised: string;
  border: string;
  borderStrong: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  overlay: string;
  overlaySubtle: string;
  glassBg: string;
  glassBorder: string;
}

export interface FontConfig {
  family: string;
  fallback: string;
}

export interface SEOConfig {
  titleTemplate: string;
  defaultDescription: string;
  ogImagePath: string;
  locale: string;
}

export interface FeaturesConfig {
  enableAdmin: boolean;
  enableQuoting: boolean; // Forward-looking: will gate future quote-builder functionality
  enableSupabase: boolean;
}

export type BackgroundEffect =
  | { type: 'none' }
  | { type: 'floatingShapes'; variant: 'a' | 'b' | 'c' | 'd' | 'e' }
  | { type: 'flowingPaths' }
  | { type: 'auroraGlow' }
  | { type: 'combo'; shapes: 'a' | 'b' | 'c' | 'd' | 'e'; paths: boolean };

export interface BackgroundsConfig {
  services: BackgroundEffect;
  whyUs: BackgroundEffect;
  pricing: BackgroundEffect;
  about: BackgroundEffect;
  testimonials: BackgroundEffect;
  faq: BackgroundEffect;
  contact: BackgroundEffect;
}

export interface SiteConfig {
  business: BusinessConfig;
  brand: BrandConfig;
  colors: {
    light: ColorPalette;
    dark: ColorPalette;
  };
  fonts: {
    heading: FontConfig;
    body: FontConfig;
  };
  seo: SEOConfig;
  features: FeaturesConfig;
  backgrounds: BackgroundsConfig;
}

// ─── North Edge Outdoor Configuration ───────────────────────

export const siteConfig: SiteConfig = {
  business: {
    name: 'North Edge Outdoor',
    tagline: 'Year-round property services for Edmonton and area.',
    phone: '587-306-6020',
    email: 'info@northedgeoutdoor.ca',
    address: {
      city: 'South West Edmonton',
      region: 'Alberta',
      country: 'Canada',
      display: 'South West Edmonton, Alberta\nCanada',
    },
    serviceArea: 'South West Edmonton',
    officeHours: [
      { days: 'Mon \u2013 Fri', hours: '7:00 AM \u2013 7:00 PM' },
      { days: 'Saturday', hours: '9:00 AM \u2013 5:00 PM' },
      { days: 'Sunday', hours: 'Closed' },
    ],
    socialLinks: [],
  },

  brand: {
    logoPath: '/NorthEdgeOutdoorLogo.png',
    logoAlt: 'North Edge Outdoor',
    faviconPath: '/favicon.svg',
  },

  colors: {
    light: {
      brand: '#1a3c2a',
      brandHover: '#2d5a3d',
      brandMuted: 'rgba(26, 60, 42, 0.12)',
      brandText: '#FFFFFF',
      bg: '#FAFAF8',
      bgSubtle: '#F0EDE8',
      surface: '#FFFFFF',
      surfaceRaised: '#F5F3EF',
      border: '#E2DDD5',
      borderStrong: '#C4BDB2',
      text: '#1A1A18',
      textSecondary: '#5C5A54',
      textMuted: '#9C9890',
      overlay: 'rgba(250, 250, 248, 0.7)',
      overlaySubtle: 'rgba(250, 250, 248, 0.4)',
      glassBg: 'rgba(250, 250, 248, 0.82)',
      glassBorder: 'rgba(0, 0, 0, 0.06)',
    },
    dark: {
      brand: '#3ECF8E',
      brandHover: '#5AEAA2',
      brandMuted: 'rgba(62, 207, 142, 0.15)',
      brandText: '#0a0f0d',
      bg: '#0a0f0d',
      bgSubtle: '#0f1512',
      surface: '#141a17',
      surfaceRaised: '#1a211e',
      border: '#243028',
      borderStrong: '#344a3c',
      text: '#E8E4DC',
      textSecondary: '#8A8680',
      textMuted: '#5A5854',
      overlay: 'rgba(10, 15, 13, 0.7)',
      overlaySubtle: 'rgba(10, 15, 13, 0.4)',
      glassBg: 'rgba(10, 15, 13, 0.82)',
      glassBorder: 'rgba(255, 255, 255, 0.06)',
    },
  },

  fonts: {
    heading: { family: 'Outfit', fallback: "'Arial Black', sans-serif" },
    body: { family: 'Inter', fallback: "'Helvetica Neue', Arial, sans-serif" },
  },

  seo: {
    titleTemplate: '%s',
    defaultDescription:
      'Year-round property services in Edmonton. Professional lawn care, landscaping, and snow removal. One company, no gaps, no excuses.',
    ogImagePath: '/media/hero/An_ultra-high-resolution,_cinematic_202603271652.png',
    locale: 'en_CA',
  },

  features: {
    enableAdmin: true,
    enableQuoting: false,
    enableSupabase: true,
  },

  backgrounds: {
    services: { type: 'combo', shapes: 'a', paths: true },
    whyUs: { type: 'floatingShapes', variant: 'b' },
    pricing: { type: 'floatingShapes', variant: 'c' },
    about: { type: 'combo', shapes: 'd', paths: true },
    testimonials: { type: 'auroraGlow' },
    faq: { type: 'floatingShapes', variant: 'c' },
    contact: { type: 'floatingShapes', variant: 'e' },
  },
};
