import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createTurnstileChallenge,
  type TurnstileClient,
  type TurnstileRenderOptions,
} from './turnstileChallenge.ts';

const container = {} as HTMLElement;

function mockClient() {
  const renders: TurnstileRenderOptions[] = [];
  const executed: string[] = [];
  const removed: string[] = [];
  const client: TurnstileClient = {
    render: (_container, options) => {
      renders.push(options);
      return `widget-${renders.length}`;
    },
    execute: (id) => void executed.push(id),
    remove: (id) => void removed.push(id),
  };
  return { client, renders, executed, removed };
}

void test('送信開始まで読み込まず、新しい認証を明示的に実行する', async () => {
  const sdk = mockClient();
  let loads = 0;
  const challenge = createTurnstileChallenge(() => {
    loads += 1;
    return Promise.resolve(sdk.client);
  });
  assert.equal(loads, 0);
  const pending = challenge.run(container, 'test-sitekey');
  await Promise.resolve();
  assert.equal(loads, 1);
  assert.deepEqual(sdk.executed, ['widget-1']);
  const options = sdk.renders[0];
  assert.equal(options.execution, 'execute');
  assert.equal(options.appearance, 'execute');
  assert.equal(options.retry, 'never');
  assert.equal(options['refresh-expired'], 'never');
  assert.equal(options['refresh-timeout'], 'never');
  assert.equal(options['response-field'], false);
  options.callback('fresh-token');
  assert.deepEqual(await pending, { status: 'success', token: 'fresh-token' });
  assert.deepEqual(sdk.removed, ['widget-1']);
});

void test('認証中の重複呼び出しは同じ処理を待ち、ウィジェットを増やさない', async () => {
  const sdk = mockClient();
  const challenge = createTurnstileChallenge(() => Promise.resolve(sdk.client));
  const first = challenge.run(container, 'test-sitekey');
  assert.equal(challenge.run(container, 'test-sitekey'), first);
  await Promise.resolve();
  assert.equal(sdk.renders.length, 1);
  sdk.renders[0].callback('token');
  await first;
});

void test('タイムアウト後の再試行には古いコールバックを引き継がない', async () => {
  const sdk = mockClient();
  const challenge = createTurnstileChallenge(() => Promise.resolve(sdk.client));
  const first = challenge.run(container, 'test-sitekey');
  await Promise.resolve();
  sdk.renders[0]['timeout-callback']();
  assert.deepEqual(await first, {
    status: 'failure',
    reason: 'client_timeout',
    source: 'timeout_callback',
  });
  const second = challenge.run(container, 'test-sitekey');
  await Promise.resolve();
  sdk.renders[0].callback('stale-token');
  sdk.renders[0]['error-callback']('110620');
  sdk.renders[1].callback('retry-token');
  assert.deepEqual(await second, { status: 'success', token: 'retry-token' });
  assert.deepEqual(sdk.executed, ['widget-1', 'widget-2']);
});

void test('読み込み失敗後は新しい送信操作で再読み込みできる', async () => {
  const sdk = mockClient();
  let loads = 0;
  const challenge = createTurnstileChallenge(() => {
    if (++loads === 1) return Promise.reject(new Error('private detail'));
    return Promise.resolve(sdk.client);
  });
  assert.deepEqual(await challenge.run(container, 'key'), {
    status: 'failure',
    reason: 'client_load',
    source: 'initialization',
  });
  const retry = challenge.run(container, 'key');
  await Promise.resolve();
  sdk.renders[0].callback('token');
  assert.equal((await retry).status, 'success');
});

void test('読み込み待ちで画面を離れたら、遅い読み込みが完了しても認証を始めない', async () => {
  const sdk = mockClient();
  let loaded!: (client: TurnstileClient) => void;
  const challenge = createTurnstileChallenge(
    () =>
      new Promise((resolve) => {
        loaded = resolve;
      }),
  );
  const pending = challenge.run(container, 'key');
  challenge.cancel();
  assert.deepEqual(await pending, { status: 'cancelled' });
  loaded(sdk.client);
  await Promise.resolve();
  assert.equal(sdk.renders.length, 0);
});

void test('認証中の画面離脱はキャンセルし、遅い成功を無効化する', async () => {
  const sdk = mockClient();
  const challenge = createTurnstileChallenge(() => Promise.resolve(sdk.client));
  const pending = challenge.run(container, 'key');
  await Promise.resolve();
  challenge.cancel();
  sdk.renders[0].callback('late-token');
  assert.deepEqual(await pending, { status: 'cancelled' });
  assert.deepEqual(sdk.removed, ['widget-1']);
});

void test('コールバックが来ない場合は期限で復帰する', async (context) => {
  context.mock.timers.enable({ apis: ['setTimeout'] });
  const sdk = mockClient();
  const challenge = createTurnstileChallenge(() => Promise.resolve(sdk.client), 120_000);
  const pending = challenge.run(container, 'key');
  await Promise.resolve();
  context.mock.timers.tick(120_000);
  assert.deepEqual(await pending, {
    status: 'failure',
    reason: 'client_timeout',
    source: 'verification_timeout',
  });
  sdk.renders[0].callback('late-token');
  assert.deepEqual(sdk.removed, ['widget-1']);
});

void test('読み込みが無応答でも期限後に認証を開始しない', async (context) => {
  context.mock.timers.enable({ apis: ['setTimeout'] });
  const sdk = mockClient();
  let loaded!: (client: TurnstileClient) => void;
  const challenge = createTurnstileChallenge(
    () =>
      new Promise((resolve) => {
        loaded = resolve;
      }),
  );
  const pending = challenge.run(container, 'key');
  context.mock.timers.tick(120_000);
  assert.equal((await pending).status, 'failure');
  loaded(sdk.client);
  await Promise.resolve();
  assert.equal(sdk.renders.length, 0);
});

void test('既知のコードだけを残し、未知の文字列・SDK例外は結果に含めない', async () => {
  const sdk = mockClient();
  const challenge = createTurnstileChallenge(() => Promise.resolve(sdk.client));
  for (const code of ['110600', '110620', 'private@example.com']) {
    const pending = challenge.run(container, 'key');
    await Promise.resolve();
    sdk.renders.at(-1)!['error-callback'](code);
    const result = await pending;
    assert.deepEqual(result, {
      status: 'failure',
      reason: code.startsWith('110') ? 'client_timeout' : 'client_unknown',
      source: 'error_callback',
      code: code.startsWith('110') ? code : undefined,
    });
    assert.equal(JSON.stringify(result).includes('private@'), false);
  }
  sdk.client.execute = () => {
    throw new Error('private detail');
  };
  assert.deepEqual(await challenge.run(container, 'key'), {
    status: 'failure',
    reason: 'client_unknown',
    source: 'execution',
  });
});

void test('空トークン・期限切れは成功にせず、成功後の期限切れは無視する', async () => {
  const sdk = mockClient();
  const challenge = createTurnstileChallenge(() => Promise.resolve(sdk.client));
  const empty = challenge.run(container, 'key');
  await Promise.resolve();
  sdk.renders[0].callback('');
  assert.equal((await empty).status, 'failure');
  const expired = challenge.run(container, 'key');
  await Promise.resolve();
  sdk.renders[1]['expired-callback']();
  assert.deepEqual(await expired, {
    status: 'failure',
    reason: 'client_expired',
    source: 'expired_callback',
  });
  const success = challenge.run(container, 'key');
  await Promise.resolve();
  sdk.renders[2].callback('token');
  sdk.renders[2]['expired-callback']();
  assert.deepEqual(await success, { status: 'success', token: 'token' });
});

void test('SDKの描画・片付け例外でも待機状態を残さない', async () => {
  const sdk = mockClient();
  const challenge = createTurnstileChallenge(() => Promise.resolve(sdk.client));
  const render = sdk.client.render;
  sdk.client.render = () => {
    throw new Error('private detail');
  };
  assert.equal((await challenge.run(container, 'key')).status, 'failure');
  sdk.client.render = render;
  sdk.client.remove = () => {
    throw new Error('private detail');
  };
  const pending = challenge.run(container, 'key');
  await Promise.resolve();
  sdk.renders[0].callback('token');
  assert.equal((await pending).status, 'success');
  const next = challenge.run(container, 'key');
  await Promise.resolve();
  sdk.renders[1].callback('next-token');
  assert.equal((await next).status, 'success');
});
