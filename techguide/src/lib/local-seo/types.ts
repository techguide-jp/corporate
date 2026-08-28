import type { ContactCategoryId } from '$lib/contact/form';
import type { PageSeo } from '$lib/types/content';
import type { InternalHref } from '$lib/utils/paths';

export interface LocalSeoContentItem {
  title: string;
  description: string;
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
  heroTitle: string;
  heroLead: string;
  badges: string[];
  problems: LocalSeoSection<LocalSeoContentItem>;
  primaryLinks?: LocalSeoSection<LocalSeoLinkCard>;
  support: LocalSeoSection<LocalSeoContentItem>;
  examples: LocalSeoSection<string>;
  process: LocalSeoSection<LocalSeoProcessStep>;
  relatedLinks?: LocalSeoSection<LocalSeoLinkCard>;
  contact: LocalSeoContact;
  serviceType?: string;
  showWorks?: boolean;
}
