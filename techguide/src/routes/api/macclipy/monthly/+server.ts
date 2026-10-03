import { json } from '@sveltejs/kit';
import { currentMonth } from '$lib/macclipy/monthly';
import { monthlyRepository } from '$lib/server/macclipy/monthlyRuntime';
import { getPublicCampaign } from '$lib/server/macclipy/monthlyService';
import type { RequestHandler } from './$types';
export const prerender = false;
// MacClipyは転送を拒否するため、アプリが使う末尾スラッシュ付きURLを直接受け付ける。
export const trailingSlash = 'always';
export const GET: RequestHandler = async () => {
  try {
    const month = currentMonth();
    const campaign = await getPublicCampaign(await monthlyRepository(), month);
    return json(
      {
        month,
        title: campaign.title,
        message: campaign.message,
        surveyURL: `https://techguide.jp/macclipy/survey/${month}/`,
      },
      { headers: { 'cache-control': 'no-store' } },
    );
  } catch {
    return json(
      { message: 'お知らせを取得できませんでした。' },
      { status: 503, headers: { 'cache-control': 'no-store' } },
    );
  }
};
