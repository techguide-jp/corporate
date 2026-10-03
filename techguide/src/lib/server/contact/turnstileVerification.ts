import type { TurnstileServerReason } from '../../contact/turnstile.ts';

export type TurnstileResult =
  | { ok: true }
  | {
      ok: false;
      message: string;
      status: 'missing' | 'invalid' | 'config';
      reason: TurnstileServerReason;
    };

const SERVER_ERROR_REASONS: Record<string, TurnstileServerReason> = {
  'missing-input-secret': 'server_missing_secret',
  'invalid-input-secret': 'server_invalid_secret',
  'missing-input-response': 'server_missing_response',
  'invalid-input-response': 'server_invalid_response',
  'timeout-or-duplicate': 'server_expired_or_duplicate',
  'bad-request': 'server_bad_request',
  'internal-error': 'server_internal',
};

interface VerificationInput {
  secret?: string;
  token: unknown;
  remoteIp?: string;
  allowMissingSecret?: boolean;
}

interface VerificationDependencies {
  fetch?: typeof fetch;
  reportFailure?: (reason: TurnstileServerReason) => void;
}

export async function verifyTurnstileResponse(
  input: VerificationInput,
  dependencies: VerificationDependencies = {},
): Promise<TurnstileResult> {
  const reportFailure =
    dependencies.reportFailure ??
    ((reason) => {
      console.warn(
        JSON.stringify({ event: 'contact_turnstile_failure', source: 'server', reason }),
      );
    });
  const failure = (reason: TurnstileServerReason): TurnstileResult => {
    reportFailure(reason);
    const config = reason === 'server_missing_secret' || reason === 'server_invalid_secret';
    const missing = reason === 'server_missing_response';
    return {
      ok: false,
      reason,
      status: config ? 'config' : missing ? 'missing' : 'invalid',
      message: config
        ? 'フォームの迷惑投稿対策を確認できません。時間をおいて再度お試しください。'
        : missing
          ? '迷惑投稿対策の確認が完了していません。チェック完了後に送信してください。'
          : '迷惑投稿対策の確認に失敗しました。再度確認してから送信してください。',
    };
  };

  const secret = input.secret?.trim();
  if (!secret) {
    return input.allowMissingSecret ? { ok: true } : failure('server_missing_secret');
  }
  if (typeof input.token !== 'string' || !input.token.trim()) {
    return failure('server_missing_response');
  }
  if (input.token.length > 2048) return failure('server_invalid_response');

  const body = new URLSearchParams({ secret, response: input.token });
  if (input.remoteIp) body.set('remoteip', input.remoteIp);
  const signal = AbortSignal.timeout(10_000);
  let response: Response;
  try {
    response = await (dependencies.fetch ?? fetch)(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      { method: 'POST', body, signal },
    );
  } catch {
    return failure(signal.aborted ? 'server_timeout' : 'server_network');
  }
  if (!response.ok) return failure('server_http');

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    return failure(signal.aborted ? 'server_timeout' : 'server_invalid_json');
  }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return failure('server_invalid_json');
  }
  const result = payload as { success?: unknown; 'error-codes'?: unknown };
  if (typeof result.success !== 'boolean') return failure('server_invalid_json');
  if (result.success) return { ok: true };

  const codes = Array.isArray(result['error-codes']) ? result['error-codes'] : [];
  const reason = codes
    .filter((code): code is string => typeof code === 'string')
    .map((code) =>
      Object.hasOwn(SERVER_ERROR_REASONS, code) ? SERVER_ERROR_REASONS[code] : undefined,
    )
    .find((value) => value !== undefined);
  return failure(reason ?? 'server_unknown');
}
