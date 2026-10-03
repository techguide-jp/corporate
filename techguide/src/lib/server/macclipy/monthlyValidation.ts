import {
  validMonth,
  OTHER_OPTION,
  otherAnswerQuestion,
  type MonthlyCampaign,
  type SurveyQuestion,
} from '../../macclipy/monthly.ts';
export class SurveyInputError extends Error {}
function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
export function parseCampaign(value: unknown): MonthlyCampaign {
  if (
    !record(value) ||
    typeof value.month !== 'string' ||
    !validMonth(value.month) ||
    typeof value.title !== 'string' ||
    value.title.length > 120 ||
    typeof value.message !== 'string' ||
    value.message.length > 6000 ||
    typeof value.published !== 'boolean' ||
    !Array.isArray(value.customQuestions) ||
    value.customQuestions.length > 6
  )
    throw new SurveyInputError('月・本文・質問の入力を確認してください。');
  const ids = new Set<string>();
  const customQuestions: SurveyQuestion[] = value.customQuestions.map((item: unknown) => {
    if (
      !record(item) ||
      typeof item.id !== 'string' ||
      !/^custom_[a-zA-Z0-9_-]{1,48}$/.test(item.id) ||
      ids.has(item.id) ||
      typeof item.label !== 'string' ||
      !item.label.trim() ||
      item.label.length > 300 ||
      !['text', 'single', 'multiple', 'rating'].includes(String(item.type)) ||
      !Array.isArray(item.options) ||
      item.options.length > 12 ||
      item.options.some(
        (option: unknown) => typeof option !== 'string' || !option.trim() || option.length > 100,
      )
    )
      throw new SurveyInputError('追加質問の内容・選択肢を確認してください。');
    ids.add(item.id);
    const type = item.type as SurveyQuestion['type'];
    const options =
      type === 'rating'
        ? ['1', '2', '3', '4', '5']
        : type === 'text'
          ? []
          : (item.options as string[]).map((option) => option.trim());
    if (
      (type === 'single' || type === 'multiple') &&
      (options.length < 2 || new Set(options).size !== options.length)
    )
      throw new SurveyInputError('選択式の質問には異なる選択肢を2個以上入力してください。');
    return { id: item.id, label: item.label.trim(), type, options };
  });
  return {
    month: value.month,
    title: value.title.trim(),
    message: value.message.trim(),
    published: value.published,
    customQuestions,
  };
}
export function parseAnswers(
  form: FormData,
  questions: SurveyQuestion[],
): Record<string, string[]> {
  const allowed = new Set([
    'ticket',
    'website',
    ...questions.flatMap((question) => {
      const other = otherAnswerQuestion(question);
      return other ? [question.id, other.id] : [question.id];
    }),
  ]);
  for (const key of form.keys())
    if (!allowed.has(key)) throw new SurveyInputError('回答できない項目が含まれています。');
  const answers: Record<string, string[]> = {};
  for (const question of questions) {
    const raw = form.getAll(question.id);
    if (raw.some((item) => typeof item !== 'string') || raw.length > 12)
      throw new SurveyInputError('回答形式を確認してください。');
    const values = (raw as string[]).map((value) => value.trim()).filter(Boolean);
    if (
      (question.type !== 'multiple' && values.length > 1) ||
      new Set(values).size !== values.length ||
      values.some(
        (value) =>
          value.length > 2000 || (question.type !== 'text' && !question.options.includes(value)),
      )
    )
      throw new SurveyInputError(`${question.label}の回答を確認してください。`);
    if (values.length) answers[question.id] = values;
    const other = otherAnswerQuestion(question);
    // 選択解除後の記述が直接POSTされても、選んでいない「その他」の内容は保存しない。
    if (other && values.includes(OTHER_OPTION)) {
      const details = form.getAll(other.id);
      if (
        details.length > 1 ||
        details.some((value) => typeof value !== 'string' || value.trim().length > 2000)
      )
        throw new SurveyInputError(`${other.label}の回答を確認してください。`);
      const text = (details[0] as string | undefined)?.trim();
      if (text) answers[other.id] = [text];
    }
  }
  if (!Object.keys(answers).length)
    throw new SurveyInputError('回答する項目を1つ以上入力してください。');
  return answers;
}

export function formText(form: FormData, key: string): string {
  const value = form.get(key);
  if (value === null) return '';
  if (typeof value !== 'string') throw new SurveyInputError('入力形式を確認してください。');
  return value;
}
