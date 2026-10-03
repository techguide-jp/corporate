import { dev } from '$app/environment';
import { getServerEnv } from '$lib/server/env';
import { verifyTurnstileResponse, type TurnstileResult } from './turnstileVerification';

export type { TurnstileResult } from './turnstileVerification';

export async function verifyTurnstile(
  formData: FormData,
  remoteIp?: string,
): Promise<TurnstileResult> {
  const secret = (await getServerEnv('TURNSTILE_SECRET_KEY'))?.trim();
  return verifyTurnstileResponse({
    secret,
    token: formData.get('cf-turnstile-response'),
    remoteIp,
    allowMissingSecret: dev,
  });
}
