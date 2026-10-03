import { error, fail, redirect } from '@sveltejs/kit';
import { currentMonth, validMonth, publicCampaign, questionsFor } from '$lib/macclipy/monthly';
import { requireMonthlyAdmin, ADMIN_COOKIE, ADMIN_PATH } from '$lib/server/macclipy/monthlyAdmin';
import { monthlyRepository, readMonthlyForm } from '$lib/server/macclipy/monthlyRuntime';
import { getCampaign, getResponses } from '$lib/server/macclipy/monthlyService';
import { parseCampaign, formText } from '$lib/server/macclipy/monthlyValidation';
import { DocumentConflict } from '$lib/server/macclipy/monthlyRepository';
import type { Actions, PageServerLoad } from './$types';
export const prerender = false;
export const load: PageServerLoad = async ({ cookies, url, setHeaders }) => {
  await requireMonthlyAdmin(cookies);
  setHeaders({ 'cache-control': 'private, no-store', 'x-robots-tag': 'noindex, nofollow' });
  const month = url.searchParams.get('month') ?? currentMonth();
  if (!validMonth(month)) error(400, '対象月を確認してください。');
  try {
    const repository = await monthlyRepository();
    const { campaign, etag } = await getCampaign(repository, month);
    const responses = await getResponses(repository, month);
    const satisfaction = responses.flatMap((r) => r.answers.satisfaction?.map(Number) ?? []);
    const distribution = [1, 2, 3, 4, 5].map((score) => ({
      score,
      count: satisfaction.filter((v) => v === score).length,
    }));
    const usage =
      questionsFor(campaign)
        .find((q) => q.id === 'usage')
        ?.options.map((option) => ({
          option,
          count: responses.filter((r) => r.answers.usage?.includes(option)).length,
        })) ?? [];
    return {
      campaign,
      etag,
      preview: publicCampaign(campaign),
      responses,
      distribution,
      usage,
      satisfactionCount: satisfaction.length,
      average: satisfaction.length
        ? satisfaction.reduce((sum, value) => sum + value, 0) / satisfaction.length
        : null,
    };
  } catch {
    error(503, '月別データを取得できませんでした。保存先の設定・接続を確認してください。');
  }
};
export const actions: Actions = {
  save: async ({ cookies, request }) => {
    await requireMonthlyAdmin(cookies);
    let campaign: ReturnType<typeof parseCampaign>;
    let etag: string | null;
    try {
      const form = await readMonthlyForm(request);
      const customQuestions: unknown = JSON.parse(formText(form, 'customQuestions') || '[]');
      campaign = parseCampaign({
        month: form.get('month'),
        title: form.get('title'),
        message: form.get('message'),
        published: form.get('published') === 'on',
        customQuestions,
      });
      etag = formText(form, 'etag') || null;
    } catch (cause) {
      return fail(400, {
        ok: false,
        message: cause instanceof Error ? cause.message : '入力内容を確認してください。',
      });
    }
    try {
      await (await monthlyRepository()).put(`campaigns/${campaign.month}`, campaign, etag);
      return {
        ok: true,
        message: `${campaign.month}の内容を保存しました。${campaign.published ? '月初から配信されます。' : 'カスタム内容は非公開で、デフォルトを配信します。'}`,
      };
    } catch (cause) {
      return fail(cause instanceof DocumentConflict ? 409 : 503, {
        ok: false,
        message:
          cause instanceof DocumentConflict
            ? '別の編集が保存されています。内容を控えてから再読み込みしてください。'
            : '保存できませんでした。再度お試しください。',
      });
    }
  },
  logout: async ({ cookies }) => {
    await requireMonthlyAdmin(cookies);
    cookies.delete(ADMIN_COOKIE, { path: ADMIN_PATH });
    redirect(303, '/macclipy/admin/login/');
  },
};
