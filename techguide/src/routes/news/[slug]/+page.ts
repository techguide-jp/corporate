import { error } from '@sveltejs/kit';
import { getPublishedNewsItemBySlug, getPublishedNewsItems } from '$lib/news/get-news';
import type { PageLoad } from './$types';

export const entries = () => getPublishedNewsItems().map((item) => ({ slug: item.slug }));

export const load: PageLoad = ({ params }) => {
  const item = getPublishedNewsItemBySlug(params.slug);

  if (!item) {
    error(404, 'お知らせが見つかりません');
  }

  return { item };
};
