import { error } from '@sveltejs/kit';
import { requireMonthlyAdmin } from '$lib/server/macclipy/monthlyAdmin';
import { monthlyRepository } from '$lib/server/macclipy/monthlyRuntime';
import { getResponses, responseCsv } from '$lib/server/macclipy/monthlyService';
import { currentMonth, validMonth } from '$lib/macclipy/monthly';
import type { RequestHandler } from './$types';
export const prerender = false;
export const GET: RequestHandler = async ({ cookies, url }) => {
  await requireMonthlyAdmin(cookies, false);
  const month = url.searchParams.get('month') ?? currentMonth();
  if (!validMonth(month)) error(400, '対象月を確認してください。');
  try {
    return new Response(responseCsv(await getResponses(await monthlyRepository(), month)), {
      headers: {
        'content-type': 'text/csv; charset=utf-8',
        'content-disposition': `attachment; filename="macclipy-survey-${month}.csv"`,
        'cache-control': 'private, no-store',
        'x-robots-tag': 'noindex',
      },
    });
  } catch {
    error(503, '回答を取得できませんでした。');
  }
};
