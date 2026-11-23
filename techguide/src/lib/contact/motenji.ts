export const MOTENJI_CATEGORY_ID = 'motenji';
export const MOTENJI_CATEGORY_LABEL = 'モテンジ！受託相談';
export const MOTENJI_CONTACT_PATH = '/motenji/contact/';

interface MotenjiTopic {
  id: string;
  label: string;
  question: string;
  options: Record<string, string>;
}

export const MOTENJI_TOPICS: MotenjiTopic[] = [
  {
    id: 'first-project',
    label: '受託の始め方',
    question: 'どの段階にいますか？',
    options: {
      exploring: 'これから始めたい',
      preparing: '準備中で、最初の一歩を決めたい',
      applying: '動き始めたが、まだ受注できていない',
    },
  },
  {
    id: 'sales',
    label: '案件探し・営業・商談',
    question: 'どこで困っていますか？',
    options: {
      leads: '相談相手や案件を見つけたい',
      outreach: '声のかけ方や紹介の頼み方を考えたい',
      meeting: '商談でのヒアリングや提案を改善したい',
    },
  },
  {
    id: 'estimate',
    label: '見積もり・契約',
    question: 'どこを整理したいですか？',
    options: {
      estimate: '金額や見積もりの出し方',
      scope: '作業範囲や納期の決め方',
      agreement: '契約や支払い条件の確認',
    },
  },
  {
    id: 'delivery',
    label: '受注後の進め方・継続相談',
    question: 'どの場面について相談したいですか？',
    options: {
      kickoff: '要件の整理や進め方のすり合わせ',
      delivery: '進捗の共有や納品',
      repeat: '納品後のフォローや次の依頼につなげる方法',
    },
  },
  {
    id: 'event',
    label: 'イベント・勉強会',
    question: 'どんなことを確認したいですか？',
    options: {
      dates: '次の開催予定や参加方法',
      fit: '自分の経験でも参加できるか',
      past: '参加予定・参加済みのイベントについて',
    },
  },
  {
    id: 'unsure',
    label: 'どれに当てはまるか分からない',
    question: '今の状況に近いものはありますか？',
    options: {
      considering: '受託に興味があり、まず話を聞きたい',
      stuck: 'すでに動いていて、状況を整理したい',
    },
  },
];

export function findMotenjiTopic(id: string) {
  return MOTENJI_TOPICS.find((topic) => topic.id === id);
}

export function getMotenjiDetailLabel(topic: MotenjiTopic | undefined, detail: string) {
  if (!topic) return '';
  if (detail === 'unsure') return 'まだ整理できていない';
  return Object.hasOwn(topic.options, detail) ? topic.options[detail] : '';
}
