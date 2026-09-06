import assert from 'node:assert/strict';
import test from 'node:test';
import { analyticsPagePath, sanitizeAnalyticsUrl } from './privacy.ts';

void test('contact prefills and fragments are excluded while campaign context is retained', () => {
  assert.equal(
    sanitizeAnalyticsUrl(
      'https://techguide.jp/contact/?category=ai&subject=private&message=secret&email=x&token=y&utm_source=article#private',
    ),
    'https://techguide.jp/contact/?category=ai&utm_source=article',
  );
  assert.equal(analyticsPagePath('https://techguide.jp/contact/?message=secret'), '/contact/');
});
void test('invalid and empty referrers do not leak their input', () => {
  assert.equal(sanitizeAnalyticsUrl('secret'), '');
  assert.equal(sanitizeAnalyticsUrl(''), '');
});
