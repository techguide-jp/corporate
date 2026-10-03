import type { SurveyResponse } from '../../macclipy/monthly.ts';

type NotificationFailure = {
  month: string;
  responseId: string;
  reason: 'not_configured' | 'invalid_webhook' | 'slack_rejected' | 'request_failed';
  status?: number;
};
type SlackDependencies = {
  fetch?: typeof fetch;
  reportFailure?: (failure: NotificationFailure) => void;
};
export async function sendSurveySlackNotification(
  response: SurveyResponse,
  webhook: string | undefined,
  dependencies: SlackDependencies = {},
): Promise<boolean> {
  const report =
    dependencies.reportFailure ??
    ((failure: NotificationFailure) => console.error('macclipy_survey_slack_failed', failure));
  const fail = (reason: NotificationFailure['reason'], status?: number): false => {
    report({
      month: response.month,
      responseId: response.id,
      reason,
      ...(status ? { status } : {}),
    });
    return false;
  };
  if (!webhook) return fail('not_configured');
  // 接続先とリダイレクトを制限し、設定ミスでWebhookの秘密を別の宛先へ送らない。
  if (
    !/^https:\/\/hooks\.slack\.com\/services\/T[A-Z0-9]+\/B[A-Z0-9]+\/[A-Za-z0-9]+$/.test(webhook)
  )
    return fail('invalid_webhook');
  const submittedAt = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(response.submittedAt));
  const text = [
    '*MacClipyのアンケートに新しい回答が届きました*',
    `対象月：${response.month}`,
    `回答日時：${submittedAt}（日本時間）`,
    `<https://techguide.jp/macclipy/admin/?month=${response.month}|回答を確認する>`,
  ].join('\n');
  try {
    const result = await (dependencies.fetch ?? fetch)(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text, unfurl_links: false, unfurl_media: false }),
      redirect: 'error',
      signal: AbortSignal.timeout(3000),
    });
    if (!result.ok) return fail('slack_rejected', result.status);
    if ((await result.text()).trim() !== 'ok') return fail('slack_rejected', result.status);
    return true;
  } catch {
    // 回答本文、Webhook URL、例外本文はログへ出さない。応答不明時の再送は二重投稿になるため行わない。
    return fail('request_failed');
  }
}
