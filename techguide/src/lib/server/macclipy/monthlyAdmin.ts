import { dev } from '$app/environment';
import { error, redirect, type Cookies } from '@sveltejs/kit';
import { monthlyConfigurationMessage } from './monthlyConfiguration';
import { adminPassword, feedbackSecret } from './monthlyRuntime';
import { validAdminSession } from './monthlyTokens';
export const ADMIN_COOKIE = 'macclipy_monthly_admin';
export const ADMIN_PATH = '/macclipy/admin';
export async function requireMonthlyAdmin(cookies: Cookies, redirectToLogin = true): Promise<void> {
  let secret: string;
  try {
    secret = await feedbackSecret();
    await adminPassword();
  } catch (configurationError) {
    error(503, monthlyConfigurationMessage(configurationError, dev));
  }
  if (validAdminSession(cookies.get(ADMIN_COOKIE) ?? '', secret)) return;
  if (!redirectToLogin) error(401, 'ログインが必要です。');
  redirect(303, '/macclipy/admin/login/');
}
