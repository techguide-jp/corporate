import type { ContactCategoryId } from '$lib/contact/form';
import type { PageSeo } from '$lib/types/content';
import type { InternalHref } from '$lib/utils/paths';

export interface LocalSeoContentItem {
  title: string;
  description: string;
}

export interface LocalSeoProblemItem extends LocalSeoContentItem {
  audience: string;
}

export interface LocalSeoProblemSection extends LocalSeoSection<LocalSeoProblemItem> {
  bridge: LocalSeoContentItem;
}

export interface LocalSeoTransformationItem {
  before: string;
  after: string;
}

export interface LocalSeoFaqItem {
  question: string;
  answer: string;
}

export interface LocalSeoWorks {
  title: string;
  description: string;
}

export interface LocalSeoStoryImage {
  image: string;
  imageAlt: string;
  caption: string;
}

export interface LocalSeoLinkCard extends LocalSeoContentItem {
  href: InternalHref;
  image: string;
  imageAlt: string;
  ctaLabel: string;
}

export type LocalSeoProcessStep = LocalSeoContentItem;

export interface LocalSeoSection<T> {
  title: string;
  description: string;
  items: T[];
}

export interface LocalSeoContact {
  title: string;
  description: string;
  category: ContactCategoryId;
  subject: string;
  placement: string;
}

export interface LocalSeoPageContent {
  kind: 'hub' | 'service';
  seo: Required<Pick<PageSeo, 'title' | 'description' | 'path' | 'image' | 'imageAlt'>>;
  breadcrumbLabel: string;
  eyebrow: string;
  heroTitleLines: string[];
  heroLead: string;
  heroCtaLabel: string;
  badges: string[];
  problems: LocalSeoProblemSection;
  transformation: LocalSeoSection<LocalSeoTransformationItem>;
  primaryLinks?: LocalSeoSection<LocalSeoLinkCard>;
  support: LocalSeoSection<LocalSeoContentItem>;
  examples: LocalSeoSection<string>;
  process: LocalSeoSection<LocalSeoProcessStep>;
  storyImage: LocalSeoStoryImage;
  relatedLinks?: LocalSeoSection<LocalSeoLinkCard>;
  faq: LocalSeoSection<LocalSeoFaqItem>;
  works?: LocalSeoWorks;
  contact: LocalSeoContact;
  serviceType?: string;
}
