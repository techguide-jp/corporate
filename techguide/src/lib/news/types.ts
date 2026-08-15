export type NewsCategory = 'company' | 'event' | 'product' | 'recruit' | 'service' | 'work';

export type NewsStatus = 'draft' | 'published';

export interface NewsSection {
  title: string;
  paragraphs: string[];
  points?: string[];
}

export interface NewsLink {
  label: string;
  href: string;
  tone?: 'warm' | 'light';
}

export interface NewsImage {
  src: string;
  alt: string;
  position?: string;
}

export interface NewsItem {
  slug: string;
  title: string;
  description: string;
  category: NewsCategory;
  status: NewsStatus;
  publishedAt: string;
  updatedAt?: string;
  lead: string;
  image?: NewsImage;
  sections: NewsSection[];
  links?: NewsLink[];
}
