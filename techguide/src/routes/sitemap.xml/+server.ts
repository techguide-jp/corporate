import { pageSeo } from '$lib/data/site';
import { getPublishedArticles } from '$lib/articles/get-article';
import { buildAbsoluteUrl } from '$lib/seo';

export const prerender = true;

const sitemapEntries = [
  { path: pageSeo.home.path, changefreq: 'weekly', priority: '1.0' },
  { path: pageSeo.services.path, changefreq: 'weekly', priority: '0.8' },
  { path: pageSeo.articles.path, changefreq: 'weekly', priority: '0.7' },
  { path: pageSeo.instagram.path, changefreq: 'monthly', priority: '0.7' },
  { path: pageSeo.profile.path, changefreq: 'monthly', priority: '0.6' },
  { path: '/profile/academy-fes-2026/', changefreq: 'weekly', priority: '0.6' },
  { path: pageSeo.recruit.path, changefreq: 'weekly', priority: '0.7' },
  { path: pageSeo.macclipy.path, changefreq: 'weekly', priority: '0.8' },
  { path: pageSeo.macclipyPrivacy.path, changefreq: 'monthly', priority: '0.4' },
  { path: pageSeo.contact.path, changefreq: 'monthly', priority: '0.7' },
] as const;

export function GET() {
  const entries = [
    ...sitemapEntries,
    ...getPublishedArticles().map((article) => ({
      path: `/articles/${article.slug}/`,
      changefreq: 'monthly',
      priority: '0.6',
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${buildAbsoluteUrl(path)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
