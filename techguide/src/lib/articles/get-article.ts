import { articles } from './articles';

export function getPublishedArticles() {
  return articles.filter((article) => article.status === 'published');
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getPublishedArticleBySlug(slug: string) {
  const article = getArticleBySlug(slug);

  if (!article || article.status !== 'published') {
    return undefined;
  }

  return article;
}

export function getRelatedPublishedArticles(slugs: readonly string[] = []) {
  return slugs
    .map((slug) => getPublishedArticleBySlug(slug))
    .filter((article) => article !== undefined);
}
