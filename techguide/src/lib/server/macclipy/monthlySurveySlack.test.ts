import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { defaultCampaign, questionsFor, type SurveyResponse } from '../../macclipy/monthly.ts';
import { sendSurveySlackNotification } from './monthlySurveySlack.ts';
import { saveSurvey, getResponses } from './monthlyService.ts';
import { createLocalRepository } from './monthlyLocalRepository.ts';
import { DocumentConflict, type MonthlyRepository } from './monthlyRepository.ts';
import { issueSurveyTicket } from './monthlyTokens.ts';

const response: SurveyResponse = {
  id: '00000000-0000-4000-8000-000000000001',
  month: '2026-10',
  submittedAt: '2026-10-02T15:12:00.000Z',
  questions: [],
  answers: { feedback: ['private feedback @channel'], job: ['private job'] },
};
const webhook = 'https://hooks.slack.com/services/TTEST/BTEST/testSecret';
const secret = 'test-secret-at-least-thirty-two-characters';

void test('Slack receives JST time and authenticated admin link without survey contents', async () => {
  let payload = '';
  assert.equal(
    await sendSurveySlackNotification(response, webhook, {
      fetch: (url, init) => {
        assert.equal(url, webhook);
        assert.equal(init?.method, 'POST');
        assert.equal(init?.redirect, 'error');
        assert.ok(init?.signal);
        assert.equal(typeof init?.body, 'string');
        payload = init?.body as string;
        return Promise.resolve(new Response('ok'));
      },
      reportFailure: () => assert.fail('Unexpected failure'),
    }),
    true,
  );
  const body = JSON.parse(payload) as {
    text: string;
    unfurl_links: boolean;
    unfurl_media: boolean;
  };
  assert.ok(body.text.includes('2026-10'));
  assert.ok(body.text.includes('2026/10/03'));
  assert.ok(body.text.includes('0:12'));
  assert.ok(body.text.includes('https://techguide.jp/macclipy/admin/?month=2026-10'));
  assert.equal(body.unfurl_links, false);
  assert.equal(body.unfurl_media, false);
  for (const value of ['private feedback', 'private job', '@channel', 'testSecret'])
    assert.equal(payload.includes(value), false);
});
void test('missing, foreign and redirect-like webhook URLs cannot send data', async () => {
  for (const url of [
    undefined,
    'https://example.com/services/TTEST/BTEST/testSecret',
    'https://hooks.slack.com.evil.example/services/TTEST/BTEST/testSecret',
    webhook + '?redirect=https://example.com',
    'http://hooks.slack.com/services/TTEST/BTEST/testSecret',
  ]) {
    const failures: unknown[] = [];
    assert.equal(
      await sendSurveySlackNotification(response, url, {
        fetch: () => {
          throw new Error('must not send');
        },
        reportFailure: (failure) => failures.push(failure),
      }),
      false,
    );
    assert.equal(failures.length, 1);
    assert.equal(JSON.stringify(failures).includes('testSecret'), false);
    assert.equal(JSON.stringify(failures).includes('private feedback'), false);
  }
});
void test('Slack rejection and unknown network outcomes log safe reason codes without retrying', async () => {
  for (const outcome of [
    new Response('invalid_payload', { status: 400 }),
    new Response('too many requests', { status: 429 }),
    new Response('server error', { status: 503 }),
    new Response('not ok'),
    new Error(webhook + ' private feedback'),
  ]) {
    let attempts = 0;
    const failures: unknown[] = [];
    assert.equal(
      await sendSurveySlackNotification(response, webhook, {
        fetch: () => {
          attempts++;
          if (outcome instanceof Error) return Promise.reject(outcome);
          return Promise.resolve(outcome);
        },
        reportFailure: (failure) => failures.push(failure),
      }),
      false,
    );
    assert.equal(attempts, 1);
    assert.equal(failures.length, 1);
    const log = JSON.stringify(failures);
    assert.ok(log.includes(response.id));
    for (const value of [webhook, 'private feedback', 'invalid_payload', 'server error'])
      assert.equal(log.includes(value), false);
  }
});
void test('saved submissions notify once, including concurrent retries, and preserve original time', async () => {
  // S3条件付き保存と同じ、保存済みデータが見えてから競合を返す契約で検証する。
  const documents = new Map<string, unknown>();
  const repository: MonthlyRepository = {
    get: (key) =>
      Promise.resolve(documents.has(key) ? { value: documents.get(key), etag: 'stored' } : null),
    put: (key, value) => {
      if (documents.has(key)) return Promise.reject(new DocumentConflict());
      documents.set(key, value);
      return Promise.resolve();
    },
    list: (prefix) =>
      Promise.resolve(
        [...documents].filter(([key]) => key.startsWith(prefix)).map(([, value]) => value),
      ),
  };
  {
    const now = new Date(response.submittedAt);
    const form = new FormData();
    form.set(
      'ticket',
      issueSurveyTicket(
        response.month,
        questionsFor(defaultCampaign(response.month)),
        secret,
        now.getTime(),
      ),
    );
    form.set('feedback', 'private feedback');
    const notifications: SurveyResponse[] = [];
    const notify = (saved: SurveyResponse) => {
      notifications.push(saved);
      return Promise.resolve();
    };
    await Promise.all(
      Array.from({ length: 5 }, () =>
        saveSurvey(repository, response.month, form, secret, now, notify),
      ),
    );
    await saveSurvey(
      repository,
      response.month,
      form,
      secret,
      new Date(now.getTime() + 1000),
      notify,
    );
    assert.equal(notifications.length, 1);
    assert.deepEqual(notifications, await getResponses(repository, response.month));
    assert.equal(notifications[0].submittedAt, now.toISOString());
    form.set('feedback', 'changed');
    await assert.rejects(
      saveSurvey(repository, response.month, form, secret, now, notify),
      /送信済み/,
    );
    assert.equal(notifications.length, 1);
  }
});
void test('invalid or unsaved responses never notify, and Slack failures do not lose saved responses', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'monthly-slack-failure-'));
  const originalError = console.error;
  const logs: unknown[] = [];
  console.error = (...values: unknown[]) => {
    logs.push(values);
  };
  try {
    const repository = createLocalRepository(directory);
    const now = new Date(response.submittedAt);
    const form = new FormData();
    let attempts = 0;
    const notify = () => {
      attempts++;
      return Promise.reject(new Error(webhook));
    };
    await assert.rejects(saveSurvey(repository, response.month, form, secret, now, notify));
    assert.equal(attempts, 0);
    form.set(
      'ticket',
      issueSurveyTicket(
        response.month,
        questionsFor(defaultCampaign(response.month)),
        secret,
        now.getTime(),
      ),
    );
    form.set('feedback', 'private feedback');
    const broken: MonthlyRepository = {
      ...repository,
      put: () => Promise.reject(new Error('offline')),
    };
    await assert.rejects(saveSurvey(broken, response.month, form, secret, now, notify), /offline/);
    assert.equal(attempts, 0);
    await saveSurvey(repository, response.month, form, secret, now, notify);
    assert.equal((await getResponses(repository, response.month)).length, 1);
    assert.equal(attempts, 1);
    await saveSurvey(repository, response.month, form, secret, now, notify);
    assert.equal(attempts, 1);
    assert.equal(logs.length, 1);
    assert.equal(JSON.stringify(logs).includes(webhook), false);
    assert.equal(JSON.stringify(logs).includes('private feedback'), false);
  } finally {
    console.error = originalError;
    await rm(directory, { recursive: true, force: true });
  }
});
