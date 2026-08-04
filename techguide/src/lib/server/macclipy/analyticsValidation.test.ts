import assert from 'node:assert/strict';
import test from 'node:test';
import { parseMacClipyAnalyticsPayload } from './analyticsValidation.ts';

const now = new Date('2026-07-20T03:00:00.000Z');
const validPayload = {
  schema_version: 1,
  installation_id: 'a4b69d19-9b90-4dad-b034-f4a3fc912fa1',
  event_name: 'install',
  app_version: '0.2.0',
  build_number: '20',
  macos_major_version: 26,
  architecture: 'arm64',
  occurred_at: '2026-07-20T02:59:00Z',
};
const allowedFeatures = [
  'history_panel',
  'favorites_panel',
  'history_item_use',
  'favorite_item_use',
  'search_session',
  'favorite_management',
] as const;

const validFeatureUsagePayload = {
  ...validPayload,
  event_name: 'feature_usage',
  feature: 'history_panel',
  usage_count: 3,
  usage_date: '2026-07-20',
};

await test('accepts the exact anonymous analytics schema', () => {
  const result = parseMacClipyAnalyticsPayload(validPayload, now);

  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.payload.installationId, validPayload.installation_id);
    assert.equal(result.payload.eventName, 'install');
  }
});

await test('rejects unknown fields including clipboard contents', () => {
  const result = parseMacClipyAnalyticsPayload(
    { ...validPayload, clipboard_text: 'private value' },
    now,
  );

  assert.deepEqual(result, { ok: false, reason: 'invalid_schema' });
});

await test('rejects invalid identifiers, event names, and architectures', () => {
  for (const override of [
    { installation_id: 'not-a-uuid' },
    { event_name: 'clipboard_copy' },
    { architecture: 'universal' },
  ]) {
    assert.equal(parseMacClipyAnalyticsPayload({ ...validPayload, ...override }, now).ok, false);
  }
});

await test('rejects timestamps older than 72 hours or too far in the future', () => {
  const stale = { ...validPayload, occurred_at: '2026-07-16T02:59:00Z' };
  const future = { ...validPayload, occurred_at: '2026-07-20T03:06:00Z' };

  assert.equal(parseMacClipyAnalyticsPayload(stale, now).ok, false);
  assert.equal(parseMacClipyAnalyticsPayload(future, now).ok, false);
});

await test('rejects malformed app and operating-system metadata', () => {
  for (const override of [
    { app_version: 'version two' },
    { build_number: '../20' },
    { macos_major_version: 13 },
  ]) {
    assert.equal(parseMacClipyAnalyticsPayload({ ...validPayload, ...override }, now).ok, false);
  }
});

await test('accepts the new daily running and engaged events', () => {
  for (const eventName of ['daily_running', 'daily_engaged'] as const) {
    const result = parseMacClipyAnalyticsPayload({ ...validPayload, event_name: eventName }, now);

    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.payload.eventName, eventName);
    }
  }
});

await test('accepts every allowed feature usage with its daily count', () => {
  for (const feature of allowedFeatures) {
    const result = parseMacClipyAnalyticsPayload({ ...validFeatureUsagePayload, feature }, now);

    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.payload.eventName, 'feature_usage');
      if (result.payload.eventName === 'feature_usage') {
        assert.equal(result.payload.feature, feature);
        assert.equal(result.payload.usageCount, 3);
        assert.equal(result.payload.usageDate, '2026-07-20');
      }
    }
  }
});

await test('rejects feature names outside the fixed allowlist', () => {
  const result = parseMacClipyAnalyticsPayload(
    { ...validFeatureUsagePayload, feature: 'clipboard_contents' },
    now,
  );

  assert.deepEqual(result, { ok: false, reason: 'invalid_schema' });
});

await test('rejects non-positive, non-integer, and unsafe feature usage counts', () => {
  for (const usageCount of [0, -1, 1.5, Number.MAX_SAFE_INTEGER + 1, '3']) {
    assert.equal(
      parseMacClipyAnalyticsPayload({ ...validFeatureUsagePayload, usage_count: usageCount }, now)
        .ok,
      false,
    );
  }
});

await test('rejects malformed or impossible feature usage dates', () => {
  for (const usageDate of ['2026-2-03', '2026-02-30', '2026-13-01', 'not-a-date']) {
    assert.equal(
      parseMacClipyAnalyticsPayload({ ...validFeatureUsagePayload, usage_date: usageDate }, now).ok,
      false,
    );
  }
});

await test('rejects event-specific missing and additional keys', () => {
  const featureFieldsOnDailyEvent = {
    ...validFeatureUsagePayload,
    event_name: 'daily_running',
  };
  const missingUsageCount: Partial<typeof validFeatureUsagePayload> = {
    ...validFeatureUsagePayload,
  };
  delete missingUsageCount.usage_count;

  assert.equal(parseMacClipyAnalyticsPayload(featureFieldsOnDailyEvent, now).ok, false);
  assert.equal(parseMacClipyAnalyticsPayload(missingUsageCount, now).ok, false);
  assert.equal(
    parseMacClipyAnalyticsPayload({ ...validFeatureUsagePayload, search_query: 'private' }, now).ok,
    false,
  );
});
