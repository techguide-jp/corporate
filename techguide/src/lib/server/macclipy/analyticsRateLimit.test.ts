import assert from 'node:assert/strict';
import test from 'node:test';
import {
  ANALYTICS_ADDRESS_RATE_LIMIT,
  ANALYTICS_INSTALLATION_RATE_LIMIT,
  ANALYTICS_RATE_LIMIT_MAX_ENTRIES,
  ANALYTICS_RATE_LIMIT_WINDOW_MS,
  createAnalyticsRateLimiter,
} from './analyticsRateLimit.ts';

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

await test('allows two complete first-run batches sharing one address', () => {
  const addressLimiter = createAnalyticsRateLimiter({
    limit: ANALYTICS_ADDRESS_RATE_LIMIT,
    windowMs: ANALYTICS_RATE_LIMIT_WINDOW_MS,
    maxEntries: ANALYTICS_RATE_LIMIT_MAX_ENTRIES,
    now: () => 1_000,
  });
  const installationLimiter = createAnalyticsRateLimiter({
    limit: ANALYTICS_INSTALLATION_RATE_LIMIT,
    windowMs: ANALYTICS_RATE_LIMIT_WINDOW_MS,
    maxEntries: ANALYTICS_RATE_LIMIT_MAX_ENTRIES,
    now: () => 1_000,
  });

  for (const installationId of ['installation-a', 'installation-b']) {
    for (let requestNumber = 1; requestNumber <= 9; requestNumber += 1) {
      assert.equal(addressLimiter.consume('shared-address'), true);
      assert.equal(installationLimiter.consume(installationId), true);
    }
  }
});

await test('rejects excess traffic from each installation independently', () => {
  const limiter = createAnalyticsRateLimiter({
    limit: ANALYTICS_INSTALLATION_RATE_LIMIT,
    windowMs: ANALYTICS_RATE_LIMIT_WINDOW_MS,
    maxEntries: ANALYTICS_RATE_LIMIT_MAX_ENTRIES,
    now: () => 1_000,
  });

  for (const installationId of ['installation-a', 'installation-b']) {
    for (let requestNumber = 1; requestNumber <= 10; requestNumber += 1) {
      assert.equal(limiter.consume(installationId), true);
    }
    assert.equal(limiter.consume(installationId), false);
  }
});
