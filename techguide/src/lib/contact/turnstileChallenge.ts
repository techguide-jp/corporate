import {
  classifyTurnstileClientError,
  type TurnstileClientErrorSource,
  type TurnstileClientReason,
} from './turnstile.ts';

export interface TurnstileRenderOptions {
  sitekey: string;
  action: string;
  appearance: 'execute';
  execution: 'execute';
  language: string;
  size: 'normal' | 'compact';
  theme: 'light';
  retry: 'never';
  'refresh-expired': 'never';
  'refresh-timeout': 'never';
  'response-field': false;
  callback: (token: string) => void;
  'expired-callback': () => void;
  'timeout-callback': () => void;
  'error-callback': (code?: string) => boolean;
}

export interface TurnstileClient {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  execute: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

export type TurnstileChallengeResult =
  | { status: 'success'; token: string }
  | { status: 'cancelled' }
  | {
      status: 'failure';
      reason: TurnstileClientReason;
      source: TurnstileClientErrorSource;
      code?: string;
    };

export function createTurnstileChallenge(
  load: () => Promise<TurnstileClient>,
  timeoutMs = 120_000,
) {
  let pending: { promise: Promise<TurnstileChallengeResult>; cancel: () => void } | undefined;

  function run(container: HTMLElement, sitekey: string): Promise<TurnstileChallengeResult> {
    if (pending) return pending.promise;

    let settled = false;
    let client: TurnstileClient | undefined;
    let widgetId: string | undefined;
    let finish!: (result: TurnstileChallengeResult) => void;
    const result = new Promise<TurnstileChallengeResult>((resolve) => {
      finish = (value) => {
        if (settled) return;
        settled = true;
        clearTimeout(deadline);
        resolve(value);
      };
    });
    // 入力時間は制限しない。送信操作後の無応答だけを打ち切る。
    const deadline = setTimeout(
      () => finish({ status: 'failure', reason: 'client_timeout', source: 'verification_timeout' }),
      timeoutMs,
    );
    const attempt = {
      promise: result.then((value) => {
        try {
          if (widgetId !== undefined) client?.remove(widgetId);
        } catch {
          // 認証結果を詳細なSDK例外で上書きせず、古いコールバックはsettledで無効化する。
        }
        if (pending === attempt) pending = undefined;
        return value;
      }),
      cancel: () => finish({ status: 'cancelled' }),
    };
    pending = attempt;

    void (async () => {
      try {
        client = await load();
      } catch {
        finish({ status: 'failure', reason: 'client_load', source: 'initialization' });
        return;
      }
      // 画面を離れた後や期限切れ後に、遅れて認証・送信を再開しない。
      if (settled) return;
      try {
        widgetId = client.render(container, {
          sitekey,
          action: 'contact',
          appearance: 'execute',
          execution: 'execute',
          language: 'ja',
          size: container.clientWidth < 300 ? 'compact' : 'normal',
          theme: 'light',
          retry: 'never',
          'refresh-expired': 'never',
          'refresh-timeout': 'never',
          'response-field': false,
          callback: (token) =>
            finish(
              token
                ? { status: 'success', token }
                : { status: 'failure', reason: 'client_unknown', source: 'error_callback' },
            ),
          'expired-callback': () =>
            finish({ status: 'failure', reason: 'client_expired', source: 'expired_callback' }),
          'timeout-callback': () =>
            finish({ status: 'failure', reason: 'client_timeout', source: 'timeout_callback' }),
          'error-callback': (code) => {
            finish({
              status: 'failure',
              reason: classifyTurnstileClientError(code),
              source: 'error_callback',
              // 未知の値は結果にも残さず、フォーム入力やSDK例外を保存しない。
              code: classifyTurnstileClientError(code) !== 'client_unknown' ? code : undefined,
            });
            return true;
          },
        });
        if (!settled) client.execute(widgetId);
      } catch {
        finish({ status: 'failure', reason: 'client_unknown', source: 'execution' });
      }
    })();

    return attempt.promise;
  }

  return { run, cancel: () => pending?.cancel() };
}
