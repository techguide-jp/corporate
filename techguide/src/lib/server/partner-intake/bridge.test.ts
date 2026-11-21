import assert from 'node:assert/strict';
import { test } from 'node:test';
import { forwardPartnerIntakeAction, parsePartnerIntakeAction } from './bridge.ts';

void test('受け付ける操作と引数の数を確認し、ブラウザーからの連携キーを捨てる', () => {
  assert.deepEqual(
    parsePartnerIntakeAction({ action: 'verifyIdentity', args: ['sample-token'], key: 'other' }),
    { action: 'verifyIdentity', args: ['sample-token'] },
  );
  assert.equal(parsePartnerIntakeAction({ action: 'constructor', args: [] }), null);
  assert.equal(parsePartnerIntakeAction({ action: 'verifyIdentity', args: [] }), null);
});

void test('Googleの応答取得には連携キーやCookieを送らない', async () => {
  const calls: Request[] = [];
  const action = { action: 'verifyIdentity' as const, args: ['sample-token'] };
  const result = await forwardPartnerIntakeAction(action, 'server-only-key', (url, init) => {
    calls.push(new Request(url, init));
    if (calls.length === 1) {
      return Promise.resolve(
        new Response(null, {
          status: 302,
          headers: { Location: 'https://script.googleusercontent.com/macros/echo?example=1' },
        }),
      );
    }
    return Promise.resolve(
      Response.json({ ok: false, code: 'input_error', message: '確認リンクが無効です。' }),
    );
  });
  assert.equal(calls[0].method, 'POST');
  assert.equal(calls[0].credentials, 'omit');
  assert.deepEqual(await calls[0].json(), { ...action, key: 'server-only-key' });
  assert.equal(calls[1].method, 'GET');
  assert.equal(calls[1].credentials, 'omit');
  assert.equal(calls[1].body, null);
  assert.deepEqual(result, { ok: false, message: '確認リンクが無効です。', status: 400 });
});

void test('Apps Scriptが許可外のホストへ転送した場合は追跡しない', async () => {
  let calls = 0;
  const result = await forwardPartnerIntakeAction(
    { action: 'verifyIdentity', args: ['sample-token'] },
    'server-only-key',
    () => {
      calls++;
      return Promise.resolve(
        new Response(null, {
          status: 302,
          headers: { Location: 'https://example.com/redirect' },
        }),
      );
    },
  );
  assert.equal(calls, 1);
  assert.equal(result.ok, false);
  if (result.ok === false) assert.equal(result.status, 502);
});
