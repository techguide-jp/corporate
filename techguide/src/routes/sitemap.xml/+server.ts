import { pageSeo, siteMetadata } from '$lib/data/site';

export const prerender = true;

const sitemapEntries = [
  { path: pageSeo.home.path, changefreq: 'weekly', priority: '1.0' },
  { path: pageSeo.services.path, changefreq: 'weekly', priority: '0.8' },
  { path: pageSeo.contact.path, changefreq: 'monthly', priority: '0.7' },
] as const;

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${new URL(path, `${siteMetadata.siteUrl}/`).toString()}</loc>
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
