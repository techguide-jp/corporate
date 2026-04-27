import type { InternalHref } from '$lib/utils/paths';

export interface NavItem {
  label: string;
  href: InternalHref;
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
  href: InternalHref;
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

export interface ProfileLink {
  label: string;
  href: string;
  image?: string;
  imageAlt?: string;
}

export interface ProfileHeroContent {
  eyebrow: string;
  name: string;
  role: string;
  tagline: string;
  specialties: string[];
  lead: string;
  image: string;
  imageAlt: string;
  highlights: string[];
}

export interface ProfileValueItem {
  id: string;
  title: string;
  description: string;
  points: string[];
  closing: string;
  cta?: ProfileLink;
}

export interface ProfileEventItem {
  date: string;
  dateIso: string;
  status: string;
  isAccepting: boolean;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
}

export interface ProfileEventsSection {
  title: string;
  subtitle: string;
  items: ProfileEventItem[];
}

export interface ProfileCareerItem {
  title: string;
  description: string;
  meta?: string;
}

export interface ProfileInfoGroup {
  title: string;
  items: string[];
}

export interface ProfileBackgroundSection {
  title: string;
  subtitle: string;
  careerItems: ProfileCareerItem[];
  personalGroups: ProfileInfoGroup[];
}

export interface ProfileContactItem {
  platformLabel?: string;
  platformImage?: string;
  platformImageAlt?: string;
  title: string;
  description: string;
  descriptionSegments?: Array<{
    text: string;
    strong?: boolean;
  }>;
  href?: string;
  ctaLabel?: string;
  buttonImage?: string;
  buttonImageAlt?: string;
}

export interface ProfilePageContent {
  hero: ProfileHeroContent;
  overviewTitle: string;
  overviewSubtitle: string;
  overviewParagraphs: string[];
  overviewFocusTitle: string;
  overviewFocusItems: string[];
  background: ProfileBackgroundSection;
  valuesTitle: string;
  valuesSubtitle: string;
  values: ProfileValueItem[];
  events: ProfileEventsSection;
  portfolioTitle: string;
  portfolioSubtitle: string;
  portfolioItems: ShowcaseItem[];
  stanceTitle: string;
  stanceLead: string;
  stanceItems: string[];
  audienceTitle: string;
  audienceItems: string[];
  contactTitle: string;
  contactLead: string;
  contactItems: ProfileContactItem[];
}
