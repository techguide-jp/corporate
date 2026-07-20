import assert from 'node:assert/strict';
import test from 'node:test';
import { createAnalyticsRateLimiter } from './analyticsRateLimit.ts';

await test('allows the configured number of requests within a window', () => {
  let now = 1_000;
  const limiter = createAnalyticsRateLimiter({
    limit: 2,
    windowMs: 60_000,
    maxEntries: 100,
    now: () => now,
  });

  assert.equal(limiter.consume('client-a'), true);
  assert.equal(limiter.consume('client-a'), true);
  assert.equal(limiter.consume('client-a'), false);

  now += 60_001;
  assert.equal(limiter.consume('client-a'), true);
});

await test('bounds stored keys and fails closed for new keys at capacity', () => {
  const limiter = createAnalyticsRateLimiter({
    limit: 1,
    windowMs: 60_000,
    maxEntries: 2,
    now: () => 1_000,
  });

  assert.equal(limiter.consume('client-a'), true);
  assert.equal(limiter.consume('client-b'), true);
  assert.equal(limiter.consume('client-c'), false);
});
