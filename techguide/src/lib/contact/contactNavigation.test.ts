import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import { parse } from 'svelte/compiler';
import ts from 'typescript';
import type { TurnstileChallengeResult } from './turnstileChallenge.ts';

type ResultCallback = (options: {
  result: { type: 'success' };
  update: () => Promise<void>;
}) => Promise<void>;
type Submit = (options: {
  cancel: () => void;
  formData: FormData;
  controller: AbortController;
}) => Promise<ResultCallback | undefined>;

function flushMicrotasks() {
  return new Promise<void>((resolve) => setImmediate(resolve));
}

function harness() {
  const source = readFileSync(
    new URL('../../routes/contact/+page.svelte', import.meta.url),
    'utf8',
  );
  const instance = parse(source, { modern: true }).instance;
  assert.ok(instance);
  const content = instance.content as typeof instance.content & { start: number; end: number };
  const script = source.slice(content.start, content.end);
  const ast = ts.createSourceFile(
    'contact.ts',
    script,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const statements = ast.statements.filter((node) => {
    if (ts.isVariableStatement(node)) {
      return node.declarationList.declarations.some(
        (declaration) =>
          ts.isIdentifier(declaration.name) && declaration.name.text === 'handleSubmit',
      );
    }
    return (
      ts.isExpressionStatement(node) &&
      ts.isCallExpression(node.expression) &&
      ts.isIdentifier(node.expression.expression) &&
      node.expression.expression.text === 'beforeNavigate'
    );
  });
  assert.equal(statements.length, 2, '実ページの送信処理と遷移開始フックを検証する');
  const code = ts.transpileModule(
    statements.map((node) => node.getText(ast)).join('\n') +
      '\nglobalThis.submitForTest = handleSubmit;',
    { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None } },
  ).outputText;

  let navigate: (() => void) | undefined;
  let cancelCount = 0;
  const attempts: Array<(result: TurnstileChallengeResult) => void> = [];
  const state = {
    isAuthenticating: false,
    isSubmitting: false,
    disposed: false,
    submissionGeneration: 0,
    submissionError: '',
    turnstileToken: '',
    turnstileClientError: '',
    turnstileServerErrorDismissed: false,
    activeSubmission: undefined as AbortController | undefined,
  };
  const context = Object.assign(state, {
    get isBusy() {
      return state.isAuthenticating || state.isSubmitting;
    },
    hasTurnstile: true,
    UNKNOWN_SUBMISSION_MESSAGE: 'unknown-result',
    MIN_SUBMITTING_MS: 0,
    data: { turnstileSiteKey: 'test-key' },
    turnstileContainer: { scrollIntoView() {} },
    formEvent() {},
    scrollSubmissionStatusIntoView() {},
    tick: () => Promise.resolve(),
    turnstileChallenge: {
      run: () => new Promise<TurnstileChallengeResult>((resolve) => attempts.push(resolve)),
      // 既に成功がキューに入った競合も再現するため、解決はテスト側で行う。
      cancel: () => {
        cancelCount += 1;
      },
    },
    beforeNavigate: (callback: () => void) => {
      navigate = callback;
    },
    submitForTest: undefined as Submit | undefined,
  });
  // Object.assignはgetterを値にするため、実ページ同様に毎回busy状態を評価する。
  Object.defineProperty(context, 'isBusy', {
    get: () => state.isAuthenticating || state.isSubmitting,
  });
  vm.runInNewContext(code, context);
  assert.ok(navigate);
  assert.ok(context.submitForTest);
  return { state, attempts, navigate, submit: context.submitForTest, cancels: () => cancelCount };
}

void test('遷移先の読み込み開始時に認証を止め、遅い成功から送信を再開しない', async () => {
  const testCase = harness();
  const controller = new AbortController();
  const formData = new FormData();
  let cancelled = false;
  const pending = testCase.submit({
    cancel: () => {
      cancelled = true;
    },
    formData,
    controller,
  });
  await flushMicrotasks();
  assert.equal(testCase.state.isAuthenticating, true);
  testCase.navigate();
  testCase.attempts[0]({ status: 'success', token: 'late-token' });
  assert.equal(await pending, undefined);
  assert.equal(cancelled, true);
  assert.equal(controller.signal.aborted, true);
  assert.equal(testCase.cancels(), 1);
  assert.equal(testCase.state.isAuthenticating, false);
  assert.equal(testCase.state.isSubmitting, false);
  assert.equal(formData.has('cf-turnstile-response'), false);
});

void test('認証成功が解決済みでも、継続処理より先に遷移が始まれば送信しない', async () => {
  const testCase = harness();
  let cancelled = false;
  const pending = testCase.submit({
    cancel: () => {
      cancelled = true;
    },
    formData: new FormData(),
    controller: new AbortController(),
  });
  await flushMicrotasks();
  testCase.attempts[0]({ status: 'success', token: 'queued-token' });
  testCase.navigate();
  assert.equal(await pending, undefined);
  assert.equal(cancelled, true);
  assert.equal(testCase.state.isSubmitting, false);
});

void test('送信開始後の遷移は中断・結果不明とし、古い応答で新しい処理を上書きしない', async () => {
  const testCase = harness();
  const controller = new AbortController();
  const pending = testCase.submit({ cancel() {}, formData: new FormData(), controller });
  await flushMicrotasks();
  testCase.attempts[0]({ status: 'success', token: 'first-token' });
  const callback = await pending;
  assert.ok(callback);
  assert.equal(testCase.state.isSubmitting, true);
  testCase.navigate();
  assert.equal(controller.signal.aborted, true);
  assert.equal(testCase.state.submissionError, 'unknown-result');
  assert.equal(testCase.state.isSubmitting, false);

  const retryController = new AbortController();
  const retry = testCase.submit({
    cancel() {},
    formData: new FormData(),
    controller: retryController,
  });
  await flushMicrotasks();
  testCase.attempts[1]({ status: 'success', token: 'retry-token' });
  assert.ok(await retry);
  let updated = false;
  await callback({
    result: { type: 'success' },
    update: () => {
      updated = true;
      return Promise.resolve();
    },
  });
  assert.equal(updated, false);
  assert.equal(testCase.state.isSubmitting, true);
  assert.equal(testCase.state.activeSubmission, retryController);
});
