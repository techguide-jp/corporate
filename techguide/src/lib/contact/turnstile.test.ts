import assert from 'node:assert/strict';
import test from 'node:test';
import {
  classifyTurnstileClientError,
  turnstileClientErrorParams,
  type TurnstileClientErrorSource,
} from './turnstile.ts';

await test('timeout callback and both Cloudflare timeout codes remain distinguishable', () => {
  const kinds = new Set([
    turnstileClientErrorParams('client_timeout', 'timeout_callback').error_kind,
    ...['110600', '110620'].map(
      (code) =>
        turnstileClientErrorParams(classifyTurnstileClientError(code), 'error_callback', code)
          .error_kind,
    ),
  ]);
  assert.equal(kinds.size, 3);
  assert.ok(kinds.has('turnstile_client_timeout_error_callback_110600'));
  assert.ok(kinds.has('turnstile_client_timeout_error_callback_110620'));
  assert.ok(kinds.has('turnstile_client_timeout_timeout_callback'));
});

await test('client telemetry contains only known codes, never callback details or tokens', () => {
  for (const code of [
    '110200',
    '200500',
    '300001',
    '600010',
    'email=private@example.com',
    'synthetic-token',
    '999999',
    110600,
    undefined,
    { code: '110600', token: 'synthetic-token' },
  ]) {
    const reason = classifyTurnstileClientError(code);
    const params = turnstileClientErrorParams(reason, 'error_callback', code);
    assert.equal(params.turnstile_error_code, reason === 'client_unknown' ? undefined : code);
    assert.doesNotMatch(JSON.stringify(params), /private@|synthetic-token|999999/);
    assert.ok(params.error_kind.length <= 100);
    assert.deepEqual(Object.keys(params), [
      'error_kind',
      'turnstile_source',
      'turnstile_error_code',
    ]);
  }
});

await test('lifecycle failures retain their safe occurrence stage without a fabricated code', () => {
  const sources: TurnstileClientErrorSource[] = [
    'initialization',
    'timeout_callback',
    'expired_callback',
    'reset',
    'remove',
  ];
  for (const source of sources) {
    const params = turnstileClientErrorParams('client_unknown', source);
    assert.equal(params.turnstile_source, source);
    assert.equal(params.turnstile_error_code, undefined);
    assert.equal(params.error_kind, `turnstile_client_unknown_${source}`);
  }
});
