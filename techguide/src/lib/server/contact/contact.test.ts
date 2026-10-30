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

function makeRecruitForm() {
  const data = makeForm();
  for (const [key, value] of Object.entries({
    category: 'recruit',
    role: 'Webエンジニア',
    experienceYears: 'Web開発5年',
    workStyle: 'フリーランス',
    nearestStation: '品川駅',
    aiTools: 'ChatGPT / Codex',
    portfolioUrl: 'https://example.com/portfolio',
  }))
    data.set(key, value);
  return data;
}

await test('recruit applications require experience, portfolio URL and nearest station', () => {
  for (const field of ['experienceYears', 'portfolioUrl', 'nearestStation']) {
    for (const value of [undefined, '', '   ', '\n \n']) {
      const form = makeRecruitForm();
      if (value === undefined) form.delete(field);
      else form.set(field, value);
      const result = parseContactFormData(form);
      assert.equal(result.ok, false, `${field} must not accept ${JSON.stringify(value)}`);
      if (result.ok) throw new Error('Expected validation failure');
      assert.ok(result.fieldErrors[field as keyof typeof result.fieldErrors]);
    }
  }

  const form = makeRecruitForm();
  form.set('portfolioUrl', 'example.com/portfolio');
  const invalidUrl = parseContactFormData(form);
  assert.ok(!invalidUrl.ok && invalidUrl.fieldErrors.portfolioUrl);
});

await test('applications accept multiple portfolio and resume URLs with blank lines and CRLF', () => {
  const form = makeRecruitForm();
  form.set('portfolioUrl', ' https://example.com/portfolio \r\n\r\n http://example.com/resume ');
  const result = parseContactFormData(form);
  if (!result.ok) throw new Error('Expected multiple valid URLs to be accepted');
  for (const email of [
    buildAdminEmail(result.submission),
    buildAutoReplyEmail(result.submission),
  ]) {
    assert.ok(
      email.text.includes(
        'ポートフォリオ・経歴書などあなたがわかるもの（URL）: https://example.com/portfolio\nhttp://example.com/resume',
      ),
    );
    assert.match(email.html, /https:\/\/example.com\/portfolio<br>http:\/\/example.com\/resume/);
  }
});

await test('every portfolio URL is validated, including URLs after the first line', () => {
  for (const invalid of [
    'invalid-url',
    'javascript:alert(1)',
    'ftp://example.com/resume',
    'https://',
    'https://invalid host/resume',
    'https://example.com/one https://example.com/two',
  ]) {
    const form = makeRecruitForm();
    form.set('portfolioUrl', `https://example.com/portfolio\n${invalid}`);
    const result = parseContactFormData(form);
    assert.ok(!result.ok && result.fieldErrors.portfolioUrl, `Must reject ${invalid}`);
  }
});

await test('recruit applications accept omitted optional information', () => {
  const result = parseContactFormData(makeRecruitForm());
  assert.ok(result.ok);
  if (!result.ok) throw new Error('Expected valid application');
  assert.equal(result.submission.availability, '');
  assert.equal(result.submission.aiUsagePractices, '');
  assert.equal(result.submission.strengths, '');
  assert.equal(result.submission.discoverySource, '');
  for (const email of [
    buildAdminEmail(result.submission),
    buildAutoReplyEmail(result.submission),
  ]) {
    assert.match(email.text, /TechGuideを知ったきっかけ: 未入力/);
  }
});

await test('partnership inquiries do not require recruitment-specific fields', () => {
  const form = makeForm();
  form.set('category', 'partnership');
  const result = parseContactFormData(form);
  assert.ok(result.ok && !result.submission.isRecruit);
});

await test('new application fields are preserved on errors and included in both email copies', async () => {
  const form = makeRecruitForm();
  const portfolioUrls =
    'https://example.com/portfolio\nhttps://example.com/resume?file=a&format=pdf';
  form.set('portfolioUrl', portfolioUrls);
  form.set('aiUsagePractices', '目的を明確にする\n出力を<レビュー>する');
  form.set('strengths', '要件整理 & 改善提案');
  form.set('discoverySource', ' Google検索 & SNSの<募集投稿> ');
  const dependencies = {
    shouldMock: () => Promise.resolve(false),
    verify: () => Promise.resolve({ ok: true as const }),
    send: () => Promise.resolve({ ok: false as const, message: '送信失敗' }),
  };

  form.set('experienceYears', '');
  const invalid = await submitContactForm(form, dependencies);
  form.set('experienceYears', 'Web開発5年');
  const verificationFailed = await submitContactForm(form, {
    ...dependencies,
    verify: () => Promise.resolve({ ok: false as const, message: '認証失敗' }),
  });
  const deliveryFailed = await submitContactForm(form, dependencies);
  for (const result of [invalid, verificationFailed, deliveryFailed]) {
    assert.equal(result.data.ok, false);
    assert.equal(result.data.values.nearestStation, '品川駅');
    assert.equal(result.data.values.portfolioUrl, portfolioUrls);
    assert.equal(result.data.values.aiUsagePractices, '目的を明確にする\n出力を<レビュー>する');
    assert.equal(result.data.values.strengths, '要件整理 & 改善提案');
    assert.equal(result.data.values.discoverySource, 'Google検索 & SNSの<募集投稿>');
  }

  const result = parseContactFormData(form);
  if (!result.ok) throw new Error('Expected valid application');
  for (const email of [
    buildAdminEmail(result.submission),
    buildAutoReplyEmail(result.submission),
  ]) {
    assert.match(email.text, /経験年数: Web開発5年/);
    assert.match(email.text, /週の稼働可能時間: 未入力/);
    assert.match(email.text, /最寄駅: 品川駅/);
    assert.ok(
      email.text.includes(`ポートフォリオ・経歴書などあなたがわかるもの（URL）: ${portfolioUrls}`),
    );
    assert.match(email.html, /https:\/\/example.com\/resume\?file=a&amp;format=pdf/);
    assert.match(email.text, /AI利用時に工夫していること: 目的を明確にする\n出力を<レビュー>する/);
    assert.match(email.text, /あなたの強み: 要件整理 & 改善提案/);
    assert.match(email.text, /TechGuideを知ったきっかけ: Google検索 & SNSの<募集投稿>/);
    assert.match(email.html, /TechGuideを知ったきっかけ: Google検索 &amp; SNSの&lt;募集投稿&gt;/);
    assert.match(email.html, /目的を明確にする<br>出力を&lt;レビュー&gt;する/);
    assert.match(email.html, /要件整理 &amp; 改善提案/);
  }
});

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
    form_name: 'contact',
    inquiry_type: 'lp',
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
  assert.ok('analyticsError' in invalid.data && invalid.data.analyticsError === 'validation');
  assert.equal(challengeFailed.status, 400);
  assert.ok(
    'analyticsError' in challengeFailed.data && challengeFailed.data.analyticsError === 'turnstile',
  );
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
  assert.ok(
    'analyticsError' in deliveryFailed.data && deliveryFailed.data.analyticsError === 'server',
  );
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

await test('an omitted subject uses the selected category label', () => {
  const form = makeForm();
  form.delete('subject');
  const result = parseContactFormData(form);
  assert.ok(result.ok);
  if (result.ok) assert.equal(result.submission.subject, 'LP・Webサイト制作の相談');
});

await test('verification failures expose only a safe reason, preserve input and never send mail', async () => {
  for (const [reason, expected] of [
    ['server_expired_or_duplicate', 'server_expired_or_duplicate'],
    ['private@example.com', 'server_unknown'],
  ]) {
    const result = await submitContactForm(makeForm(), {
      shouldMock: () => Promise.resolve(false),
      verify: () => Promise.resolve({ ok: false as const, message: '再確認してください', reason }),
      send: () => {
        throw new Error('Mail must not be sent');
      },
    });
    assert.equal(result.status, 400);
    assert.ok(
      'analyticsErrorReason' in result.data && result.data.analyticsErrorReason === expected,
    );
    assert.equal(result.data.values.name, 'フォーム検証');
    assert.equal(result.data.values.message, '検証用の相談内容');
    assert.ok(!('receipt' in result.data));
  }
});
