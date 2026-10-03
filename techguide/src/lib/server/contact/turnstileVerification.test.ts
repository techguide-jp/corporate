import assert from 'node:assert/strict';
import test from 'node:test';
import {
  classifyTurnstileClientError,
  normalizeTurnstileServerReason,
  type TurnstileServerReason,
} from '../../contact/turnstile.ts';
import { verifyTurnstileResponse } from './turnstileVerification.ts';

const input = { secret: 'synthetic-secret', token: 'synthetic-token', remoteIp: '192.0.2.1' };

function dependencies(payload: unknown, status = 200) {
  const reasons: TurnstileServerReason[] = [];
  let calls = 0;
  return {
    reasons,
    get calls() {
      return calls;
    },
    fetch: ((_url, options) => {
      calls += 1;
      assert.ok(options?.signal);
      assert.equal((options?.body as URLSearchParams).get('response'), input.token);
      return Promise.resolve(Response.json(payload, { status }));
    }) as typeof fetch,
    reportFailure: (reason: TurnstileServerReason) => reasons.push(reason),
  };
}

await test('missing configuration and responses fail closed before a verification request', async () => {
  const deps = dependencies({ success: true });
  const cases = [
    [{ token: input.token }, 'server_missing_secret'],
    [{ ...input, token: null }, 'server_missing_response'],
    [{ ...input, token: '   ' }, 'server_missing_response'],
    [{ ...input, token: 'x'.repeat(2049) }, 'server_invalid_response'],
  ] as const;
  for (const [value, reason] of cases) {
    const result = await verifyTurnstileResponse(value, deps);
    assert.ok(!result.ok && result.reason === reason);
  }
  assert.equal(deps.calls, 0);
  assert.deepEqual(await verifyTurnstileResponse({ token: null, allowMissingSecret: true }, deps), {
    ok: true,
  });
  assert.equal(deps.reasons.length, 4);
});

await test('only boolean success grants verification and successful checks log nothing', async () => {
  const deps = dependencies({ success: true, 'error-codes': [] });
  assert.deepEqual(await verifyTurnstileResponse(input, deps), { ok: true });
  assert.equal(deps.calls, 1);
  assert.deepEqual(deps.reasons, []);
  for (const payload of [null, [], {}, { success: 'true' }, { success: 1 }]) {
    const invalid = await verifyTurnstileResponse(input, dependencies(payload));
    assert.ok(!invalid.ok && invalid.reason === 'server_invalid_json');
  }
});

await test('Cloudflare failures are classified without retaining response payloads or raw codes', async () => {
  const codes = {
    'missing-input-secret': 'server_missing_secret',
    'invalid-input-secret': 'server_invalid_secret',
    'missing-input-response': 'server_missing_response',
    'invalid-input-response': 'server_invalid_response',
    'timeout-or-duplicate': 'server_expired_or_duplicate',
    'bad-request': 'server_bad_request',
    'internal-error': 'server_internal',
    'private@example.com': 'server_unknown',
    constructor: 'server_unknown',
  };
  for (const [code, reason] of Object.entries(codes)) {
    const deps = dependencies({ success: false, 'error-codes': [code], private: input });
    const result = await verifyTurnstileResponse(input, deps);
    assert.ok(!result.ok && result.reason === reason);
    assert.deepEqual(deps.reasons, [reason]);
    assert.doesNotMatch(
      JSON.stringify({ result, reasons: deps.reasons }),
      /synthetic|192\.0\.2|private@/,
    );
  }
});

await test('network, HTTP and malformed JSON failures retain no detailed error message', async () => {
  const cases = [
    [() => Promise.reject(new Error(JSON.stringify(input))), 'server_network'],
    [
      () => Promise.resolve(new Response('upstream private details', { status: 503 })),
      'server_http',
    ],
    [() => Promise.resolve(new Response('not json')), 'server_invalid_json'],
  ] as const;
  for (const [fetcher, reason] of cases) {
    const reasons: TurnstileServerReason[] = [];
    const result = await verifyTurnstileResponse(input, {
      fetch: fetcher as typeof fetch,
      reportFailure: (value) => reasons.push(value),
    });
    assert.ok(!result.ok && result.reason === reason);
    assert.deepEqual(reasons, [reason]);
    assert.doesNotMatch(JSON.stringify(result), /synthetic|private details|192\.0\.2/);
  }
});

await test('verification timeout is bounded and its default log contains only a safe reason', async (t) => {
  t.mock.method(AbortSignal, 'timeout', (milliseconds: number) => {
    assert.equal(milliseconds, 10_000);
    return AbortSignal.abort();
  });
  const logs: string[] = [];
  t.mock.method(console, 'warn', (value: string) => logs.push(value));
  const result = await verifyTurnstileResponse(input, {
    fetch: ((_url, options) => {
      assert.equal(options?.signal?.aborted, true);
      return Promise.reject(new Error(JSON.stringify(input)));
    }) as typeof fetch,
  });
  assert.ok(!result.ok && result.reason === 'server_timeout');
  assert.deepEqual(
    logs.map((value) => JSON.parse(value) as unknown),
    [
      {
        event: 'contact_turnstile_failure',
        source: 'server',
        reason: 'server_timeout',
      },
    ],
  );
  assert.doesNotMatch(logs.join(''), /synthetic|192\.0\.2/);
});

await test('client codes and returned reasons are limited to safe known classifications', () => {
  const cases = {
    '110100': 'client_sitekey',
    '110110': 'client_sitekey',
    '110200': 'client_domain',
    '110600': 'client_timeout',
    '110620': 'client_timeout',
    '200100': 'client_clock',
    '200500': 'client_iframe',
    '300001': 'client_challenge',
    '600010': 'client_challenge',
    'email=private@example.com': 'client_unknown',
  };
  for (const [code, reason] of Object.entries(cases)) {
    assert.equal(classifyTurnstileClientError(code), reason);
  }
  assert.equal(classifyTurnstileClientError(undefined), 'client_unknown');
  assert.equal(
    normalizeTurnstileServerReason('server_expired_or_duplicate'),
    'server_expired_or_duplicate',
  );
  assert.equal(normalizeTurnstileServerReason('private@example.com'), 'server_unknown');
  assert.equal(normalizeTurnstileServerReason('client_timeout'), 'server_unknown');
});
