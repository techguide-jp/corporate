import { error, fail } from '@sveltejs/kit';
import { currentMonth, validMonth, questionsFor } from '$lib/macclipy/monthly';
import {
  feedbackSecret,
  monthlyRepository,
  readMonthlyForm,
  surveyLimiter,
} from '$lib/server/macclipy/monthlyRuntime';
import { getPublicCampaign, saveSurvey } from '$lib/server/macclipy/monthlyService';
import { SurveyInputError, formText } from '$lib/server/macclipy/monthlyValidation';
import { issueSurveyTicket } from '$lib/server/macclipy/monthlyTokens';
import type { Actions, PageServerLoad } from './$types';
export const prerender = false;
export const load: PageServerLoad = async ({ params, setHeaders }) => {
  setHeaders({ 'cache-control': 'private, no-store', 'x-robots-tag': 'noindex, nofollow' });
  if (!validMonth(params.month) || params.month !== currentMonth())
    error(404, 'この月のアンケートは受付期間外です。');
  try {
    const campaign = await getPublicCampaign(await monthlyRepository(), params.month);
    const questions = questionsFor(campaign);
    return {
      campaign,
      questions,
      ticket: issueSurveyTicket(params.month, questions, await feedbackSecret()),
    };
  } catch {
    error(503, 'アンケートを準備できませんでした。時間をおいて再度お試しください。');
  }
};
export const actions: Actions = {
  default: async ({ params, request, getClientAddress }) => {
    if (!validMonth(params.month) || params.month !== currentMonth())
      return fail(400, { ok: false, message: 'この月のアンケートは受付期間外です。', values: {} });
    if (!surveyLimiter.consume(getClientAddress()))
      return fail(429, {
        ok: false,
        message: '送信回数が多いため、少し時間をおいてお試しください。',
        values: {} as Record<string, string[]>,
        ticket: '',
      });
    let form: FormData;
    try {
      form = await readMonthlyForm(request);
    } catch {
      return fail(400, {
        ok: false,
        message: '送信内容が大きすぎるか、形式が正しくありません。',
        values: {} as Record<string, string[]>,
        ticket: '',
      });
    }
    let repository: Awaited<ReturnType<typeof monthlyRepository>>;
    let secret: string;
    try {
      repository = await monthlyRepository();
      secret = await feedbackSecret();
    } catch {
      return fail(503, {
        ok: false,
        message: '保存先に接続できませんでした。時間をおいて再度お試しください。',
        values: {} as Record<string, string[]>,
        ticket: '',
      });
    }
    const values: Record<string, string[]> = {};
    for (const key of form.keys())
      if (!['ticket', 'website'].includes(key))
        values[key] = form
          .getAll(key)
          .filter((value): value is string => typeof value === 'string');
    try {
      await saveSurvey(repository, params.month, form, secret);
      return {
        ok: true,
        message: 'ご回答ありがとうございました。改善の参考にさせていただきます。',
        values: {} as Record<string, string[]>,
        ticket: '',
      };
    } catch (cause) {
      return fail(cause instanceof SurveyInputError ? 400 : 503, {
        ok: false,
        message:
          cause instanceof SurveyInputError
            ? cause.message
            : '保存できませんでした。回答内容を確認して再度お試しください。',
        values,
        ticket: typeof form.get('ticket') === 'string' ? formText(form, 'ticket') : '',
      });
    }
  },
};
