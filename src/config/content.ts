// ─── Type Definitions ───────────────────────────────────────

export interface HeroContent {
  brandLabel: string;
  headline: string[];
  subheadline: string;
  ctaPrimary: { text: string; href: string };
  videoSrc?: string;
  videoPoster?: string;
}

export interface NavContent {
  links: { label: string; href: string }[];
}

export interface ServiceSub {
  title: string;
  icon: string;
  description: string;
}

export interface ServiceCategory {
  title: string;
  image: string;
  description: string;
  subs: ServiceSub[];
}

export interface ExtraService {
  title: string;
  image: string;
  description: string;
  season: string;
}

export interface ServicesContent {
  label: string;
  title: string;
  subtitle: string;
  categories: ServiceCategory[];
  extraServices: ExtraService[];
  iconPaths: Record<string, string>;
}

export interface WhyUsReason {
  number: string;
  title: string;
  description: string;
}

export interface WhyUsStat {
  value: string;
  label: string;
}

export interface WhyUsContent {
  label: string;
  title: string;
  reasons: WhyUsReason[];
  stats: WhyUsStat[];
}

export interface Package {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  featured: boolean;
  lineItems: { description: string; unitPrice: number; quantity: number }[];
}

export interface PricingContent {
  title: string;
  note: string;
  packages: Package[];
}

export interface CoreValue {
  title: string;
  description: string;
}

export interface AboutStat {
  value: number;
  suffix: string;
  label: string;
  decimal: boolean;
}

export interface AboutContent {
  label: string;
  title: string;
  story: string[];
  pullQuote: string;
  image: string;
  imageAlt: string;
  values: CoreValue[];
  stats: AboutStat[];
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface TestimonialsContent {
  label: string;
  title: string;
  items: Testimonial[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQContent {
  label: string;
  title: string;
  subtitle: string;
  items: FAQItem[];
}

export interface ContactContent {
  label: string;
  title: string;
  subtitle: string;
  serviceOptions: string[];
  propertySizes: string[];
  successMessage: { title: string; text: string };
}

export interface FooterContent {
  tagline: string;
  navLinks: { label: string; href: string }[];
}

export interface SiteContent {
  hero: HeroContent;
  nav: NavContent;
  services: ServicesContent;
  whyUs: WhyUsContent;
  pricing: PricingContent;
  about: AboutContent;
  testimonials: TestimonialsContent;
  faq: FAQContent;
  contact: ContactContent;
  footer: FooterContent;
}

// ─── North Edge Outdoor Content ─────────────────────────────

export const content: SiteContent = {
  hero: {
    brandLabel: 'North Edge Outdoor',
    headline: ['Your Property,', 'Every Season'],
    subheadline:
      'Year-round lawn care, landscaping, and snow removal in Edmonton. One company, no gaps, no excuses.',
    ctaPrimary: { text: 'Get a Free Estimate', href: '#contact' },
    videoSrc: '/media/hero/Lawn_care_on_202603271642.mp4',
    videoPoster: '/media/hero/An_ultra-high-resolution,_cinematic_202603271652.png',
  },

  nav: {
    links: [
      { label: 'Services', href: '#services' },
      { label: 'Why Us', href: '#why-us' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'About', href: '#about' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
  },

  services: {
    label: 'What We Do',
    title: 'Built for\nEvery Season',
    subtitle:
      'Edmonton weather doesn\u2019t take days off \u2014 neither do we. From first mow to last plow, North Edge handles your property year-round.',
    categories: [
      {
        title: 'Professional Lawn Care & Mowing',
        image: '/media/lawn-care/Suburban_lawn_meets_202603271702.jpeg',
        description:
          'Expert mowing for residential and commercial properties throughout SW Edmonton. Our service includes precise edging, perimeter trimming, and thorough clipping removal \u2014 plus nutrient-rich fertilizer treatments to keep your yard healthy and vibrant.',
        subs: [
          {
            title: 'Lawn Mowing',
            icon: 'mow',
            description:
              'Skip the hassle! Enjoy a well-maintained lawn all year with our reliable, scheduled mowing services.',
          },
          {
            title: 'Weed Control',
            icon: 'weed',
            description:
              'Enhance your lawn\u2019s look with precise edging, creating clean borders for a polished, well-maintained appearance.',
          },
          {
            title: 'Lawn Fertilization',
            icon: 'fertilize',
            description:
              'Nourish your lawn with nutrient-rich fertilization, promoting healthy growth, vibrant color, and long-lasting resilience.',
          },
        ],
      },
      {
        title: 'Landscaping',
        image: '/media/landscaping/Construction_worker_building_202603271705.jpeg',
        description:
          'Expert design, installation, and maintenance for your outdoor space. Whether you need a complete landscape overhaul or routine upkeep, our team delivers exceptional results that enhance your property.',
        subs: [
          {
            title: 'Landscaping',
            icon: 'landscape',
            description:
              'Transform your outdoor space with expert landscaping services, including design, installation, and ongoing maintenance.',
          },
          {
            title: 'Hardscaping',
            icon: 'hardscape',
            description:
              'Professional patios, walkways, retaining walls, and stone features that elevate your outdoor living.',
          },
          {
            title: 'Tree Trimming',
            icon: 'tree',
            description:
              'Keep your trees healthy and beautiful with expert trimming, promoting growth and maintaining safety.',
          },
        ],
      },
      {
        title: 'Yard Cleanup',
        image: '/media/cleanup/Workers_clearing_autumn_202603271710.jpeg',
        description:
          'Comprehensive services to restore and maintain your outdoor space. From seasonal cleanups to debris removal, we ensure your yard stays neat, tidy, and welcoming all year round.',
        subs: [
          {
            title: 'Leaf Removal',
            icon: 'leaf',
            description:
              'Efficient leaf removal services for a clean yard, ensuring your outdoor space is tidy year-round.',
          },
          {
            title: 'Yard Cleanup',
            icon: 'cleanup',
            description:
              'Full-service yard cleanup to keep your property healthy, preventing unwanted growth and promoting lush greenery.',
          },
          {
            title: 'Debris Removal',
            icon: 'debris',
            description:
              'Reliable debris removal \u2014 leaves, branches, and other unwanted materials cleared quickly and completely.',
          },
        ],
      },
    ],
    extraServices: [
      {
        title: 'Snow Removal',
        image: '/media/Truck_pushing_snow_202603271709.jpeg',
        description:
          'Residential and commercial clearing with 24-hour response. Plowing, sanding, and sidewalk service \u2014 no storm is too early.',
        season: 'Winter',
      },
      {
        title: 'Seasonal Packages',
        image: '/media/cleanup/Workers_clearing_autumn_202603271710.jpeg',
        description:
          'One contract covers every month. Spring cleanup, summer maintenance, fall prep, and winter clearing \u2014 seamless year-round care.',
        season: 'Year-Round',
      },
    ],
    iconPaths: {
      mow: 'M4 20h16M6 16V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8M9 12h6M12 9v6',
      weed: 'M12 22V8M12 8C12 8 8 4 5 4M12 8c0 0 4-4 7-4M12 14c0 0-3-2-5-2M12 14c0 0 3-2 5-2M12 18c0 0-2-1.5-4-1.5M12 18c0 0 2-1.5 4-1.5',
      fertilize: 'M12 3v19M7 21c0-3 2-5 5-8 3 3 5 5 5 8M9 7l3-4 3 4M8 12l4-3 4 3',
      landscape: 'M2 22L12 6l10 16H2ZM7 22l5-8 5 8',
      hardscape: 'M2 22h20M4 22V10l4-4 4 4 4-4 4 4v12M4 14h16M8 14v8M12 14v8M16 14v8',
      tree: 'M12 22v-6M12 16C8 16 5 12 5 8c0-3 3-6 7-6s7 3 7 6c0 4-3 8-7 8Z',
      leaf: 'M17 8C8 10 5.9 16.9 3.9 19.9M5 20s3-1 6.5-3.5C15 14 17 11 17 8c0-3-3-5-6-5s-6 2-6 5c0 3.5 2.5 6 5 6.5',
      cleanup:
        'M3 6h18M6 6v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M10 11v6M14 11v6',
      debris: 'M16 4l4 4-4 4M20 8H8M8 20l-4-4 4-4M4 16h12M12 2v4M12 18v4',
    },
  },

  whyUs: {
    label: 'Why North Edge',
    title: 'The Difference\nIs in the Details',
    reasons: [
      {
        number: '01',
        title: 'One Company, Every Season',
        description:
          'No juggling contractors. Lawn care in summer, snow removal in winter \u2014 one team, one invoice, zero gaps between seasons.',
      },
      {
        number: '02',
        title: '24-Hour Snow Response',
        description:
          'When the storm hits at 3 AM, we\u2019re already deploying. Commercial and residential properties cleared before your morning starts.',
      },
      {
        number: '03',
        title: 'Edmonton-Built',
        description:
          'We don\u2019t guess at what works here \u2014 we live it. Our methods, equipment, and timing are built for Alberta\u2019s extremes.',
      },
      {
        number: '04',
        title: 'No Contracts Required',
        description:
          'We earn your business every visit. Seasonal packages available, but you\u2019re never locked in. Stay because the work speaks.',
      },
    ],
    stats: [
      { value: '8+', label: 'Years in Edmonton' },
      { value: '500+', label: 'Properties Served' },
      { value: '24hr', label: 'Snow Response' },
      { value: '4.9', label: 'Google Rating' },
    ],
  },

  pricing: {
    title: 'Flexible lawn packages',
    note: 'All residential prices based on standard lot sizes. Final pricing confirmed after property assessment.',
    packages: [
      {
        id: 'essentials',
        name: 'Essentials Package',
        price: '85',
        period: 'per month',
        description: 'Perfect for regular yard upkeep on smaller lots.',
        features: ['Bi-weekly mowing (12 visits total)', 'Includes trimming, edging, and blowing'],
        cta: 'Get Started',
        featured: false,
        lineItems: [
          { description: 'Bi-weekly mowing (12 visits)', unitPrice: 85, quantity: 1 },
        ],
      },
      {
        id: 'growth',
        name: 'Growth Package',
        price: '165',
        period: 'per month',
        description: 'Ideal for customers who want a healthy, green lawn.',
        features: ['Bi-weekly mowing', 'Monthly Aeration (3 applications)'],
        cta: 'Get Started',
        featured: false,
        lineItems: [
          { description: 'Bi-weekly mowing', unitPrice: 115, quantity: 1 },
          { description: 'Monthly aeration (3 applications)', unitPrice: 50, quantity: 1 },
        ],
      },
      {
        id: 'root-strength',
        name: 'Root Strength Package',
        price: '195',
        period: 'per month',
        description: 'For thicker, lush lawns and active focused maintenance.',
        features: ['Weekly mowing (20 visits)', 'Weekly fertilization', 'Monthly fertilization'],
        cta: 'Get Started',
        featured: false,
        lineItems: [
          { description: 'Weekly mowing (20 visits)', unitPrice: 135, quantity: 1 },
          { description: 'Fertilization program', unitPrice: 60, quantity: 1 },
        ],
      },
      {
        id: 'total-wellness',
        name: 'Total Lawn Wellness Package',
        price: '230',
        period: 'per month',
        description:
          'Best for homeowners who want premium lawn care protection and a full-service experience.',
        features: [
          'Weekly mowing',
          'Weekly fertilization',
          'Optional upgrade: overseeding or soil amendment',
        ],
        cta: 'Get Started',
        featured: true,
        lineItems: [
          { description: 'Weekly mowing', unitPrice: 135, quantity: 1 },
          { description: 'Weekly fertilization', unitPrice: 60, quantity: 1 },
          { description: 'Premium lawn monitoring', unitPrice: 35, quantity: 1 },
        ],
      },
    ],
  },

  about: {
    label: 'About Us',
    title: 'Built for\nEdmonton',
    story: [
      'North Edge started with a truck, a mower, and the simple belief that property care shouldn\u2019t be complicated. Eight years later, we service over 500 residential and commercial properties across Edmonton and surrounding areas.',
      'We built this company for Alberta\u2019s extremes \u2014 the long winters, the short growing seasons, the storms that don\u2019t check the forecast. One team handles your property year-round so you never have to coordinate between contractors or wonder who\u2019s showing up next.',
      'Every crew member lives locally, knows the climate, and takes ownership of the properties they maintain.',
    ],
    pullQuote: 'We treat your property like it\u2019s ours.',
    image: '/media/general/Suburban_home_with_202603271712.jpeg',
    imageAlt: 'Well-maintained Edmonton property with landscaping',
    values: [
      {
        title: 'Show Up',
        description:
          'Every visit, on time, no excuses. Your property doesn\u2019t wait for the weekend \u2014 neither do we.',
      },
      {
        title: 'Do It Right',
        description:
          'Clean edges, straight lines, clear walks. We take pride in work that speaks before we do.',
      },
      {
        title: 'Think Ahead',
        description:
          'We prepare your property for next season while servicing this one. No gaps, no scramble.',
      },
      {
        title: 'Stay Local',
        description:
          'Edmonton-owned, Edmonton-operated. We live on the same streets we service.',
      },
    ],
    stats: [
      { value: 8, suffix: '+', label: 'Years', decimal: false },
      { value: 500, suffix: '+', label: 'Properties', decimal: false },
      { value: 365, suffix: '', label: 'Days / Year', decimal: false },
    ],
  },

  testimonials: {
    label: 'What Our Clients Say',
    title: 'Trusted by\nHomeowners',
    items: [
      {
        quote: 'Very honest, hard-working, and dependable people. Well worth the money spent.',
        author: 'Michael D.',
      },
      {
        quote: 'They did an incredible job with an incredibly daunting project.',
        author: 'Tom D.',
      },
    ],
  },

  faq: {
    label: 'FAQ',
    title: 'Common\nQuestions',
    subtitle:
      'Everything you need to know about our lawn care and landscaping services.',
    items: [
      {
        question: 'What services do you offer?',
        answer:
          'We offer a variety of lawn care and landscaping services, including lawn mowing, edging, fertilization, weed control, tree trimming, hardscaping, and landscape design. We also provide seasonal services like leaf removal and debris cleanup.',
      },
      {
        question: 'How often should I mow my lawn?',
        answer:
          'The frequency of mowing depends on the season and grass type, but generally, we recommend mowing once a week during peak growing seasons (spring and summer) and less frequently in fall and winter.',
      },
      {
        question: 'Do you offer seasonal clean-up services?',
        answer:
          'Yes! We provide spring and fall clean-up services, including leaf removal, debris cleanup, and yard preparation for the changing seasons.',
      },
      {
        question: 'How can I schedule an appointment?',
        answer:
          'You can schedule an appointment by contacting us through our website, calling our office, or sending an email. We\u2019ll work with you to find a convenient time for your lawn care or landscaping needs.',
      },
      {
        question: 'Do you provide free quotes?',
        answer:
          'Yes, we offer free quotes for all our services. Simply get in touch with us, and we\u2019ll assess your needs and provide an accurate estimate based on the size and scope of the project.',
      },
      {
        question: 'What type of fertilizer do you use?',
        answer:
          'We use nutrient-rich fertilizers tailored to the specific needs of your lawn. Our fertilizers promote healthy growth, vibrant color, and long-lasting results. We can also recommend organic options for eco-friendly lawn care.',
      },
      {
        question: 'Do you handle larger landscaping projects?',
        answer:
          'Yes, we specialize in both small and large landscaping projects, including hardscaping, landscape design, and installation. Whether you need a new patio, retaining wall, or garden design, our team is here to help.',
      },
      {
        question: 'Are your services available year-round?',
        answer:
          'Yes, we offer year-round services, including snow removal in the winter and lawn care during the warmer months. We\u2019re here to maintain your outdoor space throughout all seasons.',
      },
    ],
  },

  contact: {
    label: 'Get in Touch',
    title: 'Free\nEstimate',
    subtitle:
      'Tell us about your property and we\u2019ll get back to you within 24 hours with a no-obligation quote.',
    serviceOptions: [
      'Lawn Care',
      'Landscaping',
      'Snow Removal',
      'Seasonal Package',
      'Commercial Services',
      'Other',
    ],
    propertySizes: [
      'Small \u2014 Grass 1,000 to 2,500 sq ft',
      'Medium \u2014 Grass 2,500 to 3,500 sq ft',
      'Large \u2014 Grass 3,500 to 5,500 sq ft',
      'My Property is Different',
    ],
    successMessage: {
      title: 'Message Sent',
      text: 'Thanks for reaching out. We\u2019ll get back to you within 24 hours.',
    },
  },

  footer: {
    tagline: 'Year-round property services\nfor Edmonton and area.',
    navLinks: [
      { label: 'Services', href: '#services' },
      { label: 'Why Us', href: '#why-us' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'About', href: '#about' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
  },
};

// ─── Package Re-exports ─────────────────────────────────────

export const packages = content.pricing.packages;
