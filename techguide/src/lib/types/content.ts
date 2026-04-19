export interface NavItem {
  label: string;
  href: string;
}

export interface ActionLink {
  label: string;
  href: string;
  tone?: 'warm' | 'light';
  analytics?: {
    eventName: 'contact_cta_click';
    params?: Record<string, string>;
  };
}

export interface HeroContent {
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  title: string;
  description: string;
  actions: ActionLink[];
}

export interface ServiceItem {
  title: string;
  description: string;
  href: string;
  kind: 'consulting' | 'development' | 'ai';
  image: string;
  imageAlt: string;
}

export interface StoryFocus {
  title: string;
  description: string;
  points?: string[];
  closing?: string;
}

export interface StoryContent {
  label: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
  focusItems: StoryFocus[];
  missionTitle: string;
  missionItems: string[];
}

export interface ShowcaseItem {
  title: string;
  description: string;
  image: string;
  href: string;
  ctaLabel: string;
}

export interface ServiceVisual {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
  href?: string;
  ctaLabel?: string;
}

export interface CompanyProfile {
  name: string;
  foundedAt: string;
  foundingDateIso: string;
  representative: string;
}

export interface AccessInfo {
  postalCode: string;
  address: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
  mapHref: string;
  embedSrc: string;
}

export interface ContactInfo {
  heading: string;
  description: string;
  email: string;
  formUrl: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  summary: string;
  issues: string[];
  offerings: string[];
  process: string[];
  visual: ServiceVisual;
  relatedItems?: ShowcaseItem[];
}

export interface SiteMetadata {
  brandName: string;
  legalName: string;
  siteUrl: string;
  language: string;
  locale: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultOgImage: string;
  defaultOgImageAlt: string;
  sameAs: string[];
}

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
}

export interface ContactPageContent {
  title: string;
  subtitle: string;
  lead: string;
  inquiryExamples: string[];
  processTitle: string;
  processSteps: string[];
  responseNote: string;
  alternateContactTitle: string;
  alternateContactDescription: string;
}
