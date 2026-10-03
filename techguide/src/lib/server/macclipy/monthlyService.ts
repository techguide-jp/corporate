import {
  defaultCampaign,
  publicCampaign,
  questionsFor,
  otherAnswerQuestion,
  type MonthlyCampaign,
  type SurveyResponse,
} from '../../macclipy/monthly.ts';
import { parseCampaign, parseAnswers, SurveyInputError, formText } from './monthlyValidation.ts';
import { readSurveyTicket } from './monthlyTokens.ts';
import { DocumentConflict, type MonthlyRepository } from './monthlyRepository.ts';
export async function getCampaign(
  repository: MonthlyRepository,
  month: string,
): Promise<{ campaign: MonthlyCampaign; etag: string | null }> {
  const stored = await repository.get(`campaigns/${month}`);
  const campaign = stored ? parseCampaign(stored.value) : defaultCampaign(month);
  if (campaign.month !== month) throw new Error('Stored month mismatch');
  return {
    campaign,
    etag: stored?.etag ?? null,
  };
}
export async function getPublicCampaign(
  repository: MonthlyRepository,
  month: string,
): Promise<MonthlyCampaign> {
  // 保存先の失敗は上へ返す。当月の設定が存在しない場合だけ既定を配信する。
  return publicCampaign((await getCampaign(repository, month)).campaign);
}
export async function saveSurvey(
  repository: MonthlyRepository,
  month: string,
  form: FormData,
  secret: string,
  now = new Date(),
): Promise<void> {
  if (form.get('website')) throw new SurveyInputError('送信できませんでした。');
  const campaign = await getPublicCampaign(repository, month);
  const questions = questionsFor(campaign);
  const id = readSurveyTicket(formText(form, 'ticket'), month, questions, secret, now.getTime());
  if (!id)
    throw new SurveyInputError(
      '質問が更新されたか、回答期限が切れました。ページを再読み込みしてください。',
    );
  const answers = parseAnswers(form, questions);
  const response: SurveyResponse = {
    id,
    month,
    submittedAt: now.toISOString(),
    questions: questions.flatMap((question) => {
      const other = otherAnswerQuestion(question);
      return other ? [question, other] : [question];
    }),
    answers,
  };
  try {
    await repository.put(`responses/${month}/${id}`, response, null);
  } catch (error) {
    if (!(error instanceof DocumentConflict)) throw error;
    const existing = (await repository.get(`responses/${month}/${id}`))?.value as
      | SurveyResponse
      | undefined;
    if (!existing || JSON.stringify(existing.answers) !== JSON.stringify(answers))
      throw new SurveyInputError('この回答は送信済みです。');
  }
}
export async function getResponses(
  repository: MonthlyRepository,
  month: string,
): Promise<SurveyResponse[]> {
  const values = await repository.list(`responses/${month}/`);
  return (values as SurveyResponse[]).sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}
export function responseCsv(responses: SurveyResponse[]): string {
  const questions = new Map(
    responses.flatMap((response) =>
      response.questions.map((question) => [question.id, question.label] as const),
    ),
  );
  const cell = (value: string): string =>
    `"${(/^[\s]*[=+@-]/.test(value) ? `'${value}` : value).replaceAll('"', '""')}"`;
  const lines = [['回答日時', ...questions.values()].map(cell).join(',')];
  for (const response of responses)
    lines.push(
      [
        response.submittedAt,
        ...[...questions.keys()].map((id) => response.answers[id]?.join(' / ') ?? ''),
      ]
        .map(cell)
        .join(','),
    );
  return `\uFEFF${lines.join('\r\n')}`;
}
