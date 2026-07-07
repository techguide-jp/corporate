import type { AnalyticsMetadata } from '$lib/analytics';

export type ArticleCategory =
  | 'techguide-approach'
  | 'it-adoption'
  | 'ai-adoption'
  | 'business-technology-alignment'
  | 'prototype-process'
  | 'event-community';

export type ArticleStatus = 'draft' | 'published';

export type ArticleCtaTarget =
  | 'techguide-contact'
  | 'techguide-service'
  | 'ready-mock'
  | 'ready-mock-article'
  | 'internal-article'
  | 'external-case';

export type ArticleCtaPlacement = 'inline' | 'bottom' | 'related';

export interface ArticleCta {
  label: string;
  href: string;
  description?: string;
  eventName: AnalyticsMetadata['eventName'];
  target: ArticleCtaTarget;
  placement: ArticleCtaPlacement;
  tone?: 'warm' | 'light';
  isExternal?: boolean;
}

export interface ArticleTextLink {
  type: 'link';
  text: string;
  href: string;
  eventName: AnalyticsMetadata['eventName'];
  target: ArticleCtaTarget;
  isExternal?: boolean;
}

export type ArticleTextSegment = string | ArticleTextLink;
export type ArticleTextContent = string | readonly ArticleTextSegment[];

export type ArticleContentBlock =
  | {
      type: 'heading';
      id: string;
      text: string;
      level?: 2 | 3;
    }
  | {
      type: 'paragraph';
      text: ArticleTextContent;
    }
  | {
      type: 'list';
      items: ArticleTextContent[];
    }
  | {
      type: 'quote';
      text: string;
    }
  | {
      type: 'cta';
      cta: ArticleCta;
    };

export interface ArticleSeo {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  imageAlt?: string;
}

export interface ArticleThumbnail {
  src: string;
  alt: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  tags: string[];
  status: ArticleStatus;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes?: number;
  thumbnail?: ArticleThumbnail;
  lead: string;
  blocks: ArticleContentBlock[];
  primaryCta?: ArticleCta;
  secondaryCta?: ArticleCta;
  relatedSlugs?: string[];
  seo: ArticleSeo;
}
