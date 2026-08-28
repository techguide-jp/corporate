interface SitemapEntry {
  path: string;
  changefreq: string;
  priority: string;
}

export function renderSitemap(
  entries: SitemapEntry[],
  buildAbsoluteUrl: (path: string) => string,
): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
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
}
