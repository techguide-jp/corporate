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
