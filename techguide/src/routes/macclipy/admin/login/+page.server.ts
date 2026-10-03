import { dev } from '$app/environment';
import { fail, redirect } from '@sveltejs/kit';
import { ADMIN_COOKIE, ADMIN_PATH } from '$lib/server/macclipy/monthlyAdmin';
import {
  feedbackSecret,
  adminPassword,
  loginLimiter,
  readMonthlyForm,
} from '$lib/server/macclipy/monthlyRuntime';
import { monthlyConfigurationMessage } from '$lib/server/macclipy/monthlyConfiguration';
import { passwordMatches, issueAdminSession } from '$lib/server/macclipy/monthlyTokens';
import type { Actions, PageServerLoad } from './$types';
export const prerender = false;
export const load: PageServerLoad = ({ setHeaders }) => {
  setHeaders({ 'cache-control': 'private, no-store', 'x-robots-tag': 'noindex, nofollow' });
  return {};
};
export const actions: Actions = {
  default: async ({ request, cookies, getClientAddress }) => {
    if (!loginLimiter.consume(getClientAddress()))
      return fail(429, { message: '試行回数が多いため、15分ほど時間をおいてください。' });
    let expected: string;
    let secret: string;
    let form: FormData;
    try {
      expected = await adminPassword();
      secret = await feedbackSecret();
    } catch (configurationError) {
      return fail(503, { message: monthlyConfigurationMessage(configurationError, dev) });
    }
    try {
      form = await readMonthlyForm(request);
    } catch {
      return fail(400, { message: 'ログイン情報を読み取れませんでした。再度お試しください。' });
    }
    const password = form.get('password');
    if (typeof password !== 'string' || !passwordMatches(password, expected))
      return fail(401, { message: 'パスワードを確認してください。' });
    cookies.set(ADMIN_COOKIE, issueAdminSession(secret), {
      path: ADMIN_PATH,
      httpOnly: true,
      secure: !dev,
      sameSite: 'strict',
      maxAge: 8 * 3600,
    });
    redirect(303, '/macclipy/admin/');
  },
};
