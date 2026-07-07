import { error } from '@sveltejs/kit';
import {
  getPublishedArticleBySlug,
  getPublishedArticles,
  getRelatedPublishedArticles,
} from '$lib/articles/get-article';
import type { PageLoad } from './$types';

export const entries = () => getPublishedArticles().map((article) => ({ slug: article.slug }));

export const load: PageLoad = ({ params }) => {
  const article = getPublishedArticleBySlug(params.slug);

  if (!article) {
    error(404, '記事が見つかりません');
  }

  return {
    article,
    relatedArticles: getRelatedPublishedArticles(article.relatedSlugs),
  };
};
