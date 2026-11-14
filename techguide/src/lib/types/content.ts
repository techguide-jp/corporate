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
  descriptionLines: string[][];
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

export interface StoryPrinciple {
  title: string;
  description: string;
}

export interface StoryContent {
  label: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
  focusItems: StoryFocus[];
  vision: {
    title: string;
    paragraphs: string[];
  };
  missionTitle: string;
  missionItems: StoryPrinciple[];
  valuesTitle: string;
  valuesIntro: string;
  values: StoryPrinciple[];
}

export interface ShowcaseItem {
  title: string;
  description: string;
  scope?: string;
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
  videoLink?: Pick<ActionLink, 'label' | 'href'>;
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
  formTitle: string;
  formDescription: string;
}

export interface ProfileHeroContent {
  name: string;
  role: string;
  lead: string;
  experience: string;
  image: string;
  imageAlt: string;
}

export interface ProfileValueItem {
  title: string;
  description: string;
  cta: { label: string; href: string };
}

export interface ProfileEventItem {
  dateIso: string;
  title: string;
  description?: string;
  href?: string;
  status?: '受付開始前' | '申込受付中' | '受付終了' | '満席';
}

export interface ProfileCareerItem {
  title: string;
  description?: string;
}

export interface ProfileInfoGroup {
  title: string;
  items: string[];
}

export interface ProfileBackgroundSection {
  title: string;
  careerItems: ProfileCareerItem[];
  personalGroups: ProfileInfoGroup[];
}

interface ProfileContactPlatform {
  platformLabel: string;
  platformImage?: string;
}

interface ProfileContactLink {
  title: string;
  href: string;
}

export type ProfileContactItem = ProfileContactPlatform &
  (
    | (ProfileContactLink & { description: string })
    | { links: (ProfileContactLink & { label: string })[] }
  );

export interface ProfilePageContent {
  hero: ProfileHeroContent;
  background: ProfileBackgroundSection;
  valuesTitle: string;
  values: ProfileValueItem[];
  pastEvents: ProfileEventItem[];
  portfolioTitle: string;
  portfolioItems: ShowcaseItem[];
  contactItems: ProfileContactItem[];
}
