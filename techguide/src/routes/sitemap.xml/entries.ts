import { CHIGASAKI_PATHS } from '../../lib/local-seo/chigasaki/paths.ts';

export const chigasakiSitemapEntries = [
  { path: CHIGASAKI_PATHS.hub, changefreq: 'monthly', priority: '0.8' },
  { path: CHIGASAKI_PATHS.homepage, changefreq: 'monthly', priority: '0.7' },
  { path: CHIGASAKI_PATHS.development, changefreq: 'monthly', priority: '0.7' },
  { path: CHIGASAKI_PATHS.improvement, changefreq: 'monthly', priority: '0.7' },
] as const;
