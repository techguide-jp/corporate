import { newsItems } from './news';
import type { NewsItem } from './types';

const publicationDateFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function getCurrentPublicationDate(date = new Date()) {
  const parts = publicationDateFormatter.formatToParts(date);
  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;

  if (!year || !month || !day) {
    return date.toISOString().slice(0, 10);
  }

  return `${year}-${month}-${day}`;
}

function isPublishedNewsItem(item: NewsItem, currentDate = getCurrentPublicationDate()) {
  return item.status === 'published' && item.publishedAt <= currentDate;
}

function compareByPublishedAtDesc(a: NewsItem, b: NewsItem) {
  return b.publishedAt.localeCompare(a.publishedAt);
}

export function getPublishedNewsItems() {
  const currentDate = getCurrentPublicationDate();

  return newsItems
    .filter((item) => isPublishedNewsItem(item, currentDate))
    .sort(compareByPublishedAtDesc);
}

export function getPublishedNewsItemBySlug(slug: string) {
  const item = newsItems.find((newsItem) => newsItem.slug === slug);

  if (!item || !isPublishedNewsItem(item)) {
    return undefined;
  }

  return item;
}

export function formatNewsDate(value: string) {
  return value.replaceAll('-', '.');
}
