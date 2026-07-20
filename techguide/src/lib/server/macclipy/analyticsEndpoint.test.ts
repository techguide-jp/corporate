import assert from 'node:assert/strict';
import test from 'node:test';
import { handleMacClipyAnalyticsRequest } from './analyticsEndpoint.ts';

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

const now = new Date('2026-07-20T03:00:00Z');

await test('accepts a valid payload and forwards it once', async () => {
  let forwardCalls = 0;
  const result = await handleMacClipyAnalyticsRequest(makeInput(JSON.stringify(validPayload)), {
    now: () => now,
    consumeRateLimit: () => true,
    forward: () => {
      forwardCalls += 1;
      return Promise.resolve();
    },
  });

  assert.equal(result.status, 202);
  assert.equal(forwardCalls, 1);
});

await test('rejects non-JSON, oversized, and malformed requests before forwarding', async () => {
  let forwardCalls = 0;
  const dependencies = {
    now: () => now,
    consumeRateLimit: () => true,
    forward: () => {
      forwardCalls += 1;
      return Promise.resolve();
    },
  };

  const nonJson = await handleMacClipyAnalyticsRequest(
    { ...makeInput('{}'), contentType: 'text/plain' },
    dependencies,
  );
  const jsonPrefixOnly = await handleMacClipyAnalyticsRequest(
    { ...makeInput(JSON.stringify(validPayload)), contentType: 'application/jsonp' },
    dependencies,
  );
  const oversized = await handleMacClipyAnalyticsRequest(
    { ...makeInput('{}'), contentLength: 4_097 },
    dependencies,
  );
  const malformed = await handleMacClipyAnalyticsRequest(makeInput('{'), dependencies);

  assert.equal(nonJson.status, 415);
  assert.equal(jsonPrefixOnly.status, 415);
  assert.equal(oversized.status, 413);
  assert.equal(malformed.status, 400);
  assert.equal(forwardCalls, 0);
});

await test('returns 429 without forwarding when rate limited', async () => {
  let forwardCalls = 0;
  const result = await handleMacClipyAnalyticsRequest(makeInput(JSON.stringify(validPayload)), {
    now: () => now,
    consumeRateLimit: () => false,
    forward: () => {
      forwardCalls += 1;
      return Promise.resolve();
    },
  });

  assert.equal(result.status, 429);
  assert.equal(result.headers?.['Retry-After'], '60');
  assert.equal(forwardCalls, 0);
});

await test('returns a generic 503 without echoing payload or secret', async () => {
  const result = await handleMacClipyAnalyticsRequest(makeInput(JSON.stringify(validPayload)), {
    now: () => now,
    consumeRateLimit: () => true,
    forward: () => Promise.reject(new Error('server-only-secret')),
  });

  assert.equal(result.status, 503);
  assert.equal(JSON.stringify(result).includes('server-only-secret'), false);
  assert.equal(JSON.stringify(result).includes(validPayload.installation_id), false);
});

function makeInput(bodyText: string) {
  return {
    contentType: 'application/json',
    contentLength: new TextEncoder().encode(bodyText).byteLength,
    bodyText,
    clientAddress: '192.0.2.1',
  };
}
