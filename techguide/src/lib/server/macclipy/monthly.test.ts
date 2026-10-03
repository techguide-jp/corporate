import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  currentMonth,
  defaultCampaign,
  publicCampaign,
  questionsFor,
  otherAnswerQuestion,
} from '../../macclipy/monthly.ts';
import { parseCampaign, parseAnswers } from './monthlyValidation.ts';
import {
  issueSurveyTicket,
  readSurveyTicket,
  issueAdminSession,
  validAdminSession,
  passwordMatches,
} from './monthlyTokens.ts';
import { createLocalRepository } from './monthlyLocalRepository.ts';
import { DocumentConflict, type MonthlyRepository } from './monthlyRepository.ts';
import { getPublicCampaign, saveSurvey, getResponses, responseCsv } from './monthlyService.ts';
import {
  MonthlyConfigurationError,
  requireMonthlySecret,
  monthlyConfigurationMessage,
} from './monthlyConfiguration.ts';
const secret = 'development-test-secret-that-is-long-enough';
void test('JST month switches at 15:00 UTC', () => {
  assert.equal(currentMonth(new Date('2026-09-30T14:59:59Z')), '2026-09');
  assert.equal(currentMonth(new Date('2026-09-30T15:00:00Z')), '2026-10');
});
void test('unpublished and blank fields fall back; published custom questions survive', () => {
  const campaign = defaultCampaign('2026-10');
  campaign.title = 'Custom';
  campaign.message = 'Custom body';
  assert.equal(publicCampaign(campaign).message, defaultCampaign('2026-10').message);
  campaign.published = true;
  campaign.title = ' ';
  campaign.message = '';
  campaign.customQuestions = [
    { id: 'custom_example', label: 'New question', type: 'text', options: [] },
  ];
  assert.equal(publicCampaign(campaign).title, defaultCampaign('2026-10').title);
  const questions = questionsFor(publicCampaign(campaign));
  assert.equal(questions.at(-2)?.id, 'custom_example');
  assert.equal(questions.at(-1)?.id, 'feedback');
});
void test('invalid months, duplicate IDs and unsafe question configurations rejected', () => {
  const question = { id: 'custom_x', label: 'Question', type: 'single', options: ['Yes', 'No'] };
  assert.throws(() => parseCampaign({ ...defaultCampaign('2026-13') }));
  assert.throws(() =>
    parseCampaign({ ...defaultCampaign('2026-10'), customQuestions: [question, question] }),
  );
  assert.throws(() =>
    parseCampaign({
      ...defaultCampaign('2026-10'),
      customQuestions: [{ ...question, options: ['Yes', 'Yes'] }],
    }),
  );
  assert.throws(() =>
    parseCampaign({
      ...defaultCampaign('2026-10'),
      customQuestions: [{ ...question, id: '../path' }],
    }),
  );
});
void test('all questions optional, but empty submission and unknown fields rejected', () => {
  const questions = questionsFor(defaultCampaign('2026-10'));
  const form = new FormData();
  assert.throws(() => parseAnswers(form, questions));
  form.append('satisfaction', '5');
  assert.deepEqual(parseAnswers(form, questions), { satisfaction: ['5'] });
  form.append('installation_id', 'private');
  assert.throws(() => parseAnswers(form, questions));
});
void test('invalid scores, choices, repeated single answers and long text rejected', () => {
  const questions = questionsFor(defaultCampaign('2026-10'));
  for (const [key, values] of [
    ['satisfaction', ['6']],
    ['job', ['Unknown']],
    ['job', ['エンジニア', '事務・管理']],
    ['request', ['x'.repeat(2001)]],
  ] as [string, string[]][]) {
    const form = new FormData();
    for (const value of values) form.append(key, value);
    assert.throws(() => parseAnswers(form, questions));
  }
});
void test('survey tickets are purpose/month/question-version/age bound and tamper resistant', () => {
  const questions = questionsFor(defaultCampaign('2026-10'));
  const ticket = issueSurveyTicket('2026-10', questions, secret, 1000);
  assert.ok(readSurveyTicket(ticket, '2026-10', questions, secret, 1100));
  assert.equal(readSurveyTicket(`${ticket}x`, '2026-10', questions, secret, 1100), null);
  assert.equal(readSurveyTicket(ticket, '2026-11', questions, secret, 1100), null);
  assert.equal(readSurveyTicket(ticket, '2026-10', questions.slice(1), secret, 1100), null);
  assert.equal(readSurveyTicket(ticket, '2026-10', questions, secret, 86402000), null);
  assert.equal(
    readSurveyTicket(issueAdminSession(secret, 1000), '2026-10', questions, secret, 1100),
    null,
  );
});
void test('admin session expires and cannot use a survey ticket or a rotated secret', () => {
  const session = issueAdminSession(secret, 1000);
  assert.equal(validAdminSession(session, secret, 2000), true);
  assert.equal(validAdminSession(session, secret, 8 * 3600000 + 1000), false);
  assert.equal(validAdminSession(session, `${secret}-rotated`, 2000), false);
  assert.equal(
    validAdminSession(issueSurveyTicket('2026-10', [], secret, 1000), secret, 2000),
    false,
  );
  assert.equal(passwordMatches('correct', 'correct'), true);
  assert.equal(passwordMatches('wrong', 'correct'), false);
});
void test('repository errors are never interpreted as no monthly configuration', async () => {
  const broken: MonthlyRepository = {
    get: () => Promise.reject(new Error('offline')),
    put: () => Promise.reject(new Error('offline')),
    list: () => Promise.reject(new Error('offline')),
  };
  await assert.rejects(getPublicCampaign(broken, '2026-10'), /offline/);
});
void test('concurrent editing conflicts and retried submissions are saved once', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'monthly-tests-'));
  try {
    const repository = createLocalRepository(directory);
    const month = '2026-10';
    const campaign = defaultCampaign(month);
    await repository.put(`campaigns/${month}`, campaign, null);
    const original = await repository.get(`campaigns/${month}`);
    assert.ok(original);
    await repository.put(`campaigns/${month}`, { ...campaign, title: 'updated' }, original.etag);
    await assert.rejects(
      repository.put(`campaigns/${month}`, campaign, original.etag),
      DocumentConflict,
    );
    await assert.rejects(repository.put(`campaigns/${month}`, campaign, null), DocumentConflict);
    const now = new Date('2026-10-02T00:00:00Z');
    const form = new FormData();
    form.append('ticket', issueSurveyTicket(month, questionsFor(campaign), secret, now.getTime()));
    form.append('request', '=HYPERLINK("https://example.com")');
    form.append('satisfaction', '4');
    await saveSurvey(repository, month, form, secret, now);
    await saveSurvey(repository, month, form, secret, new Date(now.getTime() + 1000));
    const responses = await getResponses(repository, month);
    assert.equal(responses.length, 1);
    assert.deepEqual(
      responses[0].questions.map((question) => question.id),
      ['usage', 'other_usage', 'request', 'job', 'other_job', 'satisfaction', 'feedback'],
    );
    assert.ok(responseCsv(responses).includes("'=HYPERLINK"));
    form.set('request', 'different');
    await assert.rejects(saveSurvey(repository, month, form, secret, now), /送信済み/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

void test('monthly configuration enforces secret lengths and only development shows setup details', () => {
  for (const [name, minimumLength] of [
    ['MACCLIPY_ADMIN_PASSWORD', 24],
    ['MACCLIPY_FEEDBACK_SECRET', 32],
  ] as const) {
    assert.equal(
      requireMonthlySecret(name, 'x'.repeat(minimumLength), minimumLength),
      'x'.repeat(minimumLength),
    );
    for (const value of [undefined, '', 'x'.repeat(minimumLength - 1)]) {
      assert.throws(
        () => requireMonthlySecret(name, value, minimumLength),
        (error: unknown) => {
          assert.ok(error instanceof MonthlyConfigurationError);
          assert.ok(
            monthlyConfigurationMessage(error, true).includes(`${name}を${minimumLength}文字以上`),
          );
          assert.equal(
            monthlyConfigurationMessage(error, false),
            '管理画面の設定が完了していません。',
          );
          return true;
        },
      );
    }
  }
  assert.equal(
    monthlyConfigurationMessage(new Error('sensitive infrastructure detail'), true),
    '管理画面の設定が完了していません。',
  );
});

void test('other descriptions are optional, follow the selection, and work for custom choices', () => {
  const campaign = defaultCampaign('2026-10');
  campaign.customQuestions = [
    { id: 'custom_choice', label: '追加の選択式質問', type: 'single', options: ['通常', 'その他'] },
  ];
  const questions = questionsFor(campaign);
  const form = new FormData();
  form.set('usage', 'その他');
  form.set('other_usage', '  家計簿の入力  ');
  form.set('job', 'その他');
  form.set('other_job', '翻訳');
  form.set('custom_choice', 'その他');
  form.set('other_custom_choice', '独自の使い方');
  form.set('feedback', 'いつも便利に使っています');
  assert.deepEqual(parseAnswers(form, questions), {
    usage: ['その他'],
    other_usage: ['家計簿の入力'],
    job: ['その他'],
    other_job: ['翻訳'],
    custom_choice: ['その他'],
    other_custom_choice: ['独自の使い方'],
    feedback: ['いつも便利に使っています'],
  });
  form.set('usage', 'プログラミング');
  form.set('job', '回答しない');
  form.set('custom_choice', '通常');
  const deselected = parseAnswers(form, questions);
  assert.equal(deselected.other_usage, undefined);
  assert.equal(deselected.other_job, undefined);
  assert.equal(deselected.other_custom_choice, undefined);
  const feedbackOnly = new FormData();
  feedbackOnly.set('feedback', '感想だけの回答');
  assert.deepEqual(parseAnswers(feedbackOnly, questions), { feedback: ['感想だけの回答'] });
  const otherOnly = new FormData();
  otherOnly.set('usage', 'その他');
  assert.deepEqual(parseAnswers(otherOnly, questions), { usage: ['その他'] });
  assert.equal(otherAnswerQuestion(questions.at(-1)!), null);
});
void test('other description input rejects duplicates, files and overlong text when selected', () => {
  const questions = questionsFor(defaultCampaign('2026-10'));
  for (const values of [['x'.repeat(2001)], ['one', 'two'], [new Blob(['file'])]]) {
    const form = new FormData();
    form.set('job', 'その他');
    for (const value of values) form.append('other_job', value);
    assert.throws(() => parseAnswers(form, questions));
  }
  const unexpected = new FormData();
  unexpected.set('feedback', '感想');
  unexpected.set('other_satisfaction', '選択肢のないその他欄');
  assert.throws(() => parseAnswers(unexpected, questions));
});
void test('saved other descriptions and final feedback have labels in responses and CSV with older answers', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'monthly-feedback-tests-'));
  try {
    const repository = createLocalRepository(directory);
    const month = '2026-10';
    const campaign = defaultCampaign(month);
    const now = new Date('2026-10-02T00:00:00Z');
    const form = new FormData();
    form.set('ticket', issueSurveyTicket(month, questionsFor(campaign), secret, now.getTime()));
    form.set('usage', 'その他');
    form.set('other_usage', '=SUM(1,2)');
    form.set('job', 'その他');
    form.set('other_job', '翻訳');
    form.set('feedback', '毎日助かっています');
    await saveSurvey(repository, month, form, secret, now);
    const [response] = await getResponses(repository, month);
    assert.deepEqual(response.answers.other_usage, ['=SUM(1,2)']);
    assert.deepEqual(response.answers.other_job, ['翻訳']);
    assert.deepEqual(response.answers.feedback, ['毎日助かっています']);
    assert.equal(
      response.questions.find((question) => question.id === 'other_job')?.label,
      'お仕事・職種を教えてください。（その他の内容）',
    );
    const legacy = {
      ...response,
      id: 'legacy',
      questions: response.questions.filter(
        (question) => !question.id.startsWith('other_') && question.id !== 'feedback',
      ),
      answers: { satisfaction: ['3'] },
    };
    const csv = responseCsv([response, legacy]);
    assert.ok(csv.includes('MacClipyのご感想があれば教えてください。'));
    assert.ok(csv.includes('その他の内容'));
    assert.ok(csv.includes("'=SUM(1,2)"));
    assert.ok(csv.includes('翻訳'));
    assert.ok(csv.includes('毎日助かっています'));
    assert.equal(csv.split('\r\n').length, 3);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
