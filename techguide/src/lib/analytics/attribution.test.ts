import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createVisitTracker,
  normalizeAttributionPage,
  sanitizeAnalyticsUrl,
} from './attribution.ts';

await test('keeps the landing page through navigation, contact reload and return visits', () => {
  const saved = new Map<string, string>();
  const storage = {
    getItem: (key: string) => saved.get(key) ?? null,
    setItem: (key: string, value: string) => {
      saved.set(key, value);
    },
  };
  let time = 1000;
  const visit = createVisitTracker(storage, () => time);
  visit('/chigasaki/homepage/');
  time += 1000;
  visit('/chigasaki/system-development/');
  assert.deepEqual(visit('/contact/'), {
    landingPage: '/chigasaki/homepage/',
    sourcePage: '/chigasaki/system-development/',
  });
  const reload = createVisitTracker(storage, () => time);
  assert.deepEqual(reload('/contact/'), {
    landingPage: '/chigasaki/homepage/',
    sourcePage: '/chigasaki/system-development/',
  });
  time += 30 * 60 * 1000;
  assert.deepEqual(reload('/services/'), { landingPage: '/services/', sourcePage: '/services/' });
});

await test('ignores forged paths, query strings, and broken storage without blocking a visit', () => {
  for (const value of [
    'https://techguide.jp/chigasaki/',
    '//example.com/',
    '/contact/?email=private@example.com',
    '/chigasaki/%0a',
    '<script>',
    null,
  ]) {
    assert.equal(normalizeAttributionPage(value), '');
  }
  const blocked = {
    getItem: () => {
      throw new Error('blocked');
    },
    setItem: () => {
      throw new Error('blocked');
    },
  };
  const visit = createVisitTracker(blocked);
  visit('/a-private-path/');
  assert.deepEqual(visit('/contact/'), { landingPage: 'other', sourcePage: 'other' });
  const corrupted = createVisitTracker({ getItem: () => '{broken', setItem: () => {} });
  assert.deepEqual(corrupted('/contact/'), { landingPage: '/contact/', sourcePage: '' });
});

await test('removes prefilled contact details from analytics location, path and referrer', () => {
  const query = '?subject=private&message=private&source_page=%2Fchigasaki%2F#private';
  assert.equal(
    sanitizeAnalyticsUrl('https://techguide.jp/contact/' + query),
    'https://techguide.jp/contact/',
  );
  assert.equal(sanitizeAnalyticsUrl('/contact/' + query), '/contact/');
  assert.equal(sanitizeAnalyticsUrl(''), '');
  assert.equal(
    sanitizeAnalyticsUrl('/chigasaki/?utm_source=campaign'),
    '/chigasaki/?utm_source=campaign',
  );
});
