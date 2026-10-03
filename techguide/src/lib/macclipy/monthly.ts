export type QuestionType = 'text' | 'single' | 'multiple' | 'rating';
export interface SurveyQuestion {
  id: string;
  label: string;
  type: QuestionType;
  options: string[];
}
export interface MonthlyCampaign {
  month: string;
  title: string;
  message: string;
  published: boolean;
  customQuestions: SurveyQuestion[];
}
export interface SurveyResponse {
  id: string;
  month: string;
  submittedAt: string;
  questions: SurveyQuestion[];
  answers: Record<string, string[]>;
}
export const DEFAULT_MESSAGE =
  'いつもMacClipyをご利用いただきありがとうございます。\n毎日のコピー＆ペーストを、もっと便利にするために改善を続けています。\n使い方や、こんな機能があったら嬉しいという声を、ぜひお聞かせください。';
export const BASE_QUESTIONS: SurveyQuestion[] = [
  {
    id: 'usage',
    label: 'MacClipyを何に使っていますか？',
    type: 'multiple',
    options: [
      '仕事の文章作成',
      'プログラミング',
      'メール・チャット',
      '定型文の貼り付け',
      '調べもの・学習',
      'その他',
    ],
  },
  {
    id: 'request',
    label: 'こんな機能があったら嬉しい、ということがあれば教えてください。',
    type: 'text',
    options: [],
  },
  {
    id: 'job',
    label: 'お仕事・職種を教えてください。',
    type: 'single',
    options: [
      'エンジニア',
      'デザイナー・制作',
      '事務・管理',
      '営業・接客',
      '経営・自営業',
      '教育・研究',
      '学生',
      'その他',
      '回答しない',
    ],
  },
  {
    id: 'satisfaction',
    label: 'MacClipyの満足度を教えてください。（1: 不満 ～ 5: とても満足）',
    type: 'rating',
    options: ['1', '2', '3', '4', '5'],
  },
];
export function currentMonth(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
  }).formatToParts(now);
  return `${parts.find((p) => p.type === 'year')?.value}-${parts.find((p) => p.type === 'month')?.value}`;
}
export function validMonth(value: string): boolean {
  return /^20\d{2}-(0[1-9]|1[0-2])$/.test(value);
}
export function defaultCampaign(month: string): MonthlyCampaign {
  return {
    month,
    title: `${month} MacClipy便り`,
    message: DEFAULT_MESSAGE,
    published: false,
    customQuestions: [],
  };
}
export function publicCampaign(campaign: MonthlyCampaign): MonthlyCampaign {
  const fallback = defaultCampaign(campaign.month);
  if (!campaign.published) return fallback;
  return {
    ...campaign,
    title: campaign.title.trim() || fallback.title,
    message: campaign.message.trim() || fallback.message,
  };
}
export const OTHER_OPTION = 'その他';
const FEEDBACK_QUESTION: SurveyQuestion = {
  id: 'feedback',
  label: 'MacClipyのご感想があれば教えてください。',
  type: 'text',
  options: [],
};
export function questionsFor(campaign: MonthlyCampaign): SurveyQuestion[] {
  return [...BASE_QUESTIONS, ...campaign.customQuestions, FEEDBACK_QUESTION];
}
export function otherAnswerQuestion(question: SurveyQuestion): SurveyQuestion | null {
  if (!['single', 'multiple'].includes(question.type) || !question.options.includes(OTHER_OPTION))
    return null;
  return {
    id: `other_${question.id}`,
    label: `${question.label}（その他の内容）`,
    type: 'text',
    options: [],
  };
}
