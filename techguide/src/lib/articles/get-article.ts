import { articles } from './articles';
import type { Article } from './types';

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

function isPublishedArticle(article: Article, currentDate = getCurrentPublicationDate()) {
  return article.status === 'published' && article.publishedAt <= currentDate;
}

function compareByPublishedAtDesc(a: Article, b: Article) {
  return b.publishedAt.localeCompare(a.publishedAt);
}

export function getPublishedArticles() {
  const currentDate = getCurrentPublicationDate();

  return articles
    .filter((article) => isPublishedArticle(article, currentDate))
    .sort(compareByPublishedAtDesc);
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getPublishedArticleBySlug(slug: string) {
  const article = getArticleBySlug(slug);

  if (!article || !isPublishedArticle(article)) {
    return undefined;
  }

  return article;
}

export function getRelatedPublishedArticles(slugs: readonly string[] = []) {
  return slugs
    .map((slug) => getPublishedArticleBySlug(slug))
    .filter((article) => article !== undefined);
}
