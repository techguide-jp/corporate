import assert from 'node:assert/strict';
import test from 'node:test';
import { createContactFormValuesFromSearchParams } from '../../contact/form.ts';
import { createLeadEventTracker } from '../../contact/lead.ts';
import { parseContactFormData } from './validation.ts';
import { buildAdminEmail, buildAutoReplyEmail } from './emailTemplates.ts';
import { submitContactForm } from './submit.ts';

function makeForm() {
  const data = new FormData();
  for (const [key, value] of Object.entries({
    category: 'lp',
    name: 'フォーム検証',
    email: 'test@example.com',
    subject: '制作の相談',
    message: '検証用の相談内容',
    landingPage: '/chigasaki/homepage/',
    sourcePage: '/chigasaki/system-development/',
  }))
    data.set(key, value);
  return data;
}

await test('preserves attribution on validation errors and successful retry', () => {
  const form = makeForm();
  form.set('email', 'invalid');
  const invalid = parseContactFormData(form);
  assert.equal(invalid.ok, false);
  if (invalid.ok) throw new Error('Expected validation failure');
  assert.equal(invalid.values.landingPage, '/chigasaki/homepage/');
  assert.equal(invalid.values.sourcePage, '/chigasaki/system-development/');
  form.set('email', 'test@example.com');
  const retry = parseContactFormData(form);
  assert.equal(retry.ok, true);
  if (!retry.ok) throw new Error('Expected success');
  assert.equal(retry.submission.landingPage, invalid.values.landingPage);
  assert.equal(retry.submission.sourcePage, invalid.values.sourcePage);
  assert.equal(retry.isBot, false);
  form.set('website', 'spam');
  const bot = parseContactFormData(form);
  assert.ok(bot.ok && bot.isBot);
});

await test('rejects unrecognized attribution from both URLs and hidden form fields', () => {
  const values = createContactFormValuesFromSearchParams(
    new URLSearchParams({
      category: 'lp',
      source_page: 'https://example.com/?email=private@example.com',
    }),
  );
  assert.equal(values.sourcePage, '');
  assert.equal(values.landingPage, '');
  const form = makeForm();
  form.set('landingPage', '/chigasaki/?name=private');
  form.set('sourcePage', '<script>alert(1)</script>');
  const result = parseContactFormData(form);
  assert.ok(result.ok);
  if (!result.ok) throw new Error('Expected valid form');
  assert.equal(result.submission.landingPage, '');
  assert.equal(result.submission.sourcePage, '');
});

await test('adds attribution only to the admin email, and emits a lead once without form text', () => {
  const result = parseContactFormData(makeForm());
  if (!result.ok) throw new Error('Expected valid form');
  const { submission } = result;
  assert.match(buildAdminEmail(submission).text, /流入ページ: \/chigasaki\/homepage\//);
  assert.doesNotMatch(buildAutoReplyEmail(submission).text, /流入ページ|相談元ページ/);
  const leadEvent = createLeadEventTracker();
  assert.equal(leadEvent(null), undefined);
  const receipt = {
    id: 'receipt-1',
    category: submission.category,
    landingPage: submission.landingPage,
    sourcePage: submission.sourcePage,
  };
  assert.deepEqual(leadEvent(receipt), {
    contact_category: 'lp',
    landing_page: '/chigasaki/homepage/',
    source_page: '/chigasaki/system-development/',
  });
  assert.equal(leadEvent(receipt), undefined);
  assert.ok(leadEvent({ ...receipt, id: 'receipt-2' }));
});

await test('issues a lead receipt only after admin delivery and excludes all failure paths', async () => {
  let sendCalls = 0;
  const dependencies = {
    shouldMock: () => Promise.resolve(false),
    verify: () => Promise.resolve({ ok: true as const }),
    send: () => {
      sendCalls++;
      return Promise.resolve({ ok: true as const });
    },
  };
  const invalid = await submitContactForm(new FormData(), dependencies);
  const challengeFailed = await submitContactForm(makeForm(), {
    ...dependencies,
    verify: () => Promise.resolve({ ok: false as const, message: '確認失敗' }),
  });
  const botForm = makeForm();
  botForm.set('website', 'spam');
  const bot = await submitContactForm(botForm, dependencies);
  assert.equal(sendCalls, 0);
  assert.equal(invalid.status, 400);
  assert.equal(challengeFailed.status, 400);
  assert.ok(bot.data.ok && bot.data.receipt === null);
  const deliveryFailed = await submitContactForm(makeForm(), {
    ...dependencies,
    send: () => Promise.resolve({ ok: false as const, message: '送信失敗' }),
  });
  for (const result of [invalid, challengeFailed, deliveryFailed]) {
    assert.equal(result.data.ok, false);
    assert.ok(!('receipt' in result.data));
  }
  assert.equal(deliveryFailed.status, 500);
  const accepted = await submitContactForm(makeForm(), dependencies);
  assert.equal(sendCalls, 1);
  assert.equal(accepted.status, 200);
  assert.ok(accepted.data.ok && accepted.data.receipt?.id);
  if (accepted.data.ok) {
    assert.equal(accepted.data.receipt?.landingPage, '/chigasaki/homepage/');
    assert.ok(!('email' in (accepted.data.receipt ?? {})));
  }
  const replyFailed = await submitContactForm(makeForm(), {
    ...dependencies,
    send: () => Promise.resolve({ ok: true as const, message: '受付済み・控えは未送信' }),
  });
  assert.ok(replyFailed.data.ok && replyFailed.data.receipt?.id);
});

await test('development mock sends no external requests and gives bots no lead receipt', async () => {
  const never = (): Promise<never> => Promise.reject(new Error('External request must not happen'));
  const dependencies = { shouldMock: () => Promise.resolve(true), verify: never, send: never };
  const result = await submitContactForm(makeForm(), dependencies);
  assert.ok(result.data.ok && result.data.receipt?.id);
  const bot = makeForm();
  bot.set('website', 'spam');
  const ignored = await submitContactForm(bot, dependencies);
  assert.ok(ignored.data.ok && ignored.data.receipt === null);
});
