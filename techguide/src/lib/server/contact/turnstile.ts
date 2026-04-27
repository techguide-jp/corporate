import { dev } from '$app/environment';
import { getServerEnv } from '$lib/server/env';

export type TurnstileResult =
  | { ok: true }
  | { ok: false; message: string; status: 'missing' | 'invalid' | 'config' };

interface TurnstileResponse {
  success?: boolean;
  'error-codes'?: string[];
}

export async function verifyTurnstile(
  formData: FormData,
  remoteIp?: string,
): Promise<TurnstileResult> {
  const secret = (await getServerEnv('TURNSTILE_SECRET_KEY'))?.trim();
  const token = formData.get('cf-turnstile-response');

  if (!secret) {
    if (dev) {
      return { ok: true };
    }

    return {
      ok: false,
      status: 'config',
      message: 'フォームの迷惑投稿対策が未設定です。時間をおいて再度お試しください。',
    };
  }

  if (typeof token !== 'string' || token.length === 0) {
    return {
      ok: false,
      status: 'missing',
      message: '迷惑投稿対策の確認が完了していません。チェック完了後に送信してください。',
    };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) {
    body.set('remoteip', remoteIp);
  }

  let response: Response;
  try {
    response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });
  } catch {
    return {
      ok: false,
      status: 'invalid',
      message: '迷惑投稿対策の確認に失敗しました。時間をおいて再度お試しください。',
    };
  }

  if (!response.ok) {
    return {
      ok: false,
      status: 'invalid',
      message: '迷惑投稿対策の確認に失敗しました。時間をおいて再度お試しください。',
    };
  }

  let payload: TurnstileResponse;
  try {
    payload = (await response.json()) as TurnstileResponse;
  } catch {
    return {
      ok: false,
      status: 'invalid',
      message: '迷惑投稿対策の確認に失敗しました。時間をおいて再度お試しください。',
    };
  }
  if (!payload.success) {
    return {
      ok: false,
      status: 'invalid',
      message: '迷惑投稿対策の確認に失敗しました。再度チェックして送信してください。',
    };
  }

  return { ok: true };
}
