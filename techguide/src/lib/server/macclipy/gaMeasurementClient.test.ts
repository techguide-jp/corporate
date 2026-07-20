import assert from 'node:assert/strict';
import test from 'node:test';
import { sendMacClipyAnalyticsEvent } from './gaMeasurementClient.ts';
import type { MacClipyAnalyticsPayload } from './analyticsValidation.ts';

const payload: MacClipyAnalyticsPayload = {
  schemaVersion: 1,
  installationId: 'a4b69d19-9b90-4dad-b034-f4a3fc912fa1',
  eventName: 'daily_active',
  appVersion: '0.2.0',
  buildNumber: '20',
  macOSMajorVersion: 26,
  architecture: 'arm64',
  occurredAt: new Date('2026-07-20T02:59:00Z'),
};

await test('maps the installation id to GA client_id and denies advertising consent', async () => {
  let requestUrl = '';
  let requestBody = '';

  await sendMacClipyAnalyticsEvent(
    payload,
    { measurementId: 'G-TEST123', apiSecret: 'server-only-secret' },
    (input, init) => {
      requestUrl =
        typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
      if (typeof init?.body !== 'string') {
        return Promise.reject(new Error('expected_string_request_body'));
      }
      requestBody = init.body;
      return Promise.resolve(new Response(null, { status: 204 }));
    },
  );

  const url = new URL(requestUrl);
  const body = JSON.parse(requestBody) as Record<string, unknown>;
  const events = body.events as Array<{ name: string; params: Record<string, unknown> }>;

  assert.equal(url.origin + url.pathname, 'https://www.google-analytics.com/mp/collect');
  assert.equal(url.searchParams.get('measurement_id'), 'G-TEST123');
  assert.equal(url.searchParams.get('api_secret'), 'server-only-secret');
  assert.equal(body.client_id, payload.installationId);
  assert.deepEqual(body.consent, {
    ad_user_data: 'DENIED',
    ad_personalization: 'DENIED',
  });
  assert.equal(events[0]?.name, 'macclipy_daily_active');
  assert.deepEqual(events[0]?.params, {
    app_version: '0.2.0',
    build_number: '20',
    macos_major_version: 26,
    architecture: 'arm64',
    session_id: 1_784_516_340,
    engagement_time_msec: 1,
  });
  assert.equal(requestBody.includes('clipboard'), false);
});

await test('throws without exposing the API secret when GA rejects the request', async () => {
  await assert.rejects(
    sendMacClipyAnalyticsEvent(
      payload,
      { measurementId: 'G-TEST123', apiSecret: 'server-only-secret' },
      () => Promise.resolve(new Response(null, { status: 500 })),
    ),
    (error: unknown) => {
      assert.equal(error instanceof Error, true);
      assert.equal(String(error).includes('server-only-secret'), false);
      return true;
    },
  );
});
