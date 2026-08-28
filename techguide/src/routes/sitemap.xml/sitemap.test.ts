import assert from 'node:assert/strict';
import test from 'node:test';
import { chigasakiSitemapEntries } from './entries.ts';
import { renderSitemap } from './sitemap.ts';

const chigasakiUrls = [
  'https://techguide.jp/chigasaki/',
  'https://techguide.jp/chigasaki/homepage/',
  'https://techguide.jp/chigasaki/system-development/',
  'https://techguide.jp/chigasaki/business-improvement/',
];

await test('includes every Chigasaki SEO page exactly once', () => {
  const body = renderSitemap([...chigasakiSitemapEntries], (path) =>
    new URL(path, 'https://techguide.jp').toString(),
  );

  for (const url of chigasakiUrls) {
    const occurrences = body.split(`<loc>${url}</loc>`).length - 1;
    assert.equal(occurrences, 1, `${url} should appear exactly once`);
  }
});
