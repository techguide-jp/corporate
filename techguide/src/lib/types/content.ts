export interface NavItem {
  label: string;
  href: string;
}

export interface ActionLink {
  label: string;
  href: string;
  tone?: 'warm' | 'light';
}

export interface HeroContent {
  image: string;
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
  representative: string;
}

export interface AccessInfo {
  postalCode: string;
  address: string;
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
}
